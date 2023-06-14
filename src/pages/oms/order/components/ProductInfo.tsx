import React from 'react';
import {Col, Row, Table} from 'antd';
import type {OrderItemDataListItem} from "../data.d";
import type {ColumnsType} from "antd/es/table";
import '../index.less'

export interface OrderItemProps {
  currentData?: OrderItemDataListItem[];
  totalAmount: number;
}

const ProductInfo: React.FC<OrderItemProps> = (props) => {

  const columns: ColumnsType<OrderItemDataListItem> = [
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
      render: (text) => {
        return (
          <div>
            -￥{text}
          </div>
        )
      },
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
      dataIndex: 'productQuantity',
    },
    {
      title: '小计',
      dataIndex: 'realAmount',
      render: (text) => {
        return (
          <div>
            -￥{text}
          </div>
        )
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={props.currentData} pagination={false} bordered/>
      <Row style={{marginTop: 20}}>
        <Col span={20}></Col>
        <Col span={4} style={{fontSize: 20}}>合计：<span className={'amountColor'}>￥{props.totalAmount}</span></Col>
      </Row>
    </>
  );
};

export default ProductInfo;
