import React from 'react';
import {Col, Row} from 'antd';
import type {OrderListItem} from "../data.d";
import '../index.less'

export interface ReceiveInfoProps {
  currentData: OrderListItem;
}

const ReceiveInfo: React.FC<ReceiveInfoProps> = (props) => {

  const item = props.currentData

  return (
    <>
      <Row>
        <Col span={6}>收货人</Col>
        <Col span={6}>手机号码</Col>
        <Col span={6}>邮政编码</Col>
        <Col span={6}>收货地址</Col>
      </Row>
      <Row style={{marginTop: 8}}>
        <Col span={6}>{item.receiverName}</Col>
        <Col span={6}>{item.receiverPhone}</Col>
        <Col span={6}>{item.receiverPostCode}</Col>
        <Col span={6}>{item.receiverProvince} {item.receiverCity} {item.receiverRegion} {item.receiverDetailAddress}</Col>
      </Row>
    </>
  );
};

export default ReceiveInfo;
