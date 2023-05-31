import {EditOutlined} from '@ant-design/icons';
import {Button, message,} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import UpdateSettingForm from './components/UpdateSettingForm';
import type {SettingListItem} from './data.d';
import {querySetting, updateSetting} from './service';


/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: SettingListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateSetting(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};


const TableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SettingListItem>();


  const columns: ProColumns<SettingListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '秒杀订单超时关闭时间(分)',
      dataIndex: 'flashOrderOvertime',
      render: (dom, entity) => {
        return <div>{dom}分</div>;
      },
    },
    {
      title: '正常订单超时时间(分)',
      dataIndex: 'normalOrderOvertime',
      render: (dom, entity) => {
        return <div>{dom}分</div>;
      },
    },
    {
      title: '发货后自动确认收货时间（天）',
      dataIndex: 'confirmOvertime',
      render: (dom, entity) => {
        return <div>{dom}天</div>;
      },
    },
    {
      title: '自动完成交易时间（天）',
      dataIndex: 'finishOvertime',
      render: (dom, entity) => {
        return <div>{dom}天</div>;
      },
    },
    {
      title: '订单完成后自动好评时间（天）',
      dataIndex: 'commentOvertime',
      render: (dom, entity) => {
        return <div>{dom}天</div>;
      },
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
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<SettingListItem>
        headerTitle="设置列表"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={false}
        request={querySetting}
        columns={columns}
        pagination={{pageSize: 10}}
      />

      <UpdateSettingForm
        key={'UpdateSettingForm'}
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
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        currentData={currentRow || {}}
      />

    </PageContainer>
  );
};

export default TableList;
