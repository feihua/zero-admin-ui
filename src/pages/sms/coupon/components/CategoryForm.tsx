import React, {useRef} from 'react';
import type {CategoryListItem, ProductListItem} from '../data.d';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {queryProductCategoryList} from "@/pages/sms/coupon/service";
import {tree} from "@/utils/utils";

export interface CreateFormProps {
  onSubmit: (values: any[]) => void;
}

const CategoryForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();

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
    <ProTable<ProductListItem>
      toolBarRender={false}
      actionRef={actionRef}
      rowKey="id"
      search={false}
      request={queryProductCategoryList}
      postData={(data) => tree(data, 0, 'parentId')}
      columns={columns}
      rowSelection={{
        onChange: (_, selectedRows) => onSubmit(selectedRows),
      }}
      pagination={false}
    />
  );
};

export default CategoryForm;
