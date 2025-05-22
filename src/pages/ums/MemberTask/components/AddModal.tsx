import React, {useEffect} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Radio, Select} from 'antd';
import type {MemberTaskListItem} from '../data.d';

export interface AddModalProps {
  onCancel: () => void;
  onSubmit: (values: MemberTaskListItem) => void;
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
          name="taskDesc"
          label="任务描述"
          rules={[{required: true, message: '请输入任务描述!'}]}
        >
          <Input.TextArea rows={2} placeholder={'请输入任务描述!'}/>
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
        <FormItem
          name="taskType"
          label="任务类型"
          rules={[{required: true, message: '请选择任务类型'}]}
        >
          <Select id="taskType" placeholder={'请选择任务类型'}>
            <Select.Option value={0}>新手任务</Select.Option>
            <Select.Option value={1}>日常任务</Select.Option>
            <Select.Option value={2}>周常任务</Select.Option>
            <Select.Option value={3}>月常任务</Select.Option>
          </Select>

        </FormItem>
        <FormItem
          name="completeCount"
          label="需要完成次数"
          rules={[{required: true, message: '请输入需要完成次数!'}]}
        >
          <InputNumber id="create-completeCount" placeholder={'请输入需要完成次数!'} style={{width: 255}}/>
        </FormItem>
        <FormItem
          name="rewardType"
          label="奖励类型：0-积分成长值，1-优惠券，2-抽奖次数"
          rules={[{required: true, message: '请输入奖励类型：0-积分成长值，1-优惠券，2-抽奖次数!'}]}
        >
          <Select id="rewardType" placeholder={'请选择奖励类型'}>
            <Select.Option value={0}>积分成长值</Select.Option>
            <Select.Option value={1}>优惠券</Select.Option>
            <Select.Option value={2}>抽奖次数</Select.Option>
          </Select>
        </FormItem>
        <FormItem
          name="rewardParams"
          label="奖励参数JSON"
          rules={[{required: true, message: '请输入奖励参数JSON!'}]}
        >
          <Input.TextArea rows={2} placeholder={'请输入奖励参数JSON!'}/>
        </FormItem>
        <FormItem
          name="startTime"
          label="任务开始时间"
          rules={[{required: true, message: '请输入任务开始时间!'}]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
          />
        </FormItem>
        <FormItem
          name="endTime"
          label="任务结束时间"
          rules={[{required: true, message: '请输入任务结束时间!'}]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ format: 'YYYY-MM-DD HH:mm:ss' }}
          />
        </FormItem>
        <FormItem
          name="status"
          label="状态：0-禁用，1-启用"
          rules={[{required: true, message: '请输入状态：0-禁用，1-启用!'}]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber style={{width: 255}}/>
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
