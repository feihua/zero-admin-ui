import React from 'react';
import {Modal, Steps} from 'antd';
import type {OrderListItem} from "@/pages/oms/order/data";

export interface UpdateFormProps {
  onCancel: () => void;
  orderTrackingModalVisible: boolean;
  currentData: Partial<OrderListItem>;
}


const OrderTrackingModel: React.FC<UpdateFormProps> = (props) => {

  const {onCancel} = props

  const renderContent = () => {
    return (
      <>
        <Steps
          direction="vertical"
          size="small"
          current={7}
          items={[
            {title: '订单已提交，等待付款', description: "2017-04-01 12:00:00"},
            {title: '订单付款成功', description: "2017-04-01 12:00:00",},
            {title: '在北京市进行下级地点扫描，等待付款', description: "2017-04-01 12:00:00",},
            {title: '在分拨中心广东深圳公司进行卸车扫描，等待付款', description: "2017-04-01 12:00:00"},
            {title: '在广东深圳公司进行发出扫描', description: "2017-04-01 12:00:00"},
            {title: '到达目的地网点广东深圳公司，快件将很快进行派送', description: "2017-04-01 12:00:00"},
            {title: ' 订单已签收，期待再次为您服务', description: "2017-04-01 12:00:00"},
          ]}
        />
      </>
    );
  };


  return (
    <Modal
      forceRender
      destroyOnClose
      title="订单跟踪"
      open={props.orderTrackingModalVisible}
      onCancel={onCancel}
      footer={false}
    >
      {renderContent()}
    </Modal>
  );
};

export default OrderTrackingModel;
