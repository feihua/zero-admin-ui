import {DeleteOutlined, EditOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Col, Row, Tree, Tag, Select} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import type {UserListItem} from './data.d';
import {
  queryUserList,
  updateUser,
  addUser,
  removeUser,
  updateUserRoleList, queryDeptAndPostList,
} from './service';
import SetRoleModal from "@/pages/system/user/components/SetRoleModal";
import {DataNode, TreeProps} from 'antd/es/tree';
import {tree} from "@/utils/utils";

const {confirm} = Modal;

/**
 * 添加节点
 * @param user
 */
const handleAdd = async (user: UserListItem) => {
  const hide = message.loading('正在添加');
  try {
    user.deptId = Number(user.deptId)
    await addUser({...user});
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
 * @param user
 */
const handleUpdate = async (user: UserListItem) => {
  const hide = message.loading('正在更新');
  try {
    user.deptId = Number(user.deptId)
    await updateUser(user);
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
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

// 用户管理
const UserList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [setRoleModalVisible, handleSetRoleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<UserListItem>();
  const [selectedRowsState, setSelectedRows] = useState<UserListItem[]>([]);

  const [deptConf, setDeptConf] = useState<DataNode[]>([]);
  const [deptId, setDeptId] = useState<number>(0);

  const showDeleteConfirm = (item: UserListItem) => {
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

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
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
      title: '状态',
      dataIndex: 'userStatus',
      renderFormItem:(text, row, index) => {
        return <Select
          value={row.value}
          options={[
            { value: '1', label: '正常' },
            { value: '0', label: '禁用' },
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.userStatus) {
          case 1:
            return <Tag color={'success'}>正常</Tag>;
          case 0:
            return <Tag>禁用</Tag>;
        }
        return <>未知{entity.userStatus }</>;
      },
    },
    {
      title: '最近登录ip',
      dataIndex: 'loginIp',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '最近登录时间',
      dataIndex: 'loginTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
      // hideInTable: true,
    },

    {
      title: '创建者',
      dataIndex: 'createBy',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
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
              handleSetRoleModalVisible(true);
              setCurrentRow(record);
            }}
          >
            分配角色
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

  useEffect(() => {
    queryDeptAndPostList().then((res) => {
      let deptList = res.data.deptList
      setDeptConf(tree(deptList, 0, 'parentId'))
    });
  }, []);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    setDeptId(Number(selectedKeys[0]))
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  return (
    <PageContainer>
      <Row gutter={24}>
        <Col span={4} style={{background: 'white', paddingTop: 24, paddingLeft: 24}}>
          <Tree
            showLine
            onSelect={onSelect}
            treeData={deptConf}
          />
        </Col>
        <Col span={20}>
          <ProTable<UserListItem>
            headerTitle="用户列表"
            actionRef={actionRef}
            rowKey="id"
            search={{
              labelWidth: 80,
              span: 6,
            }}
            toolBarRender={() => [
              <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
                <PlusOutlined/> 新建
              </Button>,
            ]}
            request={(params => {
              return queryUserList({...params, deptId: deptId})
            })}
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

          <CreateUserForm
            key={'CreateUserForm'}
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

          <UpdateUserForm
            key={'UpdateUserForm'}
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
            values={currentRow || {}}
          />

          <SetRoleModal
            key={'SetRoleModal'}
            onSubmit={async (value) => {
              const success = await updateUserRoleList(value);
              if (success) {
                handleSetRoleModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleSetRoleModalVisible(false);
              if (!showDetail) {
                setCurrentRow(undefined);
              }
            }}
            setRoleModalVisible={setRoleModalVisible}
            userId={currentRow?.id || 0}
          />
        </Col>
      </Row>


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
          <ProDescriptions<UserListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<UserListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;
