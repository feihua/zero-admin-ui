import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { MemberRuleSettingListItem} from '../data.d';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberRuleSettingListItem) => void;
  updateVisible: boolean;
  currentData: Partial<MemberRuleSettingListItem>;
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
          name="consumePerPoint"
          label="每消费多少元获取1个点"
          rules={[{required: true, message: '请输入每消费多少元获取1个点!'}]}
        >
          <InputNumber id="update-consumePerPoint" placeholder={'请输入每消费多少元获取1个点!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="lowOrderAmount"
          label="最低获取点数的订单金额"
          rules={[{required: true, message: '请输入最低获取点数的订单金额!'}]}
        >
          <InputNumber id="update-lowOrderAmount" placeholder={'请输入最低获取点数的订单金额!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="maxPointPerOrder"
          label="每笔订单最高获取点数"
          rules={[{required: true, message: '请输入每笔订单最高获取点数!'}]}
        >
          <InputNumber id="update-maxPointPerOrder" placeholder={'请输入每笔订单最高获取点数!'} style={{width: 255}}/>
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
