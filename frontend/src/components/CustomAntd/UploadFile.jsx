import * as React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { API_BASE_URL } from '@/config/serverApiConfig';

const UploadFile = (data) => {
    const { setSelectedFile, path, type = 'photo' } = data

    const props = {
        name: 'photo',
        action: `${API_BASE_URL}${path}/${type}`,
        headers: {
            authorization: localStorage.getItem('token')
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                setSelectedFile(info.file?.response?.result?.photo?.filename);
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return <Upload {...props}
        beforeUpload={(file) => {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'video/mp4' || file.type === 'video/flv' || file.type === 'video/hls';
            if (!isJPG) {
                message.error('You can only upload JPG or PNG or mp4 file!');
                return false;
            } else {
                return true;
            }
        }}
    >
        <Button icon={<UploadOutlined />}>Upload file</Button>
    </Upload >

};

export default UploadFile;
