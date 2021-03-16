import React from 'react';
import ProForm,{ModalForm, ProFormText} from '@ant-design/pro-form';

import {MenuListItem} from '../data.d';

export interface FormValueType extends Partial<MenuListItem> {

}

export interface CreateChildFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  createChildModalVisible: boolean;
  parent_id: number;
}

const CreateMenuChildForm: React.FC<CreateChildFormProps> = (props) => {
  const {onSubmit,parent_id} = props

  return (
    <ModalForm
      title="新建菜单"
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

export default CreateMenuChildForm;
