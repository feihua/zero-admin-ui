import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Drawer, message, Modal, Select, Switch} from 'antd';
import React, {useRef, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type {ProDescriptionsItemProps} from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import AddModal from './components/AddModal';
import UpdateModal from './components/UpdateModal';
import type {MemberRuleSettingListItem} from './data.d';
import {
    addMemberRuleSetting,
    queryMemberRuleSettingList,
    removeMemberRuleSetting,
    updateMemberRuleSetting,
    updateMemberRuleSettingStatus
} from './service';

const {confirm} = Modal;

/**
 * 添加会员积分成长规则
 * @param fields
 */
const handleAdd = async (fields: MemberRuleSettingListItem) => {
    const hide = message.loading('正在添加');
    try {
        await addMemberRuleSetting({...fields});
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        return false;
    }
};

/**
 * 更新会员积分成长规则
 * @param fields
 */
const handleUpdate = async (fields: MemberRuleSettingListItem) => {
    const hide = message.loading('正在更新');
    try {
        await updateMemberRuleSetting(fields);
        hide();

        message.success('更新成功');
        return true;
    } catch (error) {
        hide();
        return false;
    }
};

/**
 *  删除会员积分成长规则
 * @param id
 */
const handleRemove = async (id: number) => {
    const hide = message.loading('正在删除');
    try {
        await removeMemberRuleSetting(id);
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        return false;
    }
};

/**
 * 更新会员积分成长规则状态
 * @param id
 * @param status
 */
const handleStatus = async (id: number, status: number) => {
    const hide = message.loading('正在更新状态');

    try {
        await updateMemberRuleSettingStatus({id: id, status: status});
        hide();
        message.success('更新状态成功');
        return true;
    } catch (error) {
        hide();
        return false;
    }
};

const MemberRuleSettingList: React.FC = () => {
    const [addVisible, handleAddVisible] = useState<boolean>(false);
    const [updateVisible, handleUpdateVisible] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<MemberRuleSettingListItem>();

    const showDeleteConfirm = (id: number) => {
        confirm({
            title: '是否删除记录?',
            icon: <ExclamationCircleOutlined/>,
            content: '删除的记录不能恢复,请确认!',
            onOk() {
                handleRemove(id).then(() => {
                    actionRef.current?.reloadAndRest?.();
                });
            },
            onCancel() {
            },
        });
    };

    const showStatusConfirm = (id: number, status: number) => {
        confirm({
            title: `确定${status == 1 ? "启用" : "禁用"}吗？`,
            icon: <ExclamationCircleOutlined/>,
            async onOk() {
                await handleStatus(id, status)
                actionRef.current?.clearSelected?.();
                actionRef.current?.reload?.();
            },
            onCancel() {
            },
        });
    };

    const columns: ProColumns<MemberRuleSettingListItem>[] = [

        {
            title: '主键',
            dataIndex: 'id',
            hideInSearch: true,
        },
        {
            title: '每消费多少元获取1个点',
            dataIndex: 'consumePerPoint',
            hideInSearch: true,
        },
        {
            title: '最低获取点数的订单金额',
            dataIndex: 'lowOrderAmount',
            hideInSearch: true,
        },
        {
            title: '每笔订单最高获取点数',
            dataIndex: 'maxPointPerOrder',
            hideInSearch: true,
        },
        {
            title: '规则类型',
            dataIndex: 'ruleType',
            renderFormItem: (text, row, index) => {
                return <Select
                    value={row.value}
                    options={[
                        {value: '1', label: '成长值规则'},
                        {value: '0', label: '积分规则'},
                    ]}
                />

            },
            render: (dom, entity) => {
                switch (entity.ruleType) {
                    case 1:
                        return '成长值规则';
                    case 0:
                        return '积分规则';
                }
                return <>未知{entity.ruleType}</>;
            },
        },

        {
            title: '状态',
            dataIndex: 'status',
            renderFormItem: (text, row, index) => {
                return <Select
                    value={row.value}
                    options={[
                        {value: '1', label: '正常'},
                        {value: '0', label: '禁用'},
                    ]}
                />

            },
            render: (dom, entity) => {
                return (
                    <Switch checked={entity.status == 1} onChange={(flag) => {
                        showStatusConfirm(entity.id, flag ? 1 : 0)
                    }}/>
                );
            },
        },

        {
            title: '创建人ID',
            dataIndex: 'createBy',
            hideInSearch: true,
            hideInTable: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            hideInSearch: true,
        },
        {
            title: '更新人ID',
            dataIndex: 'updateBy',
            hideInSearch: true,
            hideInTable: true,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
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
                        key="sort"
                        onClick={() => {
                            handleUpdateVisible(true);
                            setCurrentRow(record);
                        }
                        }
                    >
                        <EditOutlined/> 编辑
                    </a>
                    <Divider type="vertical"/>
                    <a
                        key="delete"
                        style={{color: '#ff4d4f'}}
                        onClick={() => {
                            showDeleteConfirm(record.id);
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
            <ProTable<MemberRuleSettingListItem>
                headerTitle="会员积分成长规则"
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => handleAddVisible(true)}>
                        <PlusOutlined/> 新增
                    </Button>,
                ]}
                request={queryMemberRuleSettingList}
                columns={columns}
                rowSelection={{}}
                pagination={{pageSize: 10}}
                tableAlertRender={false}
            />


            <AddModal
                key={'AddModal'}
                onSubmit={async (value) => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleAddVisible(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleAddVisible(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
                addVisible={addVisible}
            />

            <UpdateModal
                key={'UpdateModal'}
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateVisible(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateVisible(false);
                    if (!showDetail) {
                        setCurrentRow(undefined);
                    }
                }}
                updateVisible={updateVisible}
                currentData={currentRow || {}}
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
                    <ProDescriptions<MemberRuleSettingListItem>
                        column={2}
                        title={"会员积分成长规则详情"}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.id,
                        }}
                        columns={columns as ProDescriptionsItemProps<MemberRuleSettingListItem>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default MemberRuleSettingList;
