import React, {useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Modal, Radio, TreeSelect} from 'antd';
import type { MenuListItem} from '../data.d';
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

const UpdateModal: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<MenuListItem[]>([]);

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {

      queryMenuList({}).then((res) => {
        if (res.code === '000000') {
          const tree1 = tree(res.data, 0, 'parentId');
          setTreeData(tree1);
        } else {
          message.error(res.msg);
        }
      })

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

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>
        <FormItem
          name="parentId"
          label="上级菜单"
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
          name="menuName"
          label="资源名称"
          rules={[{required: true, message: '请输入菜单名称!'}]}
        >
          <Input id="update-menuName" placeholder={'请输入菜单名称!'}/>
        </FormItem>
        <FormItem
          name="status"
          label="资源状态"
          initialValue={1}
          rules={[{required: true, message: '请输入菜单状态!'}]}
        >
          <Radio.Group>
            <Radio value={1}>正常</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="menuSort"
          label="排序"
          rules={[{required: true, message: '请输入排序!'}]}
        >
          <InputNumber style={{width: 255}}/>
        </FormItem>

        <FormItem
          name="apiUrl"
          label="接口url"
          rules={[{required: true, message: '请输入接口url!'}]}
        >
          <Input id="update-apiUrl" placeholder={'请输入接口url!'}/>
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
