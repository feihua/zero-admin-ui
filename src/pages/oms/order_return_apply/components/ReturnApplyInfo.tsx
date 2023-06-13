import React, {useEffect, useState} from 'react';
import {Col, Row, Select} from 'antd';
import type {ReturnApplyListItem} from '../data.d';
import type {CompanyAddressListItem} from "../data.d";
import '../index.less'

export interface ReturnApplyProductProps {
  currentData: ReturnApplyListItem;
  addressListItem: CompanyAddressListItem[];
  getCompanyAddressId: (companyAddressId: number) => void;
}

const ReturnApplyInfo: React.FC<ReturnApplyProductProps> = (props) => {

  const item = props.currentData
  const companyAddressListItem = props.addressListItem

  const [companyAddressItem, setCompanyAddressItem] = useState<CompanyAddressListItem>();

  //初始化
  useEffect(() => {
    //待发货的时候, 默认选择第一个地址
    if (item.status === 0) {
      setCompanyAddressItem(companyAddressListItem[0])
    }

  }, [companyAddressListItem]);

  const handleChange = (value: string) => {
    if (companyAddressListItem) {
      for (let i = 0; i < companyAddressListItem.length; i++) {
        if (companyAddressListItem[i].id === Number(value)) {
          setCompanyAddressItem(companyAddressListItem[i])
          props.getCompanyAddressId(companyAddressListItem[i].id || 0)
        }
      }
    }
  };

  return (
    <>
      <Row>
        <Col span={6} className={"Col"}>订单金额</Col>
        <Col span={18} className={"Col"}>{item.productRealPrice}</Col>
      </Row>
      <Row>
        <Col span={6} className={"Col"}>确认退款金额</Col>
        <Col span={18} className={"Col"}>{item.returnAmount}</Col>
      </Row>
      {item.status !== 3 && <>
        <Row>
          <Col span={6} className={"Col"}>选择收货点</Col>
          <Col span={18} className={"Col"}><Select id="brandId" placeholder={'选择收货点'} onChange={handleChange} disabled={item.status !== 0}>
            {companyAddressListItem.map(r => <Select.Option key={r.id} value={r.id}>{r.addressName}</Select.Option>)}
          </Select></Col>
        </Row>
        <Row>
          <Col span={6} className={"Col"}>收货人姓名</Col>
          <Col span={18} className={"Col"}>{companyAddressItem?.name}</Col>
        </Row>
        <Row>
          <Col span={6} className={"Col"}>所在区域</Col>
          <Col span={18} className={"Col"}>{companyAddressItem?.province} {companyAddressItem?.city} {companyAddressItem?.region}</Col>
        </Row>
        <Row>
          <Col span={6} className={"Col"}>详细地址</Col>
          <Col span={18} className={"Col"}>{companyAddressItem?.detailAddress}</Col>
        </Row>
        <Row>
          <Col span={6} className={"Col"}>联系电话</Col>
          <Col span={18} className={"Col"}>{companyAddressItem?.phone}</Col>
        </Row>
      </>}


    </>
  );
};

export default ReturnApplyInfo;
