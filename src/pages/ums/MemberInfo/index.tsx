import {
  DownOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Drawer, Dropdown, MenuProps, message, Modal, Select, Space, Switch } from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { MemberInfoListItem} from './data.d';
import {queryMemberInfoList, updateMemberInfoStatus} from './service';
import MemberAddressModal from '@/pages/ums/MemberInfo/components/MemberAddressModal';
import MemberLogModal from '@/pages/ums/MemberInfo/components/MemberLoginLogModal';

const {confirm} = Modal;


/**
 * 更新会员信息状态
 * @param ids
 * @param status
 */
const handleStatus = async (ids: number[], status: number) => {
  const hide = message.loading('正在更新状态');
  try {
    await updateMemberInfoStatus({ ids: ids, isEnabled: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MemberInfoList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberInfoListItem>();
  const [addressModalVisible, handleAddressModalVisible] = useState<boolean>(false);
  const [logModalVisible, handleLogModalVisible] = useState<boolean>(false);


  const showStatusConfirm = (ids: number[], status: number) => {
    confirm({
      title: `确定${status == 1 ? "启用" : "禁用"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(ids, status)
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a key={'resetPassword'} onClick={() => {
          handleAddressModalVisible(true);
        }}>
          会员地址
        </a>
      ),
      icon: <RedoOutlined/>
    },
    {
      key: '2',
      label: (
        <a
          key="sort"
          onClick={() => {
            handleLogModalVisible(true);
          }}
        >
          登录日志
        </a>
      ),
      icon: <PlusOutlined/>,
    },
  ]
  const columns: ProColumns<MemberInfoListItem>[] = [

    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '会员ID',
      dataIndex: 'memberId',
      hideInSearch: true,
    },
    {
      title: '等级ID',
      dataIndex: 'levelId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      render: (dom, entity) => {
          return <a onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}>{dom}</a>;
        },
    },

    {
      title: '手机号码',
      dataIndex: 'mobile',
    },
    {
      title: '注册来源',
      dataIndex: 'source',
      hideInSearch: true,
      render: (dom, entity) => {
        return entity.source === 0 ? 'PC' : entity.source === 1 ? 'APP':'小程序';
      },
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '个性签名',
      dataIndex: 'signature',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      render: (dom, entity) => {
        return entity.gender === 0 ? '未知' : entity.gender === 1 ? '男':'女';
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      hideInSearch: true,
    },
    {
      title: '成长值',
      dataIndex: 'growthPoint',
      hideInSearch: true,
    },
    {
      title: '积分',
      dataIndex: 'points',
      hideInSearch: true,
    },
    {
      title: '累计获得积分',
      dataIndex: 'totalPoints',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '累计消费金额',
      dataIndex: 'spendAmount',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '订单数',
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
      title: '退货数',
      dataIndex: 'returnCount',
      hideInSearch: true,
    },
    {
      title: '剩余抽奖次数',
      dataIndex: 'lotteryTimes',
      hideInSearch: true,
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'isEnabled',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '1', label: '是' },
              { value: '0', label: '否' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.isEnabled == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0);
            }}
          />
        );
      },

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInTable: true,
    },


    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <>

          <Dropdown menu={{items}} trigger={['click']}>
            <a onClick={(e) => {
              console.log('rocord', record);
              setCurrentRow(record);
              return e.preventDefault()
            }}>
              <Space>
                更多
                <DownOutlined/>
              </Space>
            </a>
          </Dropdown>
        </>
      ),
    },
  ];

return (
    <PageContainer>
      <ProTable<MemberInfoListItem>
        headerTitle="会员信息管理"
        actionRef={actionRef}
        rowKey="id"
        search={ {
          labelWidth: 120,
        } }
        toolBarRender={false}
        request={queryMemberInfoList}
        columns={columns}
        rowSelection={ {} }
        pagination={ {pageSize: 10}}
        tableAlertRender={false}
      />


      <MemberAddressModal
        key={'MemberAddressModal'}
        onCancel={() => {
          handleAddressModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addressModalVisible={addressModalVisible}
        memberId={currentRow?.memberId || 0}
      />

      <MemberLogModal
        key={'MemberLogModal'}
        onCancel={() => {
          handleLogModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        logModalVisible={logModalVisible}
        memberId={currentRow?.memberId||  0}
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
          <ProDescriptions<MemberInfoListItem>
            column={2}
            title={"会员信息详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberInfoListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberInfoList;
