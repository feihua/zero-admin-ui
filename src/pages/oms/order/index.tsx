import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, message, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateOrderForm from './components/UpdateOrderForm';
import { OrderListItem } from './data.d';
import { queryOrderList, updateOrder, removeOrder } from './service';


const { confirm } = Modal;

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: Partial<OrderListItem>) => {
  const hide = message.loading('正在更新');
  try {
    await updateOrder(fields as OrderListItem);
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
    await removeOrder({
      ids: [id],
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
const handleRemove = async (selectedRows: OrderListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeOrder({
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
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<OrderListItem>();
  const [selectedRowsState, setSelectedRows] = useState<OrderListItem[]>([]);

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

  const columns: ProColumns<OrderListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '用户帐号',
      dataIndex: 'memberUserName',
    },
    {
      title: '订单总金额',
      dataIndex: 'totalAmount',
      hideInSearch: true,
    },
    {
      title: '应付金额',
      dataIndex: 'payAmount',
      hideInSearch: true,
    },
    {
      title: '运费金额',
      dataIndex: 'freightAmount',
      hideInSearch: true,
    },
    {
      title: '促销优化金额',
      dataIndex: 'promotionAmount',
      hideInSearch: true,
    },
    {
      title: '积分抵扣金额',
      dataIndex: 'integrationAmount',
      hideInSearch: true,
    },
    {
      title: '优惠券抵扣金额',
      dataIndex: 'couponAmount',
      hideInSearch: true,
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueEnum: {
        0: { text: '未支付', status: 'Success' },
        1: { text: '支付宝', status: 'Success' },
        2: { text: '微信', status: 'Success' },
      },
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      valueEnum: {
        0: { text: 'PC订单', status: 'Success' },
        1: { text: 'app订单', status: 'Success' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '待付款', status: 'Success' },
        1: { text: '待发货', status: 'Success' },
        2: { text: '已发货', status: 'Success' },
        3: { text: '已完成', status: 'Success' },
        4: { text: '已关闭', status: 'Success' },
        5: { text: '无效订单', status: 'Success' },
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
      <ProTable<OrderListItem>
        headerTitle="订单列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        request={(params, sorter, filter) => queryOrderList({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize:10}}
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

      <UpdateOrderForm
        key={'UpdateOrderForm'}
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
        currentData={stepFormValues}
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
          <ProDescriptions<OrderListItem>
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
