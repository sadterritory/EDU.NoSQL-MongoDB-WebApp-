import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BookAuthorsCollection } from '../../../api/collections/BookAuthorsCollection';
import { BooksCollection } from '../../../api/collections/BooksCollection';
import { WritersCollection } from '../../../api/collections/WritersCollection';

export const BookAuthorsEdit = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        _id: '',
        writers_id: '',
        books_id: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            _id: '',
            writers_id: '',
            books_id: '',
        });
    };

    const books = useTracker(() => {
        Meteor.subscribe('books');
        return BooksCollection.find().fetch();
    });

    const book_authors = useTracker(() => {
        Meteor.subscribe('book_authors');
        return BookAuthorsCollection.find().fetch();
    });

    const writers = useTracker(() => {
        Meteor.subscribe('writers');
        return WritersCollection.find().fetch();
    });

    const handleUpdate = async () => {
        if (!invalid.includes(fieldsData._id) && !invalid.includes(fieldsData.writers_id) && !invalid.includes(fieldsData.books_id)) {
            await Meteor.call('book_authors.update', fieldsData._id, fieldsData);
        }
    };

    const handleSubmit = () => {
        handleUpdate();
    };

    const handleDelete = () => {
        if (!invalid.includes(fieldsData._id)) {
            Meteor.call('book_authors.delete', fieldsData._id);
        }
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
            <button className="open-dialog-button" onClick={openDialog}>Edit</button>
            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-content">
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <div className="column">
                                <h2>Information</h2>
                                <div className="form-group">
                                    <label>Books-authors:</label>
                                    <select className="form-group" name="_id" value={fieldsData._id} onChange={handleInputChange}>
                                        <option value="select">Select</option>
                                        {book_authors.map((row, index) => (
                                            <option key={row._id} value={row._id}>
                                                {`${index + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="button-group">
                                    <button className="cancel-button" onClick={closeDialog}>Close</button>
                                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                                    <button className="save-button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                            <div style={{ marginLeft: '20px' }}></div>
                            <div className="column">
                                <h2>Values</h2>
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

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};