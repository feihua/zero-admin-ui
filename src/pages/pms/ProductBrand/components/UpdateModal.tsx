import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { ProductBrandListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: ProductBrandListItem) => void;
  updateVisible: boolean;
  currentData: Partial<ProductBrandListItem>;
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
      onSubmit(values as ProductBrandListItem);
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
          name="name"
          label="品牌名称"
          rules={[{required: true, message: '请输入品牌名称!'}]}
        >
            <Input id="update-name" placeholder={'请输入品牌名称!'}/>
         </FormItem>
        <FormItem
          name="logo"
          label="品牌logo"
          rules={[{required: true, message: '请输入品牌logo!'}]}
        >
            <Input id="update-logo" placeholder={'请输入品牌logo!'}/>
         </FormItem>
        <FormItem
          name="bigPic"
          label="专区大图"
          rules={[{required: true, message: '请输入专区大图!'}]}
        >
            <Input id="update-bigPic" placeholder={'请输入专区大图!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="描述"
          rules={[{required: true, message: '请输入描述!'}]}
        >
            <Input id="update-description" placeholder={'请输入描述!'}/>
         </FormItem>
        <FormItem
          name="firstLetter"
          label="首字母"
          rules={[{required: true, message: '请输入首字母!'}]}
        >
            <Input id="update-firstLetter" placeholder={'请输入首字母!'}/>
         </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
        </FormItem>
        <FormItem
          name="recommendStatus"
          label="推荐状态"
          rules={[{required: true, message: '请输入推荐状态!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
       </FormItem>
        <FormItem
          name="productCount"
          label="产品数量"
          rules={[{required: true, message: '请输入产品数量!'}]}
        >
            <Input id="update-productCount" placeholder={'请输入产品数量!'}/>
         </FormItem>
        <FormItem
          name="productCommentCount"
          label="产品评论数量"
          rules={[{required: true, message: '请输入产品评论数量!'}]}
        >
            <Input id="update-productCommentCount" placeholder={'请输入产品评论数量!'}/>
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
