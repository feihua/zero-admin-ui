import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Col, Divider, Drawer, message, Modal, Row, Space, Tree} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import {ProductRelationListListItem} from './data.d';
import {addProductRelationList, queryProductRelationListList, removeProductRelationList,} from './service';
import {DataNode, TreeProps} from 'antd/es/tree';
import {querySessionList} from "@/pages/sms/flash_promotion/components/Session/service";
import SetProductItemModal from "@/pages/sms/flash_promotion/components/SetProductList/components/SetProductItemModal";

const {confirm} = Modal;


/**
 *  删除节点
 * @param ids
 * @param flashPromotionId
 */
const handleRemove = async (ids: number[], flashPromotionId: number) => {
  const hide = message.loading('正在删除');
  if (ids.length === 0) return true;
  try {
    await removeProductRelationList(ids, flashPromotionId);
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

export interface ProductProps {
  flashPromotionId: number
}


const SetProductList: React.FC<ProductProps> = (props) => {
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [setRoleModalVisible, handleSetRoleModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ProductRelationListListItem>();

  const [deptConf, setDeptConf] = useState<DataNode[]>([]);
  const [deptId, setDeptId] = useState<number>(0);

  const showDeleteConfirm = (ids: number[], flashPromotionId: number) => {
    confirm({
      title: '是否删除记录?',
      icon: <ExclamationCircleOutlined/>,
      content: '删除的记录不能恢复,请确认!',
      onOk() {
        handleRemove(ids, flashPromotionId).then(() => {
          actionRef.current?.reloadAndRest?.();
        });
      },
      onCancel() {
      },
    });
  };


  const columns: ProColumns<ProductRelationListListItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      render: (dom, entity) => {
        return <a onClick={() => {
          setCurrentRow(entity);
          setShowDetail(true);
        }}>{dom}</a>;
      },
    },

    {
      title: '货号',
      dataIndex: 'productSn',
      hideInSearch: true,
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '剩余数量',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '秒杀价格',
      dataIndex: 'flashPromotionPrice',
      hideInSearch: true,
    },
    {
      title: '秒杀数量',
      dataIndex: 'flashPromotionCount',
      hideInSearch: true,
    },
    {
      title: '限购数量',
      dataIndex: 'flashPromotionLimit',
      hideInSearch: true,
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
              // handleUpdateModalVisible(true);
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
              showDeleteConfirm([record.id], props.flashPromotionId);
            }}
          >
            <DeleteOutlined/> 删除
          </a>
        </>
      ),
    },
  ];

  useEffect(() => {
    querySessionList({}).then((res) => {
      setDeptConf(res.data)
    });
  }, []);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    setDeptId(Number(selectedKeys[0]))
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={4} style={{background: 'white', paddingTop: 24, paddingLeft: 24}}>
          <Tree
            showLine
            onSelect={onSelect}
            treeData={deptConf}
            fieldNames={{title: "name"}}
          />
        </Col>
        <Col span={20}>
          <ProTable<ProductRelationListListItem>
            headerTitle="商品列表"
            actionRef={actionRef}
            rowKey="id"
            search={{
              labelWidth: 80,
              span: 6,
            }}
            toolBarRender={() => [
              <Button type="primary" key="primary" onClick={() => handleSetRoleModalVisible(true)}>
                <PlusOutlined/> 添加
              </Button>,
            ]}
            request={(params => {
              return queryProductRelationListList({
                ...params,
                flashPromotionSessionId: deptId,
                flashPromotionId: props.flashPromotionId
              })
            })}
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
                  <Button
                    icon={<DeleteOutlined/>}
                    danger
                    style={{borderRadius: '5px'}}
                    onClick={async () => {
                      showDeleteConfirm(ids, props.flashPromotionId);
                    }}
                  >批量删除</Button>
                </Space>
              );
            }}
          />

          <SetProductItemModal
            key={'SetRoleModal'}
            onSubmit={async (value) => {
              const success = await addProductRelationList({
                flashPromotionSessionId: deptId,
                flashPromotionId: props.flashPromotionId, ...value
              });
              if (success) {
                handleSetRoleModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleSetRoleModalVisible(false);
              if (!showDetail) {
                setCurrentRow(undefined);
              }
            }}
            setRoleModalVisible={setRoleModalVisible}
          />
        </Col>
      </Row>


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
          <ProDescriptions<ProductRelationListListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<ProductRelationListListItem>[]}
          />
        )}
      </Drawer>
    </div>
  );
};

export default SetProductList;
