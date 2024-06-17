import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateHomeNewProductForm from './components/CreateHomeNewProductForm';
import SetSortForm from './components/SetSortForm';
import type {HomeNewProductListItem} from './data.d';
import {
  addHomeNewProduct,
  queryHomeNewProductList,
  removeHomeNewProduct,
  updateHomeNewProductStatus,
  updateNewProductSort,
} from './service';

const {confirm} = Modal;

/**
 * 添加节点
 * @param productIds
 */
const handleAdd = async (productIds: number[]) => {
  const hide = message.loading('正在添加');
  if (productIds.length <= 0) {
    hide();
    return true;
  }
  try {
    await addHomeNewProduct(productIds);
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
const handleUpdate = async (fields: HomeNewProductListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateNewProductSort(fields);
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
 * @param productIds
 */
const handleRemove = async (ids: number[], productIds: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeHomeNewProduct(ids, productIds);
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
 * @param productIds
 */
const handleStatus = async (ids: number[], recommendStatus: number, productIds: number[]) => {
  const hide = message.loading('正在更新新品推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateHomeNewProductStatus({ids: ids, recommendStatus: recommendStatus, productIds: productIds});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const HomeNewProductList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<HomeNewProductListItem>();

  const showDeleteConfirm = (ids: number[], productIds: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids, productIds).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (item: HomeNewProductListItem, status: number, productIds: number[]) => {
    confirm({
      title: `确定${status == 1 ? "推荐" : "不推荐"}${item.productName}商品吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus([item.id], status, productIds)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<HomeNewProductListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
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
            showStatusConfirm(entity, flag ? 1 : 0, [entity.productId])
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
              showDeleteConfirm([record.id], [record.productId]);
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
      <ProTable<HomeNewProductListItem>
        headerTitle="好物列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 选择商品
          </Button>,
        ]}
        request={queryHomeNewProductList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          const productIds = selectedRows.map((row) => row.productId);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <a onClick={async () => {
                await handleStatus(ids, 1, productIds);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>设为推荐</a>
              <a onClick={async () => {
                await handleStatus(ids, 0, productIds);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>取消推荐</a>
              <a onClick={async () => {
                showDeleteConfirm(ids, productIds);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
            </Space>
          );
        }}
      />

      <CreateHomeNewProductForm
        key={'CreateHomeNewProductForm'}
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
        key={'UpdateHomeNewProductForm'}
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
          <ProDescriptions<HomeNewProductListItem>
            column={2}
            title={currentRow?.productName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<HomeNewProductListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default HomeNewProductList;
