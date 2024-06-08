import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Switch, Space} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateHomeAdvertiseForm from './components/CreateHomeAdvertiseForm';
import UpdateHomeAdvertiseForm from './components/UpdateHomeAdvertiseForm';
import type {HomeAdvertiseListItem} from './data.d';
import {
  queryHomeAdvertiseList,
  updateHomeAdvertise,
  addHomeAdvertise,
  removeHomeAdvertise, updateHomeAdvertiseStatus,
} from './service';

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: HomeAdvertiseListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addHomeAdvertise({...fields});
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
const handleUpdate = async (fields: HomeAdvertiseListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateHomeAdvertise(fields);
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
 * @param selectedRows
 */
const handleRemove = async (selectedRows: HomeAdvertiseListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeHomeAdvertise(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新上线/下线状态
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
    await updateHomeAdvertiseStatus({ids: ids, status: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const HomeAdvertiseList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<HomeAdvertiseListItem>();
  const [selectedRowsState, setSelectedRows] = useState<HomeAdvertiseListItem[]>([]);

  const showDeleteConfirm = (item: HomeAdvertiseListItem[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(item).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (item: HomeAdvertiseListItem[], status: number) => {
    confirm({
      title: `确定${status == 1 ? "上线" : "下线"}${item[0].name}广告吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(item.map((x) => x.id), status)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<HomeAdvertiseListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '广告名',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '轮播位置',
      dataIndex: 'type',
      valueEnum: {
        0: {text: 'PC首页轮播', status: 'Error'},
        1: {text: 'app首页轮播', status: 'Success'},
      },
    },
    {
      title: '广告图片',
      dataIndex: 'pic',
      hideInSearch: true,
      valueType: 'image',
      fieldProps: {width: 100, height: 80},
    },
    {
      title: '点击数',
      dataIndex: 'clickCount',
      hideInSearch: true,
    },
    {
      title: '下单数',
      dataIndex: 'orderCount',
      hideInSearch: true,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: "dateTime"
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: "dateTime"
    },
    {
      title: '链接地址',
      dataIndex: 'url',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '上下线状态',
      dataIndex: 'status',
      valueEnum: {
        0: {text: '禁用', status: 'Error'},
        1: {text: '正常', status: 'Success'},
      },
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <Switch checked={entity.status == 1} onChange={(flag) => {
            showStatusConfirm([entity], flag ? 1 : 0)
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
              showDeleteConfirm([record]);
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
      <ProTable<HomeAdvertiseListItem>
        headerTitle="广告列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建广告
          </Button>,
        ]}
        request={queryHomeAdvertiseList}
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
              }}>批量上线</a>
              <a onClick={async () => {
                await handleStatus(ids, 0);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>批量下线</a>
              <a onClick={async () => {
                showDeleteConfirm(selectedRows);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
            </Space>
          );
        }}
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

      <CreateHomeAdvertiseForm
        key={'CreateHomeAdvertiseForm'}
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

      <UpdateHomeAdvertiseForm
        key={'UpdateHomeAdvertiseForm'}
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
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<HomeAdvertiseListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<HomeAdvertiseListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default HomeAdvertiseList;
