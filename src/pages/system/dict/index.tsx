import {PlusOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Tag, Select} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateDictForm from './components/CreateDictForm';
import UpdateDictForm from './components/UpdateDictForm';
import type {DictTypeListItem} from './data.d';
import {addDictType, queryDictTypeList, removeDictType, updateDictType} from "@/pages/system/dict/service";
import DictItemModal from "@/pages/system/dict/components/DictItem/DictItemModal";

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DictTypeListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDictType({...fields});
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
const handleUpdate = async (fields: DictTypeListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateDictType(fields);
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
const handleRemove = async (selectedRows: DictTypeListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeDictType(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const DictList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [dictItemModalVisible, handleDictItemModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<DictTypeListItem>();
  const [selectedRowsState, setSelectedRows] = useState<DictTypeListItem[]>([]);

  const showDeleteConfirm = (item: DictTypeListItem) => {
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

  //DictListItem
  const columns: ProColumns<DictTypeListItem>[] = [
    {
      title: '字典编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
    },
    {
      title: '状态',
      dataIndex: 'dictStatus',
      renderFormItem:(text, row, index) => {
        return <Select
          value={row.value}
          options={[
            { value: '1', label: '正常' },
            { value: '0', label: '禁用' },
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
        return <>未知{entity.dictStatus }</>;
      },
    },
    {
      title: '系统预留',
      dataIndex: 'isSystem',
      valueEnum: {
        1: {text: '是', status: 'Success'},
        0: {text: '否', status: 'Error'},
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined/>}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical"/>
          <Button
            type="primary"
            icon={<EditOutlined/>}
            onClick={() => {
              handleDictItemModalVisible(true);
              setCurrentRow(record);
            }}
          >
            配置字典项
          </Button>
          <Divider type="vertical"/>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined/>}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<DictTypeListItem>
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
          <Button type="primary" key="primary">
            <PlusOutlined/> 刷新缓存
          </Button>,
        ]}
        request={queryDictTypeList}
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

    <DictItemModal
      key={'DictItemModal'}
      onSubmit={async (value) => {
        const success = await handleUpdate(value);
        if (success) {
          handleDictItemModalVisible(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
      onCancel={() => {
        handleDictItemModalVisible(false);
        if (!showDetail) {
          setCurrentRow(undefined);
        }
      }}
      dictItemModalVisible={dictItemModalVisible}
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
          <ProDescriptions<DictTypeListItem>
            column={2}
            title={"字典详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<DictTypeListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default DictList;
