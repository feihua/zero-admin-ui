import {PlusOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import UpdateMenuForm from './components/UpdateMenuForm';
import type {MenuListItem} from './data.d';
import {queryMenu, updateRule, addMenu, removeMenu} from './service';
import {tree} from '@/utils/utils';
import CreateMenuForm from '@/pages/system/menu/components/CreateMenuForm';

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: MenuListItem) => {
  const hide = message.loading('正在添加');
  try {
    fields.orderNum = Number(fields.orderNum);
    fields.type = Number(fields.type);
    await addMenu({...fields});
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
const handleUpdate = async (fields: MenuListItem) => {
  const hide = message.loading('正在更新');
  try {
    fields.orderNum = Number(fields.orderNum);
    fields.type = Number(fields.type);
    await updateRule(fields);
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
const handleRemove = async (selectedRows: MenuListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMenu({
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

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MenuListItem>();

  const showDeleteConfirm = (item: MenuListItem) => {
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

  const columns: ProColumns<MenuListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '父id',
      dataIndex: 'parentId',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '路径',
      dataIndex: 'url',
    },
    {
      title: '接口地址',
      dataIndex: 'backgroundUrl',
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
      valueEnum: {
        0: {text: '目录', status: 'Success'},
        1: {text: '菜单', status: 'Error'},
        2: {text: '按钮', status: 'Success'},
      },
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      hideInSearch: true,
    },
    {
      title: '权限',
      dataIndex: 'perms',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'delFlag',
      valueEnum: {
        1: {text: '正常', status: 'Success'},
        0: {text: '禁用', status: 'Error'},
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
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新人',
      dataIndex: 'lastUpdateBy',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'lastUpdateTime',
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
      <ProTable<MenuListItem>
        headerTitle="菜单列表"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建菜单
          </Button>,
        ]}
        request={queryMenu}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => console.log(selectedRows),
        }}
        postData={(data) => tree(data, 0, 'parentId')}
        pagination={false}
      />

      <CreateMenuForm
        key={'CreateMenuForm'}
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

      <UpdateMenuForm
        key={'UpdateMenuForm'}
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
          <ProDescriptions<MenuListItem>
            column={2}
            title={"菜单详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MenuListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
