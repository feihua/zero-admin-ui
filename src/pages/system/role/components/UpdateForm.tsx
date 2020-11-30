import React from 'react';
import {ModalForm, ProFormText, ProFormTextArea} from '@ant-design/pro-form';

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
      title="编辑角色"
      width={480}
      visible={props.updateModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={onSubmit}
      initialValues={{
        name: props.values.name,
        remark: props.values.remark,
        id: props.values.id,
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
        label="角色名称"
        rules={[{ required: true, message: '请输入角色名称！' }]}
      />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
      />

    </ModalForm>
  )
};

export default UpdateForm;
