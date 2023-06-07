import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, Tree} from 'antd';
import type {RoleListItem} from '../data.d';
import {queryMenuByRoleId} from '@/pages/system/role/service';
import {tree as toTree} from '@/utils/utils';

export interface MenuFormProps {
  onCancel: () => void;
  onSubmit: (values: { roleId: number; menuIds: number[] }) => void;
  updateMenuModalVisible: boolean;
  currentData: Partial<RoleListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateRoleForm: React.FC<MenuFormProps> = (props) => {
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKey, setSelectedKey] = useState<number[]>([]);

  const {
    onSubmit,
    onCancel,
    updateMenuModalVisible,
    currentData,
  } = props;


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit({
        roleId: currentData.id || 0,
        menuIds: selectedKey,
      });
    }
  };

  useEffect(() => {
    if (updateMenuModalVisible) {
      setSelectedKey([]);
      setCheckedKeys([]);
      queryMenuByRoleId({id: currentData.id}).then((res) => {
        // @ts-ignore
        setTreeData(toTree(res.allData, 0, 'parentId'));

        if (res.userData) {
          const map = res.userData.map((r: number) => r + '');
          setSelectedKey(map);
          setCheckedKeys(map);

        }
      });
    }
  }, [props.updateMenuModalVisible]);


  const onCheck = (checkedKeysValue: React.Key[]) => {
    setCheckedKeys(checkedKeysValue);

    setSelectedKey(checkedKeysValue.map((i) => Number(i)));
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
        <Tree
          checkable
          defaultExpandAll={true}
          // @ts-ignore
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="分配角色菜单"
      open={updateMenuModalVisible}
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

export default UpdateRoleForm;
