import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateDictForm from './components/CreateDictForm';
import UpdateDictForm from './components/UpdateDictForm';
import { DictListItem } from './data.d';
import { queryDict, updateDict, addDict, removeDict, removeDictOne } from './service';

const { confirm } = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DictListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDict({ ...fields });
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
const handleUpdate = async (fields: Partial<DictListItem>) => {
  const hide = message.loading('正在更新');
  try {
    await updateDict(fields as DictListItem);
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
 *  删除节点(单个)
 * @param id
 */
const handleRemoveOne = async (id: number) => {
  const hide = message.loading('正在删除');
  try {
    await removeDictOne({
      id,
    });
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
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: DictListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeDict({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<DictListItem>();
  const [selectedRowsState, setSelectedRows] = useState<DictListItem[]>([]);

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemoveOne(id).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<DictListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '数据值',
      dataIndex: 'value',
      hideInSearch: true,
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '标签名',
      dataIndex: 'label',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'delFlag',
      hideInForm: true,
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '已删除', status: 'Error' },
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'textarea',
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '备注为必填项',
          },
        ],
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '更新人',
      dataIndex: 'lastUpdateBy',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => {
              showDeleteConfirm(record.id);
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
      <ProTable<DictListItem>
        headerTitle="字典列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建字典
          </Button>,
        ]}
        request={(params, sorter, filter) => queryDict({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{ pageSize: 10 }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
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
            setStepFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
        createModalVisible={createModalVisible}
      />

      <UpdateDictForm
        key={'UpdateDictForm'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setStepFormValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        updateModalVisible={updateModalVisible}
        currentData={stepFormValues}
      />

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<DictListItem>
            column={2}
            title={row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
