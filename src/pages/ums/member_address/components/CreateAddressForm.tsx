import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Select} from 'antd';
import { AddressTableListItem } from '../data.d';
import {queryRole} from "@/pages/system/role/service";
import {RoleListItem} from "@/pages/system/role/data";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: AddressTableListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateAddressForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [roleConf, setRoleConf] = useState<RoleListItem[]>([]);

  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();

      queryRole({pageSize: 100,current: 1 }).then((res) => {
        setRoleConf(res.data)
      });
    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: AddressTableListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="用户名"
        >
          <Input id="update-name" placeholder={'请输入用户名'}/>
        </FormItem>
        <FormItem
          name="nick_name"
          label="昵称"
        >
          <Input id="update-nick_name" placeholder={'请输入昵称'}/>
        </FormItem>
        <FormItem
          name="mobile"
          label="手机号"
        >
          <Input id="update-mobile" placeholder={'请输入手机号'}/>
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
        >
          <Input id="update-email" placeholder={'请输入邮箱'}/>
        </FormItem>
        <FormItem
          name="dept_id"
          label="部门"
        >
          <Input id="update-dept_id" placeholder={'请输入部门'}/>
        </FormItem>
        <FormItem
          name="role_id"
          label="角色"
        >
          <Select id="role_id" placeholder={'请选择角色'}>
            {roleConf.map(r => <Select.Option value={r.id}>{r.name+r.remark}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
        >
          <Select id="status" placeholder={'请选择状态'}>
            <Option value={0}>停用</Option>
            <Option value={1}>启用</Option>
          </Select>
        </FormItem>

      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建会员地址"
      visible={createModalVisible}
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

export default CreateAddressForm;
