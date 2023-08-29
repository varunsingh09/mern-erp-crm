import React, { useState } from 'react';

import VideoCrudModule from '@/modules/VideoCrudModule';
import VideoForm from '@/forms/VideoForm';

export default function Video() {

    const [selectedFile, setSelectedFile] = useState(null);
    const entity = 'video';
    const searchConfig = {
        displayLabels: ['file_name', 'file', 'file_type', 'status'],
        searchFields: 'file_name,file,file_type',
        outputValue: '_id',
    };

    const PANEL_TITLE = 'Video Panel';
    const dataTableTitle = 'Video Lists';
    const entityDisplayLabels = ['file_name'];

    const readColumns = [
        { title: 'Name', dataIndex: 'file_name' },
        { title: 'Title', dataIndex: 'file' },
        { title: 'Type', dataIndex: 'file_type' },
        { title: "Status", dataIndex: 'status' },
    ];

    const dataTableColumns = [
        { title: 'Name', dataIndex: 'file_name' },
        { title: 'Title', dataIndex: 'file' },
        { title: 'Type', dataIndex: 'file_type' },
        { title: "Status", dataIndex: 'status' },
    ];
    const ADD_NEW_ENTITY = 'Add new video';
    const DATATABLE_TITLE = 'Video List';
    const ENTITY_NAME = 'video';
    const CREATE_ENTITY = 'Create video';
    const UPDATE_ENTITY = 'Update video';

    const config = {
        entity,
        PANEL_TITLE,
        dataTableTitle,
        ENTITY_NAME,
        CREATE_ENTITY,
        ADD_NEW_ENTITY,
        UPDATE_ENTITY,
        DATATABLE_TITLE,
        readColumns,
        dataTableColumns,
        searchConfig,
        entityDisplayLabels,
        setSelectedFile,
        selectedFile
    };
    return (
        <VideoCrudModule
            createForm={<VideoForm setSelectedFile={setSelectedFile} selectedFile={selectedFile} />}
            updateForm={<VideoForm isUpdateForm={true} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />}
            config={config}
        />
    );
}
