import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/crud/selectors';
import { postOrder } from '@/config/socketIo';
import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function CreateForm({ config, formElements }) {
  let { entity, selectedFile } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    fieldsValue.photo = selectedFile
    console.log('🚀 ~ file: index.jsx ~ line 19 ~ onSubmit ~ fieldsValue', fieldsValue);
    dispatch(crud.create({ entity, jsonData: fieldsValue }));
  };


  const onSubmitOrder = (fieldsValue) => {
    console.log('🚀 ~ file: index.jsx ~ line 19 ~ onSubmit ~ fieldsValue', fieldsValue);
    postOrder(fieldsValue);
  };


  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.list({ entity }));
    }
  }, [isSuccess]);


  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={entity === 'order' ? onSubmitOrder : onSubmit}>
        {formElements}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}
