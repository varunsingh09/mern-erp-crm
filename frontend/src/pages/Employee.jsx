import React, { useState } from 'react';

import CrudModule from '@/modules/CrudModule';
import EmployeeForm from '@/forms/EmployeeForm';


import dayjs from 'dayjs';
export default function Employee() {
  const entity = 'employee';
  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,email',
    outputValue: '_id',
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadReport, setDownloadReport] = useState(false);
  const entityDisplayLabels = ['name', 'surname'];

  const dataTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const readColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      isDate: true,
    },
    {
      title: 'Birthplace',
      dataIndex: 'birthplace',
      key: 'birthplace',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const ADD_NEW_ENTITY = 'Add new employee';
  const DOWNLOAD_ENTITY = 'Download employee data';
  const DATATABLE_TITLE = 'employees List';
  const ENTITY_NAME = 'employee';
  const CREATE_ENTITY = 'Create employee';
  const UPDATE_ENTITY = 'Update employee';
  const PANEL_TITLE = 'Employee Panel';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    DOWNLOAD_ENTITY,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
    selectedFile,
    setDownloadReport,
    downloadReport,
    setSelectedFile
  };
  return (
    <CrudModule
      createForm={<EmployeeForm setSelectedFile={setSelectedFile} selectedFile={selectedFile} />}
      updateForm={<EmployeeForm isUpdateForm={true} setSelectedFile={setSelectedFile} />}
      config={config}
    >
    </CrudModule>
  );
}
