import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { SeckillSessionListItem} from './data.d';
import {addSeckillSession, querySeckillSessionList, removeSeckillSession, updateSeckillSession, updateSeckillSessionStatus} from './service';

const {confirm} = Modal;

/**
 * 添加秒杀场次
 * @param fields
 */
const handleAdd = async (fields: SeckillSessionListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSeckillSession({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新秒杀场次
 * @param fields
 */
const handleUpdate = async (fields: SeckillSessionListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateSeckillSession(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除秒杀场次
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeSeckillSession(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新秒杀场次状态
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
    await updateSeckillSessionStatus({ ids: ids, status: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const SeckillSessionList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SeckillSessionListItem>();

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

  const columns: ProColumns<SeckillSessionListItem>[] = [

    {
      title: '秒杀场次ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '场次名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },

    {
      title: '开始时间',
      dataIndex: 'startTime',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={ [
            {value: 1, label: '上线'},
            {value: 0, label: '下线'},
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
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
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
    <>
      <ProTable<SeckillSessionListItem>
        headerTitle="秒杀场次管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={querySeckillSessionList}
        columns={columns}
        rowSelection={ {} }
        pagination={ {pageSize: 10}}
        tableAlertRender={false}
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
          <ProDescriptions<SeckillSessionListItem>
            column={2}
            title={"秒杀场次详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<SeckillSessionListItem>[]}
          />
        )}
      </Drawer>
    </>
  );
};

export default SeckillSessionList;
