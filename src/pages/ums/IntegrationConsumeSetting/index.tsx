import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import type { IntegrationConsumeSettingListItem} from './data.d';
import {addIntegrationConsumeSetting, queryIntegrationConsumeSettingList, removeIntegrationConsumeSetting, updateIntegrationConsumeSetting, updateIntegrationConsumeSettingStatus} from './service';

const {confirm} = Modal;

/**
 * 添加积分消费设置
 * @param fields
 */
const handleAdd = async (fields: IntegrationConsumeSettingListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addIntegrationConsumeSetting({...fields});
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
const handleUpdate = async (fields: IntegrationConsumeSettingListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateIntegrationConsumeSetting(fields);
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
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeIntegrationConsumeSetting(ids);
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
 */
const handleStatus = async (id: number, status: number) => {
  const hide = message.loading('正在更新状态');

  try {
    await updateIntegrationConsumeSettingStatus({ integrationConsumeSettingId: id, integrationConsumeSettingStatus: status});
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const IntegrationConsumeSettingList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<IntegrationConsumeSettingListItem>();

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

  const showStatusConfirm = (ids: number, status: number) => {
    confirm({
      title: `确定${status == 1 ? "默认" : "不是默认"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(ids, status)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<IntegrationConsumeSettingListItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
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
      title: '是否可以和优惠券同用',
      dataIndex: 'couponStatus',
      renderFormItem: (text, row, index) => {
          return <Select
            value={row.value}
            options={ [
              {value: '1', label: '可以'},
              {value: '0', label: '不可以'},
            ]}
          />

    },
    render: (dom, entity) => {
      switch (entity.couponStatus) {
        case 1:
          return <Tag color={'success'}>可以</Tag>;
        case 0:
          return <Tag>不可以</Tag>;
      }
      return <>未知{entity.couponStatus}</>;
    },
    },
    {
      title: '每一元需要抵扣的积分数量',
      dataIndex: 'deductionPerAmount',
      hideInSearch: true,
    },

    {
      title: '是否默认',
      dataIndex: 'isDefault',
      hideInSearch: true,
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={ [
            {value: '1', label: '是'},
            {value: '0', label: '否'},
          ]}
        />

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.isDefault == 1} onChange={(flag) => {
            showStatusConfirm( entity.id, flag ? 1 : 0)
          }}/>
        );
      },
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
    <PageContainer>
      <ProTable<IntegrationConsumeSettingListItem>
        headerTitle="积分消费设置管理"
        actionRef={actionRef}
        rowKey="id"
        search={ {
          labelWidth: 120,
        } }
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新增
          </Button>,
        ]}
        request={queryIntegrationConsumeSettingList}
        columns={columns}
        rowSelection={ {} }
        pagination={ {pageSize: 10}}
        tableAlertRender={ ({
                             selectedRowKeys,
                             selectedRows,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <Button
                icon={<DeleteOutlined/>}
                danger
                style={ {borderRadius: '5px'} }
                onClick={async () => {
                  showDeleteConfirm(ids);
                }}
              >批量删除</Button>
            </Space>
          );
        }}
      />


      <CreateForm
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

      <UpdateForm
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
          <ProDescriptions<IntegrationConsumeSettingListItem>
            column={2}
            title={"积分消费设置详情"}
            request={async () => ({
              data: currentRow || {},
            })}
            params={ {
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<IntegrationConsumeSettingListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default IntegrationConsumeSettingList;
