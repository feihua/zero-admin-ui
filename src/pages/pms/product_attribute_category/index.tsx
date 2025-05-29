import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateAttributeForm from './components/CreateAttributeForm';
import UpdateAttributeForm from './components/UpdateAttributeForm';
import type {AttributeCategoryListItem} from './data.d';
import {addAttributeCategory, queryAttributeCategoryList, removeAttributeCategory, updateAttributeCategory} from './service';
import {history} from 'umi';

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AttributeCategoryListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addAttributeCategory({...fields});
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
const handleUpdate = async (fields: AttributeCategoryListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateAttributeCategory(fields);
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
const handleRemove = async (selectedRows: AttributeCategoryListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeAttributeCategory(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const ProductAttrCateList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<AttributeCategoryListItem>();
  const [selectedRowsState, setSelectedRows] = useState<AttributeCategoryListItem[]>([]);

  const showDeleteConfirm = (item: AttributeCategoryListItem) => {
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

  const columns: ProColumns<AttributeCategoryListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '属性数量',
      dataIndex: 'attributeCount',
      hideInSearch: true,
    },
    {
      title: '参数数量',
      dataIndex: 'paramCount',
      hideInSearch: true,
    },

    {
      title: '设置',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
        <a
            key="sort"
            onClick={() => {
              history.push(`/pms/attribute/list?productAttributeCategoryId=` + record.id);
            }}
          >
            <EditOutlined/> 属性/参数
          </a>

        </>
      ),
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
              <EditOutlined/> 编辑
            </a>
            <Divider type="vertical"/>
            <a
              key="delete"
              style={{color: '#ff4d4f'}}
              onClick={() => {
                showDeleteConfirm(record);
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
      <ProTable<AttributeCategoryListItem>
        headerTitle="分类列表"
        actionRef={actionRef}
        tableLayout={"fixed"}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建分类
          </Button>,
        ]}
        request={queryAttributeCategoryList}
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


      <CreateAttributeForm
        key={'CreateAttributeForm'}
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

      <UpdateAttributeForm
        key={'UpdateAttributeForm'}
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
          setShowDetail(false)
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<AttributeCategoryListItem>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<AttributeCategoryListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ProductAttrCateList;
