import {
  PlusOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal, Switch} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions, {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateHomeBrandForm from './components/CreateHomeBrandForm';
import SetSortForm from './components/SetSortForm';
import type {HomeBrandListItem} from './data.d';
import {queryHomeBrandList, updateHomeBrand, addHomeBrand, removeHomeBrand, updateHomeBrandStatus} from './service';

const {confirm} = Modal;

/**
 * 添加节点
 * @param brandIds
 */
const handleAdd = async (brandIds: number[]) => {
  const hide = message.loading('正在添加');
  if (brandIds.length <= 0) {
    hide();
    return true;
  }
  try {
    await addHomeBrand(brandIds);
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
const handleUpdate = async (fields: HomeBrandListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateHomeBrand(fields);
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
const handleRemove = async (selectedRows: HomeBrandListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeHomeBrand(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

/**
 * 更新品牌推荐状态
 * @param ids
 * @param recommendStatus
 */
const handleBrandStatus = async (ids: number[], recommendStatus: number) => {
  const hide = message.loading('正在更新品牌推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateHomeBrandStatus({ids: ids, recommendStatus: recommendStatus});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新品牌推荐状态请重试！');
    return false;
  }
};

const HomeBrandList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<HomeBrandListItem>();
  const [selectedRowsState, setSelectedRows] = useState<HomeBrandListItem[]>([]);

  const showDeleteConfirm = (item: HomeBrandListItem) => {
    confirm({
      title: '是否确认删除所选数据项?',
      icon: <ExclamationCircleOutlined/>,
      content: '请谨慎操作',
      onOk() {
        handleRemove([item]).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (item: HomeBrandListItem, status: number) => {
    confirm({
      title: `确定${status == 1 ? "推荐" : "不推荐"}${item.brandName}品牌吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleBrandStatus([item.id], status)
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<HomeBrandListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
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
      title: '是否推荐',
      dataIndex: 'recommendStatus',
      width: 220,
      render: (dom, entity) => {
        return (
          <Switch defaultChecked={dom == 1} onChange={(flag) => {
            showStatusConfirm(entity, flag ? 1 : 0)
          }}/>
        );
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <>
          <a
            key="sort"
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            设置排序
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm(record);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<HomeBrandListItem>
        headerTitle="品牌推荐列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 选择品牌
          </Button>,
        ]}
        request={queryHomeBrandList}
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
              已选择 <a style={{fontWeight: 600}}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
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

      <CreateHomeBrandForm
        key={'CreateHomeBrandForm'}
        onSubmit={async (brandIds) => {
          const success = await handleAdd(brandIds);
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

      <SetSortForm
        key={'UpdateHomeBrandForm'}
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
          <ProDescriptions<HomeBrandListItem>
            column={2}
            title={currentRow?.brandName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<HomeBrandListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default HomeBrandList;
