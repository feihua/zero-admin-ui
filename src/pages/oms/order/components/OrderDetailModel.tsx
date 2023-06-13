import React, {useEffect, useState} from 'react';
import {Card, Col, Form, Input, Modal, Row, Select, Space, Steps, Table, Tag} from 'antd';
import type {OrderListItem} from '../data.d';
import type {ColumnsType} from "antd/es/table";
import '../index.less'

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: OrderListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<OrderListItem>;
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

const OrderDetailModel: React.FC<UpdateFormProps> = (props) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  // const next = () => {
  //   setCurrent(current + 1);
  // };
  //
  // const prev = () => {
  //   setCurrent(current - 1);
  // };

  const items = steps.map((item) => ({key: item.title, title: item.title}));

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    currentData,
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();

    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as OrderListItem);
    }
  };

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },

  ];
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const renderContent = () => {
    return (
      <>
        <Space direction="vertical" size="large" style={{display: 'flex'}}>
          <Steps current={current} items={items}/>
          <Card title="当前订单状态：待发货">
            <Card type="inner" title="基本信息" extra={<a href="#">More</a>}>
              <Row style={{background: '#fafafa', height: 30}}>
                <Col span={4}>订单编号</Col>
                <Col span={4}>发货单流水号</Col>
                <Col span={4}>用户账户</Col>
                <Col span={4}>支付方式</Col>
                <Col span={4}>订单来源</Col>
                <Col span={4}>订单类型</Col>
              </Row>
              <Row style={{marginTop: 8}}>
                <Col span={4}>201809150102000002</Col>
                <Col span={4}>暂无</Col>
                <Col span={4}>test</Col>
                <Col span={4}>支付宝</Col>
                <Col span={4}>APP订单</Col>
                <Col span={4}>正常订单</Col>
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
                <Col span={4}>暂无</Col>
                <Col span={4}>暂无</Col>
                <Col span={4}>15天</Col>
                <Col span={4}>13284</Col>
                <Col span={4}>13284</Col>
                <Col span={4}>单品促销,打折优...</Col>
              </Row>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="收货人信息" extra={<a href="#">More</a>}>
              <Row>
                <Col span={6}>收货人</Col>
                <Col span={6}>手机号码</Col>
                <Col span={6}>邮政编码</Col>
                <Col span={6}>收货地址</Col>
              </Row>
              <Row style={{marginTop: 8}}>
                <Col span={6}>大梨</Col>
                <Col span={6}>18033441849</Col>
                <Col span={6}>518000</Col>
                <Col span={6}>广东省 深圳市 福田区 东晓街道</Col>
              </Row>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="商品信息" extra={<a href="#">More</a>}>
              <Table columns={columns} dataSource={data} pagination={false} bordered/>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="费用信息" extra={<a href="#">More</a>}>
              <Row style={{background: '#fafafa', height: 30}}>
                <Col span={4}>订单编号</Col>
                <Col span={4}>发货单流水号</Col>
                <Col span={4}>用户账户</Col>
                <Col span={4}>支付方式</Col>
                <Col span={4}>订单来源</Col>
                <Col span={4}>订单类型</Col>
              </Row>
              <Row style={{marginTop: 8}}>
                <Col span={4}>201809150102000002</Col>
                <Col span={4}>暂无</Col>
                <Col span={4}>test</Col>
                <Col span={4}>支付宝</Col>
                <Col span={4}>APP订单</Col>
                <Col span={4}>正常订单</Col>
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
                <Col span={4}>暂无</Col>
                <Col span={4}>暂无</Col>
                <Col span={4}>15天</Col>
                <Col span={4}>13284</Col>
                <Col span={4}>13284</Col>
                <Col span={4}>单品促销,打折优...</Col>
              </Row>
            </Card>
            <Card style={{marginTop: 16}} type="inner" title="操作信息" extra={<a href="#">More</a>}>
              <Table columns={columns} dataSource={data} pagination={false} bordered/>
            </Card>
          </Card>
        </Space>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="订单详情"
      open={updateModalVisible}
      {...modalFooter}
      width={1200}
    >
      {renderContent()}
    </Modal>
  );
};

export default OrderDetailModel;
