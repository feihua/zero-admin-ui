import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductCategoryListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductCategoryListItem) => void;
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

  const handleFinish = (values: ProductCategoryListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        
        <FormItem
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="create-id" placeholder={'请输入!'}/>
         </FormItem>
        <FormItem
          name="parentId"
          label="上级分类的编号：0表示一级分类"
          rules={[{required: true, message: '请输入上级分类的编号：0表示一级分类!'}]}
        >
            <Input id="create-parentId" placeholder={'请输入上级分类的编号：0表示一级分类!'}/>
         </FormItem>
        <FormItem
          name="name"
          label="商品分类名称"
          rules={[{required: true, message: '请输入商品分类名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入商品分类名称!'}/>
         </FormItem>
        <FormItem
          name="level"
          label="分类级别：0->1级；1->2级"
          rules={[{required: true, message: '请输入分类级别：0->1级；1->2级!'}]}
        >
            <Input id="create-level" placeholder={'请输入分类级别：0->1级；1->2级!'}/>
         </FormItem>
        <FormItem
          name="productCount"
          label="商品数量"
          rules={[{required: true, message: '请输入商品数量!'}]}
        >
            <Input id="create-productCount" placeholder={'请输入商品数量!'}/>
         </FormItem>
        <FormItem
          name="productUnit"
          label="商品单位"
          rules={[{required: true, message: '请输入商品单位!'}]}
        >
            <Input id="create-productUnit" placeholder={'请输入商品单位!'}/>
         </FormItem>
        <FormItem
          name="navStatus"
          label="是否显示在导航栏：0->不显示；1->显示"
          rules={[{required: true, message: '请输入是否显示在导航栏：0->不显示；1->显示!'}]}
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
          name="icon"
          label="图标"
          rules={[{required: true, message: '请输入图标!'}]}
        >
            <Input id="create-icon" placeholder={'请输入图标!'}/>
         </FormItem>
        <FormItem
          name="keywords"
          label="关键字"
          rules={[{required: true, message: '请输入关键字!'}]}
        >
            <Input id="create-keywords" placeholder={'请输入关键字!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="描述"
          rules={[{required: true, message: '请输入描述!'}]}
        >
            <Input id="create-description" placeholder={'请输入描述!'}/>
         </FormItem>
        <FormItem
          name="isEnabled"
          label="是否启用"
          rules={[{required: true, message: '请输入是否启用!'}]}
        >
            <Input id="create-isEnabled" placeholder={'请输入是否启用!'}/>
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
