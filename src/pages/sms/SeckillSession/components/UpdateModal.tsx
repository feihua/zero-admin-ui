import React, {useEffect} from 'react';
import { Form, Input, InputNumber, Modal, Radio, TimePicker } from 'antd';
import type { SeckillSessionListItem} from '../data.d';
import moment from 'moment/moment';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: SeckillSessionListItem) => void;
  updateVisible: boolean;
  currentData: Partial<SeckillSessionListItem>;
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
      onSubmit(values as SeckillSessionListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          hidden
          label="秒杀场次ID"
          rules={[{required: true, message: '请输入秒杀场次ID!'}]}
        >
            <Input id="update-id" placeholder={'请输入秒杀场次ID!'}/>
         </FormItem>
        <FormItem
          name="name"
          label="场次名称"
          rules={[{required: true, message: '请输入场次名称!'}]}
        >
            <Input id="update-name" placeholder={'请输入场次名称!'}/>
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
