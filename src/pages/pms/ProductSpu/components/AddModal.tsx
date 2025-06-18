import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductSpuListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductSpuListItem) => void;
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

  const handleFinish = (values: ProductSpuListItem) => {
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
          name="name"
          label="商品名称"
          rules={[{required: true, message: '请输入商品名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入商品名称!'}/>
         </FormItem>
        <FormItem
          name="categoryId"
          label="商品分类ID"
          rules={[{required: true, message: '请输入商品分类ID!'}]}
        >
            <Input id="create-categoryId" placeholder={'请输入商品分类ID!'}/>
         </FormItem>
        <FormItem
          name="categoryIds"
          label="商品分类ID集合"
          rules={[{required: true, message: '请输入商品分类ID集合!'}]}
        >
            <Input id="create-categoryIds" placeholder={'请输入商品分类ID集合!'}/>
         </FormItem>
        <FormItem
          name="categoryName"
          label="商品分类名称"
          rules={[{required: true, message: '请输入商品分类名称!'}]}
        >
            <Input id="create-categoryName" placeholder={'请输入商品分类名称!'}/>
         </FormItem>
        <FormItem
          name="brandId"
          label="品牌ID"
          rules={[{required: true, message: '请输入品牌ID!'}]}
        >
            <Input id="create-brandId" placeholder={'请输入品牌ID!'}/>
         </FormItem>
        <FormItem
          name="brandName"
          label="品牌名称"
          rules={[{required: true, message: '请输入品牌名称!'}]}
        >
            <Input id="create-brandName" placeholder={'请输入品牌名称!'}/>
         </FormItem>
        <FormItem
          name="unit"
          label="单位"
          rules={[{required: true, message: '请输入单位!'}]}
        >
            <Input id="create-unit" placeholder={'请输入单位!'}/>
         </FormItem>
        <FormItem
          name="weight"
          label="重量(kg)"
          rules={[{required: true, message: '请输入重量(kg)!'}]}
        >
            <Input id="create-weight" placeholder={'请输入重量(kg)!'}/>
         </FormItem>
        <FormItem
          name="keywords"
          label="关键词"
          rules={[{required: true, message: '请输入关键词!'}]}
        >
            <Input id="create-keywords" placeholder={'请输入关键词!'}/>
         </FormItem>
        <FormItem
          name="brief"
          label="简介"
          rules={[{required: true, message: '请输入简介!'}]}
        >
            <Input id="create-brief" placeholder={'请输入简介!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="详细描述"
          rules={[{required: true, message: '请输入详细描述!'}]}
        >
            <Input id="create-description" placeholder={'请输入详细描述!'}/>
         </FormItem>
        <FormItem
          name="albumPics"
          label="画册图片，最多8张，以逗号分割"
          rules={[{required: true, message: '请输入画册图片，最多8张，以逗号分割!'}]}
        >
            <Input id="create-albumPics" placeholder={'请输入画册图片，最多8张，以逗号分割!'}/>
         </FormItem>
        <FormItem
          name="mainPic"
          label="主图"
          rules={[{required: true, message: '请输入主图!'}]}
        >
            <Input id="create-mainPic" placeholder={'请输入主图!'}/>
         </FormItem>
        <FormItem
          name="priceRange"
          label="价格区间"
          rules={[{required: true, message: '请输入价格区间!'}]}
        >
            <Input id="create-priceRange" placeholder={'请输入价格区间!'}/>
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
          name="newStatus"
          label="新品状态:0->不是新品；1->新品"
          rules={[{required: true, message: '请输入新品状态:0->不是新品；1->新品!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="recommendStatus"
          label="推荐状态；0->不推荐；1->推荐"
          rules={[{required: true, message: '请输入推荐状态；0->不推荐；1->推荐!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="verifyStatus"
          label="审核状态：0->未审核；1->审核通过"
          rules={[{required: true, message: '请输入审核状态：0->未审核；1->审核通过!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="previewStatus"
          label="是否为预告商品：0->不是；1->是"
          rules={[{required: true, message: '请输入是否为预告商品：0->不是；1->是!'}]}
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
          name="newStatusSort"
          label="新品排序"
          rules={[{required: true, message: '请输入新品排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="recommendStatusSort"
          label="推荐排序"
          rules={[{required: true, message: '请输入推荐排序!'}]}
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
          name="promotionType"
          label="促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->秒杀"
          rules={[{required: true, message: '请输入促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->秒杀!'}]}
        >
                <Radio.Group>
                  <Radio value={0}>禁用</Radio>
                  <Radio value={1}>正常</Radio>
                </Radio.Group>
         </FormItem>
        <FormItem
          name="detailTitle"
          label="详情标题"
          rules={[{required: true, message: '请输入详情标题!'}]}
        >
            <Input id="create-detailTitle" placeholder={'请输入详情标题!'}/>
         </FormItem>
        <FormItem
          name="detailDesc"
          label="详情描述"
          rules={[{required: true, message: '请输入详情描述!'}]}
        >
            <Input id="create-detailDesc" placeholder={'请输入详情描述!'}/>
         </FormItem>
        <FormItem
          name="detailHtml"
          label="产品详情网页内容"
          rules={[{required: true, message: '请输入产品详情网页内容!'}]}
        >
            <Input id="create-detailHtml" placeholder={'请输入产品详情网页内容!'}/>
         </FormItem>
        <FormItem
          name="detailMobileHtml"
          label="移动端网页详情"
          rules={[{required: true, message: '请输入移动端网页详情!'}]}
        >
            <Input id="create-detailMobileHtml" placeholder={'请输入移动端网页详情!'}/>
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
