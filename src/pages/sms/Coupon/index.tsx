import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined, EyeOutlined,
} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateCouponForm from './components/CreateCouponForm';
import UpdateCouponForm from './components/UpdateCouponForm';
import type {CouponListItem} from './data.d';
import {queryCoupon, updateCoupon, addCoupon, removeCoupon} from './service';
import moment from "moment";
import CouponDetailForm from "@/pages/sms/Coupon/components/CouponDetailForm";

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: CouponListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addCoupon({...fields});
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
 * @param fields
 */
const handleUpdate = async (fields: CouponListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateCoupon(fields);
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
 * @param selectedRows
 */
const handleRemove = async (selectedRows: CouponListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeCoupon({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const CouponList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<CouponListItem>();
  const [selectedRowsState, setSelectedRows] = useState<CouponListItem[]>([]);

  const showDeleteConfirm = (item: CouponListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<CouponListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '优惠券名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '优惠券类型',
      dataIndex: 'type',
      valueEnum: {
        0: {text: '全场赠券', status: 'Error'},
        1: {text: '会员赠券', status: 'Success'},
        2: {text: '购物赠券', status: 'Success'},
        3: {text: '注册赠券', status: 'Success'},
      },
    },

    {
      title: '使用类型',
      dataIndex: 'useType',
      valueEnum: {
        0: {text: '全场通用', status: 'Error'},
        1: {text: '指定分类', status: 'Success'},
        2: {text: '指定商品', status: 'Success'},
      },
    },
    {
      title: '数量',
      dataIndex: 'count',
      hideInSearch: true,
    },
    {
      title: '面值',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '适用平台',
      dataIndex: 'platform',
      valueEnum: {
        0: {text: '全部', status: 'Error'},
        1: {text: '移动', status: 'Success'},
        2: {text: 'PC', status: 'Success'},
      },
    },
    {
      title: '每人限领张数',
      dataIndex: 'perLimit',
      hideInSearch: true,
    },
    {
      title: '使用门槛',
      dataIndex: 'minPoint',
      hideInSearch: true,
    },
    {
      title: '有效期',
      valueType: 'dateTime',
      dataIndex: 'startTime',
      render: (dom, entity) => {
        return (
          <>
            {moment(entity.startTime).format('YYYY-MM-DD')}
            至{moment(entity.startTime).format('YYYY-MM-DD')}
          </>
        );
      },
    },

    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '发行数量',
      dataIndex: 'publishCount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '已使用数量',
      dataIndex: 'useCount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '领取数量',
      dataIndex: 'receiveCount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '可领取的会员类型',
      dataIndex: 'memberLevel',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '可以领取的日期',
      dataIndex: 'enableTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '优惠码',
      dataIndex: 'code',
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
            key="eye"
            onClick={() => {
              handleDetailModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EyeOutlined/> 查看
          </a>
          <Divider type="vertical"/>
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
              showDeleteConfirm(record);
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
      <ProTable<CouponListItem>
        headerTitle="优惠券列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建优惠券
          </Button>,
        ]}
        request={queryCoupon}
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

      <CreateCouponForm
        key={'CreateCouponForm'}
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

      <UpdateCouponForm
        key={'UpdateCouponForm'}
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
        id={currentRow?.id || 0}
      />

      <CouponDetailForm
        key={'CouponDetailForm'}
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
          handleDetailModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        detailModalVisible={detailModalVisible}
        id={currentRow?.id || 0}
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
          <ProDescriptions<CouponListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<CouponListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default CouponList;
