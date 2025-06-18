import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { ProductAttributeListItem} from './data.d';
import {addProductAttribute, queryProductAttributeList, removeProductAttribute, updateProductAttribute, updateProductAttributeStatus} from './service';

const {confirm} = Modal;

/**
 * 添加商品属性
 * @param fields
 */
const handleAdd = async (fields: ProductAttributeListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addProductAttribute({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新商品属性
 * @param fields
 */
const handleUpdate = async (fields: ProductAttributeListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateProductAttribute(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除商品属性
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeProductAttribute(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新商品属性状态
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
    await updateProductAttributeStatus({ ids: ids, status: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const ProductAttributeList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ProductAttributeListItem>();

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

  const columns: ProColumns<ProductAttributeListItem>[] = [

    {
      title: '主键id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '属性分组ID',
      dataIndex: 'groupId',
      hideInSearch: true,
    },
    {
      title: '属性名称',
      dataIndex: 'name',
      render: (dom, entity) => {
          return <a onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}>{dom}</a>;
        },
    },

    {
      title: '输入类型',
      dataIndex: 'inputType',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: 1, label: '手动输入'},
              {value: 2, label: '单选'},
              {value: 3, label: '多选'},
            ]}
          />

    },
    render: (dom, entity) => {
        switch (entity.inputType) {
          case 1:
            return <Tag color={'success'}>手动输入</Tag>;
          case 2:
            return <Tag color={'success'}>单选</Tag>;
          case 3:
            return <Tag>多选</Tag>;
        }
        return <>未知{entity.inputType}</>;
      },
    },

    {
      title: '值类型',
      dataIndex: 'valueType',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: 1, label: '文本'},
              {value: 2, label: '数字'},
              {value: 3, label: '日期'},
            ]}
          />

    },
    render: (dom, entity) => {
        switch (entity.valueType) {
          case 1:
            return <Tag color={'success'}>文本</Tag>;
          case 2:
            return <Tag color={'success'}>数字</Tag>;
          case 3:
            return <Tag>日期</Tag>;
        }
        return <>未知{entity.valueType}</>;
      },
    },

    {
      title: '可选值列表',
      dataIndex: 'inputList',
      hideInSearch: true,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      hideInSearch: true,
    },
    {
      title: '是否必填',
      dataIndex: 'isRequired',
      hideInSearch: true,
    },
    {
      title: '是否支持搜索',
      dataIndex: 'isSearchable',
      hideInSearch: true,
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: 1, label: '正常'},
              {value: 0, label: '禁用'},
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
      <ProTable<ProductAttributeListItem>
        headerTitle="商品属性管理"
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
        request={queryProductAttributeList}
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
          <ProDescriptions<ProductAttributeListItem>
            column={2}
            title={"商品属性详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ProductAttributeListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ProductAttributeList;
