import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { HelpListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: HelpListItem) => void;
  open: boolean;
  currentData: Partial<HelpListItem>;
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
      onSubmit(values as HelpListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>
        <FormItem
          name="categoryId"
          label="分类id"
          rules={[{required: true, message: '请输入分类id!'}]}
        >
            <Input id="update-categoryId" placeholder={'请输入分类id!'}/>
        </FormItem>
        <FormItem
          name="icon"
          label="图标"
          rules={[{required: true, message: '请输入图标!'}]}
        >
            <Input id="update-icon" placeholder={'请输入图标!'}/>
        </FormItem>
        <FormItem
          name="title"
          label="标题"
          rules={[{required: true, message: '请输入标题!'}]}
        >
            <Input id="update-title" placeholder={'请输入标题!'}/>
        </FormItem>
        <FormItem
          name="showStatus"
          label="显示状态：0->不显示；1->显示"
          rules={[{required: true, message: '请输入显示状态：0->不显示；1->显示!'}]}
        >
            <Radio.Group>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>正常</Radio>
            </Radio.Group>
        </FormItem>
        <FormItem
          name="readCount"
          label="阅读量"
          rules={[{required: true, message: '请输入阅读量!'}]}
        >
            <Input id="update-readCount" placeholder={'请输入阅读量!'}/>
        </FormItem>
        <FormItem
          name="content"
          label="内容"
          rules={[{required: true, message: '请输入内容!'}]}
        >
            <Input id="update-content" placeholder={'请输入内容!'}/>
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
