import React, {useState, useRef} from 'react';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';

import {CancelAuthorizationParams, UserList} from './data.d';
import {
  queryRoleUserList, cancelAuthorization,
} from './service';
import {Button, message, Modal} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from "@ant-design/icons";
import AddUserModal from "@/pages/system/role/components/AddUserModal";


/**
 *  取消授权
 * @param params
 */
const handleRemove = async (params: CancelAuthorizationParams) => {
  const hide = message.loading('正在取消授权');
  try {
    await cancelAuthorization({...params, isExist: 0});
    hide();
    message.success('取消授权成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('取消授权失败，请重试');
    return false;
  }
};

export interface SetUserListProps {
  roleId: number;
  setUserModalVisible: boolean;
}

const {confirm} = Modal;
// 设置用户
const SetUserList: React.FC<SetUserListProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const showDeleteConfirm = (params: CancelAuthorizationParams) => {
    confirm({
      title: '是否取消授权?',
      icon: <ExclamationCircleOutlined/>,
      content: '取消授权不能恢复,请确认!',
      onOk() {
        handleRemove({...params}).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

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
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            key="sort"
            onClick={() => {
              showDeleteConfirm({userIds: [record.id], roleId: props.roleId});
            }}
          >
            <EditOutlined/> 取消授权
          </a>
          
        </>
      ),
    },
  ];


  return (
    <>
      <ProTable<UserList>
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key={'new'} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 添加用户
          </Button>,
        ]}
        request={(params) => {
          return queryRoleUserList({...params, roleId: props.roleId, isExist: 1})
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedRows,
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((row) => row.id))
          }
        }}
        pagination={{pageSize: 10}}
      />

      <AddUserModal
        key={'AddUserModal'}
        onSubmit={async (value) => {
          const success = await cancelAuthorization(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        setUserModalVisible={createModalVisible}
        roleId={props.roleId || 0}
      />
      {selectedRows.length > 0 && <div style={{paddingLeft: 30}}>
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined/>}
          onClick={() => {
            showDeleteConfirm({userIds: selectedRows, roleId: props.roleId});
          }}
        >
          批量取消授权
        </Button>
      </div>}
    </>
  );
};

export default SetUserList;
