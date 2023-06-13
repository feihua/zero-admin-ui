import React from 'react';
import {Col, Row} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import '../index.less'

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
}

const ReturnApplyReceive: React.FC<ReturnApplyProductProps> = (props) => {

  const item = props.currentData
  return (
    <>
      <Row>
        <Col span={6} className={"Col"}>收货人员</Col>
        <Col span={18} className={"Col"}>{item.receiveMan}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>收货时间</Col>
        <Col span={18} className={"Col"}>{item.receiveTime}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>收货备注</Col>
        <Col span={18} className={"Col"}>{item.receiveNote}</Col>
      </Row>
    </>
  );
};

export default ReturnApplyReceive;
