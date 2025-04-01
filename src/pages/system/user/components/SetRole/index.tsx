import React, {useState, useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';

import {RoleList, UserRoleList} from './data.d';
import {
  queryUserRoleList,
} from './service';


export interface SetRoleListProps {
  userId: number;
  setRoleModalVisible: boolean;
  onSubmit: (userId: number, roleIds: number[]) => void;
}

// 设置用户角色关联
const SetRoleList: React.FC<SetRoleListProps> = (props) => {

  const actionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns: ProColumns<RoleList>[] = [
    {
      title: '角色编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },

  ];


  return (
    <>
      <ProTable<RoleList>
        headerTitle="角色管理"
        actionRef={actionRef}
        tableAlertRender={false}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={(params) => {
          return queryUserRoleList({...params, userId: props.userId})
        }}
        columns={columns}
        // @ts-ignore
        postData={(data: UserRoleList) => {
          setSelectedRows(data.roleIds || [])
          props.onSubmit(props.userId, data.roleIds || [])
          return data.roleList
        }}
        rowSelection={{
          selectedRowKeys: selectedRows,
          onChange: (_, selectedRows) => {
            props.onSubmit(props.userId, selectedRows.map((row) => row.id))
            setSelectedRows(selectedRows.map((row) => row.id))
          }
        }}
        pagination={{pageSize: 10}}
      />

    </>
  );
};

export default SetRoleList;
