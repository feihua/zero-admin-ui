import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import type {BrandListItem} from '../data.d';
import {queryBrand} from '@/pages/sms/home_brand/service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: number[]) => void;
  createModalVisible: boolean;
}

const CreateHomeBrandForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<BrandListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (!createModalVisible) {
      setSelectedRows([]);
    }
  }, [createModalVisible]);

  const handleSubmit = () => {
    onSubmit(selectedRowsState.map((row) => row.id));
  };

  const columns: ProColumns<BrandListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '品牌名',
      dataIndex: 'name',
    },
    {
      title: '产品数量',
      dataIndex: 'productCount',
      hideInSearch: true,
    },
    {
      title: '产品评论数量',
      dataIndex: 'productCommentCount',
      hideInSearch: true,
    },
  ];

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="选择品牌"
      open={createModalVisible}
      {...modalFooter}
      width={800}
    >
      <ProTable<BrandListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 50,
        }}
        request={queryBrand}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 6}}
      />
    </Modal>
  );
};

export default CreateHomeBrandForm;
