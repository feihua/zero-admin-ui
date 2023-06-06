import React, {useEffect, useState} from 'react';
import {Cascader, Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import type {DeptListItem} from '../data.d';
import {queryDept} from "@/pages/system/dept/service";
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
      queryDept({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; name: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.name,
            title: item.name,
            parentId: item.parentId,
          }));

          const tree1 = tree(map, 0, 'parentId');
          tree1.unshift({
            value: 0,
            label: '无上级机构',
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
        <FormItem name="name" label="机构名称" rules={[{required: true, message: '请输入机构名称'}]}>
          <Input id="update-name" placeholder={'请输入机构名称'}/>
        </FormItem>
        <FormItem name="parentIds" label="机构上级" initialValue={[0]} rules={[{required: true, message: '请选择上级!'}]}>
          <Cascader
            defaultValue={[0]}
            options={deptListItem}
            placeholder="请选择上级"
          />
        </FormItem>
        <FormItem name="orderNum" label="排序" initialValue={0} rules={[{required: true, message: '请输入排序'}]}>
          <InputNumber placeholder={'请输入排序'} style={{width: 255}}/>
        </FormItem>
        <FormItem name="delFlag" label="状态" rules={[{required: true, message: '请求选择状态'}]} initialValue={1}>
          <Radio.Group id="delFlag">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
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
      title="新建机构"
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
