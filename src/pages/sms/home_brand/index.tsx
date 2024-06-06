import {ExclamationCircleOutlined, PlusOutlined,} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateHomeBrandForm from './components/CreateHomeBrandForm';
import SetSortForm from './components/SetSortForm';
import type {HomeBrandListItem} from './data.d';
import {addHomeBrand, queryHomeBrandList, removeHomeBrand, updateHomeBrandSort, updateHomeBrandStatus} from './service';

const {confirm} = Modal;

/**
 * 添加节点
 * @param brandIds
 */
const handleAdd = async (brandIds: number[]) => {
  const hide = message.loading('正在添加');
  if (brandIds.length <= 0) {
    hide();
    return true;
  }
  try {
    await addHomeBrand(brandIds);
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
const handleUpdate = async (fields: HomeBrandListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateHomeBrandSort(fields);
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
 * @param brandIds
 */
const handleRemove = async (ids: number[], brandIds: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeHomeBrand(ids, brandIds);
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
 * @param brandIds
 */
const handleStatus = async (ids: number[], recommendStatus: number, brandIds: number[]) => {
  const hide = message.loading('正在更新品牌推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateHomeBrandStatus({ids: ids, recommendStatus: recommendStatus, brandIds: brandIds});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};


const HomeBrandList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<HomeBrandListItem>();

  const showDeleteConfirm = (ids: number[], brandIds: number[]) => {
    confirm({
      title: '是否确认删除所选数据项?',
      icon: <ExclamationCircleOutlined/>,
      content: '请谨慎操作',
      onOk() {
        handleRemove(ids, brandIds).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (item: HomeBrandListItem, status: number, brandIds: number[]) => {
    confirm({
      title: `确定${status == 1 ? "推荐" : "不推荐"}${item.brandName}品牌吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus([item.id], status, brandIds)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<HomeBrandListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
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
            showStatusConfirm(entity, flag ? 1 : 0, [entity.brandId])
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
            设置排序
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm([record.id], [record.brandId]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<HomeBrandListItem>
        headerTitle="品牌推荐列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 选择品牌
          </Button>,
        ]}
        request={queryHomeBrandList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          const brandIds = selectedRows.map((row) => row.brandId);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <a onClick={async () => {
                await handleStatus(ids, 1, brandIds);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>设为推荐</a>
              <a onClick={async () => {
                await handleStatus(ids, 0, brandIds);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>取消推荐</a>
              <a onClick={async () => {
                showDeleteConfirm(ids, brandIds);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
            </Space>
          );
        }}
      />

      <CreateHomeBrandForm
        key={'CreateHomeBrandForm'}
        onSubmit={async (brandIds) => {
          const success = await handleAdd(brandIds);
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
        key={'UpdateHomeBrandForm'}
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
          <ProDescriptions<HomeBrandListItem>
            column={2}
            title={currentRow?.brandName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<HomeBrandListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default HomeBrandList;
