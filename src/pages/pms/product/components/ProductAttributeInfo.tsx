import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, message, Radio, Upload, TreeSelect, Card} from 'antd';
import type {AttributeCategoryListItem} from "@/pages/pms/product_attribute_category/data";
import {queryCategoryAttribute} from "@/pages/pms/product_attribute_category/service";
import {queryAttribute} from "@/pages/pms/product_attribute/service";
import type {AttributeListItem} from "@/pages/pms/product_attribute/data";
import type {RcFile, UploadProps} from 'antd/es/upload';
import type {UploadFile} from 'antd/es/upload/interface';
import {PlusOutlined} from "@ant-design/icons";
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';


export interface BaseInfoProps {
  visible: boolean;
}

const FormItem = Form.Item;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ProductAttributeInfo: React.FC<BaseInfoProps> = (props) => {

  const [attributeCategoryListItem, setAttributeCategoryListItem] = useState<AttributeCategoryListItem[]>([]);
  const [attributeListItem0, setAttributeListItem0] = useState<AttributeListItem[]>([]);
  const [attributeListItem1, setAttributeListItem1] = useState<AttributeListItem[]>([]);

  useEffect(() => {
    if (props.visible) {
      queryCategoryAttribute({}).then((res) => {
        if (res.code === '000000') {
          const map = res.data.map((item: { id: any; name: any; title: any; parentId: any }) => ({
            value: item.id,
            id: item.id,
            label: item.name,
            title: item.name,
            parentId: item.parentId,
          }));

          setAttributeCategoryListItem(map);
        } else {
          message.error(res.msg);
        }
      });
    }
  }, [props.visible]);

  const onChange = (attributeCategoryId: string) => {
    //查询规格和参数
    queryAttribute({"productAttributeCategoryId": Number(attributeCategoryId)}).then((res) => {
      if (res.code === '000000') {
        const resData = res.data
        if (resData != null) {
          const params0 = resData.filter((x: { type: number; }) => x.type === 0);
          setAttributeListItem0(params0);

          const params1 = resData.filter((x: { type: number; }) => x.type === 1);
          setAttributeListItem1(params1)
        }
      } else {
        message.error(res.msg);
      }
    });

  };

  //上传图片
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },

  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  //编辑器
  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']

  return (
    <>
      <FormItem name="name" label="属性类型">
        <TreeSelect
          style={{width: '100%'}}
          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
          treeData={attributeCategoryListItem}
          placeholder="请选择属性类型"
          treeDefaultExpandAll
          onChange={onChange}
        />
      </FormItem>
      <FormItem name="name" label="商品规格">
        <Card>
          <Radio.Group>
            {attributeListItem0.map(r => <Radio key={r.id} value={r.id}>{r.name}</Radio>)}
          </Radio.Group>
        </Card>
      </FormItem>
      <FormItem name="name" label="商品参数">
        <Card>
          <Radio.Group>
            {attributeListItem1.map(r => <Radio key={r.id} value={r.id}>{r.name}</Radio>)}
          </Radio.Group>
        </Card>
      </FormItem>
      <FormItem name="name" label="商品相册">
        <Card>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{width: '100%'}} src={previewImage}/>
          </Modal>
        </Card>
      </FormItem>
      <FormItem name="name" label="商品详情">
        <Card>
          <BraftEditor
            className="my-editor"
            controls={controls}
            placeholder="请输入正文内容"
          />
        </Card>
      </FormItem>
    </>
  );
};

export default ProductAttributeInfo;
