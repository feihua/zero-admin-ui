import React, {useEffect} from 'react';
import {Form, InputNumber, Modal, Radio} from 'antd';
import type {MemberRuleSettingListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberRuleSettingListItem) => void;
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

  const handleFinish = (values: MemberRuleSettingListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="consumePerPoint"
          label="每消费多少元获取1个点"
          rules={[{required: true, message: '请输入每消费多少元获取1个点!'}]}
        >
          <InputNumber id="create-consumePerPoint" placeholder={'请输入每消费多少元获取1个点!'} style={{width: 255}}/>
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
        <FormItem
          name="ruleType"
          label="类型"
          rules={[{required: true, message: '请输入类型!'}]}
        >
          <Radio.Group>
            <Radio value={0}>积分规则</Radio>
            <Radio value={1}>成长值规则</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          rules={[{required: true, message: '请输入状态!'}]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
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
