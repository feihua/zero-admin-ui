import React, {useEffect, useRef, useState} from 'react';
import {Card, Descriptions, Modal, Select, Tag} from 'antd';
import {CouponDetailData, CouponHistoryListItem, CouponListItem} from '../data.d';
import {queryCouponDetail, queryCouponHistoryList} from "@/pages/sms/coupon/service";

import ProTable, {type ActionType, type ProColumns} from "@ant-design/pro-table";
import moment from "moment/moment";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: CouponListItem) => void;
  detailModalVisible: boolean;
  id: number;

}

const CouponDetailForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const [flag, setFlag] = useState<boolean>(false)
  const [couponDetail, setCouponDetail] = useState<CouponDetailData>({
    amount: 0,
    code: "",
    count: 0,
    enableTime: "",
    endTime: "",
    id: 0,
    memberLevel: 0,
    minPoint: 0,
    name: "",
    note: "",
    perLimit: 0,
    platform: 0,
    publishCount: 0,
    receiveCount: 0,
    startTime: "",
    type: 0,
    useCount: 0,
    useType: 0

  });


  const {
    detailModalVisible,
    id,
    onCancel
  } = props;

  useEffect(() => {

    if (detailModalVisible) {
      queryCouponDetail(id).then((res) => {
        setCouponDetail(res.data)
        let now = moment().format('YYYY-MM-DD HH+mm:ss')
        let date = moment(res.data.endTime).format('YYYY-MM-DD HH+mm:ss')

        setFlag(now <= date)
      });
    }
  }, [props.detailModalVisible]);


  const columns: ProColumns<CouponHistoryListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '优惠码',
      dataIndex: 'couponCode',
      hideInSearch: true,
    },
    {
      title: '领取会员',
      dataIndex: 'memberNickName',
      hideInSearch: true,
    },
    {
      title: '领取方式',
      dataIndex: 'getType',
      hideInSearch: true,
      // 获取类型：0->后台赠送；1->主动获取
      render: (dom, entity) => {
        switch (entity.getType) {
          case 0:
            return <Tag>后台赠送</Tag>;
          case 1:
            return <Tag>主动获取</Tag>;
        }
        return <>未知{entity.getType}</>;
      },
    },
    {
      title: '当前状态',
      dataIndex: 'useStatus',
      renderFormItem: (text, row, index) => {
        // 使用状态：0->未使用；1->已使用；2->已过期
        return <Select
          value={row.value}
          options={[
            {value: '0', label: '未使用'},
            {value: '1', label: '已使用'},
            {value: '2', label: '已过期'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.useStatus) {
          case 0:
            return <Tag>未使用</Tag>;
          case 1:
            return <Tag color={'success'}>已使用</Tag>;
          case 2:
            return <Tag color={'grey'}>已过期</Tag>;
        }
        return <>未知{entity.useStatus}</>;
      },
    },
    {
      title: '使用时间',
      dataIndex: 'useTime',
      hideInSearch: true,

    },
    {
      title: '订单号',
      dataIndex: 'orderId',
    },
  ];


  return (
    <Modal
      forceRender
      destroyOnClose
      title="优惠券详情"
      open={detailModalVisible}
      footer={false}
      width={1200}
      onCancel={onCancel}
    >

      <Card type="inner" title="优惠券基本信息">
        <Descriptions column={4}>
          <Descriptions.Item label="名称">
            {couponDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label="优惠券类型">
            {couponDetail.type}
          </Descriptions.Item>
          <Descriptions.Item label="可使用商品">
            {couponDetail.useType}
          </Descriptions.Item>
          <Descriptions.Item label="使用门槛">
            {couponDetail.minPoint}元
          </Descriptions.Item>
          <Descriptions.Item label="面值">
            {couponDetail.amount}元
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            {flag ? "未过期" : "已过期"}
          </Descriptions.Item>

          <Descriptions.Item label="总发行量">
            {couponDetail.publishCount}
          </Descriptions.Item>
          <Descriptions.Item label="已领取">
            {couponDetail.receiveCount}
          </Descriptions.Item>
          <Descriptions.Item label="待领取">
            {couponDetail.publishCount - couponDetail.receiveCount}
          </Descriptions.Item>
          <Descriptions.Item label="已使用">
            {couponDetail.useCount}
          </Descriptions.Item>
          <Descriptions.Item label="未使用">
            {couponDetail.publishCount - couponDetail.useCount}
          </Descriptions.Item>
          <Descriptions.Item label="有效期">
            {moment(couponDetail.startTime).format('YYYY-MM-DD')}
            至{moment(couponDetail.enableTime).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        style={{marginTop: 16}}
        type="inner"
        title="优惠券领取详情"
      >
        <ProTable<CouponHistoryListItem>
          toolBarRender={false}
          actionRef={actionRef}
          rowKey="id"
          search={{
            labelWidth: 80,
            span: 8
          }}
          request={queryCouponHistoryList}
          columns={columns}
          rowSelection={false}
          pagination={{pageSize: 6}}
        />
      </Card>

    </Modal>
  );
};

export default CouponDetailForm;
