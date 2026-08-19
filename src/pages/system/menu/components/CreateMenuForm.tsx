import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, TreeSelect} from 'antd';
import type {MenuListItem} from '../data.d';
import {queryMenuList} from "@/pages/system/menu/service";
import {tree} from "@/utils/utils";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: MenuListItem) => void;
  createModalVisible: boolean;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const CreateMenuForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<MenuListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    } else {
      queryMenuList({}).then((res) => {
        if (res.code === '000000') {
          const tree1 = tree(res.data, 0, 'parentId');
          setTreeData(tree1);
        } else {
          message.error(res.msg);
        }
      })
    }
  }, [props.createModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: MenuListItem) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const renderContent = () => {
    return (
      <>

        <FormItem
          label="上级菜单"
          name="parentId"
          rules={[{required: true, message: '请选择上级菜单!'}]}
        >
          <TreeSelect
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            placeholder="请选择上级"
            fieldNames={{label: 'menuName', value: 'id', children: 'children'}}
            allowClear
          />
        </FormItem>

        <FormItem
          label="菜单名称"
          name="menuName"
          rules={[{required: true, message: '请输入菜单名称!'}]}
        >
          <Input/>
        </FormItem>
        <FormItem
          label="菜单路径"
          name="menuUrl"
          rules={[{required: true, message: '请输入菜单路径!'}]}
        >
          <Input/>
        </FormItem>
        <FormItem
          label="显示排序"
          name="menuSort"
          initialValue={1}
          rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber style={{width: 255}}/>
        </FormItem>

        <FormItem
          label="菜单图标"
          name="menuIcon"
        >
          <Input/>
        </FormItem>

        <FormItem
          label="菜单状态"
          name="status"
          initialValue={1}
          rules={[{required: true, message: '请选择状态!'}]}>
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label="显示状态"
          name="visible"
          initialValue={1}
          rules={[{required: true, message: '请选择是否可见!'}]}>
          <Radio.Group>
            <Radio value={1}>显示</Radio>
            <Radio value={0}>隐藏</Radio>
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
      title="新建菜单"
      open={createModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateMenuForm;
