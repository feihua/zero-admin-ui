import React, {useEffect, useState} from 'react';
import {Form, Modal, Steps} from 'antd';
import ProductBaseInfo from "@/pages/pms/product/components/ProductBaseInfo";
import ProductPromotionalInfo from "@/pages/pms/product/components/ProductPromotionalInfo";
import ProductAttributeInfo from "@/pages/pms/product/components/ProductAttributeInfo";
import ProductRelationshipInfo from "@/pages/pms/product/components/ProductRelationshipInfo";
import ProductStepInfo from "@/pages/pms/product/components/ProductStepInfo";
import type {ProductParams, ProductListItem} from "../data.d";

export interface CreateFormProps {
  onCancel: () => void;
  onSubmit: (values: ProductParams) => Promise<boolean>;
  createModalVisible: boolean;
  productListItem?: ProductListItem;
}

const formLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 13},
};


const OperationProductForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {onSubmit, onCancel, createModalVisible, productListItem} = props;

  const [current, setCurrent] = useState(0);

  const [productParams, setProductParams] = useState<ProductParams>({...productListItem});

  const onChangeProductParams = (value: ProductParams) => {
    setProductParams({...productParams, ...value})
  };

  useEffect(() => {
    if (productListItem) {
      console.log('useEffect', productListItem)
      form.setFieldsValue({
        ...productListItem,
      });
    }
  }, [productListItem]);

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
      content: <ProductAttributeInfo visible={createModalVisible} onChangeProductParams={onChangeProductParams} currentData={productParams}/>
    },
    {
      title: '选择商品关联',
      prePrompt: '上一步,填写商品属性',
      content: <ProductRelationshipInfo visible={createModalVisible} onChangeProductParams={onChangeProductParams} currentData={productParams}/>
    },
  ];

  const next = () => {
    // form.validateFields()
    //   .then((values) => {
    //     setCurrent(current + 1);
    //     setProductParams({...productParams, ...form.getFieldsValue(true)})
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

  const handleFinish = (values: ProductParams) => {
    if (onSubmit) {
      onSubmit(values).then((res) => {
        if (res) {
          form.resetFields()
          setCurrent(0)
        }
      });

    }
  };

  const renderContent = () => {
    return (
      <>
        <Steps current={current} items={items}/>
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{marginTop: 24, textAlign: "center"}}>
          <ProductStepInfo current={current} steps={steps} handleSubmit={() => handleFinish(productParams || {})} prev={prev}
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

  const handleOnCancel = () => {
    //如果是编辑打开的页面,关闭的时间让它回到第一步,否则再编辑其它记录的时候,存在数据不是最新的问题
    if (productParams.id) {
      setCurrent(0)
    }
    onCancel()
  };
  return (
    <Modal forceRender destroyOnClose title="添加或更新商品" open={createModalVisible} footer={null} onCancel={handleOnCancel} width={800}>
      <Form {...formLayout} form={form} initialValues={initValues}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default OperationProductForm;
