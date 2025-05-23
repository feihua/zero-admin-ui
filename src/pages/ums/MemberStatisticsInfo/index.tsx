import {EditOutlined} from '@ant-design/icons';
import {Divider, Drawer} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {MemberStatisticsInfoListItem} from './data.d';
import {queryMemberStatisticsInfoList} from './service';


const MemberStatisticsInfoList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberStatisticsInfoListItem>();

  const columns: ProColumns<MemberStatisticsInfoListItem>[] = [

    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '会员id',
      dataIndex: 'memberId',
    },
    {
      title: '累计消费金额',
      dataIndex: 'consumeAmount',
      hideInSearch: true,
    },
    {
      title: '订单数量',
      dataIndex: 'orderCount',
      hideInSearch: true,
    },
    {
      title: '优惠券数量',
      dataIndex: 'couponCount',
      hideInSearch: true,
    },
    {
      title: '评价数',
      dataIndex: 'commentCount',
      hideInSearch: true,
    },
    {
      title: '退货数量',
      dataIndex: 'returnOrderCount',
      hideInSearch: true,
    },
    {
      title: '登录次数',
      dataIndex: 'loginCount',
      hideInSearch: true,
    },
    {
      title: '关注数量',
      dataIndex: 'attendCount',
      hideInSearch: true,
    },
    {
      title: '粉丝数量',
      dataIndex: 'fansCount',
      hideInSearch: true,
    },
    {
      title: '收藏的商品数量',
      dataIndex: 'collectProductCount',
      hideInSearch: true,
    },
    {
      title: '收藏的专题活动数量',
      dataIndex: 'collectSubjectCount',
      hideInSearch: true,
    },
    {
      title: '收藏的评论数量',
      dataIndex: 'collectTopicCount',
      hideInSearch: true,
    },
    {
      title: '收藏的专题活动数量',
      dataIndex: 'collectCommentCount',
      hideInSearch: true,
    },
    {
      title: '邀请好友数',
      dataIndex: 'inviteFriendCount',
      hideInSearch: true,
    },
    {
      title: '最后一次下订单时间',
      dataIndex: 'recentOrderTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <>
          <a
            key="sort"
            onClick={() => {
              setShowDetail(true);
              setCurrentRow(record);
            }
            }
          >
            <EditOutlined/> 查看详情
          </a>
          <Divider type="vertical"/>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<MemberStatisticsInfoListItem>
        headerTitle="会员统计信息"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        request={queryMemberStatisticsInfoList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={false}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<MemberStatisticsInfoListItem>
            column={2}
            title={"会员统计信息详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberStatisticsInfoListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberStatisticsInfoList;
