import React from 'react';
import {Card, Table} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import type {ColumnsType} from "antd/es/table";
import '../index.less'

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
}

const ReturnApplyProduct: React.FC<ReturnApplyProductProps> = (props) => {

  const columns: ColumnsType<ReturnApplyListItem> = [
    {
      title: '商品图片',
      dataIndex: 'productPic',
      render: (text) => {
        return (
          <div>
            <img src={text} style={{width: 100, height: 80}} alt={'商品图片'}/>
          </div>
        )
      },
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
    },
    {
      title: '价格',
      dataIndex: 'productPrice',
    },
    {
      title: '货号',
      dataIndex: 'productId',
    },
    {
      title: '属性',
      dataIndex: 'productAttr',
    },
    {
      title: '数量',
      dataIndex: 'productCount',
    },
    {
      title: '小计',
      dataIndex: 'productRealPrice',
    },
  ];

  return (
    <Card title="退货商品">
      <Table columns={columns} dataSource={[props.currentData]} pagination={false} bordered/>
    </Card>
  );
};

export default ReturnApplyProduct;
