import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateDictForm from './AddModal';
import UpdateDictForm from './UpdateModal';
import type {DictItemListItem} from './data.d';
import {
  addDictItem,
  queryDictItemList,
  removeDictItem,
  updateDictItem, updateDictItemStatus
} from "@/pages/system/dict/components/DictItem/service";
import type {PostListItem} from "@/pages/system/post/data";

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DictItemListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDictItem({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: DictItemListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateDictItem(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
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
    await removeDictItem(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 更新状态
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
    await updateDictItemStatus({ids, status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

export interface DictListProps {
  dictType?: string;
  dictItemModalVisible: boolean;
}

const DictList: React.FC<DictListProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<DictItemListItem>();

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

  const showStatusConfirm = (item: PostListItem[], status: number) => {
    confirm({
      title: `确定${status == 1 ? "启用" : "禁用"}字典数据吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(item.map((x) => x.id), status)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  useEffect(() => {
    if (props.dictItemModalVisible) {
      actionRef.current?.reloadAndRest?.();
    }
  }, [props.dictItemModalVisible]);
  //DictListItem
  const columns: ProColumns<DictItemListItem>[] = [
      {
        title: '字典编号',
        dataIndex: 'id',
        hideInSearch: true,
      },

      {
        title: '字典标签',
        dataIndex: 'dictLabel',
        render: (dom, entity) => {
          return <a onClick={() => {
            setCurrentRow(entity);
            setShowDetail(true);
          }}>{dom}</a>;
        },
      },
      {
        title: '字典键值',
        dataIndex: 'dictValue',
        hideInSearch: true,
      },
    {
      title: '显示排序',
      dataIndex: 'dictSort',
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
              showStatusConfirm([entity], flag ? 1 : 0)
            }}/>
          );
        },
      },
    {
      title: '是否默认',
      dataIndex: 'isDefault',
      hideInSearch: true,
      render: (dom, entity) => {
        switch (entity.isDefault) {
          case 'Y':
            return <Tag color={'success'}>是</Tag>;
          case 'N':
            return <Tag>否</Tag>;
        }
        return <>未知{entity.isDefault}</>;
      },
    },
      {
        title: '备注',
        dataIndex: 'remark',
        valueType: 'textarea',
        hideInSearch: true,
      },
      {
        title: '创建者',
        dataIndex: 'createBy',
        hideInSearch: true,
        hideInTable: true
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter: true,
        valueType: 'dateTime',
        hideInSearch: true,
        hideInTable: true
      },
      {
        title: '更新者',
        dataIndex: 'updateBy',
        hideInSearch: true,
        hideInTable: true
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        sorter: true,
        valueType: 'dateTime',
        hideInSearch: true,
        hideInTable: true
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
      <ProTable<DictItemListItem>
        headerTitle="字典管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={(params) => {
          return queryDictItemList({...params, dictType: props.dictType})
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
              <Button
                icon={<DeleteOutlined/>}
                danger
                style={{borderRadius: '5px'}}
                onClick={async () => {
                  showDeleteConfirm(ids);
                }}
              >批量删除</Button>
            </Space>
          );
        }}
      />


      <CreateDictForm
        key={'CreateDictForm'}
        onSubmit={async (value) => {
          value.dictType = props.dictType;
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
          value.dictType = props.dictType;
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
          <ProDescriptions<DictItemListItem>
            column={2}
            title={"字典详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<DictItemListItem>[]}
          />
        )}
      </Drawer>
    </>

  );
};

export default DictList;
