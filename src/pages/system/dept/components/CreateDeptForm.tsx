import React, {useEffect, useState} from 'react';
import {Cascader, Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import type {DeptListItem} from '../data.d';
import {queryDeptList} from "@/pages/system/dept/service";
import {tree} from "@/utils/utils";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: DeptListItem) => void;
  createModalVisible: boolean;
  parentId: number;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateDeptForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [deptListItem, setDeptListItem] = useState<DeptListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    } else {
      queryDeptList({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; deptName: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.deptName,
            title: item.deptName,
            parentId: item.parentId,
          }));

          const tree1 = tree(map, 0, 'parentId');
          tree1.unshift({
            value: 0,
            label: '无上级部门',
          })
          setDeptListItem(tree1);
        } else {
          message.error(res.msg);
        }
      });
    }
  }, [props.createModalVisible]);

  useEffect(() => {
    if (props.parentId) {
      form.setFieldsValue({
        parentId: props.parentId,
      });
    }
  }, [props.parentId]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: DeptListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="parentIds" label="部门上级" initialValue={[0]} rules={[{required: true, message: '请选择部门!'}]}>
          <Cascader
            defaultValue={[0]}
            options={deptListItem}
            placeholder="请选择部门"
          />
        </FormItem>
        <FormItem name="deptName" label="部门名称" rules={[{required: true, message: '请输入部门名称'}]}>
          <Input id="update-name" placeholder={'请输入部门名称'}/>
        </FormItem>
        <FormItem name="deptSort" label="部门排序" initialValue={0} rules={[{required: true, message: '请输入部门排序'}]}>
          <InputNumber placeholder={'请输入部门排序'} style={{width: 255}}/>
        </FormItem>
        <FormItem name="deptStatus" label="部门状态" rules={[{required: true, message: '请求选择状态'}]} initialValue={1}>
          <Radio.Group id="deptStatus">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="email" label="邮箱" rules={[{required: true, message: '请输入邮箱'}]}>
          <Input id="update-email" placeholder={'请输入邮箱'}/>
        </FormItem>
        <FormItem name="leader" label="负责人" rules={[{required: true, message: '请输入负责人'}]}>
          <Input id="update-leader" placeholder={'请输入负责人'}/>
        </FormItem>
        <FormItem name="phone" label="电话号码" rules={[{required: true, message: '请输入电话号码'}]}>
          <Input id="update-phone" placeholder={'请输入电话号码'}/>
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
      title="新建"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateDeptForm;
