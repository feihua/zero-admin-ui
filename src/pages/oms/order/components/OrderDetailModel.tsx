import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Form, Input, message, Modal, Row, Space, Steps} from 'antd';
import type {OrderListItem} from '../data.d';
import '../index.less'
import OperationInfo from "@/pages/oms/order/components/OperationInfo";
import ProductInfo from "@/pages/oms/order/components/ProductInfo";
import ReceiveInfo from "@/pages/oms/order/components/ReceiveInfo";
import BaseInfo from "@/pages/oms/order/components/BaseInfo";
import CostInfo from "@/pages/oms/order/components/CostInfo";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {removeOrder} from "@/pages/oms/order/service";

export interface UpdateFormProps {
  onCancel: () => void;
  onRefresh: () => void;
  onSubmit: (values: OrderListItem) => void;
  updateModalVisible: boolean;
  currentData: OrderListItem;
}

const steps = [
  {
    title: '提交订单',
    nextPrompt: '下一步,填写商品促销',
  },
  {
    title: '支付订单',
    nextPrompt: '下一步,填写商品属性',
    prePrompt: '上一步,填写商品信息',
  },
  {
    title: '平台发货',
    nextPrompt: '下一步,选择商品关联',
    prePrompt: '上一步,填写商品促销',
  },
  {
    title: '确认收货',
    prePrompt: '上一步,填写商品属性',
  },
  {
    title: '完成评价',
    prePrompt: '上一步,填写商品属性',
  },
];

const {confirm} = Modal;

const handleRemove = async (selectedRows: OrderListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeOrder({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const OrderDetailModel: React.FC<UpdateFormProps> = (props) => {
  const [current, setCurrent] = useState(0);
  const [closeOrderModelVisible, handleCloseOrderModelVisible] = useState<boolean>(false);
  const [deliveryModelVisible, handleDeliveryModelVisible] = useState<boolean>(false);
  const [orderTrackingModalVisible, handleOrderTrackingModalVisible] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("当前订单状态: 待付款");

  const items = steps.map((item) => ({key: item.title, title: item.title}));

  const {
    onSubmit,
    onCancel,
    onRefresh,
    updateModalVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (currentData) {
      if (currentData.status === 0) {
        setStatusMsg("当前订单状态: 待付款")
        setCurrent(0)
      } else if (currentData.status === 1) {
        setStatusMsg("当前订单状态: 待发货")
        setCurrent(2)
      } else if (currentData.status === 2) {
        setStatusMsg("当前订单状态: 已发货")
        setCurrent(3)
      } else if (currentData.status === 3) {
        setStatusMsg("当前订单状态: 已完成")
        setCurrent(4)
      } else if (currentData.status === 4) {
        setStatusMsg("当前订单状态: 已关闭")
        setCurrent(1)
      } else if (currentData.status === 5) {
        setStatusMsg("当前订单状态: 无效订单")
        setCurrent(0)
      }
    }
  }, [props.currentData]);

  const showDeleteConfirm = (item: OrderListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then(() => {
          onRefresh()
        });
      },
      onCancel() {
      },
    });
  };

  const renderOps = () => {
    return (
      <>
        <Space>
          <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => {
            handleCloseOrderModelVisible(true);
          }}>关闭订单</Button>
          {currentData.status === 0 && <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => {
            handleCloseOrderModelVisible(true);
          }}>关闭订单</Button>}
          {currentData.status === 4 && <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => {
            showDeleteConfirm(currentData);
          }}>删除订单</Button>}
          {currentData.status === 1 && <Button icon={<EditOutlined/>} onClick={() => {
            handleDeliveryModelVisible(true);
          }} style={{background: '#c762ef', color: 'white'}}>订单发货</Button>}
          {(currentData.status === 2 || currentData.status === 3) && <Button icon={<EditOutlined/>} style={{background: 'rgba(103,170,247,0.96)', color: 'white'}} onClick={() => {
            handleOrderTrackingModalVisible(true);
          }}>订单跟踪</Button>}
        </Space>
      </>
    )
  }
  const renderContent = () => {
    return (
      <>
        <Space direction="vertical" size="large" style={{display: 'flex'}}>
          <Steps current={current} items={items}/>
          <Card title={statusMsg} extra={renderOps}>
            <Card type="inner" title="基本信息">
              <BaseInfo currentData={currentData}/>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="收货人信息">
              <ReceiveInfo currentData={currentData}/>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="商品信息">
              <ProductInfo currentData={currentData.listOrderItemData} totalAmount={currentData.totalAmount || 0}/>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="费用信息">
              <CostInfo currentData={currentData}/>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="操作信息">
              <OperationInfo currentData={currentData.listOperateHistoryData}/>
            </Card>
          </Card>
        </Space>
      </>
    );
  };

  return (
    <Modal forceRender destroyOnClose title="订单详情" open={updateModalVisible} onCancel={onCancel} footer={false} width={1200}>
      {renderContent()}
    </Modal>
  );
};

export default OrderDetailModel;
