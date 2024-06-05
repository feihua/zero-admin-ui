import {PlusOutlined, ExclamationCircleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, message, Drawer, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import CreateAttributeForm from './components/CreateAttributeForm';
import UpdateAttributeForm from './components/UpdateAttributeForm';
import type {AttributeListItem} from './data.d';
import {queryAttributeList, updateAttribute, addAttribute, removeAttribute} from './service';
import {useLocation} from 'umi';

const {confirm} = Modal;

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AttributeListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addAttribute({...fields});
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
const handleUpdate = async (fields: AttributeListItem) => {
  const hide = message.loading('正在更新');
  try {
    await updateAttribute(fields);
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
const handleRemove = async (selectedRows: AttributeListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeAttribute(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const ProductAttrList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<AttributeListItem>();
  const [selectedRowsState, setSelectedRows] = useState<AttributeListItem[]>([]);
  // const [productAttributeCategoryId, setProductAttributeCategoryId] = useState<number>(0);

  const location = useLocation();
  // @ts-ignore
  console.log(location.query.productAttributeCategoryId)
  // @ts-ignore
  // setProductAttributeCategoryId(location.query.productAttributeCategoryId)

  const showDeleteConfirm = (item: AttributeListItem) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove([item]).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };

  const columns: ProColumns<AttributeListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '属性/参数名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },
    {
      title: '属性是否可选',
      dataIndex: 'selectType',
      hideInSearch: true,
      valueEnum: {
        0: {text: '唯一', status: 'Error'},
        1: {text: '单选', status: 'Success'},
        2: {text: '多选', status: 'Success'},
      },
    },
    {
      title: '属性值的录入方式',
      dataIndex: 'inputType',
      hideInSearch: true,
      valueEnum: {
        0: {text: '手工录入', status: 'Error'},
        1: {text: '从列表中选取', status: 'Success'},
      },
    },
    {
      title: '可选值列表',
      dataIndex: 'inputList',
      hideInSearch: true,
    },
    {
      title: '分类筛选样式',
      dataIndex: 'filterType',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        0: {text: '普通', status: 'Error'},
        1: {text: '颜色', status: 'Success'},
      },
    },
    {
      title: '检索类型',
      dataIndex: 'searchType',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        0: {text: '不需要进行检索', status: 'Error'},
        1: {text: '关键字检索', status: 'Success'},
        2: {text: '范围检索', status: 'Success'},
      },
    },
    {
      title: '相同属性产品是否关联',
      dataIndex: 'relatedStatus',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        0: {text: '不关联', status: 'Error'},
        1: {text: '关联', status: 'Success'},
      },
    },
    {
      title: '是否支持手动新增',
      dataIndex: 'handAddStatus',
      hideInSearch: true,
      hideInTable: true,
      valueEnum: {
        0: {text: '不支持', status: 'Error'},
        1: {text: '支持', status: 'Success'},
      },
    },
    {
      title: '属性的类型',
      dataIndex: 'type',
      valueEnum: {
        0: {text: '规格', status: 'Error'},
        1: {text: '参数', status: 'Success'},
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
      <ProTable<AttributeListItem>
        headerTitle="属性详情"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={(params) => {
          return queryAttributeList({
            ...params,
            // @ts-ignore
            productAttributeCategoryId: location.query.productAttributeCategoryId,
          }).then((res) => {
            console.log(res)
            if (res.code === '000000') {
              return {
                data: res.data,
                total: res.total,
                pageSize: res.pageSize,
                current: res.current,
              };
            } else {
              return message.error(res.msg);
            }
          });
        }}
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
          <ProDescriptions<AttributeListItem>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<AttributeListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ProductAttrList;
