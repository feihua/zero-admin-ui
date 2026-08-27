import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { HelpCategoryListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: HelpCategoryListItem) => void;
  open: boolean;
  currentData: Partial<HelpCategoryListItem>;
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
      onSubmit(values as HelpCategoryListItem);
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
          name="name"
          label="分类名称"
          rules={[{required: true, message: '请输入分类名称!'}]}
        >
            <Input id="update-name" placeholder={'请输入分类名称!'}/>
        </FormItem>
        <FormItem
          name="icon"
          label="分类图标"
          rules={[{required: true, message: '请输入分类图标!'}]}
        >
            <Input id="update-icon" placeholder={'请输入分类图标!'}/>
        </FormItem>
        <FormItem
          name="helpCount"
          label="专题数量"
          rules={[{required: true, message: '请输入专题数量!'}]}
        >
            <Input id="update-helpCount" placeholder={'请输入专题数量!'}/>
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
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={{width: 255}}/>
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
