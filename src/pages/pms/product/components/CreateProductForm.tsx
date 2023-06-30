import React, {useState} from 'react';
import {Form, Modal, Steps} from 'antd';
import ProductBaseInfo from "@/pages/pms/product/components/ProductBaseInfo";
import ProductPromotionalInfo from "@/pages/pms/product/components/ProductPromotionalInfo";
import ProductAttributeInfo from "@/pages/pms/product/components/ProductAttributeInfo";
import ProductRelationshipInfo from "@/pages/pms/product/components/ProductRelationshipInfo";
import ProductStepInfo from "@/pages/pms/product/components/ProductStepInfo";
import type {ProductParams} from "../data.d";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: ProductParams) => void;
  createModalVisible: boolean;
  // productParams: ProductParams;
}

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};


const CreateProductForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, createModalVisible} = props;

  const [current, setCurrent] = useState(0);

  const [productParams, setProductParams] = useState<ProductParams>();


  // const onChangeProductParams = (value: string, flag: number) => {
  //   //专题推荐
  //   if (flag === 0) {
  //     setProductParams({...productParams, subjectProductRelationList: value})
  //     //优选商品关联
  //   } else if (flag === 1) {
  //     setProductParams({...productParams, prefrenceAreaProductRelationList: value})
  //     //图片地址
  //   } else if (flag === 3) {
  //     setProductParams({...productParams, pic: value, albumPics: value})
  //     //手机端商品详情
  //   } else if (flag === 4) {
  //     setProductParams({...productParams, detailMobileHtml: value})
  //   }
  //
  // };

  const onChangeProductParams = (value: ProductParams) => {
    setProductParams({...productParams, ...value})
  };

  const steps = [
    {
      title: '填写商品信息',
      nextPrompt: '下一步,填写商品促销',
      content: <ProductBaseInfo visible={createModalVisible}/>
    },
    {
      title: '填写商品促销',
      nextPrompt: '下一步,填写商品属性',
      prePrompt: '上一步,填写商品信息',
      content: <ProductPromotionalInfo visible={createModalVisible}/>
    },
    {
      title: '填写商品属性',
      nextPrompt: '下一步,选择商品关联',
      prePrompt: '上一步,填写商品促销',
      content: <ProductAttributeInfo visible={createModalVisible} onChangeProductParams={onChangeProductParams}/>
    },
    {
      title: '选择商品关联',
      prePrompt: '上一步,填写商品属性',
      content: <ProductRelationshipInfo visible={createModalVisible} onChangeProductParams={onChangeProductParams}/>
    },
  ];

  const next = () => {
    // form.validateFields()
    //   .then((values) => {
    //     setCurrent(current + 1);
    //     setProductListItem({...form.getFieldsValue(true)})
    //   })
    //   .catch((info) => {
    //     console.log('Validate Failed:', info);
    //   });
    console.log('商品添加参数:', JSON.stringify({...productParams, ...form.getFieldsValue(true)}))
    setCurrent(current + 1);
    setProductParams({...productParams, ...form.getFieldsValue(true)})
  };


  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({key: item.title, title: item.title}));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
  };

  const renderContent = () => {
    return (
      <>
        <Steps current={current} items={items}/>
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{marginTop: 24, textAlign: "center"}}>
          <ProductStepInfo current={current} steps={steps} handleSubmit={() => onSubmit(productParams || {})} prev={prev}
                           next={next}/>
        </div>
      </>
    );
  };

  const initValues = {
    'price': 100,
    'originalPrice': 100,
    'stock': 100,
    'weight': 100,
    'sort': 0,
    'giftPoint': 0,
    'giftGrowth': 0,
    'usePointLimit': 0,
    'previewStatus': false,
    'publishStatus': true,
    'recommandStatus': true,
    'newStatus': true,
    'serviceIdsArray': ['1'],
  }

  return (
    <Modal forceRender destroyOnClose title="添加商品" open={createModalVisible} footer={null} onCancel={onCancel} width={800}>
      <Form {...formLayout} form={form} initialValues={initValues}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateProductForm;
