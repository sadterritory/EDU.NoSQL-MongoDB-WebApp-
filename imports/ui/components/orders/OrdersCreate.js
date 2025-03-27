import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import 'react-datepicker/dist/react-datepicker.css';
import { BooksCollection } from '../../../api/collections/BooksCollection';
import { CustomersCollection } from '../../../api/collections/CustomersCollection';

import { useTracker } from 'meteor/react-meteor-data';

export const OrdersCreate = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        customers_id: '',
        books_id: '',
        order_date: '',
        completion_date: '',
        quantity: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            customers_id: '',
            books_id: '',
            order_date: '',
            completion_date: '',
            quantity: '',
        });
    };

    const books = useTracker(() => {
        Meteor.subscribe('books');
        return BooksCollection.find().fetch();
    });

    const customers = useTracker(() => {
        Meteor.subscribe('customers');
        return CustomersCollection.find().fetch();
    });

    const handleCreate = async () => {
        if (!invalid.includes(fieldsData.customers_id) && !invalid.includes(fieldsData.books_id)) {
            const newOrder = fieldsData;
            await Meteor.callAsync('orders.insert', newOrder);
        }
    };

    const handleSave = () => {
        handleCreate();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFieldsData({
            ...fieldsData,
            [name]: value
        });
    };

    return (
        <div>
            <button className="open-dialog-button" onClick={openDialog}>New</button>
            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-content">
                        <h2>Input Data</h2>
                        <div className="form-group">
                            <label>Customers:</label>
                            <select name="customers_id"
                                value={fieldsData.customers_id} onChange={handleInputChange}>
                                <option value="select">Select customer</option>
                                {customers.map((row, index) => (
                                    <option key={row._id} value={row._id}>
                                        {`${index + 1} ${row.name} ${row.address} ${row.contact_person}`}
                                    </option>
                                ))}
                            </select>
                            <label>Book:</label>
                            <select name="books_id"
                                value={fieldsData.books_id} onChange={handleInputChange}>
                                <option value="select">Select book</option>
                                {books.map((row, index) => (
                                    <option key={row._id} value={row._id}>
                                        {`${index + 1} ${row.title} ${row.publication_date} ${row.selling_price}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Order date:</label>
                            <input type="date" name="order_date" value={fieldsData.order_date} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Completion date:</label>
                            <input type="date" name="completion_date" value={fieldsData.completion_date} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input type="number" step="1" name="quantity" value={fieldsData.quantity} onChange={handleInputChange} />
                        </div>

                        <div className="button-group">
                            <button className="cancel-button" onClick={closeDialog}>Close</button>
                            <button className="save-button" onClick={handleSave}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};