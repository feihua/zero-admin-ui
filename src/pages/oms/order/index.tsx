import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import OrderDetailModel from './components/OrderDetailModel';
import type {OrderListItem} from './data.d';
import {queryOrderList, removeOrder, updateOrder} from './service';
import NoteOrderModel from "@/pages/oms/order/components/NoteOrderModel";
import DeliveryModel from "@/pages/oms/order/components/DeliveryModel";
import OrderTrackingModel from "@/pages/oms/order/components/OrderTrackingModel";


const {confirm} = Modal;

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: OrderListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateOrder(fields);
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

const OrderTableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [closeOrderModelVisible, handleCloseOrderModelVisible] = useState<boolean>(false);
  const [deliveryModelVisible, handleDeliveryModelVisible] = useState<boolean>(false);
  const [orderTrackingModalVisible, handleOrderTrackingModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<OrderListItem>();

  const showDeleteConfirm = (item: OrderListItem) => {
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
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      hideInSearch: true,
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
      hideInTable: true,
    },
    {
      title: '运费金额',
      dataIndex: 'freightAmount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '促销优化金额',
      dataIndex: 'promotionAmount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '积分抵扣金额',
      dataIndex: 'integrationAmount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '优惠券抵扣金额',
      dataIndex: 'couponAmount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      valueEnum: {
        0: {text: '未支付', status: 'Error'},
        1: {text: '支付宝', status: 'Success'},
        2: {text: '微信', status: 'Success'},
      },
    },
    {
      title: '来源',
      dataIndex: 'sourceType',
      valueEnum: {
        0: {text: 'PC订单', status: 'Error'},
        1: {text: 'app订单', status: 'Success'},
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {text: '待付款', status: 'Success'},
        1: {text: '待发货', status: 'Success'},
        2: {text: '已发货', status: 'Success'},
        3: {text: '已完成', status: 'Success'},
        4: {text: '已关闭', status: 'Error'},
        5: {text: '无效订单', status: 'Error'},
      },
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      hideInTable: true,
      valueEnum: {
        0: {text: '正常订单', status: 'Success'},
        1: {text: '秒杀订单', status: 'Success'},
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
            icon={<EditOutlined/>}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            查看订单
          </Button>
          <Divider type="vertical"/>
          {record.status === 0 && <Button style={{background: 'rgba(254,105,204,0.9)', color: 'white'}} icon={<DeleteOutlined/>} onClick={() => {
            handleCloseOrderModelVisible(true);
            setCurrentRow(record);
          }}>关闭订单</Button>}
          {record.status === 4 && <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => {
            showDeleteConfirm(record);
          }}>删除订单</Button>}
          {record.status === 1 && <Button icon={<EditOutlined/>} onClick={() => {
            handleDeliveryModelVisible(true);
            setCurrentRow(record);
          }} style={{background: '#c762ef', color: 'white'}}>订单发货</Button>}
          {(record.status === 2 || record.status === 3) && <Button icon={<EditOutlined/>} style={{background: 'rgba(103,170,247,0.96)', color: 'white'}} onClick={() => {
            handleOrderTrackingModalVisible(true);
            setCurrentRow(record);
          }}>订单跟踪</Button>}
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
        request={queryOrderList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => console.log(selectedRows),
        }}
        pagination={{pageSize: 10}}
      />


      <OrderDetailModel
        key={'OrderDetailModel'}
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
        onRefresh={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        updateModalVisible={updateModalVisible}
        currentData={currentRow || {id: 0}}
      />

      <NoteOrderModel
        key={'CloseOrderModel'}
        onSubmit={async (value) => {
          value.status = 4
          const success = await handleUpdate(value);
          if (success) {
            handleCloseOrderModelVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleCloseOrderModelVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        closeOrderModelVisible={closeOrderModelVisible}
        currentData={currentRow || {id: 0}}
      />

      <DeliveryModel
        key={'DeliveryModel'}
        onSubmit={async (value) => {
          value.status = 2
          const success = await handleUpdate(value);
          if (success) {
            handleDeliveryModelVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleDeliveryModelVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        deliveryModelVisible={deliveryModelVisible}
        currentData={currentRow || {id: 0}}
      />

      <OrderTrackingModel
        key={'OrderTrackingModel'}
        onCancel={() => {
          handleOrderTrackingModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        orderTrackingModalVisible={orderTrackingModalVisible}
        currentData={currentRow || {id: 0}}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<OrderListItem>
            column={2}
            title={"订单详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<OrderListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default OrderTableList;
