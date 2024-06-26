import React, {useEffect, useState} from 'react';
import {Col, DatePicker, Form, Input, InputNumber, Modal, Radio, RadioChangeEvent, Row, Select} from 'antd';
import type {CouponListItem} from '../data.d';
import CategoryForm from "@/pages/sms/Coupon/components/CategoryForm";
import ProductForm from "@/pages/sms/Coupon/components/ProductForm";
import {queryCouponDetail} from "@/pages/sms/Coupon/service";
import moment from "moment/moment";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: CouponListItem) => void;
  updateModalVisible: boolean;
  id: number;

}

const FormItem = Form.Item;

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};

const UpdateCouponForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const {Option} = Select;
  const {TextArea} = Input;
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);

  const [value, setValue] = useState(0);

  const {
    onSubmit,
    onCancel,
    updateModalVisible,
    id
  } = props;

  useEffect(() => {
    if (form && !updateModalVisible) {
      form.resetFields();

    }
    if (updateModalVisible) {
      queryCouponDetail(id).then((res) => {
        setCategoryList(res.data.productCategoryRelationList)
        setProductList(res.data.productRelationList)
        setValue(Number(res.data.useType))

        form.setFieldsValue({
          ...res.data,
          enableTime: moment(res.data.enableTime, 'YYYY-MM-DD HH:mm:ss'),
          startTime: [moment(res.data.startTime, 'YYYY-MM-DD HH:mm:ss'), moment(res.data.endTime, 'YYYY-MM-DD HH:mm:ss')],

        });
      });
    }
  }, [props.updateModalVisible]);


  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: CouponListItem) => {
    if (onSubmit) {
      onSubmit({...values, productCategoryRelationList: categoryList, productRelationList: productList},);
    }
  };


  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    console.log(categoryList)
  }
  const renderContent = () => {
    return (
      <>
        <FormItem
          name="id"
          label="主键"
          hidden
        >
          <Input id="update-id"/>
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem
              name="name"
              label="优惠券名"
              rules={[{required: true, message: '请输入优惠券名!'}]}
            >
              <Input id="update-name" placeholder={'请输入优惠券名'}/>
            </FormItem>
            <FormItem
              name="type"
              label="优惠券类型"
              initialValue={0}
              rules={[{required: true, message: '请选择优惠券类型!'}]}
            >
              <Select id="type" placeholder={'请选择优惠券类型'}>
                <Option value={0}>全场赠券</Option>
                <Option value={1}>会员赠券</Option>
                <Option value={2}>购物赠券</Option>
                <Option value={3}>注册赠券</Option>
              </Select>
            </FormItem>
            <FormItem
              name="publishCount"
              label="发行数量"
              initialValue={10}
              rules={[{required: true, message: '请输入发行数量!'}]}
            >
              <InputNumber addonAfter={"张"}/>
            </FormItem>
            <FormItem
              name="perLimit"
              label="每人限领"
              initialValue={100}
              rules={[{required: true, message: '请输入每人限领张数!'}]}
            >
              <InputNumber addonAfter="张"/>
            </FormItem>


          </Col>
          <Col span={12}>


            <FormItem
              name="platform"
              label="使用平台"
              initialValue={0}
              rules={[{required: true, message: '请选择使用平台!'}]}
            >
              <Select id="platform" placeholder={'请选择使用平台'}>
                <Option value={0}>全部</Option>
                <Option value={1}>移动</Option>
                <Option value={2}>PC</Option>
              </Select>
            </FormItem>

            <FormItem
              name="amount"
              label="金额"
              initialValue={100}
              rules={[{required: true, message: '请输入金额!'}]}
            >
              <InputNumber prefix="￥" addonAfter="元" stringMode step="0.01"/>
            </FormItem>
            <FormItem
              name="minPoint"
              label="使用门槛"
              initialValue={10}
              rules={[{required: true, message: '请输入使用门槛!'}]}
            >
              <InputNumber addonBefore={"满"} prefix="￥" addonAfter="元可用" stringMode step="0.01"/>
            </FormItem>
            <FormItem
              name="memberLevel"
              label="会员类型"
              initialValue={0}
              rules={[{required: true, message: '请输入可领取的会员类型!'}]}
            >
              <Select id="memberLevel" placeholder={'请输入可领取的会员类型'}>
                <Option value={0}>银牌会员</Option>
                <Option value={1}>金牌会员</Option>
                <Option value={2}>白金会员</Option>
              </Select>
            </FormItem>


          </Col>
        </Row>
        <FormItem
          name="enableTime"
          label="领取的日期"
          rules={[{required: true, message: '请输入可以领取的日期!'}]}
        >
          <DatePicker showTime placeholder={'请输入可以领取的日期'}/>
        </FormItem>
        <FormItem
          name="startTime"
          label="有效期"
          rules={[{required: true, message: '请输入开始时间!'}]}
        >
          <DatePicker.RangePicker showTime/>
        </FormItem>
        <FormItem
          name="useType"
          label="使用类型"
          initialValue={0}
          rules={[{required: true, message: '请选择使用类型!'}]}
        >
          <Radio.Group id="useType" disabled onChange={onChange} value={value}>
            <Radio value={0}>全场通用</Radio>
            <Radio value={1}>指定分类</Radio>
            <Radio value={2}>指定商品</Radio>
          </Radio.Group>
        </FormItem>
        {value === 1 &&
          <CategoryForm selectIds={categoryList.map((x) => x.id)} onSubmit={(list: any[]) => {
            setCategoryList(list)
          }}/>}
        {value === 2 && <ProductForm selectIds={productList.map((x) => x.id)} onSubmit={(list: any[]) => {
          setProductList(list)
        }}/>}

        <FormItem
          name="note"
          label="备注"
        >
          <TextArea rows={4}/>
        </FormItem>
      </>
    );
  };


  const modalFooter = {okText: '保存', onOk: handleSubmit, onCancel};

  return (
    <Modal
      forceRender
      destroyOnClose
      title="新建"
      open={updateModalVisible}
      {...modalFooter}
      width={820}
    >
      <Form
        {...formLayout}
        labelCol={{flex: '115px'}}
        form={form}
        onFinish={handleFinish}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateCouponForm;
