import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { ProductListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: ProductListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateProductForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit, onCancel, createModalVisible } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="商品名">
          <Input id="update-name" placeholder={'请输入商品名'} />
        </FormItem>
        <FormItem name="promotionPrice" label="促销价格">
          <Input id="update-promotionPrice" placeholder={'请输入促销价格'} />
        </FormItem>
        <FormItem name="giftGrowth" label="赠送的成长值">
          <Input id="update-mobile" placeholder={'请输入赠送的成长值'} />
        </FormItem>
        <FormItem name="giftPoint" label="赠送的积分">
          <Input id="update-giftPoint" placeholder={'请输入赠送的积分'} />
        </FormItem>
        <FormItem name="originalPrice" label="市场价">
          <Input id="update-originalPrice" placeholder={'请输入市场价'} />
        </FormItem>
        <FormItem name="stock" label="库存">
          <Input id="update-stock" placeholder={'请输入库存'} />
        </FormItem>
        <FormItem name="brandName" label="品牌名称">
          <Input id="update-brandName" placeholder={'请输入品牌名称'} />
        </FormItem>
        <FormItem name="productCategoryName" label="商品分类名称">
          <Input id="update-productCategoryName" placeholder={'请输入商品分类名称'} />
        </FormItem>
      </>
    );
  };

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建用户"
      visible={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateProductForm;
