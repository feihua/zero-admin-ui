import {PlusOutlined} from '@ant-design/icons';
import {message, Modal, Upload} from 'antd';
import type {RcFile, UploadProps} from 'antd/es/upload';
import type {UploadFile} from 'antd/es/upload/interface';
import React, {useEffect, useState} from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

// 文件上传
export interface UploadFileFormProps {
  // 上传成功后回调url
  onSubmit: (imageUrl: string) => void;
  // 需要显示多少张图片
  count: number;
  // 上传接口
  backApi: string;
  // 默认显示的图片
  defaultImageUrl?: string;
}

const UploadFileComponents: React.FC<UploadFileFormProps> = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {count, onSubmit, backApi, defaultImageUrl} = props

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  useEffect(() => {
    if (defaultImageUrl) {
      setFileList([{
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: defaultImageUrl,
      }])
    }
  }, [defaultImageUrl]);

  const handleChange: UploadProps['onChange'] = ({file, fileList}) => {
    const {status, response} = file

    if (status === 'done') {
      const {code, message: msg, data} = response
      if (code === '000000') {
        setFileList([{
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: data,
        }])

        message.success(msg)
        onSubmit(data)
      } else {
        message.error(msg)
      }
    }
    setFileList(fileList);
  }


  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action={backApi}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        headers={{
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }}
      >
        {fileList.length >= count ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{width: '100%'}} src={previewImage}/>
      </Modal>
    </>
  );
};

export default UploadFileComponents;
