import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import UpdateOrderForm from './components/UpdateOrderForm';
import type {OrderListItem} from './data.d';
import {queryOrderList, updateOrder, removeOrder} from './service';


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
            编辑
          </Button>
          <Divider type="vertical" />
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
        pagination={{pageSize:10}}
      />


      <UpdateOrderForm
        key={'UpdateOrderForm'}
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
