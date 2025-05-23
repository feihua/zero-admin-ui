import React, {useEffect, useRef} from 'react';
import {message, Modal} from 'antd';
import {queryLoginLogList} from '../service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {LoginLogListItem} from "../data.d";

export interface CreateFormProps {
  logModalVisible: boolean;
  memberId: number;
  onCancel: () => void;
}

const MemberLogModal: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const { onCancel,logModalVisible, memberId} = props;

  useEffect(() => {
    if (logModalVisible) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }, [logModalVisible]);


  const columns: ProColumns<LoginLogListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'memberId',
      hideInSearch: true,
    },
    {
      title: 'ip',
      dataIndex: 'ip',
      hideInSearch: true,
    },
    {
      title: '省',
      dataIndex: 'province',
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      hideInSearch: true,
    },
    {
      title: '登录类型',
      dataIndex: 'loginType',
      valueEnum: {
        0: {text: 'PC', status: 'Error'},
        1: {text: 'android', status: 'Success'},
        2: {text: 'ios', status: 'Success'},
        3: {text: '小程序', status: 'Success'},
      },
    },
  ];


  return (
    <Modal
      forceRender
      destroyOnClose
      title="登录日志"
      open={logModalVisible}
      footer={false}
      width={800}
      onCancel={onCancel}
    >
      <ProTable<LoginLogListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={async (params) => {
          if (!logModalVisible) {
            return {
              data: [],
              success: true,
              total: 0,
            };
          }
          return queryLoginLogList({
            ...params,
            memberId,
          }).then((res) => {
            console.log(res)
            if (res.code === '000000') {
              return {
                data: res.data,
                total: res.total,
                pageSize: res.pageSize,
                current: res.current,
              };
            } else {
              return message.error(res.msg);
            }
          });
        }}
        columns={columns}
        pagination={{pageSize: 6}}
      />
    </Modal>
  );
};

export default MemberLogModal;
