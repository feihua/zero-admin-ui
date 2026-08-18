import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Divider, Drawer, message, Modal, Select, Space, Tag, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {SysLogListItem} from './data.d';
import {queryOperateLogList, removeOperateLog} from './service';

const {Paragraph} = Typography;

const {confirm} = Modal;

/**
 *  删除节点
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeOperateLog(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const SysLogList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<SysLogListItem>();

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

  const columns: ProColumns<SysLogListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true
    },
    {
      title: '系统模块',
      dataIndex: 'title',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },

    },
    {
      title: '操作人员',
      dataIndex: 'operateName',
    },
    {
      title: '操作地址',
      dataIndex: 'operateIp',
    },
    {
      title: '操作方法',
      dataIndex: 'operateUrl',
    },
    {
      title: '请求参数',
      dataIndex: 'operateParam',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '响应参数',
      dataIndex: 'jsonResult',
      hideInTable: true,
      hideInSearch: true
    },


    {
      title: '操作状态',
      dataIndex: 'status',
      renderFormItem: (text, row, index) => {
        return <Select
          placeholder={'请选择登录状态'}
          value={row.value}
          options={[
            {value: 200, label: '成功'},
            {value: 0, label: '失败'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.status) {
          case 200:
            return <Tag color={'success'}>成功</Tag>;
          case 0:
            return <Tag  color={'error'}>失败</Tag>;
        }
        return <>未知{entity.status }</>;
      },
    },
    {
      title: '执行时间(毫秒)',
      dataIndex: 'costTime',
      hideInSearch: true
    },

    {
      title: '操作时间',
      dataIndex: 'operateTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true
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
              setShowDetail(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 查看
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
    <PageContainer
      title={false}>
      <ProTable<SysLogListItem>
        headerTitle="操作日志列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={queryOperateLogList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <a onClick={async () => {
                showDeleteConfirm(ids);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
            </Space>
          );
        }}
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
        <div>
          <Paragraph>请求方法:</Paragraph>
          <Paragraph copyable>{currentRow?.operateUrl}</Paragraph>
        </div>
        <div>
          <Paragraph>请求参数:</Paragraph>
          <Paragraph copyable>{currentRow?.operateParam}</Paragraph>
        </div>
        <div>
          <Paragraph>响应参数:</Paragraph>
          <Paragraph copyable>{currentRow?.jsonResult}</Paragraph>
        </div>
      </Drawer>
    </PageContainer>
  );
};

export default SysLogList;
