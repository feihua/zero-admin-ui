import React, {useEffect, useState} from 'react';
import {ModalForm} from '@ant-design/pro-form';

import {TableListItem} from '../data.d';
import {Tree} from "antd";
import {queryMenuByRoleId} from "@/pages/system/role/service";
import {tree as toTree} from "@/utils/utils";

export interface FormValueType extends Partial<TableListItem> {

}

export interface MenuFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: { role_id: number ,menu_ids:number[]}) => Promise<void>;
  updateMenuModalVisible: boolean;
  values: Partial<TableListItem>;
}

const MenuForm: React.FC<MenuFormProps> = (props) => {
  const {onSubmit} = props

  const [treeData, setTreeData] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [selectedKey, setSelectedKey] = useState<number[]>([]);

  useEffect(() => {
    queryMenuByRoleId({id:props.values.id}).then((res) => {
      let tr = toTree(res.AllData, 0, 'parent_id');
      // @ts-ignore
      setTreeData(tr);
      setSelectedKeys(res.RoleData)
      setSelectedKey(res.RoleData)

      console.log(tr);
    });
  }, []);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKey(info)
    setSelectedKeys(selectedKeys);
  };

  return (
    <ModalForm
      title="分配角色菜单"
      width={480}
      visible={props.updateMenuModalVisible}
      onVisibleChange={() => props.onCancel()}
      onFinish={ async () => {
        const data = {
          role_id: props.values.id||0,
          menu_ids:selectedKey,
        }
         await onSubmit(data);

        // return true;
      }}
      initialValues={{
        id: props.values.id,
      }}
    >

    <Tree
      checkable
      defaultExpandAll={true}
      // onExpand={onExpand}
      // expandedKeys={expandedKeys}
      // autoExpandParent={autoExpandParent}
      checkedKeys={selectedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
    </ModalForm>
  )
};

export default MenuForm;
