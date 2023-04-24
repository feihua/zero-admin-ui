import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import type {ProductListItem} from '../data.d';
import {queryProduct} from '@/pages/sms/home_new_product/service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: number[]) => void;
  createModalVisible: boolean;
}

const CreateHomeNewProductForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<ProductListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (!createModalVisible) {
      setSelectedRows([]);
    }
  }, [createModalVisible]);

  const handleSubmit = () => {
    onSubmit(selectedRowsState.map((row) => row.id));
  };

  const columns: ProColumns<ProductListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名',
      dataIndex: 'name',
    },
    {
      title: '货号',
      dataIndex: 'productSn',
    },
    {
      title: '促销价格',
      dataIndex: 'promotionPrice',
      hideInSearch: true,
    },
    {
      title: '市场价',
      dataIndex: 'originalPrice',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
  ];

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="选择商品"
      open={createModalVisible}
      {...modalFooter}
      width={1000}
    >
      <ProTable<ProductListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 50,
        }}
        request={queryProduct}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 6}}
      />
    </Modal>
  );
};

export default CreateHomeNewProductForm;
