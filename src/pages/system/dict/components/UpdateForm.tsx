import React from 'react';
import { Modal } from 'antd';
import {
  ProFormText,
  ProFormTextArea,
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
          destroyOnClose
          title="规则配置"
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
        id: props.values.id,
        value: props.values.value,
        label: props.values.label,
        type: props.values.type,
        remarks: props.values.remarks,
        description: props.values.description,
      }}
      title="基本信息"
    >
      <ProFormText
        name="id"
        label="id"
        rules={[{ required: true, message: '请输入id！' }]}
      />
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
      <ProFormText
        name="label"
        label="标签名"
        rules={[{ required: true, message: '请输入标签名！' }]}
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的描述！', min: 4 }]}
      />
      <ProFormTextArea
        name="remarks"
        label="备注"
        placeholder="请输入至少五个字符"
        rules={[{ required: true, message: '请输入至少五个字符的备注！', min: 4 }]}
      />
    </StepsForm.StepForm>

  </StepsForm>
);

export default UpdateForm;
