import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type { IntegrationConsumeSettingListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: IntegrationConsumeSettingListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<IntegrationConsumeSettingListItem>;
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
      onSubmit(values as IntegrationConsumeSettingListItem);
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
