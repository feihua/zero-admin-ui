import React from 'react';
import {Col, Row} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import '../index.less'

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
}

const ReturnApplyBase: React.FC<ReturnApplyProductProps> = (props) => {

  const item = props.currentData;

  return (
    <>
      <Row>
        <Col span={6} className={"Col"}>服务单号</Col>
        <Col span={18} className={"Col"}>{item.id}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>申请状态</Col>
        {item.status === 0 && <Col span={18} className={"Col"}>待处理</Col>}
        {item.status === 1 && <Col span={18} className={"Col"}>退货中</Col>}
        {item.status === 2 && <Col span={18} className={"Col"}>已完成</Col>}
        {item.status === 3 && <Col span={18} className={"Col"}>已拒绝</Col>}
      </Row>
      <Row>
        <Col span={6} className={"Col"}>订单编号</Col>
        <Col span={18} className={"Col"}>{item.orderSn}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>申请时间</Col>
        <Col span={18} className={"Col"}>{item.createTime}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>用户账号</Col>
        <Col span={18} className={"Col"}>{item.memberUserName}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>联系人</Col>
        <Col span={18} className={"Col"}>{item.returnName}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>联系电话</Col>
        <Col span={18} className={"Col"}>{item.returnPhone}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>退货原因</Col>
        <Col span={18} className={"Col"}>{item.reason}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>问题描述</Col>
        <Col span={18} className={"Col"}>{item.description}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>凭证图片</Col>
        <Col span={18} className={"Col"}><img src={item.productPic} style={{width: 100, height: 80}} alt={'商品图片'}/></Col>
      </Row>

    </>
  );
};

export default ReturnApplyBase;
