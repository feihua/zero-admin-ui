import React, {useEffect} from 'react';
import {DatePicker, Form, Input, InputNumber, Modal, Select} from 'antd';
import type {HomeAdvertiseListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeAdvertiseListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateHomeAdvertiseForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;

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

  const handleFinish = (values: HomeAdvertiseListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="name" label="广告名" rules={[{required: true, message: '请输入广告名!'}]}>
          <Input id="update-name" placeholder={'请输入广告名'}/>
        </FormItem>
        <FormItem name="type" label="轮播位置" initialValue={0} rules={[{required: true, message: '请选择轮播位置!'}]}>
          <Select id="type" placeholder={'请选择轮播位置'}>
            <Option value={0}>PC首页轮播</Option>
            <Option value={1}>app首页轮播</Option>
          </Select>
        </FormItem>
        <FormItem name="startTime" label="开始日期" rules={[{required: true, message: '请输入开始日期!'}]}>
          <DatePicker showTime placeholder={'请输入开始日期'}/>
        </FormItem>
        <FormItem name="endTime" label="结束日期" rules={[{required: true, message: '请输入结束日期!'}]}>
          <DatePicker showTime placeholder={'请输入结束日期'}/>
        </FormItem>

        <FormItem name="status" label="上下线状态" initialValue={1} rules={[{required: true, message: '请选择状态!'}]}>
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          initialValue={1}
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber/>
        </FormItem>
        <FormItem name="url" label="链接" initialValue={"https://www.baidu.com"} rules={[{required: true, message: '请输入链接!'}]}>
          <Input id="update-url" placeholder={'请输入链接'}/>
        </FormItem>
        <FormItem
          name="note"
          label="备注"
        >
          <Input.TextArea rows={2}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建广告信息"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateHomeAdvertiseForm;
