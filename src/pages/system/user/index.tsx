import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  RedoOutlined
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Drawer,
  Dropdown,
  MenuProps,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Tree
} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import type {UserListItem} from './data.d';
import {
  addUser,
  queryDeptAndPostList,
  queryUserList,
  removeUser,
  updateUser,
  updateUserRoleList,
  updateUserStatus,
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
    await removeUser(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新状态
 * @param ids
 * @param status
 */
const handleStatus = async (ids: number[], status: number) => {
  const hide = message.loading('正在更新品牌推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateUserStatus({userIds: ids, userStatus: status});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
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

  const [deptConf, setDeptConf] = useState<DataNode[]>([]);
  const [deptId, setDeptId] = useState<number>(0);

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

  const showReSetPasswordConfirm = () => {
    confirm({
      title: '重置密码?',
      icon: <ExclamationCircleOutlined/>,
      // content: '删除的记录不能恢复,请确认!',
      onOk() {
        // handleRemove([item]).then(() => {
        //   actionRef.current?.reloadAndRest?.();
        // });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (item: UserListItem[], status: number) => {
    confirm({
      title: `确定${status == 1 ? "启用" : "禁用"}用户吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(item.map((x) => x.id), status)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a key={'resetPassword'} onClick={() => {
          showReSetPasswordConfirm()
        }}>
          重置密码
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
            handleSetRoleModalVisible(true);
            // setCurrentRow(record);
          }}
        >
          分配角色
        </a>
      ),
      icon: <PlusOutlined/>,
    },
  ]

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
        return (
          <Switch checked={entity.userStatus == 1} onChange={(flag) => {
            showStatusConfirm([entity], flag ? 1 : 0)
          }}/>
        );
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
      width: 220,
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

  useEffect(() => {
    queryDeptAndPostList().then((res) => {
      setDeptConf(tree(res.data.deptList, 0, 'parentId'))
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
