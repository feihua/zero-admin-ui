import {PlusOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Select, Tag} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateDictForm from './CreateDictItemForm';
import UpdateDictForm from './UpdateDictItemForm';
import type {DictItemListItem} from './data.d';
import {
  addDictItem,
  queryDictItemList,
  removeDictItem,
  updateDictItem
} from "@/pages/system/dict/components/DictItem/service";

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
 * @param selectedRows
 */
const handleRemove = async (selectedRows: DictItemListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeDictItem(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
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
  const [selectedRowsState, setSelectedRows] = useState<DictItemListItem[]>([]);

  const showDeleteConfirm = (item: DictItemListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
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
        title: '显示排序',
        dataIndex: 'dictSort',
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
        title: '状态',
        dataIndex: 'dictStatus',
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
          switch (entity.dictStatus) {
            case 1:
              return <Tag color={'success'}>正常</Tag>;
            case 0:
              return <Tag>禁用</Tag>;
          }
          return <>未知{entity.dictStatus}</>;
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
                showDeleteConfirm(record);
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
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 10}}
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
            type={"primary"}
            danger
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
