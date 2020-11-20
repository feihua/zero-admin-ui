import React from 'react';
import { Modal,Tree } from 'antd';
import {FormValueType} from "@/pages/system/user/components/UpdateForm";
import {TableListItem} from "@/pages/system/user/data";


interface CreateFormProps {
  updateMenuModalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values: Partial<TableListItem>;
}

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const MenuForm: React.FC<CreateFormProps> = (props) => {
  const { updateMenuModalVisible, onCancel,onSubmit } = props;


  // @ts-ignore
  return (
    <Modal
      destroyOnClose
      title="分配角色菜单"
      width={500}
      visible={updateMenuModalVisible}
      onCancel={() => onCancel()}
      onOk={() => onSubmit}

      // footer={null}
    >
      <Tree
        checkable
        defaultExpandAll
        // onExpand={onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        // onCheck={onCheck}
        // checkedKeys={checkedKeys}
        // onSelect={onSelect}
        // selectedKeys={selectedKeys}
        treeData={treeData}
      />,
    </Modal>
  );
};

export default MenuForm;
