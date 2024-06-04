import { Button, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProDescriptions, {type ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import { AddressListItem } from './data.d';
import {
  queryMemberAddressList,
} from './service';




const MemberAddressList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<AddressListItem>();

  const columns: ProColumns<AddressListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员',
      dataIndex: 'memberId',
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '收货人名称',
      dataIndex: 'name',
    },
    {
      title: '收货人电话',
      dataIndex: 'phoneNumber',
    },
    {
      title: '是否为默认',
      dataIndex: 'defaultStatus',
      valueEnum: {
        0: { text: '否', status: 'Error' },
        1: { text: '是', status: 'Success' },
      },
    },
    {
      title: '邮政编码',
      dataIndex: 'postCode',
    },
    {
      title: '省份/直辖市',
      dataIndex: 'province',
    },
    {
      title: '城市',
      dataIndex: 'city',
    },
    {
      title: '区',
      dataIndex: 'region',
    },
    {
      title: '详细地址(街道)',
      dataIndex: 'detailAddress',
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
            size="small"
            onClick={() => {
              // handleUpdateModalVisible(true);
              // setStepFormValues(record);
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
      <ProTable<AddressListItem>
        headerTitle="会员地址列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={false}
        request={(params, sorter, filter) => queryMemberAddressList({ ...params, sorter })}
        columns={columns}
        pagination={{pageSize:10}}
      />

      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<AddressListItem>
            column={2}
            title={row?.id}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns as ProDescriptionsItemProps<AddressListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberAddressList;
