import React, {useState, useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';

import {UserList} from './data.d';
import {
  queryRoleUserList,
} from './service';


export interface SetUserListProps {
  roleId: number;
  setUserModalVisible: boolean;
  onSubmit: (userIds: number[], roleId: number) => void;
}

// 设置用户
const AddUserList: React.FC<SetUserListProps> = (props) => {

  const actionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns: ProColumns<UserList>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
  ];


  return (
    <>
      <ProTable<UserList>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={(params) => {
          return queryRoleUserList({...params, roleId: props.roleId, isExist:0})
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedRows,
          onChange: (_, selectedRows) => {
            props.onSubmit( selectedRows.map((row) => row.id),props.roleId)
            setSelectedRows(selectedRows.map((row) => row.id))
          }
        }}
        pagination={{pageSize: 10}}
      />

    </>
  );
};

export default AddUserList;
