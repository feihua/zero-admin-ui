import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, RadioChangeEvent, TreeSelect} from 'antd';
import {MenuListItem} from '../data.d';
import {queryMenu} from "@/pages/system/menu/service";
import {tree} from "@/utils/utils";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: MenuListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<MenuListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateMenuForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [menuType, setMenuType] = useState<number>(1);
  const [menuName, setMenuName] = useState<string>('菜单名称');
  const [treeData, setTreeData] = useState<MenuListItem[]>([]);

  const {onSubmit, onCancel, updateModalVisible, currentData} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    } else {
      setMenuType(props.currentData.type || 1)
      queryMenu({}).then((res) => {
        if (res.code === '000000') {
          const tree1 = tree(res.data, 0, 'parentId');
          tree1.unshift({
            id: 0,
            name: '无上级菜单',
          })
          setTreeData(tree1);
        } else {
          message.error(res.msg);
        }
      })
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as MenuListItem);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    const t = e.target.value
    setMenuType(t)
    if (t === 0) {
      setMenuName('目录名称');
    } else if (t === 1) {
      treeData.unshift({
        id: 0,
        name: '无上级菜单',
      })
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
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem
          label="类型"
          name="type"
          initialValue={props.currentData.type}
        >
          <Radio.Group onChange={onChange} defaultValue={props.currentData.type}>
            <Radio value={0}>目录</Radio>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
          </Radio.Group>
        </FormItem>
        {menuType !== 0 && <FormItem
          label="上级"
          name="parentId"
          rules={[{required: true, message: '请选择上级菜单!'}]}
        >
          <TreeSelect
            style={{width: '100%'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            placeholder="请选择上级"
            fieldNames={{label: 'name', value: 'id', children: 'children'}}
            allowClear
          />
        </FormItem>
        }
        <FormItem
          label={menuName}
          name="name"
          rules={[{required: true, message: '请输入菜单名称!'}]}
        >
          <Input/>
        </FormItem>
        {menuType !== 2 &&
          <FormItem
            label="路径"
            name="url"
            rules={[{required: true, message: '请输入路径!'}]}
          >
            <Input/>
          </FormItem>
        }
        {menuType !== 0 &&
          <FormItem
            label="接口地址"
            name="backgroundUrl"
            rules={[{required: true, message: '请输入接口地址!'}]}
          >
            <Input/>
          </FormItem>
        }
        <FormItem
          label="排序"
          name="orderNum"
          rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber style={{width: 255}}/>
        </FormItem>
        {menuType !== 2 &&
          <FormItem
            label="图标"
            name="icon"
            rules={[{required: true, message: '请输入图标!'}]}
          >
            <Input/>
          </FormItem>
        }
        <FormItem
          label="状态"
          name="delFlag"
          rules={[{required: true, message: '请选择状态!'}]}>
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
      title="修改菜单"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateMenuForm;
