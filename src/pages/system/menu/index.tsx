import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateMenuForm from './components/UpdateMenuForm';
import { MenuListItem } from './data.d';
import { queryMenu, updateRule, addMenu, removeMenu, removeMenuOne } from './service';
import { tree } from '@/utils/utils';
import CreateMenuForm from '@/pages/system/menu/components/CreateMenuForm';

const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: MenuListItem) => {
  const hide = message.loading('正在添加');
  try {
    fields.orderNum = Number(fields.orderNum);
    fields.type = Number(fields.type);
    await addMenu({ ...fields });
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
const handleUpdate = async (fields: Partial<MenuListItem>) => {
  const hide = message.loading('正在更新');
  try {
    fields.orderNum = Number(fields.orderNum);
    fields.type = Number(fields.type);
    await updateRule(fields as MenuListItem);
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
    await removeMenuOne({
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
const handleRemove = async (selectedRows: MenuListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMenu({
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
  const [stepFormValues, setStepFormValues] = useState<MenuListItem>();
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<MenuListItem>();
  const [selectedRowsState, setSelectedRows] = useState<MenuListItem[]>([]);

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

  const columns: ProColumns<MenuListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '父id',
      dataIndex: 'parentId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '路径',
      dataIndex: 'url',
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      hideInSearch: true,
    },
    {
      title: '权限',
      dataIndex: 'perms',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新人',
      dataIndex: 'lastUpdateBy',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
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
            size="small"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            size="small"
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            添加子菜单
          </Button>
          <Divider type="vertical" />
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
      <ProTable<MenuListItem>
        headerTitle="菜单列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建菜单
          </Button>,
        ]}
        request={(params, sorter, filter) => queryMenu({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        postData={(data) => tree(data, 0, 'parentId')}
        pagination={false}
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

      <CreateMenuForm
        key={'CreateMenuForm'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setStepFormValues(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues(undefined);
        }}
        createModalVisible={createModalVisible}
        parentId={stepFormValues?.id || 0}
      />

      <UpdateMenuForm
        key={'UpdateMenuForm'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setStepFormValues(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues(undefined);
        }}
        updateModalVisible={updateModalVisible}
        currentData={stepFormValues || {}}
      />

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<MenuListItem>
            column={2}
            title={row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
