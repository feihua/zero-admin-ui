import React, {useEffect} from 'react';
import { DatePicker, Form, Input, Modal, Radio } from 'antd';
import type { SeckillActivityListItem} from '../data.d';
import moment from 'moment';

export interface UpdateModalProps {
  onCancel: () => void;
  onSubmit: (values: SeckillActivityListItem) => void;
  updateVisible: boolean;
  currentData: Partial<SeckillActivityListItem>;
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
        startTime: moment(currentData.startTime, 'YYYY-MM-DD HH:mm:ss'),
        endTime: moment(currentData.endTime, 'YYYY-MM-DD HH:mm:ss'),
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as SeckillActivityListItem);
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
          name="name"
          label="活动名称"
          rules={[{required: true, message: '请输入活动名称!'}]}
        >
          <Input id="update-name" placeholder={'请输入活动名称!'}/>
        </FormItem>
        <FormItem
          name="description"
          label="活动描述"
          rules={[{required: true, message: '请输入活动描述!'}]}
        >
          <Input id="update-description" placeholder={'请输入活动描述!'}/>
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
