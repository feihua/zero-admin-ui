import React, { useState, useEffect } from 'react';
import { Modal, Tree } from 'antd';
import { FormValueType } from '@/pages/system/user/components/UpdateForm';
import { TableListItem } from '@/pages/system/user/data';

import { queryMenu } from '../../menu/service';
import { tree } from '@/utils/utils';

interface CreateFormProps {
  updateMenuModalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  values: Partial<TableListItem>;
}

const treeData1 = [
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
  const { updateMenuModalVisible, onCancel, onSubmit } = props;

  const [treeData, setTreeData] = useState([]);
  // const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  // const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  // const onExpand = (expandedKeys: React.Key[]) => {
  //   console.log('onExpand', expandedKeys);
  //   // if not set autoExpandParent to false, if children expanded, parent can not collapse.
  //   // or, you can remove all expanded children keys.
  //   // setExpandedKeys(expandedKeys);
  //   setAutoExpandParent(false);
  // };

  useEffect(() => {
    queryMenu().then((res) => {
      let tr = tree(res.data, 0, 'parent_id');
      // @ts-ignore
      setTreeData(tr);
      console.log(tr);
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onCheck = (checkedKeys: React.Key[]) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

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
        defaultExpandAll={true}
        // onExpand={onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
      ,
    </Modal>
  );
};

export default MenuForm;
