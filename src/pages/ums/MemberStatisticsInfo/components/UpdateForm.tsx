import React, {useEffect} from 'react';
import {Form, Input, Modal} from 'antd';
import type {MemberStatisticsInfoListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberStatisticsInfoListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberStatisticsInfoListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

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
      onSubmit(values as MemberStatisticsInfoListItem);
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
          name="attendCount"
          label="关注数量"
          rules={[{required: true, message: '请输入关注数量!'}]}
        >
          <Input id="create-attendCount" placeholder={'请输入关注数量!'}/>
        </FormItem>
        <FormItem
          name="collectCommentCount"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-collectCommentCount" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="collectProductCount"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-collectProductCount" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="collectSubjectCount"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-collectSubjectCount" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="collectTopicCount"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-collectTopicCount" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="commentCount"
          label="评价数"
          rules={[{required: true, message: '请输入评价数!'}]}
        >
          <Input id="create-commentCount" placeholder={'请输入评价数!'}/>
        </FormItem>
        <FormItem
          name="consumeAmount"
          label="累计消费金额"
          rules={[{required: true, message: '请输入累计消费金额!'}]}
        >
          <Input id="create-consumeAmount" placeholder={'请输入累计消费金额!'}/>
        </FormItem>
        <FormItem
          name="couponCount"
          label="优惠券数量"
          rules={[{required: true, message: '请输入优惠券数量!'}]}
        >
          <Input id="create-couponCount" placeholder={'请输入优惠券数量!'}/>
        </FormItem>
        <FormItem
          name="fansCount"
          label="粉丝数量"
          rules={[{required: true, message: '请输入粉丝数量!'}]}
        >
          <Input id="create-fansCount" placeholder={'请输入粉丝数量!'}/>
        </FormItem>
        <FormItem
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-id" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="inviteFriendCount"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-inviteFriendCount" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="loginCount"
          label="登录次数"
          rules={[{required: true, message: '请输入登录次数!'}]}
        >
          <Input id="create-loginCount" placeholder={'请输入登录次数!'}/>
        </FormItem>
        <FormItem
          name="memberId"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
          <Input id="create-memberId" placeholder={'请输入!'}/>
        </FormItem>
        <FormItem
          name="orderCount"
          label="订单数量"
          rules={[{required: true, message: '请输入订单数量!'}]}
        >
          <Input id="create-orderCount" placeholder={'请输入订单数量!'}/>
        </FormItem>
        <FormItem
          name="recentOrderTime"
          label="最后一次下订单时间"
          rules={[{required: true, message: '请输入最后一次下订单时间!'}]}
        >
          <Input id="create-recentOrderTime" placeholder={'请输入最后一次下订单时间!'}/>
        </FormItem>
        <FormItem
          name="returnOrderCount"
          label="退货数量"
          rules={[{required: true, message: '请输入退货数量!'}]}
        >
          <Input id="create-returnOrderCount" placeholder={'请输入退货数量!'}/>
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
      open={updateModalVisible}
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

export default UpdateForm;
