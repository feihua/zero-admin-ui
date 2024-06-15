import React, {useEffect} from 'react';
import {Form, InputNumber, Modal, Radio} from 'antd';
import type {MemberRuleSettingListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberRuleSettingListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 9},
  wrapperCol: {span: 11},
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

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

  const handleFinish = (values: MemberRuleSettingListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="ruleType"
          label="规则类型"
          initialValue={1}
          rules={[{required: true, message: '请输入类型!'}]}
        >
          <Radio.Group>
            <Radio value={0}>积分规则</Radio>
            <Radio value={1}>成长值规则</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="status"
          label="规则状态"
          initialValue={1}
          rules={[{required: true, message: '请输入状态!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="consumePerPoint"
          initialValue={10}
          label="每消费多少元获取1个点"
          rules={[{required: true, message: '请输入每消费多少元获取1个点!'}]}
        >
          <InputNumber id="create-consumePerPoint" placeholder={'请输入每消费多少元获取1个点!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="continueSignDay"
          label="连续签到天数"
          initialValue={1}
          rules={[{required: true, message: '请输入连续签到天数!'}]}
        >
          <InputNumber id="create-continueSignDay" placeholder={'请输入连续签到天数!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="continueSignPoint"
          label="连续签到赠送数量"
          initialValue={10}
          rules={[{required: true, message: '请输入连续签到赠送数量!'}]}
        >
          <InputNumber id="create-continueSignPoint" placeholder={'请输入连续签到赠送数量!'} style={{width: 255}}/>
        </FormItem>

        <FormItem
          name="lowOrderAmount"
          label="最低获取点数的订单金额"
          initialValue={1}
          rules={[{required: true, message: '请输入最低获取点数的订单金额!'}]}
        >
          <InputNumber id="create-lowOrderAmount" placeholder={'请输入最低获取点数的订单金额!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="maxPointPerOrder"
          label="每笔订单最高获取点数"
          initialValue={10}
          rules={[{required: true, message: '请输入每笔订单最高获取点数!'}]}
        >
          <InputNumber id="create-maxPointPerOrder" placeholder={'请输入每笔订单最高获取点数!'} style={{width: 255}}/>
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
      open={createModalVisible}
      {...modalFooter}
      width={600}
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

export default CreateForm;
