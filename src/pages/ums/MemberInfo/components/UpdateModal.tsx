import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberInfoListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberInfoListItem) => void;
  updateVisible: boolean;
  currentData: Partial<MemberInfoListItem>;
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
      onSubmit(values as MemberInfoListItem);
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
          name="levelId"
          label="等级ID"
          rules={[{required: true, message: '请输入等级ID!'}]}
        >
            <Input id="update-levelId" placeholder={'请输入等级ID!'}/>
         </FormItem>
        <FormItem
          name="nickname"
          label="昵称"
          rules={[{required: true, message: '请输入昵称!'}]}
        >
            <Input id="update-nickname" placeholder={'请输入昵称!'}/>
         </FormItem>
        <FormItem
          name="mobile"
          label="手机号码"
          rules={[{required: true, message: '请输入手机号码!'}]}
        >
            <Input id="update-mobile" placeholder={'请输入手机号码!'}/>
         </FormItem>
        <FormItem
          name="source"
          label="注册来源：0-PC，1-APP，2-小程序"
          rules={[{required: true, message: '请输入注册来源：0-PC，1-APP，2-小程序!'}]}
        >
            <Input id="update-source" placeholder={'请输入注册来源：0-PC，1-APP，2-小程序!'}/>
         </FormItem>
        <FormItem
          name="password"
          label="密码"
          rules={[{required: true, message: '请输入密码!'}]}
        >
            <Input id="update-password" placeholder={'请输入密码!'}/>
         </FormItem>
        <FormItem
          name="avatar"
          label="头像"
          rules={[{required: true, message: '请输入头像!'}]}
        >
            <Input id="update-avatar" placeholder={'请输入头像!'}/>
         </FormItem>
        <FormItem
          name="signature"
          label="个性签名"
          rules={[{required: true, message: '请输入个性签名!'}]}
        >
            <Input id="update-signature" placeholder={'请输入个性签名!'}/>
         </FormItem>
        <FormItem
          name="gender"
          label="性别：0-未知，1-男，2-女"
          rules={[{required: true, message: '请输入性别：0-未知，1-男，2-女!'}]}
        >
            <Input id="update-gender" placeholder={'请输入性别：0-未知，1-男，2-女!'}/>
         </FormItem>
        <FormItem
          name="birthday"
          label="生日"
          rules={[{required: true, message: '请输入生日!'}]}
        >
            <Input id="update-birthday" placeholder={'请输入生日!'}/>
         </FormItem>
        <FormItem
          name="growthPoint"
          label="成长值"
          rules={[{required: true, message: '请输入成长值!'}]}
        >
            <Input id="update-growthPoint" placeholder={'请输入成长值!'}/>
         </FormItem>
        <FormItem
          name="points"
          label="积分"
          rules={[{required: true, message: '请输入积分!'}]}
        >
            <Input id="update-points" placeholder={'请输入积分!'}/>
         </FormItem>
        <FormItem
          name="totalPoints"
          label="累计获得积分"
          rules={[{required: true, message: '请输入累计获得积分!'}]}
        >
            <Input id="update-totalPoints" placeholder={'请输入累计获得积分!'}/>
         </FormItem>
        <FormItem
          name="spendAmount"
          label="累计消费金额"
          rules={[{required: true, message: '请输入累计消费金额!'}]}
        >
            <Input id="update-spendAmount" placeholder={'请输入累计消费金额!'}/>
         </FormItem>
        <FormItem
          name="orderCount"
          label="订单数"
          rules={[{required: true, message: '请输入订单数!'}]}
        >
            <Input id="update-orderCount" placeholder={'请输入订单数!'}/>
         </FormItem>
        <FormItem
          name="couponCount"
          label="优惠券数量"
          rules={[{required: true, message: '请输入优惠券数量!'}]}
        >
            <Input id="update-couponCount" placeholder={'请输入优惠券数量!'}/>
         </FormItem>
        <FormItem
          name="commentCount"
          label="评价数"
          rules={[{required: true, message: '请输入评价数!'}]}
        >
            <Input id="update-commentCount" placeholder={'请输入评价数!'}/>
         </FormItem>
        <FormItem
          name="returnCount"
          label="退货数"
          rules={[{required: true, message: '请输入退货数!'}]}
        >
            <Input id="update-returnCount" placeholder={'请输入退货数!'}/>
         </FormItem>
        <FormItem
          name="lotteryTimes"
          label="剩余抽奖次数"
          rules={[{required: true, message: '请输入剩余抽奖次数!'}]}
        >
            <Input id="update-lotteryTimes" placeholder={'请输入剩余抽奖次数!'}/>
         </FormItem>
        <FormItem
          name="lastLogin"
          label="最后登录"
          rules={[{required: true, message: '请输入最后登录!'}]}
        >
            <Input id="update-lastLogin" placeholder={'请输入最后登录!'}/>
         </FormItem>
        <FormItem
          name="isEnabled"
          label="是否启用：0-禁用，1-启用"
          rules={[{required: true, message: '请输入是否启用：0-禁用，1-启用!'}]}
        >
            <Input id="update-isEnabled" placeholder={'请输入是否启用：0-禁用，1-启用!'}/>
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
