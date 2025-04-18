import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateMenuForm from './components/UpdateMenuForm';
import type {MenuListItem} from './data.d';
import {addMenu, queryMenuList, removeMenu, updateMenu} from './service';
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
    await addMenu({...fields});
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
const handleUpdate = async (fields: MenuListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateMenu(fields);
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
const handleRemove = async (selectedRows: MenuListItem) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeMenu(selectedRows.id);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MenuList: React.FC = () => {
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
        handleRemove(item).then(() => {
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
      dataIndex: 'menuName',
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
      title: '权限标识',
      dataIndex: 'menuPerms',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '组件路径',
      dataIndex: 'menuPath',
    },
    {
      title: '接口地址',
      dataIndex: 'backgroundUrl',
      hideInTable: true,
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      hideInSearch: true,
      valueEnum: {
        0: {text: '目录', status: 'Success'},
        1: {text: '菜单', status: 'Error'},
        2: {text: '按钮', status: 'Success'},
        3: {text: '外链', status: 'Success'},
      },
    },
    {
      title: '菜单排序',
      dataIndex: 'menuSort',
      hideInSearch: true,
    },
    {
      title: '菜单图标',
      dataIndex: 'menuIcon',
      hideInSearch: true,
    },
    {
      title: '权限',
      dataIndex: 'perms',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '菜单状态',
      dataIndex: 'menuStatus',
      render: (dom, entity) => {
        switch (entity.menuStatus) {
          case 1:
            return <Tag color={'success'}>正常</Tag>;
          case 0:
            return <Tag>禁用</Tag>;
        }
        return <>未知{entity.menuStatus}</>;
      },
    },
    {
      title: '显示状态',
      dataIndex: 'isVisible',
      render: (dom, entity) => {
        switch (entity.isVisible) {
          case 1:
            return <Tag color={'success'}>显示</Tag>;
          case 0:
            return <Tag>隐藏</Tag>;
        }
        return <>未知{entity.menuStatus}</>;
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '更新者',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
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
        request={queryMenuList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => console.log(selectedRows),
        }}
        postData={(data) => tree(data, 0, 'parentId')}
        pagination={false}
        tableAlertRender={false}
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

export default MenuList;
