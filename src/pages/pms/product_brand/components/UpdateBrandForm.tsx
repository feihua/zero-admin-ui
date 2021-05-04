import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { BrandListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<BrandListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<BrandListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateBrandForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, updateModalVisible, currentData } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

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
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="品牌名">
          <Input id="update-name" placeholder={'请输入品牌名'} />
        </FormItem>
        <FormItem name="productCount" label="产品数量">
          <Input id="update-productCount" placeholder={'请输入产品数量'} />
        </FormItem>
        <FormItem name="productCommentCount" label="产品评论数量">
          <Input id="update-productCommentCount" placeholder={'请输入产品评论数量'} />
        </FormItem>
        <FormItem name="logo" label="品牌logo">
          <Input id="update-logo" placeholder={'请输入品牌logo'} />
        </FormItem>
        <FormItem name="bigPic" label="专区大图">
          <Input id="update-bigPic" placeholder={'请输入专区大图'} />
        </FormItem>
        <FormItem name="brandStory" label="品牌故事">
          <Input id="update-brandStory" placeholder={'请输入品牌故事'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改品牌"
      visible={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateBrandForm;
