import React, {useEffect, useRef} from 'react';
import {message, Modal} from 'antd';
import type {AddressListItem} from '../data.d';
import {queryMemberAddressList} from '../service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: () => void;
  addressModalVisible: boolean;
  memberId: number;
}

const MemberAddressModal: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const {onSubmit, onCancel, addressModalVisible, memberId} = props;

  useEffect(() => {
    if (addressModalVisible) {
      if (actionRef.current) {
        actionRef.current.reload();
      }
    }
  }, [addressModalVisible]);

  const handleSubmit = () => {
    onSubmit();
  };

  const columns: ProColumns<AddressListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员',
      dataIndex: 'memberId',
      hideInSearch: true,
    },
    {
      title: '收货人名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '收货人电话',
      dataIndex: 'phoneNumber',
      hideInSearch: true,
    },
    {
      title: '是否为默认',
      dataIndex: 'defaultStatus',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '邮政编码',
      dataIndex: 'postCode',
      hideInSearch: true,
    },
    {
      title: '省份/直辖市',
      dataIndex: 'province',
      hideInSearch: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      hideInSearch: true,
    },
    {
      title: '区',
      dataIndex: 'region',
      hideInSearch: true,
    },
    {
      title: '详细地址(街道)',
      dataIndex: 'detailAddress',
      hideInSearch: true,
    },
  ];

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="会员地址"
      open={addressModalVisible}
      {...modalFooter}
      width={800}
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
          }).then((res) => {
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

export default MemberAddressModal;
