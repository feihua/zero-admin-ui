import {Button, Col, message, Modal, Row, Select, Space, Tag} from 'antd';
import React, {useEffect, useRef} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {LoginLogListItem} from './data.d';
import {queryLoginLogList, removeLoginLog} from './service';
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

const {confirm} = Modal;


/**
 *  删除节点
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeLoginLog(ids);
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
  // const [statisticsLoginLogData, setStatisticsLoginLogData] = useState<StatisticsLoginLog>();

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

  const columns: ProColumns<LoginLogListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '登录地址',
      dataIndex: 'ipAddress',
      hideInSearch: true,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          placeholder={'请选择浏览器'}
          options={[
            {value: 'Chrome', label: 'Chrome'},
            {value: 'Firefox', label: 'Firefox'},
            {value: 'Edge', label: 'Edge'},
          ]}
        />

      },
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          placeholder={'请选择操作系统'}
          options={[
            {value: 'Windows', label: 'Windows'},
            {value: 'macos', label: 'macos'},
            {value: 'iphone', label: 'iphone'},
            {value: 'android', label: 'android'},
          ]}
        />

      },
    },
    {
      title: '登录状态',
      dataIndex: 'loginStatus',
      renderFormItem: (text, row, index) => {
        return <Select
          placeholder={'请选择登录状态'}
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
        return <>未知{entity.loginStatus}</>;
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
              showDeleteConfirm([record.id]);
            }}
          >
            <DeleteOutlined/> 删除
          </a>
        </>
      ),
    },
  ];

  useEffect(() => {

    // queryStatisticsLoginLog().then((res) => {
    //   if (res.code === '000000') {
    //     setStatisticsLoginLogData({
    //       dayLoginCount: res.data.dayLoginCount,
    //       monthLoginCount: res.data.monthLoginCount,
    //       weekLoginCount: res.data.weekLoginCount
    //     })
    //   } else {
    //     message.error(res.msg);
    //   }
    // });

  }, []);

  return (
    <PageContainer
      title={false}>
      {/*<Row gutter={8}>*/}
      {/*  <Col span={8}>*/}
      {/*    <Card bordered={false} hoverable>*/}
      {/*      <Statistic*/}
      {/*        title="当天用户登录数"*/}
      {/*        value={statisticsLoginLogData?.dayLoginCount}*/}
      {/*        valueStyle={{color: '#cf1322'}}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col span={8}>*/}
      {/*    <Card bordered={false} hoverable>*/}
      {/*      <Statistic*/}
      {/*        title="当周用户登录数"*/}
      {/*        value={statisticsLoginLogData?.weekLoginCount}*/}
      {/*        valueStyle={{color: '#3f8600'}}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}

      {/*  <Col span={8}>*/}
      {/*    <Card bordered={false} hoverable>*/}
      {/*      <Statistic*/}
      {/*        title="当月用户登录数"*/}
      {/*        value={statisticsLoginLogData?.monthLoginCount}*/}
      {/*        valueStyle={{color: 'blue'}}*/}
      {/*      />*/}
      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Row style={{marginTop: 10}}>
        <Col span={24}>
          <ProTable<LoginLogListItem>
            headerTitle="登录日志"
            actionRef={actionRef}
            rowKey="id"
            search={{
              labelWidth: 80,
              span: 4,
            }}
            request={queryLoginLogList}
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
                  <Button
                    icon={<DeleteOutlined/>}
                    danger
                    style={{borderRadius: '5px'}}
                    onClick={async () => {
                      showDeleteConfirm(ids);
                    }}
                  >批量删除</Button>
                </Space>
              );
            }}
          />
        </Col>
      </Row>


    </PageContainer>
  );
};

export default LoginLogList;
