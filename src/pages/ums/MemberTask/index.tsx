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
import type { MemberTaskListItem} from './data.d';
import {addMemberTask, queryMemberTaskList, removeMemberTask, updateMemberTask, updateMemberTaskStatus} from './service';

const {confirm} = Modal;

/**
 * 添加会员任务
 * @param fields
 */
const handleAdd = async (fields: MemberTaskListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addMemberTask({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员任务
 * @param fields
 */
const handleUpdate = async (fields: MemberTaskListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateMemberTask(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除会员任务
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeMemberTask(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员任务状态
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
    await updateMemberTaskStatus({ memberTaskIds: ids, memberTaskStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MemberTaskList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberTaskListItem>();

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

  const columns: ProColumns<MemberTaskListItem>[] = [
    
    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '任务名称',
      dataIndex: 'taskName',
      hideInSearch: true,
      render: (dom, entity) => {
          return <a onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}>{dom}</a>;
        },
    },
    
    {
      title: '任务描述',
      dataIndex: 'taskDesc',
      hideInSearch: true,
    },
    {
      title: '赠送成长值',
      dataIndex: 'taskGrowth',
      hideInSearch: true,
    },
    {
      title: '赠送积分',
      dataIndex: 'taskIntegral',
      hideInSearch: true,
    },
    {
      title: '任务类型：0-新手任务，1-日常任务，2-周常任务，3-月常任务',
      dataIndex: 'taskType',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: '1', label: '正常'},
              {value: '0', label: '禁用'},
            ]}
          />

    },
    render: (dom, entity) => {
        switch (entity.taskType) {
          case 1:
            return <Tag color={'success'}>正常</Tag>;
          case 0:
            return <Tag>禁用</Tag>;
        }
        return <>未知{entity.taskType}</>;
      },
    },
    
    {
      title: '需要完成次数',
      dataIndex: 'completeCount',
      hideInSearch: true,
    },
    {
      title: '奖励类型：0-积分成长值，1-优惠券，2-抽奖次数',
      dataIndex: 'rewardType',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: '1', label: '正常'},
              {value: '0', label: '禁用'},
            ]}
          />

    },
    render: (dom, entity) => {
        switch (entity.rewardType) {
          case 1:
            return <Tag color={'success'}>正常</Tag>;
          case 0:
            return <Tag>禁用</Tag>;
        }
        return <>未知{entity.rewardType}</>;
      },
    },
    
    {
      title: '奖励参数JSON',
      dataIndex: 'rewardParams',
      hideInSearch: true,
    },
    {
      title: '任务开始时间',
      dataIndex: 'startTime',
      hideInSearch: true,
    },
    {
      title: '任务结束时间',
      dataIndex: 'endTime',
      hideInSearch: true,
    },
    {
      title: '状态：0-禁用，1-启用',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: '1', label: '正常'},
              {value: '0', label: '禁用'},
            ]}
          />

    },
    render: (dom, entity) => {
      return (
        <Switch checked={entity.status == 1} onChange={(flag) => {
          showStatusConfirm( [entity.id], flag ? 1 : 0)
        }}/>
      );
    },
    },
    
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '创建人ID',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新人ID',
      dataIndex: 'updateBy',
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
      <ProTable<MemberTaskListItem>
        headerTitle="会员任务管理"
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
        request={queryMemberTaskList}
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
          <ProDescriptions<MemberTaskListItem>
            column={2}
            title={"会员任务详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberTaskListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberTaskList;
