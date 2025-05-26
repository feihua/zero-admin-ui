import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, message, Modal, Select, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { ProductCategoryListItem } from './data.d';
import {
  addProductCategory,
  queryProductCategoryList,
  removeProductCategory,
  updateProductCategory,
  updateProductCategoryNavStatus,
  updateProductCategoryStatus,
} from './service';
import { tree } from '@/utils/utils';

const { confirm } = Modal;

/**
 * 添加产品分类
 * @param fields
 */
const handleAdd = async (fields: ProductCategoryListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addProductCategory({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新产品分类
 * @param fields
 */
const handleUpdate = async (fields: ProductCategoryListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateProductCategory(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除产品分类
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeProductCategory(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新产品分类状态
 * @param ids
 * @param status
 * @param t
 */
const handleStatus = async (ids: number[], status: number, t: number) => {
  const hide = message.loading('正在更新状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    if (t == 1) {
      await updateProductCategoryStatus({ ids: ids, status: status });
    } else {
      await updateProductCategoryNavStatus({ ids: ids, status: status });
    }
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const ProductCategoryList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ProductCategoryListItem>();

  const showDeleteConfirm = (ids: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  const showStatusConfirm = (ids: number[], status: number, t: number) => {
    confirm({
      title: `确定${status == 1 ? '启用' : '禁用'}吗？`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleStatus(ids, status, t);
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<ProductCategoryListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },

    {
      title: '分类名称',
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
      title: '图标',
      dataIndex: 'icon',
      valueType: 'image',
      hideInSearch: true,
      fieldProps: { width: 100, height: 80 },
    },
    {
      title: '分类级别',
      dataIndex: 'level',
      hideInSearch: true,
      valueEnum: {
        0: { text: '一级', status: 'Success' },
        1: { text: '二级', status: 'Success' },
      },
    },
    {
      title: '商品数量',
      dataIndex: 'productCount',
      hideInSearch: true,
    },
    {
      title: '商品单位',
      dataIndex: 'productUnit',
      hideInSearch: true,
    },
    {
      title: '是否显示在导航栏',
      dataIndex: 'navStatus',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '1', label: '显示' },
              { value: '0', label: '不显示' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.navStatus == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0, 0);
            }}
          />
        );
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },

    {
      title: '关键字',
      dataIndex: 'keywords',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'isEnabled',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '1', label: '是' },
              { value: '0', label: '否' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.isEnabled == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0, 1);
            }}
          />
        );
      },
    },
    {
      title: '创建人ID',
      dataIndex: 'createBy',
      hideInSearch: true,
      hideInTable: true,
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
      hideInTable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInTable: true,
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
            }}
          >
            <EditOutlined /> 编辑
          </a>
          <Divider type="vertical" />
          <a
            key="delete"
            style={{ color: '#ff4d4f' }}
            onClick={() => {
              showDeleteConfirm([record.id]);
            }}
          >
            <DeleteOutlined /> 删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<ProductCategoryListItem>
        headerTitle="产品分类管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={queryProductCategoryList}
        columns={columns}
        rowSelection={{}}
        postData={(data) => tree(data, 0, 'parentId')}
        pagination={false}
        tableAlertRender={false}
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
        currentData={currentRow || {}}
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
          <ProDescriptions<ProductCategoryListItem>
            column={2}
            title={'产品分类详情'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ProductCategoryListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ProductCategoryList;
