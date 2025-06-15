import React, {useEffect} from 'react';
import { DatePicker, Form, Input, Modal, Radio } from 'antd';
import type { SeckillActivityListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: SeckillActivityListItem) => void;
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

  const handleFinish = (values: SeckillActivityListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="name"
          label="活动名称"
          rules={[{required: true, message: '请输入活动名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入活动名称!'}/>
         </FormItem>
        <FormItem
          name="description"
          label="活动描述"
          rules={[{required: true, message: '请输入活动描述!'}]}
        >
            <Input id="create-description" placeholder={'请输入活动描述!'}/>
         </FormItem>
        <FormItem
          name="startTime"
          label="开始时间"
          rules={[{required: true, message: '请输入开始时间!'}]}
        >
          <DatePicker showTime placeholder={'请输入开始时间'}/>
         </FormItem>
        <FormItem
          name="endTime"
          label="结束时间"
          rules={[{required: true, message: '请输入结束时间!'}]}
        >
          <DatePicker showTime placeholder={'请输入结束时间'}/>
         </FormItem>
        <FormItem
          name="status"
          label="活动状态"
          rules={[{required: true, message: '请输入活动状态!'}]}
        >
              <Radio.Group>
                <Radio value={0}>下线</Radio>
                <Radio value={1}>上线</Radio>
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
