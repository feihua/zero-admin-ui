import React, {useEffect, useRef} from 'react';
import { message, MessageArgsProps, Modal } from 'antd';
import type { AddressListItem } from '../data.d';
import { queryMemberAddressList } from '../service';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface CreateFormProps {
  addressModalVisible: boolean;
  memberId: number;
  onCancel: () => void;
}

const MemberAddressModal: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const { onCancel,addressModalVisible, memberId } = props;

  useEffect(() => {
    if (addressModalVisible) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }, [addressModalVisible]);


  const columns: ProColumns<AddressListItem>[] = [
    {
      title: '主键ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员ID',
      dataIndex: 'memberId',
      hideInSearch: true,
    },
    {
      title: '收货人姓名',
      dataIndex: 'receiverName',
      hideInSearch: true,
    },

    {
      title: '收货人电话',
      dataIndex: 'receiverPhone',
      hideInSearch: true,
    },
    {
      title: '省份',
      dataIndex: 'province',
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      hideInSearch: true,
    },
    {
      title: '区县',
      dataIndex: 'district',
      hideInSearch: true,
    },
    {
      title: '详细地址',
      dataIndex: 'detailAddress',
      hideInSearch: true,
    },
    {
      title: '邮政编码',
      dataIndex: 'postalCode',
      hideInSearch: true,
    },
    {
      title: '地址标签',
      dataIndex: 'tag',
      hideInSearch: true,
    },
    {
      title: '是否默认地址',
      dataIndex: 'isDefault',
      hideInSearch: true,
      render: (dom, entity) => {
        return entity.isDefault === 1 ? '是' : '否';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
  ];


  return (
    <Modal
      forceRender
      destroyOnClose
      title="会员地址"
      open={addressModalVisible}
      footer={false}
      width={1400}
      onCancel={onCancel}
    >
      <ProTable<AddressListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={(params) => {
          return queryMemberAddressList({
            ...params,
            memberId: memberId,
          }).then(
            (res: {
              code: string;
              data: any;
              total: any;
              pageSize: any;
              current: any;
              msg:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | MessageArgsProps
                | null
                | undefined;
            }) => {
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
            },
          );
        }}
        columns={columns}
        pagination={{ pageSize: 6 }}
      />
    </Modal>
  );
};

export default MemberAddressModal;
