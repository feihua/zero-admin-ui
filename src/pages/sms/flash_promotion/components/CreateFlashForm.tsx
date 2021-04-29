import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import { FlashPromotionListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: FlashPromotionListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateFlashForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;


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
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="title"
          label="秒杀活动"
        >
          <Input id="update-title" placeholder={'请输入秒杀活动'}/>
        </FormItem>
        <FormItem
          name="startDate"
          label="开始日期"
        >
          <Input id="update-startDate" placeholder={'请输入开始日期'}/>
        </FormItem>
        <FormItem
          name="endDate"
          label="结束日期"
        >
          <Input id="update-endDate" placeholder={'请输入结束日期'}/>
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


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建秒杀信息"
      visible={createModalVisible}
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
