import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {MemberTaskListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberTaskListItem) => void;
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

  const handleFinish = (values: MemberTaskListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="taskName"
          label="任务名称"
          rules={[{required: true, message: '请输入任务名称!'}]}
        >
          <Input id="create-taskName" placeholder={'请输入任务名称!'}/>
        </FormItem>
        <FormItem
          name="status"
          label="任务状态"
          initialValue={1}
          rules={[{required: true, message: '请输入状态!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="taskType"
          label="任务类型"
          initialValue={1}
          rules={[{required: true, message: '请输入任务类型!'}]}
        >
          <Radio.Group>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="taskGrowth"
          label="赠送成长值"
          initialValue={100}
          rules={[{required: true, message: '请输入赠送成长值!'}]}
        >
          <InputNumber  id="create-taskGrowth" placeholder={'请输入赠送成长值!'} style={{width:255}}/>
        </FormItem>
        <FormItem
          name="taskIntegral"
          label="赠送积分"
          initialValue={100}
          rules={[{required: true, message: '请输入赠送积分!'}]}
        >
          <InputNumber  id="create-taskIntegral" placeholder={'请输入赠送积分!'}  style={{width:255}}/>
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
