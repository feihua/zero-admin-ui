import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductCategoryListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductCategoryListItem) => void;
  updateVisible: boolean;
  currentData: Partial<ProductCategoryListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateVisible) {
      form.resetFields();
    }
  }, [props.updateVisible]);

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
      onSubmit(values as ProductCategoryListItem);
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
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="update-id" placeholder={'请输入!'}/>
         </FormItem>
        <FormItem
          name="parentId"
          label="上级分类的编号：0表示一级分类"
          rules={[{required: true, message: '请输入上级分类的编号：0表示一级分类!'}]}
        >
            <Input id="update-parentId" placeholder={'请输入上级分类的编号：0表示一级分类!'}/>
         </FormItem>
        <FormItem
          name="name"
          label="商品分类名称"
          rules={[{required: true, message: '请输入商品分类名称!'}]}
        >
            <Input id="update-name" placeholder={'请输入商品分类名称!'}/>
         </FormItem>
        <FormItem
          name="level"
          label="分类级别：0->1级；1->2级"
          rules={[{required: true, message: '请输入分类级别：0->1级；1->2级!'}]}
        >
            <Input id="update-level" placeholder={'请输入分类级别：0->1级；1->2级!'}/>
         </FormItem>
        <FormItem
          name="productCount"
          label="商品数量"
          rules={[{required: true, message: '请输入商品数量!'}]}
        >
            <Input id="update-productCount" placeholder={'请输入商品数量!'}/>
         </FormItem>
        <FormItem
          name="productUnit"
          label="商品单位"
          rules={[{required: true, message: '请输入商品单位!'}]}
        >
            <Input id="update-productUnit" placeholder={'请输入商品单位!'}/>
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
            <Input id="update-icon" placeholder={'请输入图标!'}/>
         </FormItem>
        <FormItem
          name="keywords"
          label="关键字"
          rules={[{required: true, message: '请输入关键字!'}]}
        >
            <Input id="update-keywords" placeholder={'请输入关键字!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="描述"
          rules={[{required: true, message: '请输入描述!'}]}
        >
            <Input id="update-description" placeholder={'请输入描述!'}/>
         </FormItem>
        <FormItem
          name="isEnabled"
          label="是否启用"
          rules={[{required: true, message: '请输入是否启用!'}]}
        >
            <Input id="update-isEnabled" placeholder={'请输入是否启用!'}/>
         </FormItem>
        <FormItem
          name="createBy"
          label="创建人ID"
          rules={[{required: true, message: '请输入创建人ID!'}]}
        >
            <Input id="update-createBy" placeholder={'请输入创建人ID!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="update-createTime" placeholder={'请输入创建时间!'}/>
         </FormItem>
        <FormItem
          name="updateBy"
          label="更新人ID"
          rules={[{required: true, message: '请输入更新人ID!'}]}
        >
            <Input id="update-updateBy" placeholder={'请输入更新人ID!'}/>
         </FormItem>
        <FormItem
          name="updateTime"
          label="更新时间"
          rules={[{required: true, message: '请输入更新时间!'}]}
        >
            <Input id="update-updateTime" placeholder={'请输入更新时间!'}/>
         </FormItem>
        <FormItem
          name="isDeleted"
          label="是否删除"
          rules={[{required: true, message: '请输入是否删除!'}]}
        >
            <Input id="update-isDeleted" placeholder={'请输入是否删除!'}/>
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
      open={updateVisible}
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
