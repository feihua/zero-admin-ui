import React from 'react';
import {Col, Row} from 'antd';
import type {OrderListItem} from "../data.d";
import '../index.less'

export interface BaseInfoProps {
  currentData: OrderListItem;
}

const BaseInfo: React.FC<BaseInfoProps> = (props) => {

  const item = props.currentData
  return (
    <>
      <Row style={{background: '#fafafa', height: 30}}>
        <Col span={4}>订单编号</Col>
        <Col span={4}>发货单流水号</Col>
        <Col span={4}>用户账户</Col>
        <Col span={4}>支付方式</Col>
        <Col span={4}>订单来源</Col>
        <Col span={4}>订单类型</Col>
      </Row>
      <Row style={{marginTop: 8}}>
        <Col span={4}>{item.orderSn}</Col>
        <Col span={4}>{item.deliverySn}</Col>
        <Col span={4}>{item.memberUserName}</Col>
        {item.payType === 0 && <Col span={4}>未支付</Col>}
        {item.payType === 1 && <Col span={4}>支付宝</Col>}
        {item.payType === 2 && <Col span={4}>微信</Col>}
        {item.sourceType === 0 && <Col span={4}>PC订单</Col>}
        {item.sourceType === 1 && <Col span={4}>app订单</Col>}
        {item.orderType === 0 && <Col span={4}>正常订单</Col>}
        {item.orderType === 1 && <Col span={4}>秒杀订单</Col>}
      </Row>
      <Row style={{background: '#fafafa', height: 30, marginTop: 8}}>
        <Col span={4}>配送方式</Col>
        <Col span={4}>物流单号</Col>
        <Col span={4}>自动确认收货时间</Col>
        <Col span={4}>订单可得优币</Col>
        <Col span={4}>订单可得成长值</Col>
        <Col span={4}>活动信息</Col>
      </Row>
      <Row style={{marginTop: 8}}>
        <Col span={4}>{item.deliveryCompany}</Col>
        <Col span={4}>{item.deliverySn}</Col>
        <Col span={4}>{item.autoConfirmDay}</Col>
        <Col span={4}>{item.integration}</Col>
        <Col span={4}>{item.growth}</Col>
        <Col span={4}>{item.promotionInfo}</Col>
      </Row>
    </>
  );
};

export default BaseInfo;
