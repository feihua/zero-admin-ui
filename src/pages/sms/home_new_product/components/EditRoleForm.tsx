import React from 'react';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';

import { FormValueType } from '@/pages/system/user/components/UpdateForm';
import { TableListItem } from '@/pages/system/user/data';

interface CreateFormProps {
  editModalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values: Partial<TableListItem>;
}

const EditRoleForm: React.FC<CreateFormProps> = (props) => {
  // @ts-ignore
  return (
    <ModalForm
      title="分配角色"
      width={480}
      visible={props.editModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={props.onSubmit}
      initialValues={{
        id: props.values.id,
      }}
    >
      <ProFormText name="id" label="id" width="l" hidden />
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

export default EditRoleForm;
