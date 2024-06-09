import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio, TimePicker,} from 'antd';
import {SessionListItem} from "@/pages/sms/flash_promotion/components/Session/data";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: SessionListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateSessionForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: SessionListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="秒杀时间段名称"
          rules={[{required: true, message: '请输入秒杀时间段名称!'}]}
        >
          <Input id="update-title" placeholder={'请输入秒杀时间段名称'}/>
        </FormItem>
        <FormItem
          name="startTime"
          rules={[{required: true}]}
          label="每日开始时间">
          <TimePicker/>
        </FormItem>
        <FormItem
          name="endTime"
          rules={[{required: true}]}
          label="每日结束时间">
          <TimePicker/>
        </FormItem>
        <FormItem
          name="status"
          rules={[{required: true}]}
          label="是否启用"
          initialValue={1}
        >
          <Radio.Group id="status">
            <Radio value={0}>停用</Radio>
            <Radio value={1}>启用</Radio>
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
      title="添加"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateSessionForm;
