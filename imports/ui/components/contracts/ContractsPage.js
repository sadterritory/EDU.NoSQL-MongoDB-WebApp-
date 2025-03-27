import React from 'react';
import { ContractsCreate } from "./ContractsCreate";
import { ContractsList } from "./ContractsList";
import { ContractsEdit } from "./ContractsEdit";
import '../../styles/crud.css'

export const ContractsPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', flex: '0 0 100%', alignItems: 'flex-start', marginBottom: '20px' }}>
                <ContractsCreate />
                <div style={{ marginRight: '30px' }}></div>
                <ContractsEdit />
            </div>
            <ContractsList />
        </div>
    );
} 