import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'antd';
import type {SubjectListItem} from '../data.d';
import {querySubject} from '@/pages/sms/home_recommend_subject/service';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: number[]) => void;
  createModalVisible: boolean;
}

const CreateRecommendSubjectForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<SubjectListItem[]>([]);

  const {onSubmit, onCancel, createModalVisible} = props;

  useEffect(() => {
    if (!createModalVisible) {
      setSelectedRows([]);
    }
  }, [createModalVisible]);

  const handleSubmit = () => {
    onSubmit(selectedRowsState.map((row) => row.id));
    setSelectedRows([]);
  };

  const columns: ProColumns<SubjectListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '专题名称',
      dataIndex: 'title',
    },
    {
      title: '所属分类',
      dataIndex: 'categoryName',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },

  ];

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="选择专题"
      open={createModalVisible}
      {...modalFooter}
      width={800}
    >
      <ProTable<SubjectListItem>
        toolBarRender={false}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 65,
        }}
        request={querySubject}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 6}}
      />

    </Modal>
  );
};

export default CreateRecommendSubjectForm;
