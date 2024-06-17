import React, {useRef, useState} from 'react';
import type {CategoryListItem} from '../data.d';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {queryProductCategoryList} from "@/pages/sms/Coupon/service";
import {tree} from "@/utils/utils";

export interface CreateFormProps {
  onSubmit: (values: any[]) => void;
  selectIds: number[];
}

const CategoryForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const [selectedRows, setSelectedRows] = useState<number[]>(props.selectIds);

  const {onSubmit} = props;

  const columns: ProColumns<CategoryListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      valueType: 'image',
      fieldProps: {width: 100, height: 80},
      hideInSearch: true,
    },

    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
  ];

  return (
    <ProTable<CategoryListItem>
      toolBarRender={false}
      actionRef={actionRef}
      rowKey="id"
      search={false}
      request={queryProductCategoryList}
      postData={(data) => tree(data, 0, 'parentId')}
      columns={columns}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: (_, selectedRows1) => {
          setSelectedRows(selectedRows1.map((row) => row.id));
          onSubmit(selectedRows1)
        },
      }}
      pagination={false}
    />
  );
};

export default CategoryForm;
