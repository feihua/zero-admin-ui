import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import type {MemberRuleSettingListItem} from './data.d';
import {
  addMemberRuleSetting,
  queryMemberRuleSettingList,
  removeMemberRuleSetting,
  updateMemberRuleSetting,
  updateMemberRuleSettingStatus
} from './service';

const {confirm} = Modal;

/**
 * 添加会员积分成长规则表
 * @param fields
 */
const handleAdd = async (fields: MemberRuleSettingListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addMemberRuleSetting({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员积分成长规则表
 * @param fields
 */
const handleUpdate = async (fields: MemberRuleSettingListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateMemberRuleSetting(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除会员积分成长规则表
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeMemberRuleSetting(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员积分成长规则表状态
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
    await updateMemberRuleSettingStatus({memberRuleSettingIds: ids, memberRuleSettingStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MemberRuleSettingList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberRuleSettingListItem>();

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

  const columns: ProColumns<MemberRuleSettingListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '类型',
      dataIndex: 'ruleType',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '成长值规则'},
            {value: '0', label: '积分规则'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.ruleType) {
          case 1:
            return <Tag color={'success'}>成长值规则</Tag>;
          case 0:
            return <Tag>积分规则</Tag>;
        }
        return <>未知{entity.ruleType}</>;
      },
    },
    {
      title: '每消费多少元获取1个点',
      dataIndex: 'consumePerPoint',
      hideInSearch: true,
    },
    {
      title: '连续签到天数',
      dataIndex: 'continueSignDay',
      hideInSearch: true,
    },
    {
      title: '连续签到赠送数量',
      dataIndex: 'continueSignPoint',
      hideInSearch: true,
    },


    {
      title: '最低获取点数的订单金额',
      dataIndex: 'lowOrderAmount',
      hideInSearch: true,
    },
    {
      title: '每笔订单最高获取点数',
      dataIndex: 'maxPointPerOrder',
      hideInSearch: true,
    },


    {
      title: '状态',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '启用'},
            {value: '0', label: '禁用'},
          ]}
        />

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.status == 1} onChange={(flag) => {
            showStatusConfirm([entity.id], flag ? 1 : 0)
          }}/>
        );
      },
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
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
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }
            }
          >
            <EditOutlined/> 编辑
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm([record.id]);
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
      <ProTable<MemberRuleSettingListItem>
        headerTitle="会员积分成长规则表管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={queryMemberRuleSettingList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <Button
                icon={<EditOutlined/>}
                style={{borderRadius: '5px'}}
                onClick={async () => {
                  showStatusConfirm(ids, 1)
                }}
              >批量启用</Button>
              <Button
                icon={<EditOutlined/>}
                style={{borderRadius: '5px'}}
                onClick={async () => {
                  showStatusConfirm(ids, 0)
                }}
              >批量禁用</Button>
              <Button
                icon={<DeleteOutlined/>}
                danger
                style={{borderRadius: '5px'}}
                onClick={async () => {
                  showDeleteConfirm(ids);
                }}
              >批量删除</Button>
            </Space>
          );
        }}
      />


      <CreateForm
        key={'CreateForm'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        createModalVisible={createModalVisible}
      />

      <UpdateForm
        key={'UpdateForm'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        currentData={currentRow || {}}
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
          <ProDescriptions<MemberRuleSettingListItem>
            column={2}
            title={"会员积分成长规则表详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberRuleSettingListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberRuleSettingList;
