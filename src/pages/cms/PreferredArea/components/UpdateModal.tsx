import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { PreferredAreaListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: PreferredAreaListItem) => void;
  open: boolean;
  currentData: Partial<PreferredAreaListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    open,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !open) {
      form.resetFields();
    }
  }, [props.open]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as PreferredAreaListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" />
        </FormItem>
        <FormItem
          name="name"
          label="专区名称"
          rules={[{ required: true, message: '请输入专区名称!' }]}
        >
          <Input id="update-name" placeholder={'请输入专区名称!'} />
        </FormItem>
        <FormItem
          name="subTitle"
          label="子标题"
          rules={[{ required: true, message: '请输入子标题!' }]}
        >
          <Input id="update-subTitle" placeholder={'请输入子标题!'} />
        </FormItem>
        <FormItem
          name="pic"
          label="展示图片"
          rules={[{ required: true, message: '请输入展示图片!' }]}
        >
          <Input id="update-pic" placeholder={'请输入展示图片!'} />
        </FormItem>
        <FormItem name="sort" label="排序" rules={[{ required: true, message: '请输入排序!' }]}>
          <InputNumber style={{ width: 255 }} />
        </FormItem>
        <FormItem
          name="showStatus"
          label="显示状态"
          rules={[{ required: true, message: '请输入显示状态!' }]}
        >
          <Radio.Group>
            <Radio value={1}>显示</Radio>
            <Radio value={0}>不显示</Radio>
          </Radio.Group>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
      open={open}
      {...modalFooter}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateModal;
