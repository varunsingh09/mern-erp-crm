import React from 'react';
import { Form, Input } from 'antd';
import { RadioGroup } from '@/components/CustomAntd';

export default function OrderForm({ isUpdateForm = false }) {
    return (
        <>
            <Form.Item
                label="Product Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                        required: true,
                        message: 'Please input price!',
                    },
                ]}

            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={[
                    {
                        required: true,
                        message: 'Please input address!',
                    },
                ]}
            // style={{
            //     display: 'inline-block',
            //     width: 'calc(50%)',
            //     paddingLeft: '5px',
            // }}
            >
                <Input />
            </Form.Item>
            <RadioGroup />
            <br />
            <br />
        </>
    );
}
