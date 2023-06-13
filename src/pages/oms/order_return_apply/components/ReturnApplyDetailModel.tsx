import React, {useEffect, useState} from 'react';
import {Card, Form, message, Modal} from 'antd';
import type {CompanyAddressListItem, ReturnApplyListItem} from '../data.d';
import '../index.less'
import ReturnApplyProduct from "@/pages/oms/order_return_apply/components/ReturnApplyProduct";
import ReturnApplyBase from "@/pages/oms/order_return_apply/components/ReturnApplyBase";
import ReturnApplyHandler from "@/pages/oms/order_return_apply/components/ReturnApplyHandler";
import ReturnApplyReceive from "@/pages/oms/order_return_apply/components/ReturnApplyReceive";
import ReturnApplyInfo from "@/pages/oms/order_return_apply/components/ReturnApplyInfo";
import {queryCompanyAddress} from "@/pages/oms/order_return_apply/service";
import ReturnApplyInfoSubmit from "@/pages/oms/order_return_apply/components/ReturnApplyInfoSubmit";
import ReturnApplyHandlerSubmit from "@/pages/oms/order_return_apply/components/ReturnApplyHandlerSubmit";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: ReturnApplyListItem) => void;
  getCompanyAddressId: (companyAddressId: number) => void;
  detailModalVisible: boolean;
  currentData: ReturnApplyListItem;
}


const ReturnApplyDetailModel: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [companyAddressListItem, setCompanyAddressListItem] = useState<CompanyAddressListItem[]>([]);

  const {
    detailModalVisible,
    currentData,
    onCancel,
    getCompanyAddressId
  } = props;

  useEffect(() => {
    if (form && !detailModalVisible) {
      form.resetFields();

    } else {
      queryCompanyAddress({pageSize: 100, current: 1}).then((res) => {
        if (res.code === '000000') {
          setCompanyAddressListItem(res.data)
        } else {
          message.error(res.msg);
        }

      });
    }
  }, [props.detailModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);


  const renderContent = () => {
    return (
      <>
        <ReturnApplyProduct currentData={currentData}/>
        <Card title="服务单信息">
          <Card type="inner"><ReturnApplyBase currentData={currentData}/></Card>
          <Card style={{marginTop: 16}} type="inner"><ReturnApplyInfo currentData={currentData} addressListItem={companyAddressListItem} getCompanyAddressId={getCompanyAddressId}/></Card>
          {currentData.status === 0 && <Card style={{marginTop: 16}} type="inner"><ReturnApplyInfoSubmit onSubmit={props.onSubmit} currentData={currentData}/></Card>}
          {currentData.status !== 0 && <Card style={{marginTop: 16}} type="inner"><ReturnApplyHandler currentData={currentData}/></Card>}
          {currentData.status === 1 && <Card style={{marginTop: 16}} type="inner"><ReturnApplyHandlerSubmit onSubmit={props.onSubmit} currentData={currentData}/></Card>}
          {currentData.status === 2 && <Card style={{marginTop: 16}} type="inner"><ReturnApplyReceive currentData={currentData}/></Card>}
        </Card>
      </>
    );
  };


  return (
    <Modal forceRender destroyOnClose title="退货信息" open={detailModalVisible} onCancel={onCancel} footer={false} width={1200}>
      {renderContent()}
    </Modal>
  );
};

export default ReturnApplyDetailModel;
