import {PlusOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Space} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import SetMenuForm from './components/SetMenuForm';
import CreateRoleForm from './components/CreateRoleForm';
import UpdateRoleForm from './components/UpdateRoleForm';
import type {RoleListItem} from './data.d';
import {
  queryRoleList,
  updateRole,
  addRole,
  removeRole,
  updateRoleMenuList,
} from './service';
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
    message.error('添加失败请重试！');
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
    message.error('更新失败请重试！');
    return false;
  }
};


/**
 *  删除节点
 * @param list
 */
const handleRemove = async (list: RoleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!list) return true;
  try {
    await removeRole(list.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
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

  const [selectedRowsState, setSelectedRows] = useState<RoleListItem[]>([]);

  const showDeleteConfirm = (item: RoleListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

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
      valueEnum: {
        1: {text: '启用', status: 'Success'},
        0: {text: '禁用', status: 'Error'},
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
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined/>}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical"/>
          <Button
            type="primary"
            icon={<EditOutlined/>}
            onClick={() => {
              handleSetMenuModalVisible(true);
              setCurrentRow(record);
            }}
          >
            分配菜单
          </Button>
          <Divider type="vertical"/>
          <Button
            type="primary"
            icon={<EditOutlined/>}
            onClick={() => {
              handleSetUserModalVisible(true);
              setCurrentRow(record);
            }}
          >
            分配用户
          </Button>
          <Divider type="vertical"/>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined/>}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
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
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          console.log(selectedRowKeys, selectedRows);
          return (
            <Space size={24}>

              <span>{`容器数量: 个`}</span>
              <span>{`调用量: 次`}</span>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a>批量删除</a>
              <a>导出数据</a>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button key={'new'} type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={queryRoleList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 10}}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            type={"primary"}
            danger={true}
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

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
