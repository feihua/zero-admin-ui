import {PlusOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Tag} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateDeptForm from './components/CreateDeptForm';
import UpdateDeptForm from './components/UpdateDeptForm';
import type {DeptListItem} from './data.d';
import {queryDeptList, updateDept, addDept, removeDept} from './service';
import {tree} from '@/utils/utils';

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: DeptListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDept({...fields});
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
const handleUpdate = async (fields: DeptListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateDept(fields);
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
 * @param selectedRows
 */
const handleRemove = async (selectedRows: DeptListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeDept(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const DeptList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<DeptListItem>();
  const [selectedRowsState, setSelectedRows] = useState<DeptListItem[]>([]);

  const showDeleteConfirm = (item: DeptListItem) => {
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

  const columns: ProColumns<DeptListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '部门排序',
      dataIndex: 'deptSort',
      hideInSearch: true,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'userStatus',
    //   hideInTable: true,
    //   valueEnum: {
    //     0: {text: '禁用', status: 'Error'},
    //     1: {text: '正常', status: 'Success'},
    //   },
    // },
    {
      title: '部门状态',
      dataIndex: 'deptStatus',
      render: (dom, entity) => {
        switch (entity.deptStatus) {
          case 1:
            return <Tag color={'success'}>正常</Tag>;
          case 0:
            return <Tag>禁用</Tag>;
        }
        return <>未知{entity.deptStatus }</>;
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
      hideInTable: true
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
  ];

  return (
    <PageContainer>
      <ProTable<DeptListItem>
        headerTitle="部门管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={queryDeptList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        postData={(data) => tree(data, 0, 'parentId')}
        pagination={false}
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

      <CreateDeptForm
        key={'CreateDeptForm'}
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
        parentId={currentRow?.id || 0}
      />

      <UpdateDeptForm
        key={'UpdateDeptForm'}
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
          <ProDescriptions<DeptListItem>
            column={2}
            title={"部门详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<DeptListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default DeptList;
