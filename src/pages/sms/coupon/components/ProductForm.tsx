import React, {useRef} from 'react';
import type {ProductListItem} from '../data.d';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {queryProductList} from "@/pages/sms/coupon/service";

export interface CreateFormProps {
  onSubmit: (values: any[]) => void;
}

const ProductForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const {onSubmit} = props;


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
        onChange: (_, selectedRows) => onSubmit(selectedRows),
      }}
      pagination={{pageSize: 6}}
    />
  );
};

export default ProductForm;
