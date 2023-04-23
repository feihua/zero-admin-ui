import React, {useEffect} from 'react';
import {Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select} from 'antd';
import type {CouponListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: CouponListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateCouponForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;
  const {TextArea} = Input;

  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();

    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: CouponListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <Row>
          <Col span={12}>
            <FormItem
              name="name"
              label="优惠券名"
              rules={[{required: true, message: '请输入优惠券名!'}]}
            >
              <Input id="update-name" placeholder={'请输入优惠券名'}/>
            </FormItem>
            <FormItem
              name="type"
              label="优惠券类型"
              initialValue={0}
              rules={[{required: true, message: '请选择优惠券类型!'}]}
            >
              <Select id="type" placeholder={'请选择优惠券类型'}>
                <Option value={0}>全场赠券</Option>
                <Option value={1}>会员赠券</Option>
                <Option value={2}>购物赠券</Option>
                <Option value={3}>注册赠券</Option>
              </Select>
            </FormItem>
            <FormItem
              name="publishCount"
              label="发行数量"
              initialValue={10}
              rules={[{required: true, message: '请输入发行数量!'}]}
            >
              <InputNumber addonAfter={"张"}/>
            </FormItem>
            <FormItem
              name="count"
              label="数量"
              initialValue={10}
              rules={[{required: true, message: '请输入活动标题!'}]}
            >
              <InputNumber addonAfter={"张"}/>
            </FormItem>
            <FormItem
              name="perLimit"
              label="每人限领张数"
              initialValue={100}
              rules={[{required: true, message: '请输入每人限领张数!'}]}
            >
              <InputNumber addonAfter="张"/>
            </FormItem>

            <FormItem
              name="startTime"
              label="开始时间"
              rules={[{required: true, message: '请输入开始时间!'}]}
            >
              <DatePicker showTime placeholder={'请输入开始时间'}/>
            </FormItem>
            <FormItem
              name="endTime"
              label="结束时间"
              rules={[{required: true, message: '请输入结束时间!'}]}
            >
              <DatePicker showTime placeholder={'请输入结束时间'}/>
            </FormItem>

          </Col>
          <Col span={12}>

            <FormItem
              name="useType"
              label="使用类型"
              initialValue={0}
              rules={[{required: true, message: '请选择使用类型!'}]}
            >
              <Select id="useType" placeholder={'请选择使用类型'}>
                <Option value={0}>全场通用</Option>
                <Option value={1}>指定分类</Option>
                <Option value={2}>指定商品</Option>
              </Select>
            </FormItem>
            <FormItem
              name="platform"
              label="使用平台"
              initialValue={0}
              rules={[{required: true, message: '请选择使用平台!'}]}
            >
              <Select id="platform" placeholder={'请选择使用平台'}>
                <Option value={0}>全部</Option>
                <Option value={1}>移动</Option>
                <Option value={2}>PC</Option>
              </Select>
            </FormItem>

            <FormItem
              name="amount"
              label="金额"
              initialValue={100}
              rules={[{required: true, message: '请输入金额!'}]}
            >
              <InputNumber prefix="￥" addonAfter="元" stringMode step="0.01"/>
            </FormItem>
            <FormItem
              name="minPoint"
              label="使用门槛"
              initialValue={10}
              rules={[{required: true, message: '请输入使用门槛!'}]}
            >
              <InputNumber addonBefore={"满"} prefix="￥" addonAfter="元可用" stringMode step="0.01"/>
            </FormItem>
            <FormItem
              name="memberLevel"
              label="会员类型"
              initialValue={0}
              rules={[{required: true, message: '请输入可领取的会员类型!'}]}
            >
              <Select id="memberLevel" placeholder={'请输入可领取的会员类型'}>
                <Option value={0}>银牌会员</Option>
                <Option value={1}>金牌会员</Option>
                <Option value={2}>白金会员</Option>
              </Select>
            </FormItem>
            <FormItem
              name="enableTime"
              label="领取的日期"
              rules={[{required: true, message: '请输入可以领取的日期!'}]}
            >
              <DatePicker showTime placeholder={'请输入可以领取的日期'}/>
            </FormItem>
            <FormItem
              name="code"
              label="优惠码"
              rules={[{required: true, message: '请输入优惠码!'}]}
            >
              <Input id="update-code" placeholder={'请输入优惠码'}/>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="note"
              label="备注"
            >
              <TextArea rows={2}/>
            </FormItem>
          </Col>
        </Row>

      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建优惠券信息"
      open={createModalVisible}
      {...modalFooter}
      width={720}
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

export default CreateCouponForm;
