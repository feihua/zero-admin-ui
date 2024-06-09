import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Space, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateFlashForm from './components/CreateFlashForm';
import UpdateFlashForm from './components/UpdateFlashForm';
import type {FlashPromotionListItem} from './data.d';
import {
  addFlashPromotion,
  queryFlashPromotionList,
  removeFlashPromotion,
  updateFlashPromotion,
  updateFlashPromotionStatus,
} from './service';
import moment from "moment";
import SessionModal from "@/pages/sms/flash_promotion/components/Session/SessionModal";
import SessionProductModal from "@/pages/sms/flash_promotion/components/SetProductList/SessionProductModal";

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FlashPromotionListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addFlashPromotion({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FlashPromotionListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateFlashPromotion(fields);
    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};


/**
 *  删除节点
 * @param ids
 */
const handleRemove = async (ids: number[]) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeFlashPromotion(ids);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新状态
 * @param ids
 * @param status
 */
const handleStatus = async (ids: number[], status: number) => {
  const hide = message.loading('正在更新专题推荐状态');
  if (ids.length == 0) {
    hide();
    return true;
  }
  try {
    await updateFlashPromotionStatus({ids: ids, status: status});
    hide();
    message.success('更新品牌推荐状态成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const FlashPromotionList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [sessionModalVisible, handleSessionModalVisible] = useState<boolean>(false);
  const [productModalVisible, handleProductModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<FlashPromotionListItem>();

  const showDeleteConfirm = (ids: number[]) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids).then((r) => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const showStatusConfirm = (ids: number[], status: number) => {
    confirm({
      title: `确定${status == 1 ? "上线" : "下线"}吗？`,
      icon: <ExclamationCircleOutlined/>,
      async onOk() {
        await handleStatus(ids, status)
        actionRef.current?.reload?.();
      },
      onCancel() {
      },
    });
  };
  const columns: ProColumns<FlashPromotionListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '活动标题',
      dataIndex: 'title',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '活动状态',
      dataIndex: 'title',
      hideInSearch: true,
      render: (dom, entity) => {
        let now = moment().format('YYYY-MM-DD')
        let startDate = moment(entity.startDate).format('YYYY-MM-DD')
        let endDate = moment(entity.endDate).format('YYYY-MM-DD')

        let status
        if (now < startDate) {
          status = '活动未开始'
        } else if (now > endDate) {
          status = '活动已结束'
        } else {
          status = '活动进行中'
        }
        return <>
          {status}
        </>;
      },
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      valueType: 'date'
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      valueType: 'date'
    },
    {
      title: '上线/下线',
      dataIndex: 'status',
      renderFormItem: (text, row) => {
        return <Select
          value={row.value}
          options={[
            {value: '1', label: '上线'},
            {value: '0', label: '下线'},
          ]}
        />

      },
      render: (dom, entity) => {
        return (
          <Switch checked={entity.status == 1} onChange={(flag) => {
            showStatusConfirm([entity.id], flag ? 1 : 0)
          }}/>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 220,
      render: (_, record) => (
        <>
          <a
            key="set"
            onClick={() => {
              handleProductModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 设置商品
          </a>
          <Divider type="vertical"/>
          <a
            key="sort"
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            <EditOutlined/> 编辑
          </a>
          <Divider type="vertical"/>
          <a
            key="delete"
            style={{color: '#ff4d4f'}}
            onClick={() => {
              showDeleteConfirm([record.id]);
            }}
          >
            <DeleteOutlined/> 删除
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<FlashPromotionListItem>
        headerTitle="秒杀列表"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
          span: 4
        }}
        toolBarRender={() => [
          <Button onClick={() => handleSessionModalVisible(true)}>
            秒杀时间段列表
          </Button>,
          <Divider type="horizontal"/>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建活动
          </Button>,
        ]}
        request={queryFlashPromotionList}
        columns={columns}
        rowSelection={{}}
        pagination={{pageSize: 10}}
        tableAlertRender={({
                             selectedRowKeys,
                             selectedRows,
                             onCleanSelected,
                           }) => {
          const ids = selectedRows.map((row) => row.id);
          return (
            <Space size={16}>
              <span>已选 {selectedRowKeys.length} 项</span>
              <a onClick={async () => {
                await handleStatus(ids, 1);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>批量上线</a>
              <a onClick={async () => {
                await handleStatus(ids, 0);
                onCleanSelected()
                actionRef.current?.reload?.();
              }}>批量下线</a>
              <a onClick={async () => {
                showDeleteConfirm(ids);
              }} style={{color: '#ff4d4f'}}>批量删除</a>
            </Space>
          );
        }}
      />

      <CreateFlashForm
        key={'CreateFlashForm'}
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

      <UpdateFlashForm
        key={'UpdateFlashForm'}
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

      <SessionModal
        key={'DictItemModal'}
        onCancel={() => {
          handleSessionModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        sessionModalVisible={sessionModalVisible}
      />

      <SessionProductModal
        key={'DictItemModal'}
        onCancel={() => {
          handleProductModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        productModalVisible={productModalVisible}
        flashPromotionId={currentRow?.id || 0}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<FlashPromotionListItem>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<FlashPromotionListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default FlashPromotionList;
