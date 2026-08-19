import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Switch, Tag, TreeSelect} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type {MenuListItem} from './data.d';
import {addMenu, queryMenuResourceList, removeMenu, updateMenu, updateMenuStatus} from './service';
import {queryMenuList} from "@/pages/system/menu/service";
import {tree} from "@/utils/utils";

const {confirm} = Modal;

/**
 * 添加菜单信息
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
 * 更新菜单信息
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
 *  删除菜单信息
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeMenu(ids);
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

const ResourceMenuList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MenuListItem>();
  const [treeData, setTreeData] = useState<MenuListItem[]>([]);

  useEffect(() => {

    queryMenuList({}).then((res) => {
      if (res.code === '000000') {
        const tree1 = tree(res.data, 0, 'parentId');
        setTreeData(tree1);
      } else {
        message.error(res.msg);
      }
    })

  }, []);

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
      title: '主键',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '上级菜单',
      dataIndex: 'parentId',
      hideInTable: true,
      renderFormItem: (text, row, index) => {
        return <TreeSelect
          style={{width: '100%'}}
          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
          treeData={treeData}
          placeholder="请选择上级"
          fieldNames={{label: 'menuName', value: 'id', children: 'children'}}
          allowClear
        />

      },
    },
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
      title: '接口url',
      dataIndex: 'apiUrl',
      hideInSearch: true,
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      hideInSearch: true,
      hideInTable: true,
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: 1, label: '目录'},
            {value: 2, label: '菜单'},
            {value: 3, label: '按钮'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.menuType) {
          case 1:
            return <Tag color={'success'}>目录</Tag>;
          case 2:
            return <Tag color={'success'}>菜单</Tag>;
          case 3:
            return <Tag>按钮</Tag>;
        }
        return <>未知{entity.menuType}</>;
      },
    },
    {
      title: '路由路径',
      dataIndex: 'menuUrl',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '菜单图标',
      dataIndex: 'menuIcon',
      hideInSearch: true,
      hideInTable: true,
    },


    {
      title: '显示状态',
      dataIndex: 'visible',
      hideInSearch: true,
      hideInTable: true,
      render: (dom, entity) => {
        return (
          <Switch checked={entity.status == 1} onChange={(flag) => {
            showStatusConfirm(entity.id, flag ? 1 : 0)
          }}/>
        );
      },
    },
    {
      title: '菜单状态',
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
            showStatusConfirm(entity.id, flag ? 1 : 0)
          }}/>
        );
      },
    },

    {
      title: '排序',
      dataIndex: 'menuSort',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: 'vue的path',
      dataIndex: 'vuePath',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'vue的页面',
      dataIndex: 'vueComponent',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'vue的图标',
      dataIndex: 'vueIcon',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'vue的路由重定向',
      dataIndex: 'vueRedirect',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'angular的图标',
      dataIndex: 'angularIcon',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'antd react的图标',
      dataIndex: 'reactIcon',
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
      hideInSearch: true,
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
            }
            }
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
  ];

  return (
    <>
      <ProTable<MenuListItem>
        headerTitle="菜单信息管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={queryMenuResourceList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={false}
      />


      {
        createModalVisible &&
        <AddModal
          key={'CreateForm'}
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
      }


      {
        updateModalVisible &&
        <UpdateModal
          key={'UpdateForm'}
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
      }

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
          <ProDescriptions<MenuListItem>
            column={2}
            title={"菜单信息详情"}
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
    </>
  );
};

export default ResourceMenuList;
