import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateReturnApplyForm from './components/ReturnApplyDetailModel';
import type {ReturnApplyListItem} from './data.d';
import {queryReturnApply, removeReturnApply, updateReturnApply} from './service';

const {confirm} = Modal;


/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: ReturnApplyListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateReturnApply(fields);
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
const handleRemove = async (selectedRows: ReturnApplyListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeReturnApply({
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

const ReturnApplyTableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ReturnApplyListItem>();

  const showDeleteConfirm = (item: ReturnApplyListItem) => {
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

  const columns: ProColumns<ReturnApplyListItem>[] = [
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
      title: '申请时间',
      dataIndex: 'createTime',
      valueType: 'dateTime'
    },
    {
      title: '会员用户名',
      dataIndex: 'memberUserName',
    },
    {
      title: '退款金额',
      dataIndex: 'returnAmount',
      hideInSearch: true,
    },
    {
      title: '退货人姓名',
      dataIndex: 'returnName',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '退货人电话',
      dataIndex: 'returnPhone',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {text: '待处理', status: 'Error'},
        1: {text: '退货中', status: 'Success'},
        2: {text: '已完成', status: 'Success'},
        3: {text: '已拒绝', status: 'Success'},
      },
    },
    {
      title: '退货数量',
      dataIndex: 'productCount',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '商品单价',
      dataIndex: 'productPrice',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '原因',
      dataIndex: 'reason',
      hideInSearch: true,
    },
    {
      title: '处理时间',
      dataIndex: 'handleTime',
      valueType: 'dateTime'
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
            查看详情
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

  return (
    <PageContainer>
      <ProTable<ReturnApplyListItem>
        headerTitle="退货列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        request={queryReturnApply}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => console.log(selectedRows),
        }}
        pagination={{pageSize: 10}}
      />


      <UpdateReturnApplyForm
        key={'UpdateReturnApplyForm'}
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
          <ProDescriptions<ReturnApplyListItem>
            column={2}
            title={"退货详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ReturnApplyListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ReturnApplyTableList;
