import React from 'react';
import { OrdersCreate} from "./OrdersCreate";
import { OrdersList } from "./OrdersList";
import { OrdersEdit } from "./OrdersEdit";
import '../../styles/crud.css'

export const OrdersPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', flex: '0 0 100%', alignItems: 'flex-start', marginBottom: '20px' }}>
                <OrdersCreate />
                <div style={{ marginRight: '30px' }}></div>
                <OrdersEdit />
            </div>
            <OrdersList />
        </div>
    );
} 