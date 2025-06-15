import React, {useEffect} from 'react';
import { Form, Input, InputNumber, Modal, Radio, TimePicker } from 'antd';
import type { SeckillSessionListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: SeckillSessionListItem) => void;
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

  const handleFinish = (values: SeckillSessionListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          name="name"
          label="场次名称"
          rules={[{required: true, message: '请输入场次名称!'}]}
        >
            <Input id="create-name" placeholder={'请输入场次名称!'}/>
         </FormItem>
        <FormItem
          name="startTime"
          label="开始时间"
          rules={[{required: true, message: '请输入开始时间!'}]}
        >
          <TimePicker/>
         </FormItem>
        <FormItem
          name="endTime"
          label="结束时间"
          rules={[{required: true, message: '请输入结束时间!'}]}
        >
          <TimePicker/>
         </FormItem>
        <FormItem
          name="status"
          label="状态"
          initialValue={0}
          rules={[{required: true, message: '请输入状态!'}]}
        >
              <Radio.Group>
                <Radio value={0}>下线</Radio>
                <Radio value={1}>上线</Radio>
              </Radio.Group>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
            <InputNumber style={ {width: 255} }/>
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
