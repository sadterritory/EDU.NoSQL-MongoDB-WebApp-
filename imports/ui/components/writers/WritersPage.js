import React from 'react';
import { WritersCreate} from "./WritersCreate";
import { WritersList } from "./WritersList";
import { WritersEdit } from "./WritersEdit";
import '../../styles/crud.css'

export const WritersPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', flex: '0 0 100%', alignItems: 'flex-start', marginBottom: '20px' }}>
                <WritersCreate />
                <div style={{ marginRight: '30px' }}></div>
                <WritersEdit />
            </div>
            <WritersList />
        </div>
    );
} 