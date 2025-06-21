import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { Button, Divider, Drawer, message, Modal, Select, Space, Switch, Tag } from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { ProductSpuListItem} from './data.d';
import {addProductSpu, queryProductSpuList, removeProductSpu, updateProductSpu, updateProductSpuStatus} from './service';

const {confirm} = Modal;

/**
 * 添加商品SPU
 * @param fields
 */
const handleAdd = async (fields: ProductSpuListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addProductSpu({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新商品SPU
 * @param fields
 */
const handleUpdate = async (fields: ProductSpuListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateProductSpu(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除商品SPU
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeProductSpu(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新商品SPU状态
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
    await updateProductSpuStatus({ productSpuIds: ids, productSpuStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const ProductSpuList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ProductSpuListItem>();

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

  const columns: ProColumns<ProductSpuListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名称',
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
      title: '商品分类ID',
      dataIndex: 'categoryId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '商品分类ID集合',
      dataIndex: 'categoryIds',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '商品分类名称',
      dataIndex: 'categoryName',
      hideInSearch: true,
      hideInTable: true,
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
      title: '品牌ID',
      dataIndex: 'brandId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      hideInSearch: true,
      hideInTable: true,
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
      title: '单位',
      dataIndex: 'unit',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '重量(kg)',
      dataIndex: 'weight',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '关键词',
      dataIndex: 'keywords',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '简介',
      dataIndex: 'brief',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '详细描述',
      dataIndex: 'description',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '画册图片，最多8张，以逗号分割',
      dataIndex: 'albumPics',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '主图',
      dataIndex: 'mainPic',
      hideInSearch: true,
      valueType: 'image',
      fieldProps: { width: 100, height: 80 },
    },
    {
      title: '价格区间',
      dataIndex: 'priceRange',
      hideInSearch: true,
    },
    {
      title: '上架状态',
      dataIndex: 'publishStatus',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: 1, label: '上架' },
              { value: 0, label: '下架' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.publishStatus == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0);
            }}
          />
        );
      },
    },
    {
      title: '是否新品',
      dataIndex: 'newStatus',
      hideInTable: true,
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: 1, label: '是' },
              { value: 0, label: '不是' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.newStatus == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0);
            }}
          />
        );
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'recommendStatus',
      hideInTable: true,
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: 1, label: '推荐' },
              { value: 0, label: '不推荐' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.recommendStatus == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0);
            }}
          />
        );
      },
    },
    {
      title: '审核状态',
      dataIndex: 'verifyStatus',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: 1, label: '审核通过' },
              { value: 0, label: '未审核' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.verifyStatus == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0);
            }}
          />
        );
      },
    },
    {
      title: '预告商品',
      dataIndex: 'previewStatus',
      hideInTable: true,
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: 1, label: '是' },
              { value: 0, label: '不是' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.previewStatus == 1}
            onChange={(flag) => {
              showStatusConfirm([entity.id], flag ? 1 : 0);
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
      title: '新品排序',
      dataIndex: 'newStatusSort',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '推荐排序',
      dataIndex: 'recommendStatusSort',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '预警库存',
      dataIndex: 'lowStock',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title:
        '促销类型',
      dataIndex: 'promotionType',
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '0', label: '原价' },
              { value: '1', label: '促销价' },
              { value: '2', label: '会员价' },
              { value: '3', label: '阶梯价格' },
              { value: '4', label: '满减价格' },
              { value: '5', label: '秒杀价格' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        switch (entity.promotionType) {
          case 1:
            return <Tag color={'success'}>使用原价</Tag>;
          case 0:
            return <Tag color={'success'}>使用促销价</Tag>;
          case 2:
            return <Tag color={'success'}>使用会员价</Tag>;
          case 3:
            return <Tag color={'success'}>使用阶梯价格</Tag>;
          case 4:
            return <Tag color={'success'}>使用满减价格</Tag>;
          case 5:
            return <Tag color={'success'}>秒杀</Tag>;
        }
        return <>未知{entity.promotionType}</>;
      },
    },

    {
      title: '详情标题',
      dataIndex: 'detailTitle',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '详情描述',
      dataIndex: 'detailDesc',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '产品详情网页内容',
      dataIndex: 'detailHtml',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '移动端网页详情',
      dataIndex: 'detailMobileHtml',
      hideInSearch: true,
      hideInTable: true,
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
      hideInTable: true,
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
      <ProTable<ProductSpuListItem>
        headerTitle="商品SPU管理"
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
        request={queryProductSpuList}
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
          <ProDescriptions<ProductSpuListItem>
            column={2}
            title={"商品SPU详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ProductSpuListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ProductSpuList;
