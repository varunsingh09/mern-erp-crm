import React from 'react';

import OrderModule from '@/modules/OrderModule';
import OrderForm from '@/forms/OrderForm';

function Order() {
    const entity = 'order';
    const searchConfig = {
        displayLabels: ['name'],
        searchFields: 'name,address,price',
        outputValue: '_id',
    };

    const entityDisplayLabels = ['name'];

    const readColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        }
    ];
    const dataTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        }
    ];

    const ADD_NEW_ENTITY = 'Add new Order';
    const DATATABLE_TITLE = 'orders List';
    const ENTITY_NAME = 'order';
    const CREATE_ENTITY = 'Create order';
    const UPDATE_ENTITY = 'Update order';
    const PANEL_TITLE = 'Order Panel';

    const config = {
        entity,
        PANEL_TITLE,
        ENTITY_NAME,
        CREATE_ENTITY,
        ADD_NEW_ENTITY,
        UPDATE_ENTITY,
        DATATABLE_TITLE,
        readColumns,
        dataTableColumns,
        searchConfig,
        entityDisplayLabels,
    };
    return (
        <>
            <OrderModule
                createForm={<OrderForm />}
                updateForm={<OrderForm isUpdateForm={true} />}
                config={config}
            />

        </>
    );
}

export default Order;
