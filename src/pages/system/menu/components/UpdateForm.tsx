import React from 'react';
import ProForm, {ModalForm, ProFormText} from '@ant-design/pro-form';

import {TableListItem} from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
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
      title="编辑菜单"
      width={480}
      visible={props.updateModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={onSubmit}
      initialValues={{
        name: props.values.name,
        id: props.values.id,
        parent_id: props.values.parent_id,
        url: props.values.url,
        type: props.values.type,
        order_num: props.values.order_num,
        icon: props.values.icon,
        perms: props.values.perms,
      }}
    >
      <ProFormText
        name="id"
        label="id"
        width="l"
        hidden
      />
      <ProFormText
        name="parent_id"
        label="parent_id"
        width="l"
        hidden
      />
      <ProForm.Group>
        <ProFormText
          name="name"
          label="菜单名称"
          rules={[{required: true, message: '请输入用户名！'}]}
        />
        <ProFormText
          name="type"
          label="类型"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="order_num"
          label="排序"
        />
        <ProFormText
          name="icon"
          label="图标"
        />
      </ProForm.Group>

      <ProFormText
        name="url"
        label="url"
        width="l"
      />
    </ModalForm>
  )
};

export default UpdateForm;
