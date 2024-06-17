import React, {useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import {queryProductList,} from './service';
import {ProductListItem} from "@/pages/sms/FlashPromotion/components/SetProductList/components/SetProductListItem/data";


export interface SetProductListItemProps {
  setRoleModalVisible: boolean;
  onSubmit: (items: ProductListItem[]) => void;
}

// 设置用户角色关联
const SetProductListItem: React.FC<SetProductListItemProps> = (props) => {

  const actionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '货号',
      dataIndex: 'productSn',
      hideInSearch: true,
    },


  ];


  return (
    <>
      <ProTable<ProductListItem>
        headerTitle="选择商品"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={(params) => {
          return queryProductList({...params})
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedRows,
          onChange: (_, selectedRows) => {
            props.onSubmit(selectedRows)
            setSelectedRows(selectedRows.map((row) => row.id))
          }
        }}
        pagination={{pageSize: 10}}
      />

    </>
  );
};

export default SetProductListItem;
