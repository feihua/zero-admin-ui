import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, RadioChangeEvent, TreeSelect} from 'antd';
import {MenuListItem} from '../data.d';
import {queryMenuList} from "@/pages/system/menu/service";
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
  const [menuType, setMenuType] = useState<number>(0);
  const [menuName, setMenuName] = useState<string>('菜单名称');
  const [treeData, setTreeData] = useState<MenuListItem[]>([]);

  const {onSubmit, onCancel, updateModalVisible, currentData} = props;

  useEffect(() => {
    console.log('menuType',currentData.menuType)
    if (form && !updateModalVisible) {
      form.resetFields();
    } else {
      setMenuType(props.currentData.menuType || 0)
      queryMenuList({}).then((res) => {
        if (res.code === '000000') {
          const tree1 = tree(res.data, 0, 'parentId');
          setTreeData(tree1);
          form.setFieldsValue({
            ...currentData,
          });
        } else {
          message.error(res.msg);
        }
      })
    }
  }, [props.updateModalVisible]);


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
          name="menuType"
        >
          <Radio.Group onChange={onChange} disabled={true}>
            <Radio value={0}>目录</Radio>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label="上级菜单"
          name="parentId"
          hidden={menuType === 0}
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
          rules={[{required: true, message: '请输入排序!'}]}>
          <InputNumber style={{width: 255}}/>
        </FormItem>
        {menuType !== 2 &&
          <FormItem
            label="菜单图标"
            name="menuIcon"
            rules={[{required: true, message: '请输入图标!'}]}
          >
            <Input/>
          </FormItem>
        }
        <FormItem
          label="菜单状态"
          name="menuStatus"
          rules={[{required: true, message: '请选择状态!'}]}>
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          label="显示状态"
          name="isVisible"
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
