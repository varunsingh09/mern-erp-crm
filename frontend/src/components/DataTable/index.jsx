import React, { useCallback, useEffect, useState } from 'react';
import { Dropdown, Button, PageHeader, Table } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import { Excel } from "antd-table-saveas-excel";
import uniqueId from '@/utils/uinqueId';
import { socket, getOrders } from '@/config/socketIo';

export default function DataTable({ config, DropDownRowMenu, AddNewItem }) {
  const [orders, setOrders] = useState([])
  let { entity, dataTableColumns, dataTableTitle, downloadReport, readColumns } = config;

  dataTableColumns = [
    ...dataTableColumns,
    {
      title: '',
      render: (row) => (
        <Dropdown overlay={DropDownRowMenu({ row })} trigger={['click']}>
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];

  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);

  var { pagination, items } = listResult;

  const dispatch = useDispatch();

  const handelDataTableLoad = useCallback((pagination) => {
    const options = { page: pagination.current || 1 };
    dispatch(crud.list({ entity, options }));
  }, []);


  useEffect(() => {

    if (entity === "order") {
      socket(setOrders);
      getOrders(setOrders);
    } else {
      dispatch(crud.list({ entity }));
    }

  }, []);

  useEffect(() => {

    if (downloadReport) {
      const fileName = `erp_${entity}_report_${Math.random()}.xlsx`;
      const excel = new Excel();
      excel
        .addSheet(`${entity}`)
        .addColumns(readColumns)
        .addDataSource(items, {
        })
        .saveAs(fileName);
    }
  }, [downloadReport, items, readColumns]);

  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={dataTableTitle}
        ghost={false}
        extra={[
          <Button onClick={handelDataTableLoad} key={`${uniqueId()}`}>
            Refresh
          </Button>,
          <AddNewItem key={`${uniqueId()}`} config={config} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={entity === 'order' ? orders : items}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
      />
    </>
  );
}
