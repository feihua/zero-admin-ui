import React, {useEffect} from 'react';
import {Form, Input, InputNumber, Modal, Radio} from 'antd';
import type {MemberTaskListItem} from '../data.d';

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberTaskListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MemberTaskListItem>;
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
      onSubmit(values as MemberTaskListItem);
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
          rules={[{required: true, message: '请输入赠送成长值!'}]}
        >
          <InputNumber id="create-taskGrowth" placeholder={'请输入赠送成长值!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="taskIntegral"
          label="赠送积分"
          rules={[{required: true, message: '请输入赠送积分!'}]}
        >
          <InputNumber id="create-taskIntegral" placeholder={'请输入赠送积分!'} style={{width: 255}}/>
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
