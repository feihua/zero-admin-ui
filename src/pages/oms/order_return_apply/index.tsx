import {EditOutlined} from '@ant-design/icons';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import ReturnApplyDetailModel from './components/ReturnApplyDetailModel';
import type {ReturnApplyListItem} from './data.d';
import {queryReturnApply, updateReturnApply} from './service';


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


const ReturnApplyTableList: React.FC = () => {
  const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ReturnApplyListItem>();

  const [companyAddressId, setCompanyAddressId] = useState<number>(0);

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
              handleDetailModalVisible(true);
              setCurrentRow(record);
            }}
          >
            查看详情
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


      <ReturnApplyDetailModel
        key={'UpdateReturnApplyForm'}
        onSubmit={async (value) => {
          value.companyAddressId = companyAddressId
          const success = await handleUpdate(value);
          if (success) {
            handleDetailModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        getCompanyAddressId={async (addressId) => {
          setCompanyAddressId(addressId)
        }}
        onCancel={() => {
          handleDetailModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        detailModalVisible={detailModalVisible}
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
