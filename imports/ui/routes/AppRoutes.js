import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { CustomersPage } from '../components/customers/CustomersPage';
import { OrdersPage } from '../components/orders/OrdersPage';
import { BooksPage } from '../components/books/BooksPage';
import { BookAuthorsPage } from '../components/bookAuthors/BookAuthorsPage';
import { WritersPage } from '../components/writers/WritersPage';
import { ContractsPage } from '../components/contracts/ContractsPage';

import { UsersPage } from '../components/users/UsersPage';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="customers/" element={<CustomersPage />} />
            <Route path="orders/" element={<OrdersPage />} />
            <Route path="books/" element={<BooksPage />} />
            <Route path="bookAuthors/" element={<BookAuthorsPage />} />
            <Route path="writers/" element={<WritersPage />} />
            <Route path="contracts/" element={<ContractsPage />} />
            <Route path="users/" element={<UsersPage />} />
        </Routes>
    );
};

export default AppRoutes;