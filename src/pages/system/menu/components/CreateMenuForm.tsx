import React, {useEffect, useState} from 'react';
import type {RadioChangeEvent} from 'antd';
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
  const [menuType, setMenuType] = useState<number>(1);
  const [menuName, setMenuName] = useState<string>('菜单名称');
  const [treeData, setTreeData] = useState<MenuListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (form && !createModalVisible) {
      form.resetFields();
    } else {
      setMenuType(1)
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

  const onChange = (e: RadioChangeEvent) => {
    const t = e.target.value
    setMenuType(t)
    if (t === 0) {
      setMenuName('目录名称');
    } else if (t === 1) {
      setTreeData(treeData)
      setMenuName('菜单名称');
    } else {
      treeData.splice(0, 1)
      setTreeData(treeData)
      setMenuName('按钮名称');
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          label="菜单类型"
          name="menuType"
          initialValue={1}
        >
          <Radio.Group onChange={onChange}>
            <Radio value={0}>目录</Radio>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
          </Radio.Group>
        </FormItem>
        {menuType !== 0 && <FormItem
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
        }
        <FormItem
          label={menuName}
          name="menuName"
          rules={[{required: true, message: '请输入菜单名称!'}]}
        >
          <Input/>
        </FormItem>
        {menuType !== 2 &&
          <FormItem
            label="组件路径"
            name="menuPath"
            rules={[{required: true, message: '请输入路径!'}]}
          >
            <Input/>
          </FormItem>
        }
        {menuType == 2 &&
          <FormItem
            label="接口地址"
            name="backgroundUrl"
            rules={[{required: true, message: '请输入接口地址!'}]}
          >
            <Input/>
          </FormItem>
        }
        <FormItem
          label="显示排序"
          name="menuSort"
          initialValue={1}
          rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber style={{width: 255}}/>
        </FormItem>
        {menuType !== 2 &&
          <FormItem
            label="菜单图标"
            name="menuIcon"
            initialValue={"Setting"}
            rules={[{required: true, message: '请输入图标!'}]}
          >
            <Input/>
          </FormItem>
        }
        <FormItem
          label="菜单状态"
          name="menuStatus"
          initialValue={1}
          rules={[{required: true, message: '请选择状态!'}]}>
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label="显示状态"
          name="isVisible"
          initialValue={1}
          rules={[{required: true, message: '请选择是否可见!'}]}>
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
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
