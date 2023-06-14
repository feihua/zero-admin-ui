import React from 'react';
import {Col, Row} from 'antd';
import type {OrderListItem} from "../data.d";
import '../index.less'

export interface CostInfoProps {
  currentData: OrderListItem;
}

const CostInfo: React.FC<CostInfoProps> = (props) => {

  const item = props.currentData

  // //商品合计金额
  // let productPriceAll = 0.0
  // //优惠券金额
  // let couponAmountAll = 0.0
  // //积分抵扣
  // let integrationAmountAll = 0.0
  // //活动优惠
  // let promotionAmountAll = 0.0
  // //应付款金额
  // let amountAll = 0.0
  // const itemData = item.listOrderItemData;
  // for (let i = 0; i < item.listOrderItemData.length; i++) {
  //   productPriceAll = productPriceAll + (itemData[i].productPrice || 0)
  //   couponAmountAll = couponAmountAll + (itemData[i].couponAmount || 0)
  //   integrationAmountAll = integrationAmountAll + (itemData[i].integrationAmount || 0)
  //   promotionAmountAll = promotionAmountAll + (itemData[i].promotionAmount || 0)
  // }
  //
  // amountAll = productPriceAll - couponAmountAll - integrationAmountAll - promotionAmountAll - (item.discountAmount || 0)
  return (
    <>
      <Row style={{background: '#fafafa', height: 30}}>
        <Col span={6}>商品合计</Col>
        <Col span={6}>运费</Col>
        <Col span={6}>优惠券</Col>
        <Col span={6}>积分抵扣</Col>
      </Row>
      <Row style={{marginTop: 8}}>
        <Col span={6}>￥{item.totalAmount}</Col>
        <Col span={6}>￥{item.freightAmount}</Col>
        <Col span={6}>-￥{item.couponAmount}</Col>
        <Col span={6}>-￥{item.integrationAmount}</Col>
      </Row>
      <Row style={{background: '#fafafa', height: 30, marginTop: 8}}>
        <Col span={6}>活动优惠</Col>
        <Col span={6}>折扣金额</Col>
        <Col span={6}>订单总金额</Col>
        <Col span={6}>应付款金额</Col>
      </Row>
      <Row style={{marginTop: 8}}>
        <Col span={6}>-￥{item.promotionAmount}</Col>
        <Col span={6}>-￥{item.discountAmount}</Col>
        <Col span={6}><span className={'amountColor'}>￥{item.totalAmount}</span></Col>
        <Col span={6}><span className={'amountColor'}>￥{item.payAmount}</span></Col>
      </Row>
    </>
  );
};

export default CostInfo;
