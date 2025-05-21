import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberAddressListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberAddressListItem) => void;
  updateVisible: boolean;
  currentData: Partial<MemberAddressListItem>;
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
      onSubmit(values as MemberAddressListItem);
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
          label="主键ID"
          rules={[{required: true, message: '请输入主键ID!'}]}
        >
            <Input id="update-id" placeholder={'请输入主键ID!'}/>
         </FormItem>
        <FormItem
          name="memberId"
          label="会员ID"
          rules={[{required: true, message: '请输入会员ID!'}]}
        >
            <Input id="update-memberId" placeholder={'请输入会员ID!'}/>
         </FormItem>
        <FormItem
          name="receiverName"
          label="收货人姓名"
          rules={[{required: true, message: '请输入收货人姓名!'}]}
        >
            <Input id="update-receiverName" placeholder={'请输入收货人姓名!'}/>
         </FormItem>
        <FormItem
          name="receiverPhone"
          label="收货人电话"
          rules={[{required: true, message: '请输入收货人电话!'}]}
        >
            <Input id="update-receiverPhone" placeholder={'请输入收货人电话!'}/>
         </FormItem>
        <FormItem
          name="province"
          label="省份"
          rules={[{required: true, message: '请输入省份!'}]}
        >
            <Input id="update-province" placeholder={'请输入省份!'}/>
         </FormItem>
        <FormItem
          name="city"
          label="城市"
          rules={[{required: true, message: '请输入城市!'}]}
        >
            <Input id="update-city" placeholder={'请输入城市!'}/>
         </FormItem>
        <FormItem
          name="district"
          label="区县"
          rules={[{required: true, message: '请输入区县!'}]}
        >
            <Input id="update-district" placeholder={'请输入区县!'}/>
         </FormItem>
        <FormItem
          name="detailAddress"
          label="详细地址"
          rules={[{required: true, message: '请输入详细地址!'}]}
        >
            <Input id="update-detailAddress" placeholder={'请输入详细地址!'}/>
         </FormItem>
        <FormItem
          name="postalCode"
          label="邮政编码"
          rules={[{required: true, message: '请输入邮政编码!'}]}
        >
            <Input id="update-postalCode" placeholder={'请输入邮政编码!'}/>
         </FormItem>
        <FormItem
          name="tag"
          label="地址标签：家、公司等"
          rules={[{required: true, message: '请输入地址标签：家、公司等!'}]}
        >
            <Input id="update-tag" placeholder={'请输入地址标签：家、公司等!'}/>
         </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认地址"
          rules={[{required: true, message: '请输入是否默认地址!'}]}
        >
            <Input id="update-isDefault" placeholder={'请输入是否默认地址!'}/>
         </FormItem>
        <FormItem
          name="createTime"
          label="创建时间"
          rules={[{required: true, message: '请输入创建时间!'}]}
        >
            <Input id="update-createTime" placeholder={'请输入创建时间!'}/>
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
