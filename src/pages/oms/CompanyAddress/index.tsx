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
import type { CompanyAddressListItem } from './data.d';
import {
  addCompanyAddress,
  queryCompanyAddressList,
  removeCompanyAddress,
  updateCompanyAddress,
  updateCompanyAddressReceiveStatus,
  updateCompanyAddressSendStatus,
} from './service';

const { confirm } = Modal;

/**
 * 添加公司收发货地址
 * @param fields
 */
const handleAdd = async (fields: CompanyAddressListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addCompanyAddress({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新公司收发货地址
 * @param fields
 */
const handleUpdate = async (fields: CompanyAddressListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateCompanyAddress(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除公司收发货地址
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeCompanyAddress(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新公司收发货地址状态
 * @param id
 * @param status
 * @param t
 */
const handleStatus = async (id: number, status: number, t: number) => {
  const hide = message.loading('正在更新状态');
  try {
    if (t == 1) {
      await updateCompanyAddressSendStatus({ id: id, status: status });
    } else {
      await updateCompanyAddressReceiveStatus({ id: id, status: status });
    }
    hide();
    message.success('更新状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const CompanyAddressList: React.FC = () => {
  const [addVisible, handleAddVisible] = useState<boolean>(false);
  const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<CompanyAddressListItem>();

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

  const showStatusConfirm = (id: number, status: number, t: number) => {
    confirm({
      title: `确定${status == 1 ? '启用' : '禁用'}吗？`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        await handleStatus(id, status, t);
        actionRef.current?.clearSelected?.();
        actionRef.current?.reload?.();
      },
      onCancel() {},
    });
  };

  const columns: ProColumns<CompanyAddressListItem>[] = [
    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '地址名称',
      dataIndex: 'addressName',
      hideInSearch: true,
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
      title: '收发货人姓名',
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
      title: '收货人电话',
      dataIndex: 'phone',
      hideInSearch: true,
    },
    {
      title: '省/直辖市',
      dataIndex: 'province',
      hideInSearch: true,
    },
    {
      title: '市',
      dataIndex: 'city',
      hideInSearch: true,
    },
    {
      title: '区',
      dataIndex: 'region',
      hideInSearch: true,
    },
    {
      title: '详细地址',
      dataIndex: 'detailAddress',
      hideInSearch: true,
    },
    {
      title: '默认发货地址',
      dataIndex: 'sendStatus',
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
            checked={entity.sendStatus == 1}
            onChange={(flag) => {
              showStatusConfirm(entity.id, flag ? 1 : 0, 1);
            }}
          />
        );
      },
    },
    {
      title: '默认收货地址',
      dataIndex: 'receiveStatus',
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
            checked={entity.receiveStatus == 1}
            onChange={(flag) => {
              showStatusConfirm(entity.id, flag ? 1 : 0, 0);
            }}
          />
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
      <ProTable<CompanyAddressListItem>
        headerTitle="公司收发货地址"
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
        request={queryCompanyAddressList}
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
          <ProDescriptions<CompanyAddressListItem>
            column={2}
            title={'公司收发货地址详情'}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<CompanyAddressListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default CompanyAddressList;
