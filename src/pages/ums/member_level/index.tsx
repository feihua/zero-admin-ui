import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateLevelForm from './components/CreateLevelForm';
import UpdateLevelForm from './components/UpdateLevelForm';
import type {LevelListItem} from './data.d';
import {queryLevelList, updateLevel, addLevel, removeLevel} from './service';

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: LevelListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addLevel({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: LevelListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateLevel(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: LevelListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeLevel(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const MemberLevelList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<LevelListItem>();
  const [selectedRowsState, setSelectedRows] = useState<LevelListItem[]>([]);

  const showDeleteConfirm = (item: LevelListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<LevelListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员名',
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '成长值',
      dataIndex: 'growthPoint',
      hideInSearch: true,
    },
    {
      title: '是否为默认等级',
      dataIndex: 'defaultStatus',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '免运费标准',
      dataIndex: 'freeFreightPoint',
      hideInSearch: true,
    },
    {
      title: '每次评价获取的成长值',
      dataIndex: 'commentGrowthPoint',
      hideInSearch: true,
    },
    {
      title: '免邮特权',
      dataIndex: 'priviledgeFreeFreight',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '签到特权',
      dataIndex: 'priviledgeSignIn',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '评论获奖励特权',
      dataIndex: 'priviledgeComment',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '专享活动特权',
      dataIndex: 'priviledgePromotion',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '会员价格特权',
      dataIndex: 'priviledgeMemberPrice',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '会员生日特权',
      dataIndex: 'priviledgeBirthday',
      hideInSearch: true,
      valueEnum: {
        0: {text: '否', status: 'Error'},
        1: {text: '是', status: 'Success'},
      },
    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined/>}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined/>}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<LevelListItem>
        headerTitle="等级列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建等级
          </Button>,
        ]}
        request={queryLevelList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        pagination={{pageSize: 10}}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <CreateLevelForm
        key={'CreateLevelForm'}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        createModalVisible={createModalVisible}
      />

      <UpdateLevelForm
        key={'UpdateLevelForm'}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<LevelListItem>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<LevelListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default MemberLevelList;
