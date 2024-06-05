import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import type {MemberListItem} from './data.d';
import {queryMemberList, removeMember} from './service';
import MemberAddressModal from "@/pages/ums/member/components/MemberAddressModal";
import MemberLogModal from "@/pages/ums/member/components/MemberLoginLogModal";


const {confirm} = Modal;


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: MemberListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMember(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const MemberList: React.FC<{}> = () => {
  const [addressModalVisible, handleAddressModalVisible] = useState<boolean>(false);
  const [logModalVisible, handleLogModalVisible] = useState<boolean>(false);
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberListItem>();
  const [selectedRowsState, setSelectedRows] = useState<MemberListItem[]>([]);

  const showDeleteConfirm = (item: MemberListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<MemberListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员名',
      dataIndex: 'username',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {text: '禁用', status: 'Error'},
        1: {text: '正常', status: 'Success'},
      },
    },
    {
      title: '头像',
      dataIndex: 'icon',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      valueEnum: {
        0: {text: '女', status: 'Success'},
        1: {text: '男', status: 'Success'},
      },
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      hideInSearch: true,
    },
    {
      title: '职业',
      dataIndex: 'post',
      hideInSearch: true,
    },
    {
      title: '个性签名',
      dataIndex: 'post',
      hideInSearch: true,
    },
    {
      title: '用户来源',
      dataIndex: 'sourceType',
      hideInSearch: true,
    },
    {
      title: '积分',
      dataIndex: 'integration',
      hideInSearch: true,
    },
    {
      title: '成长值',
      dataIndex: 'growth',
      hideInSearch: true,
    },
    {
      title: '剩余抽奖次数',
      dataIndex: 'luckeyCount',
      hideInSearch: true,
    },
    {
      title: '历史积分数量',
      dataIndex: 'historyIntegration',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 300,
      render: (_, record) => (
        <>
          <a
            key="sort"
            onClick={() => {
              handleAddressModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 会员地址
          </a>
          <Divider type="vertical"/>
          <a
            key="sort"
            onClick={() => {
              handleLogModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 登录日志
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm(record);
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
      <ProTable<MemberListItem>
        headerTitle="会员列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        request={queryMemberList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 10}}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}


      {/*<CreateMemberForm*/}
      {/*  key={'CreateMemberForm'}*/}
      {/*  onSubmit={async (value) => {*/}
      {/*    const success = await handleAdd(value);*/}
      {/*    if (success) {*/}
      {/*      handleModalVisible(false);*/}
      {/*      setCurrentRow(undefined);*/}
      {/*      if (actionRef.current) {*/}
      {/*        actionRef.current.reload();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onCancel={() => {*/}
      {/*    handleModalVisible(false);*/}
      {/*    if (!showDetail){*/}
      {/*      setCurrentRow(undefined);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  createModalVisible={createModalVisible}*/}
      {/*/>*/}

      <MemberAddressModal
        key={'MemberAddressModal'}
        onSubmit={async () => {
          handleAddressModalVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleAddressModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addressModalVisible={addressModalVisible}
        memberId={currentRow?.id || 0}
      />

      <MemberLogModal
        key={'MemberLogModal'}
        onSubmit={async () => {
          handleLogModalVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
        onCancel={() => {
          handleLogModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        logModalVisible={logModalVisible}
        memberId={currentRow?.id || 0}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<MemberListItem>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberList;
