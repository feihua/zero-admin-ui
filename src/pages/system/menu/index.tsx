import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, SettingOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Switch, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateMenuForm from './components/UpdateMenuForm';
import type {MenuListItem} from './data.d';
import {addMenu, queryMenuList, removeMenu, updateMenu, updateMenuStatus} from './service';
import {tree} from '@/utils/utils';
import CreateMenuForm from '@/pages/system/menu/components/CreateMenuForm';
import ResourceModal from "@/pages/system/menu/components/ResourceModal";

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
/**
 * 更新菜单信息状态
 * @param id
 * @param status
 */
const handleStatus = async (id: number, status: number) => {
  const hide = message.loading('正在更新状态');
  try {
    await updateMenuStatus({menuId: id, menuStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const MenuList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [resourceVisible, handleResourceVisible] = useState<boolean>(false);
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
  const showStatusConfirm = (id: number, status: number) => {
    confirm({
      title: `确定${status == 1 ? "启用" : "禁用"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(id, status)
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
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
      dataIndex: 'menuUrl',
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
        1: {text: '目录', status: 'Success'},
        2: {text: '菜单', status: 'Error'},
        3: {text: '按钮', status: 'Success'},
        4: {text: '外链', status: 'Success'},
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
      dataIndex: 'status',
      render: (dom, entity) => {
        return (
          <Switch checked={entity.status == 1} onChange={(flag) => {
            showStatusConfirm(entity.id, flag ? 1 : 0)
          }}/>
        );
      },
    },
    {
      title: '显示状态',
      dataIndex: 'visible',
      render: (dom, entity) => {
        switch (entity.visible) {
          case 1:
            return <Tag color={'success'}>显示</Tag>;
          case 0:
            return <Tag>隐藏</Tag>;
        }
        return <>未知{entity.visible}</>;
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
          <Button type="primary" key="primary" onClick={() => handleResourceVisible(true)}>
            <SettingOutlined/> 配置资源
          </Button>,
        ]}
        request={queryMenuList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => console.log(selectedRows),
        }}
        postData={(data) => tree(data, 1, 'parentId')
        }
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

      <ResourceModal
        key={'resourceModal'}
        onCancel={() => {
          handleResourceVisible(false);
        }}
        open={resourceVisible}
      />
    </PageContainer>
  );
};

export default MenuList;
