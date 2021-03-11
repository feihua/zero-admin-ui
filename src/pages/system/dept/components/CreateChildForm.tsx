import React from 'react';
import {ModalForm, ProFormText} from '@ant-design/pro-form';

import {TableListItem} from '../data.d';

export interface FormValueType extends Partial<TableListItem> {

}

export interface CreateChildFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createChildModalVisible: boolean;
  parent_id: number;
}

const CreateChildForm: React.FC<CreateChildFormProps> = (props) => {
  const {onSubmit,parent_id} = props

  return (
    <ModalForm
      title="新增机构"
      width={480}
      visible={props.createChildModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={onSubmit}
      initialValues={{
        parent_id: parent_id,
      }}
    >
      <ProFormText
        name="parent_id"
        label="parent_id"
        width="l"
        hidden
      />
      <ProFormText
        name="name"
        label="机构名称"
        width="l"
        rules={[{required: true, message: '请输入用户名！'}]}
      />
      <ProFormText
        name="order_num"
        label="排序"
        width="l"
      />

    </ModalForm>
  )
};

export default CreateChildForm;
