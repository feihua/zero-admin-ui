import React, {useEffect} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import { MemberTableListItem } from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: MemberTableListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateMemberForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();


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

  const handleFinish = (values: MemberTableListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="username"
          label="会员名"
        >
          <Input id="update-username" placeholder={'请输入会员名'}/>
        </FormItem>
        <FormItem
          name="nickname"
          label="昵称"
        >
          <Input id="update-nickname" placeholder={'请输入昵称'}/>
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
        >
          <Input id="update-phone" placeholder={'请输入手机号'}/>
        </FormItem>
        <FormItem
          name="icon"
          label="头像"
        >
          <Input id="update-icon" placeholder={'请输入头像'}/>
        </FormItem>

        <FormItem
          name="gender"
          label="性别"
        >
          <Select id="gender" placeholder={'请选择性别'}>
            <Select.Option value={0}>停用</Select.Option>
            <Select.Option value={1}>启用</Select.Option>
          </Select>
        </FormItem>

        <FormItem
          name="status"
          label="状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Select.Option value={0}>禁用</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
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
      title="新建会员信息"
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

export default CreateMemberForm;
