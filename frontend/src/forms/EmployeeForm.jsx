import React from 'react';
import { Form, Input, Select, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker } from '@/components/CustomAntd';
import { API_BASE_URL } from '@/config/serverApiConfig';

import errorHandler from '@/request/errorHandler';
import successHandler from '@/request/successHandler';


export default function EmployeeForm({ selectedFile, setSelectedFile }) {
  const props = {
    name: 'photo',
    action: `${API_BASE_URL}employee/photo`,
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


  return (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="surname"
        label="Surname"
        rules={[
          {
            required: true,
            message: 'Please input your surname!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: 'Please input your birthday!',
          },
        ]}
      >
        <DatePicker format={'DD/MM/YYYY'} />
      </Form.Item>
      <Form.Item
        name="birthplace"
        label="Birthplace"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value="men">Men</Select.Option>
          <Select.Option value="women">Women</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="department"
        label="Department"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="position"
        label="Position"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="state"
        label="State"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Upload {...props}
        beforeUpload={(file) => {
          const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJPG) {
            message.error('You can only upload JPG or PNG file!');
            return false;
          } else {
            return true;
          }
        }}
      >
        <Button icon={<UploadOutlined />}>Upload profile pic</Button>
      </Upload >
      <br />
    </>
  );
}
