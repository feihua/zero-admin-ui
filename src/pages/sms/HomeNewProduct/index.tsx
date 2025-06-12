import { EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, message, Modal, Select, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import AddNewProductModal from './components/AddNewProductModal';
import SetSortModal from './components/SetSortModal';
import type { HomeNewProductListItem } from './data.d';
import {
  addHomeNewProduct,
  queryHomeNewProductList,
  removeHomeNewProduct,
  updateNewProductSort,
} from './service';

const { confirm } = Modal;

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
 * 更新推荐状态
 * @param productIds
 */
const handleStatus = async (productIds: number[]) => {
  const hide = message.loading('正在更新新品推荐状态');
  if (productIds.length == 0) {
    hide();
    return true;
  }
  try {
    await removeHomeNewProduct(productIds);
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


  const showStatusConfirm = (item: HomeNewProductListItem, status: number, productIds: number[]) => {
    confirm({
      title: `确定${status == 1 ? '推荐' : '不推荐'}${item.name}商品吗？`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleStatus([item.id]);
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
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },

    {
      title: '商品图片',
      dataIndex: 'pic',
      hideInSearch: true,
      valueType: 'image',
      fieldProps: { width: 100, height: 80 },
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '推荐状态',
      dataIndex: 'newStatus',
      hideInSearch: true,
      renderFormItem: (text, row) => {
        return <Select
          value={row.value}
          options={[
            { value: 1, label: '推荐' },
            { value: 0, label: '不推荐' },
          ]}
        />;

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.newStatus == 1} onChange={(flag) => {
            showStatusConfirm(entity, flag ? 1 : 0, [entity.productId]);
          }} />
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
            <EditOutlined /> 设置排序
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
            <PlusOutlined /> 选择商品
          </Button>,
        ]}
        request={queryHomeNewProductList}
        columns={columns}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
        tableAlertRender={false}
      />

      <AddNewProductModal
        key={'AddNewProductModal'}
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

      <SetSortModal
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
            title={currentRow?.name}
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
