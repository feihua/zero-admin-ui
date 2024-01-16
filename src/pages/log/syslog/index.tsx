import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Typography} from 'antd';
import React, {useRef, useState} from 'react';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {TableListItem} from './data.d';
import {querySysLog, removeSysLog} from './service';

const {Paragraph} = Typography;

const {confirm} = Modal;

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeSysLog({
      ids: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  const showDeleteConfirm = (item: TableListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '用户操作',
      dataIndex: 'operation',
      hideInSearch: true,
    },
    {
      title: '请求方法',
      dataIndex: 'method',
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      hideInSearch: true,
    },
    {
      title: '响应参数',
      dataIndex: 'responseParams',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '执行时间(毫秒)',
      dataIndex: 'time',
      hideInSearch: true,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '操作时间时间',
      dataIndex: 'operationTime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
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
              setCurrentRow(record);
              setShowDetail(true);
            }}
          >
            查看响应参数
          </Button>
          <Divider type="vertical"/>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined/>}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer
      title={false}>
      <ProTable<TableListItem>
        headerTitle="操作日志列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={querySysLog}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 10}}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{fontWeight: 600}}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined/>}
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        <div>
          <Paragraph>请求方法:</Paragraph>
          <Paragraph copyable>{currentRow?.method}</Paragraph>
        </div>
        <div>
          <Paragraph>请求参数:</Paragraph>
          <Paragraph copyable>{currentRow?.requestParams}</Paragraph>
        </div>
        <div>
          <Paragraph>响应参数:</Paragraph>
          <Paragraph copyable>{currentRow?.responseParams}</Paragraph>
        </div>
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
