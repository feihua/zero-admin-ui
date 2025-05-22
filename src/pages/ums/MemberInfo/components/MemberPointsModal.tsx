import React, {useEffect, useRef} from 'react';
import {message, Modal, Select, Tag} from 'antd';
import type {MemberPointsLogListItem} from '../data.d';
import {queryMemberPointsLogList} from '../service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface PointsProps {
  visible: boolean;
  memberId: number;
  onCancel: () => void;
}

const MemberPointsModal: React.FC<PointsProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const {onCancel, visible, memberId} = props;

  useEffect(() => {
    if (visible) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }, [visible]);


  const columns: ProColumns<MemberPointsLogListItem>[] = [

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
      title: '变更类型',
      dataIndex: 'changeType',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: 1, label: '添加积分'},
            {value: 2, label: '减少积分'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.changeType) {
          case 1:
            return <Tag color={'success'}>添加积分</Tag>;
          case 2:
            return <Tag>减少积分</Tag>;
        }
        return <>未知{entity.changeType}</>;
      },
    },

    {
      title: '变更积分',
      dataIndex: 'changePoints',
      hideInSearch: true,
    },
    {
      title: '来源类型',
      dataIndex: 'sourceType',
      renderFormItem: (text, row, index) => {
        return <Select
          value={row.value}
          options={[
            {value: '0', label: '其他'},
            {value: '1', label: '订单'},
            {value: '2', label: '活动'},
            {value: '3', label: '签到'},
            {value: '4', label: '管理员修改'},
          ]}
        />

      },
      render: (dom, entity) => {
        switch (entity.sourceType) {
          case 0:
            return <Tag color={'success'}>其他</Tag>;
          case 1:
            return <Tag color={'success'}>订单</Tag>;
          case 2:
            return <Tag color={'success'}>活动</Tag>;
          case 3:
            return <Tag color={'success'}>签到</Tag>;
          case 4:
            return <Tag>管理员修改</Tag>;
        }
        return <>未知{entity.sourceType}</>;
      },
    },

    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '操作人员',
      dataIndex: 'operateMan',
      hideInSearch: true,
    },
    {
      title: '操作备注',
      dataIndex: 'operateNote',
      hideInSearch: true,
    },
    {
      title: '创建时间',
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
      <ProTable<MemberPointsLogListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={async (params) => {
          if (!visible) {
            return {
              data: [],
              success: true,
              total: 0,
            };
          }
          return queryMemberPointsLogList({
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

export default MemberPointsModal;
