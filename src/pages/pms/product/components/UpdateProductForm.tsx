import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { ProductListItem } from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: Partial<ProductListItem>) => void;
  updateModalVisible: boolean;
  currentData: Partial<ProductListItem>;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateProductForm: React.FC<UpdateFormProps> = (props) => {
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
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
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
      title="修改商品"
      visible={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateProductForm;
