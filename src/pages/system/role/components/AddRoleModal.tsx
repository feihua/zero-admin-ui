import React, {useEffect} from 'react';
import {Form, Input, Modal, Radio, Select} from 'antd';
import type {RoleListItem} from '../data.d';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: RoleListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

// 创建角色
const AddRoleModal: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();


  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: RoleListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="roleName"
          label="角色名称"
          rules={[{required: true, message: '请输入角色名称'}]}
        >
          <Input id="create-name" placeholder={'请输入角色名称'}/>
        </FormItem>
        <FormItem
          name="roleKey"
          label="权限字符"
          rules={[{required: true, message: '请输入权限字符'}]}
        >
          <Input id="create-name" placeholder={'请输入权限字符'}/>
        </FormItem>
        <FormItem
          name="dataScope"
          label="数据范围"
          rules={[{required: true, message: '请选择数据范围'}]}
        >
          <Select id={"dataScope"} placeholder={'请输入数据范围'}
            options={[
              {value: 1, label: '全部数据权限'},
              {value: 2, label: '自定数据权限'},
              {value: 3, label: '本部门数据权限'},
              {value: 4, label: '本部门及以下数据权限'},
            ]}
          />
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          initialValue={1}
          rules={[{required: true, message: '请选择状态'}]}
        >
          <Radio.Group id="status">
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea id="create-remark" placeholder={'请输入备注'} rows={2}/>
        </FormItem>

      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form
        {...formLayout}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default AddRoleModal;
