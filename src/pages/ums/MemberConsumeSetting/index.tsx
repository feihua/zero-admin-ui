import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type {MemberConsumeSettingListItem} from './data.d';
import {
  addMemberConsumeSetting,
  queryMemberConsumeSettingList,
  removeMemberConsumeSetting,
  updateCouponStatus,
  updateMemberConsumeSetting,
  updateStatus
} from './service';

const {confirm} = Modal;

/**
 * 添加积分消费设置
 * @param fields
 */
const handleAdd = async (fields: MemberConsumeSettingListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addMemberConsumeSetting({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新积分消费设置
 * @param fields
 */
const handleUpdate = async (fields: MemberConsumeSettingListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateMemberConsumeSetting(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除积分消费设置
 * @param id
 */
const handleRemove = async (id: number) => {
  const hide = message.loading('正在删除');

  try {
    await removeMemberConsumeSetting(id);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新积分消费设置状态
 * @param id
 * @param status
 * @param t
 */
const handleStatus = async (id: number, status: number, t: number) => {
  const hide = message.loading('正在更新状态');

  try {
    if (t == 1) {
      await updateStatus({id: id, status: status});
    } else {
      await updateCouponStatus({id: id, couponStatus: status});
    }
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const MemberConsumeSettingList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<MemberConsumeSettingListItem>();

  const showDeleteConfirm = (id: number) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(id).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (id: number, status: number, t: number) => {
    confirm({
      title: `确定${status == 1 ? "启用" : "禁用"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(id, status, t)
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<MemberConsumeSettingListItem>[] = [

    {
      title: '主键',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '每一元需要抵扣的积分数量',
      dataIndex: 'deductionPerAmount',
      hideInSearch: true,
    },
    {
      title: '每笔订单最高抵用百分比',
      dataIndex: 'maxPercentPerOrder',
      hideInSearch: true,
    },
    {
      title: '每次使用积分最小单位100',
      dataIndex: 'useUnit',
      hideInSearch: true,
    },
    {
      title: '和优惠券同用',
      dataIndex: 'couponStatus',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '可以'},
            {value: '0', label: '不可以'},
          ]}
        />

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.couponStatus == 1} onChange={(flag) => {
            showStatusConfirm(entity.id, flag ? 1 : 0, 2)
          }}/>
        );
      },
    },
    {
      title: '状态',
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
            showStatusConfirm(entity.id, flag ? 1 : 0, 1)
          }}/>
        );
      },
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
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm(record.id);
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
      <ProTable<MemberConsumeSettingListItem>
        headerTitle="积分消费设置管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={queryMemberConsumeSettingList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
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
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<MemberConsumeSettingListItem>
            column={2}
            title={"积分消费设置详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<MemberConsumeSettingListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberConsumeSettingList;
