import React from 'react';
import { BooksCreate} from "./BooksCreate";
import { BooksList } from "./BooksList";
import { BooksEdit } from "./BooksEdit";
import '../../styles/crud.css'

export const BooksPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', flex: '0 0 100%', alignItems: 'flex-start', marginBottom: '20px' }}>
                <BooksCreate />
                <div style={{ marginRight: '30px' }}></div>
                <BooksEdit />
            </div>
            <BooksList />
        </div>
    );
} 