import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import type {RecommendProductListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: RecommendProductListItem) => void;
  updateModalVisible: boolean;
  values: Partial<RecommendProductListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateRecommendProductForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const {onSubmit, onCancel, updateModalVisible, values} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(item as RecommendProductListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id"/>
        </FormItem>
        <FormItem name="productId" hidden>
          <Input id="update-productId"/>
        </FormItem>
        <FormItem name="productName" label="商品名称" hidden>
          <Input id="update-productName"/>
        </FormItem>
        <FormItem name="recommendStatus" label="推荐状态">
          <Select id="recommendStatus" placeholder={'请选择推荐状态'}>
            <Option value={0}>不推荐</Option>
            <Option value={1}>推荐</Option>
          </Select>
        </FormItem>
        <FormItem name="sort" label="排序">
          <InputNumber/>
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改商品推荐"
      visible={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateRecommendProductForm;
