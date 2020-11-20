import React from 'react';
import { Modal } from 'antd';
import {
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <StepsForm
    stepsProps={{
      size: 'small',
    }}
    stepsFormRender={(dom, submitter) => {
      return (
        <Modal
          width={500}
          // bodyStyle={{ padding: '32px 40px 48px' }}
          destroyOnClose
          title="编辑用户"
          visible={props.updateModalVisible}
          footer={submitter}
          onCancel={() => props.onCancel()}
        >
          {dom}
        </Modal>
      );
    }}
    onFinish={props.onSubmit}
  >
    <StepsForm.StepForm
      initialValues={{
        name: props.values.name,
        nick_name: props.values.nick_name,
        mobile: props.values.mobile,
        email: props.values.email,
        id: props.values.id,
      }}
      title="基本信息"
    >
      <ProFormText
        name="id"
        label="id"
        rules={[{ required: true, message: '请输入用户名！' }]}
      />
      <ProFormText
        name="name"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名！' }]}
      />
      <ProFormText
        name="nick_name"
        label="昵称"
        rules={[{ required: true, message: '请输入昵称！' }]}
      />
      <ProFormText
        name="mobile"
        label="手机号码"
        rules={[{ required: true, message: '请输入手机号码！' }]}
      />
      <ProFormText
        name="email"
        label="邮箱"
        rules={[{ required: true, message: '请输入邮箱！' }]}
      />
    </StepsForm.StepForm>

  </StepsForm>
);

export default UpdateForm;
