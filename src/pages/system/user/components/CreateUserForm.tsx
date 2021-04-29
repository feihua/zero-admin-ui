import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Select, TreeSelect} from 'antd';
import {JobList, RoleList, UserListItem} from '../data.d';
import {querySelectAllData} from "@/pages/system/user/service";
import {tree} from "@/utils/utils";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: UserListItem) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateUserForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const [roleConf, setRoleConf] = useState<RoleList[]>([]);
  const [jobConf, setJobConf] = useState<JobList[]>([]);
  const [deptConf, setDeptConf] = useState<JobList[]>([]);

  const {
    onSubmit,
    onCancel,
    createModalVisible,
  } = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();

    }else {
      querySelectAllData({pageSize: 100,current: 1 }).then((res) => {
        setRoleConf(res.roleAll)
        setJobConf(res.jobAll)
        setDeptConf(tree(res.deptAll, 0, 'parentId'))
      });
    }

  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: UserListItem) => {
    if (onSubmit) {
      // values.deptId=Number(selectedKey)
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="deptId"
          label="部门"
        >
          <TreeSelect
            style={{ width: '100%' }}
            // value={this.state.value}
            // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={deptConf}
            placeholder="请选择部门"
            treeDefaultExpandAll
            // onChange={onChange}
          />
        </FormItem>
        <FormItem
          name="jobId"
          label="职位"
        >
          <Select id="jobId" placeholder={'请选择职位'}>
            {jobConf.map(r => <Select.Option value={r.id}>{r.jobName}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="roleId"
          label="角色"
        >
          <Select id="roleId" placeholder={'请选择角色'}>
            {roleConf.map(r => <Select.Option value={r.id}>{r.name+r.remark}</Select.Option>)}
          </Select>
        </FormItem>
        <FormItem
          name="name"
          label="用户名"
        >
          <Input id="update-name" placeholder={'请输入用户名'}/>
        </FormItem>
        <FormItem
          name="nickName"
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



      </>
    );
  };


  const modalFooter = { okText: '保存', onOk: handleSubmit, onCancel };

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建用户"
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

export default CreateUserForm;
