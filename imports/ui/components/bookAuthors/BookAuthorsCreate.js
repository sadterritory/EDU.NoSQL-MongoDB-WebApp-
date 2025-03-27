import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import 'react-datepicker/dist/react-datepicker.css';
import { BooksCollection } from '../../../api/collections/BooksCollection';
import { WritersCollection } from '../../../api/collections/WritersCollection';

import { useTracker } from 'meteor/react-meteor-data';

export const BookAuthorsCreate = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        writers_id: '',
        books_id: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            writers_id: '',
            books_id: '',
        });
    };

    const books = useTracker(() => {
        Meteor.subscribe('books');
        return BooksCollection.find().fetch();
    });

    const writers = useTracker(() => {
        Meteor.subscribe('writers');
        return WritersCollection.find().fetch();
    });

    const handleCreate = async () => {
        if (!invalid.includes(fieldsData.writers_id) && !invalid.includes(fieldsData.books_id)) {
            const newBookAuthors = fieldsData;
            await Meteor.callAsync('book_authors.insert', newBookAuthors);
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
                            <label>Writer:</label>
                            <select name="writers_id"
                                value={fieldsData.writers_id} onChange={handleInputChange}>
                                <option value="select">Select writer</option>
                                {writers.map((row, index) => (
                                    <option key={row._id} value={row._id}>
                                        {`${index + 1} ${row.last_name} ${row.first_name} ${row.phone}`}
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