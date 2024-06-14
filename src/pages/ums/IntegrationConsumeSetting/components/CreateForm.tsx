import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { IntegrationConsumeSettingListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: IntegrationConsumeSettingListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
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

  const handleFinish = (values: IntegrationConsumeSettingListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        
        <FormItem
          name="couponStatus"
          label="是否可以和优惠券同用；0->不可以；1->可以"
          rules={[{required: true, message: '请输入是否可以和优惠券同用；0->不可以；1->可以!'}]}
        >
              <Radio.Group>
                <Radio value={0}>禁用</Radio>
                <Radio value={1}>正常</Radio>
              </Radio.Group>
         </FormItem>
        <FormItem
          name="deductionPerAmount"
          label="每一元需要抵扣的积分数量"
          rules={[{required: true, message: '请输入每一元需要抵扣的积分数量!'}]}
        >
            <Input id="create-deductionPerAmount" placeholder={'请输入每一元需要抵扣的积分数量!'}/>
         </FormItem>
        <FormItem
          name="id"
          label=""
          rules={[{required: true, message: '请输入!'}]}
        >
            <Input id="create-id" placeholder={'请输入!'}/>
         </FormItem>
        <FormItem
          name="isDefault"
          label="是否默认：0->否；1->是"
          rules={[{required: true, message: '请输入是否默认：0->否；1->是!'}]}
        >
            <Input id="create-isDefault" placeholder={'请输入是否默认：0->否；1->是!'}/>
         </FormItem>
        <FormItem
          name="maxPercentPerOrder"
          label="每笔订单最高抵用百分比"
          rules={[{required: true, message: '请输入每笔订单最高抵用百分比!'}]}
        >
            <Input id="create-maxPercentPerOrder" placeholder={'请输入每笔订单最高抵用百分比!'}/>
         </FormItem>
        <FormItem
          name="useUnit"
          label="每次使用积分最小单位100"
          rules={[{required: true, message: '请输入每次使用积分最小单位100!'}]}
        >
            <Input id="create-useUnit" placeholder={'请输入每次使用积分最小单位100!'}/>
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
