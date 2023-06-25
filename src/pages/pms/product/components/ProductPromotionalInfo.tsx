import React, {useState} from 'react';
import {Checkbox, DatePicker, Form, Input, InputNumber, Radio, Switch} from 'antd';
import type {RadioChangeEvent} from 'antd';

export interface BaseInfoProps {
}

const FormItem = Form.Item;

const options = [
  {label: '无忧退货', value: '1'},
  {label: '快速退款', value: '2'},
  {label: '免费包邮', value: '3'},
];

const ProductPromotionalInfo: React.FC<BaseInfoProps> = (props) => {
  const [promotionTypes, setPromotionTypes] = useState(0);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPromotionTypes(e.target.value);
    console.log('radio checked', promotionTypes);
  };

  return (
    <>
      <FormItem name="giftPoint" label="赠送积分" rules={[{required: true, message: '请选择商品分类!'}]}>
        <InputNumber style={{width: 407}}/>
      </FormItem>
      <FormItem name="giftGrowth" label="赠送成长值" rules={[{required: true, message: '请选择商品分类!'}]}>
        <InputNumber style={{width: 407}}/>
      </FormItem>
      <FormItem name="usePointLimit" label="积分购买限制" rules={[{required: true, message: '请选择商品分类!'}]}>
        <InputNumber style={{width: 407}}/>
      </FormItem>
      <FormItem name="previewStatus" label="预告商品" style={{textAlign: "left"}} rules={[{required: true, message: '请选择商品分类!'}]}>
        <Switch/>
      </FormItem>
      <FormItem name="publishStatus" label="商品上架" style={{textAlign: "left"}} rules={[{required: true, message: '请选择商品分类!'}]}>
        <Switch/>
      </FormItem>
      <FormItem name="recommandStatus" label="商品推荐" style={{textAlign: "left"}} rules={[{required: true, message: '请选择商品分类!'}]}>
        <Switch/>
      </FormItem>
      <FormItem name="serviceIds" label="服务保证" style={{textAlign: "left"}} rules={[{required: true, message: '请选择商品分类!'}]}>
        <Checkbox.Group options={options}/>
      </FormItem>
      <FormItem name="detailTitle" label="详细页标题" rules={[{required: true, message: '请选择商品分类!'}]}>
        <Input id="update-detailTitle" placeholder={'请输入详细页标题'}/>
      </FormItem>
      <FormItem name="detailDesc" label="详细页描述" rules={[{required: true, message: '请选择商品分类!'}]}>
        <Input id="update-detailDesc" placeholder={'请输入详细页描述'}/>
      </FormItem>
      <FormItem name="keywords" label="关键字" rules={[{required: true, message: '请选择商品分类!'}]}>
        <Input id="update-keywords" placeholder={'请输入关键字'}/>
      </FormItem>
      <FormItem name="note" label="备注">
        <Input.TextArea rows={2} placeholder={'请输入备注'}/>
      </FormItem>
      <FormItem name="promotionType" label="选择优惠方式">
        <Radio.Group defaultValue={0} size="small" buttonStyle="solid" onChange={onChange}>
          <Radio.Button value={0}>无优惠</Radio.Button>
          <Radio.Button value={1}>特惠促销</Radio.Button>
          <Radio.Button value={2}>会员价格</Radio.Button>
          <Radio.Button value={3}>阶梯价格</Radio.Button>
          <Radio.Button value={4}>满减价格</Radio.Button>
          {/*<Radio.Button value={5}>限时购</Radio.Button>*/}
        </Radio.Group>
      </FormItem>

      {promotionTypes === 1 && (
        <div>
          <FormItem name="startTime" label="开始时间" style={{textAlign: "left"}}>
            <DatePicker showTime placeholder={'请输入开始时间'}/>
          </FormItem>
          <FormItem name="endTIme" label="结束时间" style={{textAlign: "left"}}>
            <DatePicker showTime placeholder={'请输入结束时间'}/>
          </FormItem>
          <FormItem name="keywords" label="促销价格" style={{textAlign: "left"}}>
            <InputNumber addonAfter={'元'}/>
          </FormItem>
        </div>
      )}
      {promotionTypes === 2 && (
        <div>
          <FormItem name="keywords" label="黄金会员" style={{textAlign: "left"}}>
            <InputNumber addonAfter={'元'}/>
          </FormItem>
          <FormItem name="keywords" label="白金会员" style={{textAlign: "left"}}>
            <InputNumber addonAfter={'元'}/>
          </FormItem>
          <FormItem name="keywords" label="钻石会员" style={{textAlign: "left"}}>
            <InputNumber addonAfter={'元'}/>
          </FormItem>
        </div>
      )}
      {promotionTypes === 3 && (
        <>
          <FormItem name="keywords" label="满减">
            <Input id="update-keywords" placeholder={'100-10'}/>
          </FormItem>
          <FormItem name="keywords" label="满减">
            <Input id="update-keywords" placeholder={'500-60'}/>
          </FormItem>
          <FormItem name="keywords" label="满减">
            <Input id="update-keywords" placeholder={'1000-150'}/>
          </FormItem>
        </>
      )}
      {promotionTypes === 4 && (
        <div>
          <FormItem name="keywords" label="满减">
            <Input id="update-keywords" placeholder={'100-10'}/>
          </FormItem>
          <FormItem name="keywords" label="满减">
            <Input id="update-keywords" placeholder={'500-60'}/>
          </FormItem>
          <FormItem name="keywords" label="满减">
            <Input id="update-keywords" placeholder={'1000-150'}/>
          </FormItem>
        </div>
      )}
      {promotionTypes === 5 && (
        <div>
          <FormItem name="keywords" label="开始时间">
            <Input id="update-keywords" placeholder={'请输入关键字'}/>
          </FormItem>
          <FormItem name="keywords" label="结束时间">
            <Input id="update-keywords" placeholder={'请输入关键字'}/>
          </FormItem>
          <FormItem name="keywords" label="促销价格">
            <Input id="update-keywords" placeholder={'请输入关键字'}/>
          </FormItem>
        </div>
      )}
    </>
  );
};

export default ProductPromotionalInfo;
