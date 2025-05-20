import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, message, Modal, Select, Switch } from 'antd';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type { MemberLevelListItem } from './data.d';
import {
  addMemberLevel,
  queryMemberLevelList,
  removeMemberLevel,
  updateMemberLevel,
  updateMemberLevelStatus,
} from './service';

const { confirm } = Modal;

/**
 * 添加会员等级
 * @param fields
 */
const handleAdd = async (fields: MemberLevelListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addMemberLevel({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员等级
 * @param fields
 */
const handleUpdate = async (fields: MemberLevelListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateMemberLevel(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除会员等级
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeMemberLevel(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新会员等级状态
 * @param id
 * @param status
 */
const handleStatus = async (id: number, status: number) => {
  const hide = message.loading('正在更新状态');
  try {
    await updateMemberLevelStatus({ id: id, isEnabled: status });
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MemberLevelList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberLevelListItem>();

  const showDeleteConfirm = (ids: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined />,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {},
    });
  };

  const showStatusConfirm = (id: number, status: number) => {
    confirm({
      title: `确定${status == 1 ? '启用' : '禁用'}吗？`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleStatus(id, status);
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<MemberLevelListItem>[] = [
    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '等级名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },

    {
      title: '等级',
      dataIndex: 'level',
      hideInSearch: true,
    },
    {
      title: '升级所需成长值',
      dataIndex: 'growthPoint',
      hideInSearch: true,
    },
    {
      title: '折扣率(0-100)',
      dataIndex: 'discountRate',
      hideInSearch: true,
    },
    {
      title: '是否免运费',
      dataIndex: 'freeFreight',
      hideInSearch: true,
      render: (dom, entity) => {
        return entity.freeFreight === 1 ? '是' : '否';
      },
    },
    {
      title: '是否可评论获取奖励',
      dataIndex: 'commentExtra',
      hideInSearch: true,
      render: (dom, entity) => {
        return entity.commentExtra === 1 ? '是' : '否';
      },
    },
    {
      title: '会员特权JSON',
      dataIndex: 'privileges',
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: '是否启用',
      dataIndex: 'isEnabled',
      hideInSearch: true,
      renderFormItem: (text, row, index) => {
        return (
          <Select
            value={row.value}
            options={[
              { value: '1', label: '是' },
              { value: '0', label: '否' },
            ]}
          />
        );
      },
      render: (dom, entity) => {
        return (
          <Switch
            checked={entity.isEnabled == 1}
            onChange={(flag) => {
              showStatusConfirm(entity.id, flag ? 1 : 0);
            }}
          />
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
            }}
          >
            <EditOutlined /> 编辑
          </a>
          <Divider type="vertical" />
          <a
            key="delete"
            style={{ color: '#ff4d4f' }}
            onClick={() => {
              showDeleteConfirm([record.id]);
            }}
          >
            <DeleteOutlined /> 删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<MemberLevelListItem>
        headerTitle="会员等级管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={queryMemberLevelList}
        columns={columns}
        rowSelection={{}}
        pagination={{ pageSize: 10 }}
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
        currentData={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<MemberLevelListItem>
            column={2}
            title={'会员等级详情'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberLevelListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberLevelList;
