import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {MemberRuleSettingListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberRuleSettingListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberRuleSettingListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 9},
  wrapperCol: {span: 11},
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

  const handleFinish = (values: Record<string, any>) => {
    if (onSubmit) {
      onSubmit(values as MemberRuleSettingListItem);
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
          name="ruleType"
          label="规则类型"
          rules={[{required: true, message: '请输入类型!'}]}
        >
          <Radio.Group>
            <Radio value={0}>积分规则</Radio>
            <Radio value={1}>成长值规则</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="consumePerPoint"
          label="每消费多少元获取1个点"
          rules={[{required: true, message: '请输入每消费多少元获取1个点!'}]}
        >
          <InputNumber id="create-consumePerPoint" placeholder={'请输入每消费多少元获取1个点!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="continueSignDay"
          label="连续签到天数"
          rules={[{required: true, message: '请输入连续签到天数!'}]}
        >
          <InputNumber id="create-continueSignDay" placeholder={'请输入连续签到天数!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="continueSignPoint"
          label="连续签到赠送数量"
          rules={[{required: true, message: '请输入连续签到赠送数量!'}]}
        >
          <InputNumber id="create-continueSignPoint" placeholder={'请输入连续签到赠送数量!'} style={{width: 255}}/>
        </FormItem>

        <FormItem
          name="lowOrderAmount"
          label="最低获取点数的订单金额"
          rules={[{required: true, message: '请输入最低获取点数的订单金额!'}]}
        >
          <InputNumber id="create-lowOrderAmount" placeholder={'请输入最低获取点数的订单金额!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="maxPointPerOrder"
          label="每笔订单最高获取点数"
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
