import React from 'react';
import { BookAuthorsCreate} from "./BookAuthorsCreate";
import { BookAuthorsList } from "./BookAuthorsList";
import { BookAuthorsEdit } from "./BookAuthorsEdit";
import '../../styles/crud.css'

export const BookAuthorsPage = () => {
    return (
        <div>
            <div style={{ display: 'flex', flex: '0 0 100%', alignItems: 'flex-start', marginBottom: '20px' }}>
                <BookAuthorsCreate />
                <div style={{ marginRight: '30px' }}></div>
                <BookAuthorsEdit />
            </div>
            <BookAuthorsList />
        </div>
    );
} 