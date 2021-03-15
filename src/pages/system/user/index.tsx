import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import EditRoleForm from './components/EditRoleForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import {
  queryRule,
  updateUser,
  addUser,
  removeUser,
  removeUserOne,
  updateUserRole,
} from './service';

import ProForm, { ModalForm, ProFormText,ProFormSelect,ProFormRadio} from '@ant-design/pro-form';

const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
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
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateUser({
      name: fields.name,
      nick_name: fields.nick_name,
      email: fields.email,
      id: fields.id,
      mobile: fields.mobile,
      dept_id: fields.dept_id,
      status: fields.status,
      role_id: fields.role_id,
    });
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
 * 更新节点
 * @param fields
 */
const handleUpdateRole = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateUserRole({
      id: fields.id,
      role_id: fields.role_id,
    });
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
 *  删除节点(单个)
 * @param id
 */
const handleRemoveOne = async (id: number) => {
  const hide = message.loading('正在删除');
  try {
    await removeUserOne({
      id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeUser({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(false);
  const [stepRoleFormValues, setStepRoleFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemoveOne(id).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'name',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '用户名为必填项',
      //     },
      //   ],
      // },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '昵称',
      dataIndex: 'nick_name',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '昵称为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '手机号为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '邮箱为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '正常', status: 'Success' },
      },
    },
    {
      title: '部门',
      dataIndex: 'dept_id',
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       message: '部门为必填项',
      //     },
      //   ],
      // },
    },
    {
      title: '创建人',
      dataIndex: 'create_by',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '更新人',
      dataIndex: 'last_update_by',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'last_update_time',
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          {/*<Button*/}
          {/*  type="primary"*/}
          {/*  size="small"*/}
          {/*  onClick={() => {*/}
          {/*    handleEditModalVisible(true);*/}
          {/*    setStepRoleFormValues(record);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  分配角色*/}
          {/*</Button>*/}
          {/*<Divider type="vertical" />*/}
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => {
              showDeleteConfirm(record.id);
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
      <ProTable<TableListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建用户
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
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

      <ModalForm
        title="新建用户"
        width="480px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as TableListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="name"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名！' }]}
          />
          <ProFormText
            name="nick_name"
            label="昵称"
            rules={[{ required: true, message: '请输入昵称！' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="mobile"
            label="手机号码"
            rules={[{ required: true, message: '请输入手机号码！' }]}
          />

          <ProFormText
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱！' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="dept_id"
            label="部门"
            rules={[{ required: true, message: '请输入部门！' }]}
          />

          <ProFormRadio.Group
            name="status"
            label="状态"
            width={1}
            options={[
              {
                label: '正常',
                value: 'a',
              },
              {
                label: '禁用',
                value: 'b',
              },
            ]}
          />

        </ProForm.Group>
        <ProFormSelect
          name="role_id"
          label="角色"
          style={{ width: '100%' }}
          request={async () => [
            { label: '超级管理员', value: '1' },
            { label: '项目经理', value: '2' },
            { label: '开发人员', value: '3' },
            { label: '测试人员', value: '4' },
          ]}
          placeholder="Please select a role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        />
      </ModalForm>

      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      {stepRoleFormValues && Object.keys(stepRoleFormValues).length ? (
        <EditRoleForm
          onSubmit={async (value) => {
            const success = await handleUpdateRole(value);
            if (success) {
              handleEditModalVisible(false);
              setStepRoleFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleEditModalVisible(false);
            setStepRoleFormValues({});
          }}
          editModalVisible={editModalVisible}
          values={stepRoleFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<TableListItem>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
