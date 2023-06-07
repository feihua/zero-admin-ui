import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Radio, Select, TreeSelect} from 'antd';
import type {JobList, RoleList, UserListItem} from '../data.d';
import {querySelectAllData} from "@/pages/system/user/service";
import {tree} from "@/utils/utils";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: UserListItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<UserListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateUserForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [roleConf, setRoleConf] = useState<RoleList[]>([]);
  const [jobConf, setJobConf] = useState<JobList[]>([]);
  const [deptConf, setDeptConf] = useState<JobList[]>([]);

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    values,
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    } else {
      querySelectAllData({pageSize: 100, current: 1}).then((res) => {
        setRoleConf(res.roleAll)
        setJobConf(res.jobAll)
        setDeptConf(tree(res.deptAll, 0, 'parentId'))
      });
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (values) {
      form.setFieldsValue({
        ...values,
        deptId: values.deptId + '',
      });
    }
  }, [props.values]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (item: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(item as UserListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem
          name="deptId"
          label="部门"
          rules={[{required: true, message: '请选择部门'}]}
        >
          <TreeSelect
            style={{width: '100%'}}
            treeData={deptConf}
            placeholder="请选择部门"
            treeDefaultExpandAll
          />
        </FormItem>
        <FormItem
          name="jobId"
          label="职位"
          rules={[{required: true, message: '请选择职位'}]}
        >
          <Select id="jobId" placeholder={'请选择职位'}>
            {jobConf.map(r => <Select.Option value={r.id}>{r.jobName}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="roleId"
          label="角色"
          rules={[{required: true, message: '请选择角色'}]}
        >
          <Select id="roleId" placeholder={'请选择角色'}>
            {roleConf.map(r => <Select.Option value={r.id}>{r.name + r.remark}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="name"
          label="用户名"
          rules={[{required: true, message: '请输入用户名'}]}
        >
          <Input id="update-name" placeholder={'请输入用户名'}/>
        </FormItem>
        <FormItem
          name="nickName"
          label="昵称"
          rules={[{required: true, message: '请输入昵称'}]}
        >
          <Input id="update-nick_name" placeholder={'请输入昵称'}/>
        </FormItem>
        <FormItem
          name="mobile"
          label="手机号"
          rules={[{required: true, message: '请输入手机号'}]}
        >
          <Input id="update-mobile" placeholder={'请输入手机号'}/>
        </FormItem>
        <FormItem
          name="email"
          label="邮箱"
          rules={[{required: true, message: '请输入邮箱'}]}
        >
          <Input id="update-email" placeholder={'请输入邮箱'}/>
        </FormItem>
        <FormItem
          name="status"
          label="状态"
          rules={[{required: true, message: '请选择状态'}]}
        >
          <Radio.Group id="status">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="修改用户"
      open={updateModalVisible}
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

export default UpdateUserForm;
