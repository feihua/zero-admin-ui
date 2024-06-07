import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';
import {Button, Divider, Drawer, Dropdown, MenuProps, message, Modal, Select, Space, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import SetMenuForm from './components/SetMenuForm';
import CreateRoleForm from './components/CreateRoleForm';
import UpdateRoleForm from './components/UpdateRoleForm';
import type {RoleListItem} from './data.d';
import {addRole, queryRoleList, removeRole, updateRole, updateRoleMenuList,} from './service';
import SetUserModal from "@/pages/system/role/components/SetUserModal";

const {confirm} = Modal;

/**
 * 添加节点
 * @param item
 */
const handleAdd = async (item: RoleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRole({...item});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新节点
 * @param item
 */
const handleUpdate = async (item: RoleListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateRole(item);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};


/**
 *  删除节点
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeRole(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

// 角色管理
const RoleList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [setMenuModalVisible, handleSetMenuModalVisible] = useState<boolean>(false);
  const [setUserModalVisible, handleSetUserModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<RoleListItem>();

  const actionRef = useRef<ActionType>();


  const showDeleteConfirm = (ids: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a>
          数据权限
        </a>
      ),
      icon: <RedoOutlined/>
    },
    {
      key: '2',
      label: (
        <a
          key="sort"
          onClick={() => {
            handleSetUserModalVisible(true);
          }}
        >
          分配用户
        </a>
      ),
      icon: <PlusOutlined/>,
    },
  ]
  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '角色编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
    },
    {
      title: '角色排序',
      dataIndex: 'roleSort',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'roleStatus',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '正常'},
            {value: '0', label: '禁用'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.roleStatus) {
          case 1:
            return <Tag color={'success'}>正常</Tag>;
          case 0:
            return <Tag>禁用</Tag>;
        }
        return <>未知{entity.roleStatus}</>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: (_, record) => (
        <>
          <a
            key="sort"
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 编辑
          </a>
          <Divider type="vertical"/>
          <a
            key="sort"
            onClick={() => {
              handleSetMenuModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 分配菜单
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm([record.id]);
            }}
          >
            <DeleteOutlined/> 删除
          </a>
          <Divider type="vertical"/>
          <Dropdown menu={{items}}>
            <a onClick={(e) => {
              setCurrentRow(record);
              return e.preventDefault()
            }}>
              <Space>
                更多
                <DownOutlined/>
              </Space>
            </a>
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<RoleListItem>
        headerTitle="角色管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={queryRoleList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <Button
                icon={<DeleteOutlined/>}
                danger
                style={{borderRadius: '5px'}}
                onClick={async () => {
                  showDeleteConfirm(ids);
                }}
              >批量删除</Button>
            </Space>
          );
        }}
      />


      <CreateRoleForm
        key={'CreateRoleForm'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        createModalVisible={createModalVisible}
      />

      <UpdateRoleForm
        key={'UpdateRoleForm'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        currentData={currentRow || {}}
      />

      <SetMenuForm
        onSubmit={async (value) => {
          const success = await updateRoleMenuList(value);
          if (success) {
            handleSetMenuModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleSetMenuModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateMenuModalVisible={setMenuModalVisible}
        currentData={currentRow || {}}
      />

      <SetUserModal
        key={'SetUserModal'}
        onCancel={() => {
          handleSetUserModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        setUserModalVisible={setUserModalVisible}
        roleId={currentRow?.id || 0}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<RoleListItem>
            column={2}
            title={"角色详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<RoleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default RoleList;
