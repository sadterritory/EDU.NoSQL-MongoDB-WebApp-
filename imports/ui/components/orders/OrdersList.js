import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { OrdersCollection } from '../../../api/collections/OrdersCollection';
import { BooksCollection } from '../../../api/collections/BooksCollection';
import { CustomersCollection } from '../../../api/collections/CustomersCollection';


export const OrdersList = () => {
    const { isLoading, result } = useTracker(() => {
        const handleCustomers = Meteor.subscribe('customers');
        const handleBooks = Meteor.subscribe('books');
        const handleOrders = Meteor.subscribe('orders')
        const isLoading = !handleOrders.ready() || !handleBooks.ready() || !handleCustomers.ready();
        const customers = CustomersCollection.find().fetch();
        const books = BooksCollection.find().fetch();
        const orders = OrdersCollection.find().fetch();

        const result = orders.map(object => {
            const customerName = customers.find(e => e._id === object.customers_id)?.name || '<deleted>';
            const customerAddress = customers.find(e => e._id === object.customers_id)?.address || '<deleted>';
            const customerContactPerson = customers.find(e => e._id === object.customers_id)?.contact_person || '<deleted>';
            const bookTitle = books.find(e => e._id === object.books_id)?.title || '<deleted>';
            const bookPublicationDate = books.find(e => e._id === object.books_id)?.publication_date || '<deleted>';
            const bookSellingPrice = books.find(e => e._id === object.books_id)?.selling_price || '<deleted>';
            return {
                ...object,
                customerName,
                customerAddress,
                customerContactPerson,
                bookTitle,
                bookPublicationDate,
                bookSellingPrice,
            };
        });
        return { isLoading, result };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>List of orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Order date</th>
                        <th>Completion date</th>
                        <th>Customer name</th>
                        <th>Customer address</th>
                        <th>Customer contact person</th>
                        <th>Book title</th>
                        <th>Book publication date</th>
                        <th>Book selling price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {result?.map((orders, index) => (
                        <tr key={orders._id}>
                            <td>{index + 1}</td>
                            <td>{orders.order_date}</td>
                            <td>{orders.completion_date}</td>
                            <td>{orders.customerName}</td>
                            <td>{orders.customerAddress}</td>
                            <td>{orders.customerContactPerson}</td>
                            <td>{orders.bookTitle}</td>
                            <td>{orders.bookPublicationDate}</td>
                            <td>{orders.bookSellingPrice}</td>
                            <td>{orders.quantity}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};