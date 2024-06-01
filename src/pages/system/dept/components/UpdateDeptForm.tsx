import React, {useEffect, useState} from 'react';
import {Cascader, Form, Input, InputNumber, message, Modal, Radio} from 'antd';
import type {DeptListItem} from '../data.d';
import {queryDeptList} from "@/pages/system/dept/service";
import {tree} from "@/utils/utils";

export interface UpdateFormProps {
  onCancel: () => void;
  onSubmit: (values: DeptListItem) => void;
  updateModalVisible: boolean;
  currentData: Partial<DeptListItem>;
}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateDeptForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [deptListItem, setDeptListItem] = useState<DeptListItem[]>([]);

  const {onSubmit, onCancel, updateModalVisible, currentData} = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();
    } else {
      queryDeptList({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; deptName: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.deptName,
            title: item.deptName,
            parentId: item.parentId,
          }));

          const tree1 = tree(map, 0, 'parentId');
          tree1.unshift({
            value: 0,
            label: '无上级机构',
          })
          setDeptListItem(tree1);
        } else {
          message.error(res.msg);
        }
      });
    }
  }, [props.updateModalVisible]);

  useEffect(() => {
    if (currentData) {
      form.setFieldsValue({
        ...currentData,
      });
    }
  }, [props.currentData]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as DeptListItem);
    }
  };

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键"/>
        </FormItem>
        <FormItem name="parentIds" label="部门上级" initialValue={[0]}
                  rules={[{required: true, message: '请选择部门!'}]}>
          <Cascader
            defaultValue={[0]}
            options={deptListItem}
            placeholder="请选择部门"
          />
        </FormItem>
        <FormItem name="deptName" label="部门名称" rules={[{required: true, message: '请输入部门名称'}]}>
          <Input id="update-name" placeholder={'请输入部门名称'}/>
        </FormItem>
        <FormItem name="deptSort" label="部门排序" initialValue={0}
                  rules={[{required: true, message: '请输入部门排序'}]}>
          <InputNumber placeholder={'请输入部门排序'} style={{width: 255}}/>
        </FormItem>
        <FormItem name="deptStatus" label="部门状态" rules={[{required: true, message: '请求选择状态'}]}
                  initialValue={1}>
          <Radio.Group id="deptStatus">
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>正常</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem name="email" label="邮箱" rules={[{required: true, message: '请输入邮箱'}]}>
          <Input id="update-email" placeholder={'请输入邮箱'}/>
        </FormItem>
        <FormItem name="leader" label="负责人" rules={[{required: true, message: '请输入负责人'}]}>
          <Input id="update-leader" placeholder={'请输入负责人'}/>
        </FormItem>
        <FormItem name="phone" label="电话号码" rules={[{required: true, message: '请输入电话号码'}]}>
          <Input id="update-phone" placeholder={'请输入电话号码'}/>
        </FormItem>
        <FormItem
          name="remark"
          label="备注"
        >
          <Input.TextArea rows={2} placeholder={'请输入备注'}/>
        </FormItem>
      </>
    );
  };

  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="编辑"
      open={updateModalVisible}
      {...modalFooter}
    >
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateDeptForm;
