import React, {useRef, useState} from 'react';
import type {ProductListItem} from '../data.d';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {queryProductList} from "@/pages/sms/Coupon/service";

export interface CreateFormProps {
  onSubmit: (values: any[]) => void;
  selectIds: number[];
}

const ProductForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const {onSubmit} = props;
  const [selectedRows, setSelectedRows] = useState<number[]>(props.selectIds);

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名',
      dataIndex: 'name',
    },
    {
      title: '货号',
      dataIndex: 'productSn',
    },
    {
      title: '促销价格',
      dataIndex: 'promotionPrice',
      hideInSearch: true,
    },
    {
      title: '市场价',
      dataIndex: 'originalPrice',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
  ];

  return (
    <ProTable<ProductListItem>
      toolBarRender={false}
      actionRef={actionRef}
      rowKey="id"
      search={{
        labelWidth: 50,
      }}
      request={queryProductList}
      columns={columns}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: (_, selectedRows1) => {
          setSelectedRows(selectedRows1.map((row) => row.id));
          onSubmit(selectedRows1)
        },
      }}
      pagination={{pageSize: 6}}
    />
  );
};

export default ProductForm;
