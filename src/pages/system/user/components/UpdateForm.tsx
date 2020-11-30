import React from 'react';
import {ModalForm, ProFormText} from '@ant-design/pro-form';

import {TableListItem} from '../data.d';

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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {onSubmit} = props

  return (
    <ModalForm
      title="编辑用户"
      width={480}
      visible={props.updateModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={onSubmit}
      initialValues={{
        name: props.values.name,
        nick_name: props.values.nick_name,
        mobile: props.values.mobile,
        email: props.values.email,
        id: props.values.id,
        dept_id: props.values.dept_id,
      }}
    >
        <ProFormText
          name="id"
          label="id"
          width="l"
          hidden
        />
        <ProFormText
          name="name"
          label="用户名"
          width="l"
          rules={[{required: true, message: '请输入用户名！'}]}
        />
        <ProFormText
          name="nick_name"
          label="昵称"
          width="l"
          rules={[{required: true, message: '请输入昵称！'}]}
        />
        <ProFormText
          name="mobile"
          label="手机号码"
          width="l"
          rules={[{required: true, message: '请输入手机号码！'}]}
        />

        <ProFormText
          name="email"
          label="邮箱"
          width="l"
          rules={[{required: true, message: '请输入邮箱！'}]}
        />

      <ProFormText
        name="dept_id"
        label="部门"
        width="l"
        rules={[{required: true, message: '请输入部门！'}]}
      />

    </ModalForm>
  )
};

export default UpdateForm;
