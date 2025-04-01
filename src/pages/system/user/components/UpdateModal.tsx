import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Radio, Select, TreeSelect} from 'antd';
import type {JobList, UserListItem} from '../data.d';
import {queryDeptAndPostList, queryUserDetail} from "@/pages/system/user/service";
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

const UpdateModal: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [jobConf, setJobConf] = useState<JobList[]>([]);
  const [deptConf, setDeptConf] = useState<JobList[]>([]);
  const [postIds, setPostIds] = useState<number[]>([]);

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
      queryDeptAndPostList().then((res) => {
        setJobConf(res.data.postList)
        setDeptConf(tree(res.data.deptList, 0, 'parentId'))
      });
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (updateModalVisible) {
      queryUserDetail(values.id || 0).then((res)=>{

        setPostIds(res.data.postIds)
        form.setFieldsValue({
          ...res.data,
          deptId: values.deptId + '',
        });
      })

    }
  }, [props.updateModalVisible]);

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
          name="userType"
          hidden
        >
          <Input id="update-userType" value={"01"}/>
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
          name="postIds"
          label="职位"
          rules={[{required: true, message: '请选择职位'}]}
        >
          <Select id="postIds"
                  mode="multiple"
                  allowClear
                  defaultValue={postIds}
                  placeholder={'请选择职位'}>
            {jobConf.map(r => <Select.Option key={r.id} value={r.id}>{r.postName}</Select.Option>)}
          </Select>
        </FormItem>

        <FormItem
          name="userName"
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
          initialValue={1}
          rules={[{required: true, message: '请选择状态'}]}
        >
          <Radio.Group id="status">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea rows={2} placeholder={'请输入备注'}/>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
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

export default UpdateModal;
