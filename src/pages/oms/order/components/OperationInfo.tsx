import React from 'react';
import {Table, Tag} from 'antd';
import type {ColumnsType} from "antd/es/table";
import '../index.less'
import type {OperateHistoryDataListItem} from "../data.d";

export interface OperationInfoProps {
  currentData?: OperateHistoryDataListItem[];
}

const OperationInfo: React.FC<OperationInfoProps> = (props) => {

  const columns: ColumnsType<OperateHistoryDataListItem> = [
    {
      title: '操作者',
      dataIndex: 'operateMan',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      render: (_, {orderStatus}) => (
        <>
          {orderStatus === 0 && <Tag color={orderStatus === 0 ? '#67c23a' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
            待付款
          </Tag>}
          {orderStatus === 1 && <Tag color={orderStatus === 1 ? '#67c23a' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
            待发货
          </Tag>}
          {orderStatus === 2 && <Tag color={orderStatus === 2 ? '#67c23a' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
            已发货
          </Tag>}
          {orderStatus === 3 && <Tag color={orderStatus === 3 ? '#67c23a' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
            已完成
          </Tag>}
          {orderStatus === 4 && <Tag color={orderStatus === 4 ? '#67c23a' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
            已关闭
          </Tag>}
          {orderStatus === 5 && <Tag color={orderStatus === 5 ? '#67c23a' : '#67c23a'} style={{width: 50, height: 30, textAlign: "center", paddingTop: 4}}>
            无效订单
          </Tag>}
        </>
      ),
    },
    {
      title: '付款状态',
      dataIndex: 'note',
    },
    {
      title: '发货状态',
      dataIndex: 'note',
    },
    {
      title: '备注',
      dataIndex: 'note',
    },
  ];

  return (
    <Table columns={columns} dataSource={props.currentData} pagination={false} bordered/>
  );
};

export default OperationInfo;
