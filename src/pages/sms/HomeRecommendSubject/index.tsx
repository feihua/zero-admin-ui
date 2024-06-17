import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import SetSortForm from './components/SetSortForm';
import type {RecommendSubjectListItem} from './data.d';
import {
  addRecommendSubject,
  queryRecommendSubjectList,
  removeRecommendSubject,
  updateRecommendSubjectSort,
  updateRecommendSubjectStatus,
} from './service';

const {confirm} = Modal;

/**
 * 添加节点
 * @param subjectIds
 */
const handleAdd = async (subjectIds: number[]) => {
  const hide = message.loading('正在添加');
  if (subjectIds.length <= 0) {
    hide();
    return true;
  }
  try {
    await addRecommendSubject(subjectIds);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新节点排序
 * @param fields
 */
const handleUpdateSubjectSor = async (fields: RecommendSubjectListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateRecommendSubjectSort(fields);
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
 * @param subjectIds
 */
const handleRemove = async (ids: number[], subjectIds: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeRecommendSubject(ids, subjectIds);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新推荐状态
 * @param ids
 * @param recommendStatus
 * @param subjectIds
 */
const handleStatus = async (ids: number[], recommendStatus: number, subjectIds: number[]) => {
  const hide = message.loading('正在更新专题推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateRecommendSubjectStatus({ids: ids, recommendStatus: recommendStatus, subjectIds: subjectIds});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const RecommendSubjectList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<RecommendSubjectListItem>();

  const showDeleteConfirm = (ids: number[], subjectIds: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids, subjectIds).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (item: RecommendSubjectListItem, status: number, subjectIds: number[]) => {
    confirm({
      title: `确定${status == 1 ? "推荐" : "不推荐"}${item.subjectName}专题吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus([item.id], status, subjectIds)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<RecommendSubjectListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '专题名称',
      dataIndex: 'subjectName',
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
      title: '推荐状态',
      dataIndex: 'recommendStatus',
      renderFormItem: (text, row) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '推荐'},
            {value: '0', label: '不推荐'},
          ]}
        />

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.recommendStatus == 1} onChange={(flag) => {
            showStatusConfirm(entity, flag ? 1 : 0, [entity.subjectId])
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
            <EditOutlined/> 设置排序
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm([record.id], [record.subjectId]);
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
      <ProTable<RecommendSubjectListItem>
        headerTitle="专题推荐列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key={'selectId'} onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 选择专题
          </Button>,
        ]}
        request={queryRecommendSubjectList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          const subjectIds = selectedRows.map((row) => row.subjectId);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <a onClick={async () => {
                await handleStatus(ids, 1, subjectIds);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>设为推荐</a>
              <a onClick={async () => {
                await handleStatus(ids, 0, subjectIds);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>取消推荐</a>
              <a onClick={async () => {
                showDeleteConfirm(ids, subjectIds);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
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

      <SetSortForm
        key={'SetSortForm'}
        onSubmit={async (value) => {
          const success = await handleUpdateSubjectSor(value);
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
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<RecommendSubjectListItem>
            column={2}
            title={currentRow?.subjectName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<RecommendSubjectListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default RecommendSubjectList;
