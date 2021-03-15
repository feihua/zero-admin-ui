import React from 'react';
import ProForm, { ModalForm, ProFormText, ProFormSelect, ProFormRadio } from '@ant-design/pro-form';

import { RecommendProductListItem } from '../data.d';

export interface RecommendProductFormValueType extends Partial<RecommendProductListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateRecommendProductFormProps {
  onCancel: (flag?: boolean, formVals?: RecommendProductFormValueType) => void;
  onSubmit: (values: RecommendProductFormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<RecommendProductListItem>;
}

const UpdateRecommendProductForm: React.FC<UpdateRecommendProductFormProps> = (props) => {
  const { onSubmit } = props;

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
        role_id: props.values.role_id,
        status: props.values.status + '',
      }}
    >
      <ProFormText name="id" label="id" width="l" hidden />
      <ProForm.Group>
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
      </ProForm.Group>
      <ProForm.Group>
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
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="dept_id"
          label="部门"
          rules={[{ required: true, message: '请输入部门！' }]}
        />
        <ProFormRadio.Group
          name="status"
          label="状态"
          options={[
            {
              label: '正常',
              value: '1',
            },
            {
              label: '禁用',
              value: '0',
            },
          ]}
        />
      </ProForm.Group>
      <ProFormSelect
        name="role_id"
        label="角色"
        request={async () => [
          { label: '超级管理员', value: '1' },
          { label: '项目经理', value: '2' },
          { label: '开发人员', value: '3' },
          { label: '测试人员', value: '4' },
        ]}
        placeholder="Please select a role"
        rules={[{ required: true, message: 'Please select your role!' }]}
      />
    </ModalForm>
  );
};

export default UpdateRecommendProductForm;
