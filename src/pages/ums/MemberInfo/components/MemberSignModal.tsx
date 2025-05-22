import React, {useEffect, useRef} from 'react';
import {message, Modal} from 'antd';
import type {MemberSignLogListItem} from '../data.d';
import {queryMemberSignLogList} from '../service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface SignProps {
  visible: boolean;
  memberId: number;
  onCancel: () => void;
}

const MemberSignModal: React.FC<SignProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const {onCancel, visible, memberId} = props;

  useEffect(() => {
    if (visible) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }, [visible]);


  const columns: ProColumns<MemberSignLogListItem>[] = [

    {
      title: '主键id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员ID',
      dataIndex: 'memberId',
      hideInSearch: true,
    },
    {
      title: '签到日期',
      dataIndex: 'signDate',
      hideInSearch: true,
    },
    {
      title: '连续签到天数',
      dataIndex: 'continueDays',
      hideInSearch: true,
    },
    {
      title: '获得积分',
      dataIndex: 'points',
      hideInSearch: true,
    },
    {
      title: '签到时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },


  ];

  return (
    <Modal
      forceRender
      destroyOnClose
      title="会员地址"
      open={visible}
      footer={false}
      width={1400}
      onCancel={onCancel}
    >
      <ProTable<MemberSignLogListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={(params) => {
          return queryMemberSignLogList({
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

export default MemberSignModal;
