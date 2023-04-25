import React, {useEffect, useState} from 'react';
import {DatePicker, DatePickerProps, Form, Input, InputNumber, Modal, Select} from 'antd';
import type {HomeAdvertiseListItem} from '../data.d';
import moment from "moment/moment";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: HomeAdvertiseListItem) => void;
  updateModalVisible: boolean;
  values: Partial<HomeAdvertiseListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateHomeAdvertiseForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const {onSubmit, onCancel, updateModalVisible, values} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
      });
      setStartTime(values.startTime || "")
      setEndTime(values.endTime || "")
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({...item as HomeAdvertiseListItem, startTime, endTime});
    }
  };

  const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString)
    setStartTime(dateString)
  };
  const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString)
    setEndTime(dateString)
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem name="name" label="广告名" rules={[{required: true, message: '请输入广告名!'}]}>
          <Input id="update-name" placeholder={'请输入广告名'}/>
        </FormItem>
        <FormItem name="type" label="轮播位置" rules={[{required: true, message: '请选择轮播位置!'}]}>
          <Select id="type" placeholder={'请选择轮播位置'}>
            <Option value={0}>PC首页轮播</Option>
            <Option value={1}>app首页轮播</Option>
          </Select>
        </FormItem>
        <FormItem
          label="开始时间"
          rules={[{required: true, message: '请输入开始时间!'}]}
        >
          <DatePicker value={moment(startTime, 'YYYY-MM-DD HH:mm:ss')} onChange={onChangeStartDate} showTime placeholder={'请输入开始时间'}/>
        </FormItem>
        <FormItem
          label="结束时间"
          rules={[{required: true, message: '请输入结束时间!'}]}
        >
          <DatePicker value={moment(endTime, 'YYYY-MM-DD HH:mm:ss')} onChange={onChangeEndDate} showTime placeholder={'请输入结束时间'}/>
        </FormItem>

        <FormItem name="status" label="上下线状态" rules={[{required: true, message: '请选择状态!'}]}>
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem>
        <FormItem
          name="sort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber/>
        </FormItem>
        <FormItem name="url" label="链接" rules={[{required: true, message: '请输入链接!'}]}>
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

  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改广告信息"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateHomeAdvertiseForm;
