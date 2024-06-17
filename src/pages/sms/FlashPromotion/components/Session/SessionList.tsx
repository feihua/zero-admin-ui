import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateDictForm from './CreateSessionForm';
import UpdateDictForm from './UpdateSessionForm';
import type {SessionListItem} from './data.d';
import {
  addSession,
  querySessionList,
  removeSession,
  updateSession,
  updateSessionStatus
} from "@/pages/sms/FlashPromotion/components/Session/service";

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: SessionListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSession({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: SessionListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateSession(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除节点
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeSession(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新状态
 * @param ids
 * @param status
 */
const handleStatus = async (ids: number[], status: number) => {
  const hide = message.loading('正在更新专题推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateSessionStatus({ids: ids, status: status});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
}

export interface DictListProps {
  sessionModalVisible: boolean;
}

const SessionList: React.FC<DictListProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SessionListItem>();

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
      title: `确定${status == 1 ? "上线" : "下线"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(ids, status)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };
  const columns: ProColumns<SessionListItem>[] = [
      {
        title: '编号',
        dataIndex: 'id',
        hideInSearch: true,
      },
      {
        title: '秒杀时间段名称',
        dataIndex: 'name',
        hideInSearch: true,
      },
      {
        title: '每日开始时间',
        dataIndex: 'startTime',
        hideInSearch: true,
      },
      {
        title: '每日结束时间',
        dataIndex: 'endTime',
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={[
              {value: '1', label: '正常'},
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
              }}
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
    ]
  ;

  return (
    <>
      <ProTable<SessionListItem>
        headerTitle="时间段"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={(params) => {
          return querySessionList({...params})
        }}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <a onClick={async () => {
                await handleStatus(ids, 1);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>启用</a>
              <a onClick={async () => {
                await handleStatus(ids, 0);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>禁用</a>
              <a onClick={async () => {
                showDeleteConfirm(ids);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
            </Space>
          );
        }}
      />


      <CreateDictForm
        key={'CreateDictForm'}
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

      <UpdateDictForm
        key={'UpdateDictForm'}
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
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<SessionListItem>
            column={2}
            title={"字典详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<SessionListItem>[]}
          />
        )}
      </Drawer>
    </>

  );
};

export default SessionList;
