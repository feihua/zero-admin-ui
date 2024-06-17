import React, {useEffect} from 'react';
import {Form, Input, Modal, TimePicker} from 'antd';
import {SessionListItem} from './data.d';
import moment from "moment";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: SessionListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<SessionListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateSessionForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, updateModalVisible, currentData} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
        startTime: moment(currentData.startTime, 'HH:mm:ss'),
        endTime: moment(currentData.endTime, 'HH:mm:ss'),
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as SessionListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
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
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateSessionForm;
