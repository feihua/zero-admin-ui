import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import type { OrderSettingListItem} from './data.d';
import {
  addOrderSetting,
  queryOrderSettingList,
  removeOrderSetting,
  updateOrderSetting,
  updateOrderSettingIsDefault,
  updateOrderSettingStatus
} from './service';

const {confirm} = Modal;

/**
 * 添加订单设置表
 * @param fields
 */
const handleAdd = async (fields: OrderSettingListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addOrderSetting({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新订单设置表
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
 *  删除订单设置表
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
 * 更新订单设置表状态
 * @param ids
 * @param status
 */
const handleStatus = async (ids: number[], status: number) => {
  const hide = message.loading('正在更新状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateOrderSettingStatus({ orderSettingIds: ids, orderSettingStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
/**
 * 更新订单设置表状态
 * @param id
 * @param status
 */
const handleIsDefaultStatus = async (id: number, status: number) => {
  const hide = message.loading('正在更新状态');
  try {
    await updateOrderSettingIsDefault({ id: id, isDefault: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const OrderSettingList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<OrderSettingListItem>();

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

  const showStatusConfirm = (ids: number[], status: number) => {
    confirm({
      title: `确定${status == 1 ? "启用" : "禁用"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(ids, status)
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };
  const showIsDefaultConfirm = (id: number, status: number) => {
    confirm({
      title: `确定${status == 1 ? "默认" : "不默认"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleIsDefaultStatus(id, status)
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };
  const columns: ProColumns<OrderSettingListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '订单完成后自动好评时间（天）',
      dataIndex: 'commentOvertime',
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
      title: '是否默认',
      dataIndex: 'isDefault',
      hideInSearch: true,
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '是'},
            {value: '0', label: '否'},
          ]}
        />

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.isDefault == 1} onChange={(flag) => {
            showIsDefaultConfirm(entity.id, flag ? 1 : 0)
          }}/>
        );
      },
    },

    {
      title: '状态',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: '1', label: '启用'},
              {value: '0', label: '禁用'},
            ]}
          />

    },
    render: (dom, entity) => {
      return (
        <Switch checked={entity.status == 1} onChange={(flag) => {
          showStatusConfirm( [entity.id], flag ? 1 : 0)
        }}/>
      );
    },
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
              }
            }
          >
            <EditOutlined/> 编辑
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={ {color: '#ff4d4f'} }
            onClick={() => {
              showDeleteConfirm( [record.id]);
            }}
          >
            <DeleteOutlined/> 删除
          </a>
        </>
      ),
    },
  ];

return (
    <PageContainer>
      <ProTable<OrderSettingListItem>
        headerTitle="订单设置表管理"
        actionRef={actionRef}
        rowKey="id"
        search={ {
          labelWidth: 120,
        } }
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={queryOrderSettingList}
        columns={columns}
        rowSelection={ {} }
        pagination={ {pageSize: 10}}
        tableAlertRender={ ({
                             selectedRowKeys,
                             selectedRows,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <Button
                icon={<EditOutlined/>}
                style={ {borderRadius: '5px'}}
                onClick={async () => {
                  showStatusConfirm(ids, 1)
                }}
              >批量启用</Button>
              <Button
                icon={<EditOutlined/>}
                style={ {borderRadius: '5px'} }
                onClick={async () => {
                  showStatusConfirm(ids, 0)
                }}
              >批量禁用</Button>
              <Button
                icon={<DeleteOutlined/>}
                danger
                style={ {borderRadius: '5px'} }
                onClick={async () => {
                  showDeleteConfirm(ids);
                }}
              >批量删除</Button>
            </Space>
          );
        }}
      />


      <CreateForm
        key={'CreateForm'}
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

      <UpdateForm
        key={'UpdateForm'}
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
        currentData={currentRow || {} }
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
          <ProDescriptions<OrderSettingListItem>
            column={2}
            title={"订单设置表详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
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
