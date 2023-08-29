import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { DatePicker, UploadFile, RadioGroup } from '@/components/CustomAntd';
import { useSelector } from 'react-redux';
import { stateItems } from '@/redux/crud/selectors';

export default function EmployeeForm({ selectedFile, setSelectedFile }) {
  const [state, setState] = useState([]);
  const [cityList, setCityList] = useState([]);
  const stateData = useSelector(stateItems);

  useEffect(() => {
    setCityList(stateData?.result?.[0]?.states.filter((k) => state === k.state_code)?.[0]?.cities)
  }, [state, stateData])


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
        name="state"
        label="State"
        rules={[
          {
            required: true,
          },
        ]}

      >
        <Select showSearch={true} onChange={(e) => setState(e)}>
          {stateData?.result?.[0]?.states?.map((list) => <Select.Option value={list.state_code} key={list.id}>{list.name}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            required: true,
          },
        ]}

      >
        <Select showSearch={true}>
          {cityList?.map((list) => <Select.Option value={list.name} key={list.id}>{list.name}</Select.Option>)}
        </Select>
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
        name="pincode"
        label="Pincode"
        rules={[
          {
            required: true,
            message: 'Please input your pincode!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <RadioGroup />
      <br />
      <br />
      <UploadFile path={`employee/photo`} setSelectedFile={setSelectedFile} />
      <br />
    </>
  );
}
