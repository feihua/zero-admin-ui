import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { MemberInfoListItem} from './data.d';
import {addMemberInfo, queryMemberInfoList, removeMemberInfo, updateMemberInfo, updateMemberInfoStatus} from './service';

const {confirm} = Modal;

/**
 * 添加会员信息
 * @param fields
 */
const handleAdd = async (fields: MemberInfoListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addMemberInfo({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员信息
 * @param fields
 */
const handleUpdate = async (fields: MemberInfoListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateMemberInfo(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除会员信息
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeMemberInfo(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员信息状态
 * @param ids
 * @param status
 */
const handleStatus = async (ids: number[], status: number) => {
  const hide = message.loading('正在更新状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateMemberInfoStatus({ memberInfoIds: ids, memberInfoStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MemberInfoList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberInfoListItem>();

  const showDeleteConfirm = (ids: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

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

  const columns: ProColumns<MemberInfoListItem>[] = [
    
    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      title: '注册来源：0-PC，1-APP，2-小程序',
      dataIndex: 'source',
      hideInSearch: true,
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInSearch: true,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
    },
    {
      title: '个性签名',
      dataIndex: 'signature',
      hideInSearch: true,
    },
    {
      title: '性别：0-未知，1-男，2-女',
      dataIndex: 'gender',
      hideInSearch: true,
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
    },
    {
      title: '累计消费金额',
      dataIndex: 'spendAmount',
      hideInSearch: true,
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
      title: '是否启用：0-禁用，1-启用',
      dataIndex: 'isEnabled',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
    {
      title: '是否删除',
      dataIndex: 'isDeleted',
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
              handleUpdateVisible(true);
              setCurrentRow(record);
              }
            }
          >
            <EditOutlined/> 编辑
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={ {color: '#ff4d4f'} }
            onClick={() => {
              showDeleteConfirm( [record.id]);
            }}
          >
            <DeleteOutlined/> 删除
          </a>
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
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={queryMemberInfoList}
        columns={columns}
        rowSelection={ {} }
        pagination={ {pageSize: 10}}
        tableAlertRender={ ({
                             selectedRowKeys,
                             selectedRows,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <Button
                icon={<EditOutlined/>}
                style={ {borderRadius: '5px'}}
                onClick={async () => {
                  showStatusConfirm(ids, 1)
                }}
              >批量启用</Button>
              <Button
                icon={<EditOutlined/>}
                style={ {borderRadius: '5px'} }
                onClick={async () => {
                  showStatusConfirm(ids, 0)
                }}
              >批量禁用</Button>
              <Button
                icon={<DeleteOutlined/>}
                danger
                style={ {borderRadius: '5px'} }
                onClick={async () => {
                  showDeleteConfirm(ids);
                }}
              >批量删除</Button>
            </Space>
          );
        }}
      />


      <AddModal
        key={'AddModal'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleAddVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleAddVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addVisible={addVisible}
      />

      <UpdateModal
        key={'UpdateModal'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateVisible={updateVisible}
        currentData={currentRow || {} }
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
