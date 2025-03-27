import React from 'react';
import { CustomersCreate} from "./CustomersCreate";
import { CustomersList } from "./CustomersList";
import { CustomersEdit } from "./CustomersEdit";
import '../../styles/crud.css'

export const CustomersPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', flex: '0 0 100%', alignItems: 'flex-start', marginBottom: '20px' }}>
                <CustomersCreate />
                <div style={{ marginRight: '30px' }}></div>
                <CustomersEdit />
            </div>
            <CustomersList />
        </div>
    );
} 