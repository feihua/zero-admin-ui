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
          title="编辑角色"
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
        remark: props.values.remark,
        id: props.values.id,
      }}
      title="基本信息"
    >
      <ProFormText
        name="id"
        label="id"
        rules={[{ required: true, message: '请输入角色名称！' }]}
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
    </StepsForm.StepForm>
  </StepsForm>
);

export default UpdateForm;
