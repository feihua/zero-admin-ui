import React, {useEffect, useState} from 'react';
import {DatePicker, DatePickerProps, Form, Input, Modal, Select} from 'antd';
import {FlashPromotionListItem} from '../data.d';
import moment from "moment";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: FlashPromotionListItem) => void;
  updateModalVisible: boolean;
  values: Partial<FlashPromotionListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateFlashForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    values,
  } = props;

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
      setStartDate(values.startDate || "")
      setEndDate(values.endDate || "")
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({...item as FlashPromotionListItem, startDate, endDate});
    }
  };


  const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString)
  };
  const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    setEndDate(dateString)
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem
          name="title"
          label="活动标题"
          rules={[{required: true, message: '请输入活动标题!'}]}
        >
          <Input id="update-title" placeholder={'请输入活动标题'}/>
        </FormItem>
        <FormItem
          // name="startDate"
          label="开始日期"
        >
          <DatePicker value={moment(startDate, 'YYYY-MM-DD')} onChange={onChangeStartDate} placeholder={'请输入开始日期'}/>
        </FormItem>
        <FormItem
          // name="endDate"
          label="结束日期"
        >
          <DatePicker value={moment(endDate, 'YYYY-MM-DD')} onChange={onChangeEndDate} placeholder={'请输入结束日期'}/>
        </FormItem>

        <FormItem
          name="status"
          label="上下线状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改秒杀信息"
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

export default UpdateFlashForm;
