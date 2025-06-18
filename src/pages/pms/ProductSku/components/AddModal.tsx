import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductSkuListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductSkuListItem) => void;
  addVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const AddModal: React.FC<AddModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    addVisible,
  } = props;

  useEffect(() => {
    if (form && !addVisible) {
      form.resetFields();
    }
  }, [props.addVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: ProductSkuListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        
        <FormItem
          name="id"
          label="商品SpuId"
          rules={[{required: true, message: '请输入商品SpuId!'}]}
        >
            <Input id="create-id" placeholder={'请输入商品SpuId!'}/>
         </FormItem>
        <FormItem
          name="spuId"
          label="商品SpuId"
          rules={[{required: true, message: '请输入商品SpuId!'}]}
        >
            <Input id="create-spuId" placeholder={'请输入商品SpuId!'}/>
         </FormItem>
        <FormItem
          name="name"
          label="SKU名称"
          rules={[{required: true, message: '请输入SKU名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入SKU名称!'}/>
         </FormItem>
        <FormItem
          name="skuCode"
          label="SKU编码"
          rules={[{required: true, message: '请输入SKU编码!'}]}
        >
            <Input id="create-skuCode" placeholder={'请输入SKU编码!'}/>
         </FormItem>
        <FormItem
          name="mainPic"
          label="主图"
          rules={[{required: true, message: '请输入主图!'}]}
        >
            <Input id="create-mainPic" placeholder={'请输入主图!'}/>
         </FormItem>
        <FormItem
          name="albumPics"
          label="图片集"
          rules={[{required: true, message: '请输入图片集!'}]}
        >
            <Input id="create-albumPics" placeholder={'请输入图片集!'}/>
         </FormItem>
        <FormItem
          name="price"
          label="价格"
          rules={[{required: true, message: '请输入价格!'}]}
        >
            <Input id="create-price" placeholder={'请输入价格!'}/>
         </FormItem>
        <FormItem
          name="promotionPrice"
          label="单品促销价格"
          rules={[{required: true, message: '请输入单品促销价格!'}]}
        >
            <Input id="create-promotionPrice" placeholder={'请输入单品促销价格!'}/>
         </FormItem>
        <FormItem
          name="promotionStartTime"
          label="促销开始时间"
          rules={[{required: true, message: '请输入促销开始时间!'}]}
        >
            <Input id="create-promotionStartTime" placeholder={'请输入促销开始时间!'}/>
         </FormItem>
        <FormItem
          name="promotionEndTime"
          label="促销结束时间"
          rules={[{required: true, message: '请输入促销结束时间!'}]}
        >
            <Input id="create-promotionEndTime" placeholder={'请输入促销结束时间!'}/>
         </FormItem>
        <FormItem
          name="stock"
          label="库存"
          rules={[{required: true, message: '请输入库存!'}]}
        >
            <Input id="create-stock" placeholder={'请输入库存!'}/>
         </FormItem>
        <FormItem
          name="lowStock"
          label="预警库存"
          rules={[{required: true, message: '请输入预警库存!'}]}
        >
            <Input id="create-lowStock" placeholder={'请输入预警库存!'}/>
         </FormItem>
        <FormItem
          name="specData"
          label="规格数据"
          rules={[{required: true, message: '请输入规格数据!'}]}
        >
            <Input id="create-specData" placeholder={'请输入规格数据!'}/>
         </FormItem>
        <FormItem
          name="weight"
          label="重量(kg)"
          rules={[{required: true, message: '请输入重量(kg)!'}]}
        >
            <Input id="create-weight" placeholder={'请输入重量(kg)!'}/>
         </FormItem>
        <FormItem
          name="publishStatus"
          label="上架状态：0-下架，1-上架"
          rules={[{required: true, message: '请输入上架状态：0-下架，1-上架!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="verifyStatus"
          label="审核状态：0-未审核，1-审核通过，2-审核不通过"
          rules={[{required: true, message: '请输入审核状态：0-未审核，1-审核通过，2-审核不通过!'}]}
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
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="sales"
          label="销量"
          rules={[{required: true, message: '请输入销量!'}]}
        >
            <Input id="create-sales" placeholder={'请输入销量!'}/>
         </FormItem>
        <FormItem
          name="createBy"
          label="创建人ID"
          rules={[{required: true, message: '请输入创建人ID!'}]}
        >
            <Input id="create-createBy" placeholder={'请输入创建人ID!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="create-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="updateBy"
          label="更新人ID"
          rules={[{required: true, message: '请输入更新人ID!'}]}
        >
            <Input id="create-updateBy" placeholder={'请输入更新人ID!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="create-updateTime" placeholder={'请输入更新时间!'}/>
         </FormItem>
        <FormItem
          name="isDeleted"
          label="是否删除"
          rules={[{required: true, message: '请输入是否删除!'}]}
        >
            <Input id="create-isDeleted" placeholder={'请输入是否删除!'}/>
         </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新增"
      open={addVisible}
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

export default AddModal;
