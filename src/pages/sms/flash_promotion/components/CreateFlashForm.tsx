import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Select, DatePicker} from 'antd';
import type {FlashPromotionListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: FlashPromotionListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const {RangePicker} = DatePicker;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateFlashForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: FlashPromotionListItem) => {
    if (onSubmit) {
      onSubmit({...values, startDate, endDate});
    }
  };

  const onChange = (date: any, dateString: string[]) => {
    setStartDate(dateString[0])
    setEndDate(dateString[1])
  }
  //

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="title"
          label="活动标题"
          rules={[{required: true, message: '请输入活动标题!'}]}
        >
          <Input id="update-title" placeholder={'请输入活动标题'}/>
        </FormItem>
        <FormItem
          name="rangeDate"
          label="活动日期">
          <RangePicker
            onChange={onChange}
          />
        </FormItem>
        <FormItem
          name="status"
          label="上下线状态"
          initialValue={1}
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
      title="新建秒杀信息"
      open={createModalVisible}
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

export default CreateFlashForm;
