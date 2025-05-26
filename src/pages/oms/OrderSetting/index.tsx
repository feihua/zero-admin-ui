import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, message, Modal, Select, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { OrderSettingListItem } from './data.d';
import {
  addOrderSetting,
  queryOrderSettingList,
  removeOrderSetting,
  updateOrderSetting,
  updateOrderSettingIsDefault,
  updateOrderSettingStatus,
} from './service';

const { confirm } = Modal;

/**
 * 添加订单设置
 * @param fields
 */
const handleAdd = async (fields: OrderSettingListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addOrderSetting({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新订单设置
 * @param fields
 */
const handleUpdate = async (fields: OrderSettingListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateOrderSetting(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除订单设置
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeOrderSetting(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新订单设置状态
 * @param id
 * @param status
 */
const handleStatus = async (id: number, status: number, t: number) => {
  const hide = message.loading('正在更新状态');
  try {
    if (t == 1) {
      await updateOrderSettingStatus({ id: id, status: status });
    } else {
      await updateOrderSettingIsDefault({ id: id, status: status });
    }
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const OrderSettingList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<OrderSettingListItem>();

  const showDeleteConfirm = (ids: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  const showStatusConfirm = (id: number, status: number, t: number) => {
    confirm({
      title: `确定${status == 1 ? '启用' : '禁用'}吗？`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleStatus(id, status, t);
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<OrderSettingListItem>[] = [
    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '秒杀订单超时关闭时间(分)',
      dataIndex: 'flashOrderOvertime',
      hideInSearch: true,
    },
    {
      title: '正常订单超时时间(分)',
      dataIndex: 'normalOrderOvertime',
      hideInSearch: true,
    },
    {
      title: '发货后自动确认收货时间（天）',
      dataIndex: 'confirmOvertime',
      hideInSearch: true,
    },
    {
      title: '自动完成交易时间，不能申请售后（天）',
      dataIndex: 'finishOvertime',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '1', label: '正常' },
              { value: '0', label: '禁用' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.status == 1}
            onChange={(flag) => {
              showStatusConfirm(entity.id, flag ? 1 : 0, 1);
            }}
          />
        );
      },
    },

    {
      title: '是否默认',
      dataIndex: 'isDefault',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '1', label: '是' },
              { value: '0', label: '否' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.isDefault == 1}
            onChange={(flag) => {
              showStatusConfirm(entity.id, flag ? 1 : 0, 0);
            }}
          />
        );
      },
    },
    {
      title: '订单完成后自动好评时间（天）',
      dataIndex: 'commentOvertime',
      hideInSearch: true,
    },
    {
      title: '创建人ID',
      dataIndex: 'createBy',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新人ID',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
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
              handleUpdateVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined /> 编辑
          </a>
          <Divider type="vertical" />
          <a
            key="delete"
            style={{ color: '#ff4d4f' }}
            onClick={() => {
              showDeleteConfirm([record.id]);
            }}
          >
            <DeleteOutlined /> 删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<OrderSettingListItem>
        headerTitle="订单设置管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={queryOrderSettingList}
        columns={columns}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
        tableAlertRender={false}
      />

      <AddModal
        key={'AddModal'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleAddVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addVisible={addVisible}
      />

      <UpdateModal
        key={'UpdateModal'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateVisible={updateVisible}
        currentData={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<OrderSettingListItem>
            column={2}
            title={'订单设置详情'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<OrderSettingListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default OrderSettingList;
