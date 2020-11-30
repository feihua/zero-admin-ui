import React from 'react';
import ProForm,{ModalForm, ProFormText, ProFormTextArea} from '@ant-design/pro-form';

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
      title="编辑字典"
      width={480}
      visible={props.updateModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={onSubmit}
      initialValues={{
        name: props.values.name,
        id: props.values.id,
        value: props.values.value,
        label: props.values.label,
        type: props.values.type,
        remarks: props.values.remarks,
        description: props.values.description,
        sort: props.values.sort,
      }}
    >
      <ProFormText
        name="id"
        label="id"
        width="l"
        hidden
      />
      <ProForm.Group>
      <ProFormText
        name="value"
        label="数据值"
        rules={[{ required: true, message: '请输入数据值！' }]}
      />
        <ProFormText
          name="type"
          label="类型"
          rules={[{ required: true, message: '请输入类型！' }]}
        />
      </ProForm.Group>
      <ProForm.Group>
      <ProFormText
        name="label"
        label="标签名"
        rules={[{ required: true, message: '请输入标签名！' }]}
      />
        <ProFormText
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入标签名！' }]}
        />
      </ProForm.Group>
      <ProFormTextArea
        name="description"
        label="描述"
        width={"l"}
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 4 }]}
      />
      <ProFormTextArea
        name="remarks"
        label="备注"
        width={"l"}
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的备注！', min: 4 }]}
      />
    </ModalForm>
  )
};

export default UpdateForm;
