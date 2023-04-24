import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import type {HomeNewProductListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeNewProductListItem) => void;
  updateModalVisible: boolean;
  values: Partial<HomeNewProductListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateHomeNewProductForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;

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
      onSubmit(item as HomeNewProductListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id"/>
        </FormItem>
        <FormItem name="productId" label="商品名称" hidden>
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
          <Input id="update-sort" placeholder={'请输入排序'}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改新鲜好物信息"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateHomeNewProductForm;
