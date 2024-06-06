import {Button, Card, Col, message, Modal, Row, Select, Statistic, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {LoginLogListItem} from './data.d';
import {StatisticsLoginLog} from "./data.d";
import {queryLoginLogList, removeLoginLog, queryStatisticsLoginLog} from './service';
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal;


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: LoginLogListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeLoginLog(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const LoginLogList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<LoginLogListItem[]>([]);
  const [statisticsLoginLogData, setStatisticsLoginLogData] = useState<StatisticsLoginLog>();

  const showDeleteConfirm = (item: LoginLogListItem) => {
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

  const columns: ProColumns<LoginLogListItem>[] = [
    {
      title: '访问编号',
      dataIndex: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '登录地址',
      dataIndex: 'ipAddress',
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
    },
    {
      title: '操作系统',
      dataIndex: 'os',
    },
    {
      title: '登录状态',
      dataIndex: 'loginStatus',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: 'success', label: '成功'},
            {value: 'error', label: '失败'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.loginStatus) {
          case 'success':
            return <Tag color={'success'}>成功</Tag>;
          case 'error':
            return <Tag color={'error'}>失败</Tag>;
        }
        return <>未知{entity.loginStatus }</>;
      },
    },
    {
      title: '操作信息',
      dataIndex: 'errorMsg',
      hideInSearch: true,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      sorter: true,
      hideInSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <>
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

  useEffect(() => {

    queryStatisticsLoginLog().then((res) => {
      if (res.code === '000000') {
        setStatisticsLoginLogData({
          dayLoginCount: res.data.dayLoginCount, monthLoginCount: res.data.monthLoginCount, weekLoginCount: res.data.weekLoginCount
        })
      } else {
        message.error(res.msg);
      }
    });

  }, []);

  return (
    <PageContainer
      title={false}>
      <Row gutter={8}>
        <Col span={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="当天用户登录数"
              value={statisticsLoginLogData?.dayLoginCount}
              valueStyle={{color: '#cf1322'}}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="当周用户登录数"
              value={statisticsLoginLogData?.weekLoginCount}
              valueStyle={{color: '#3f8600'}}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card bordered={false} hoverable>
            <Statistic
              title="当月用户登录数"
              value={statisticsLoginLogData?.monthLoginCount}
              valueStyle={{color: 'blue'}}
            />
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 10}}>
        <Col span={24}>
          <ProTable<LoginLogListItem>
            headerTitle="登录日志"
            actionRef={actionRef}
            rowKey="id"
            search={{
              labelWidth: 120,
            }}
            request={queryLoginLogList}
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => setSelectedRows(selectedRows),
            }}
            pagination={{pageSize: 10}}
          />
        </Col>
      </Row>

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

    </PageContainer>
  );
};

export default LoginLogList;
