import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BooksCollection } from '../../../api/collections/BooksCollection';

export const BooksEdit = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        _id: '',
        title: '',
        print_run: '',
        publication_date: '',
        cost_price: '',
        selling_price: '',
        royalty: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            _id: '',
            title: '',
            print_run: '',
            publication_date: '',
            cost_price: '',
            selling_price: '',
            royalty: '',
        });
    };

    const books = useTracker(() => {
        Meteor.subscribe('books');
        return BooksCollection.find().fetch();
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFieldsData({
            ...fieldsData,
            [name]: value
        });
    };

    const handleUpdate = async () => {
        if (fieldsData._id != 'select') {
            await Meteor.call('books.update', fieldsData._id, fieldsData);
        }
    };

    const handleSubmit = () => {
        handleUpdate();
    };

    const handleDelete = () => {
        if (!invalid.includes(fieldsData._id)) {
            Meteor.call('books.delete', fieldsData._id);
        }
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
                                    <label>Books:</label>
                                    <select className="form-group" name="_id" value={fieldsData._id} onChange={handleInputChange}>
                                        <option value="select">Select</option>
                                        {books.map((row, index) => (
                                            <option key={row._id} value={row._id}>
                                                {`${index + 1} ${row.title} ${row.print_run} ${row.publication_date}`}
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
                                    <label>Title:</label>
                                    <input type="text" name="title" value={fieldsData.title} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Print run:</label>
                                    <input type="number" step="1" name="print_run" value={fieldsData.print_run} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Publication date:</label>
                                    <input type="date" name="publication_date" value={fieldsData.publication_date} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Cost price:</label>
                                    <input type="number" step="0.01" name="cost_price" value={fieldsData.cost_price} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Selling price:</label>
                                    <input type="number" step="0.01" name="selling_price" value={fieldsData.selling_price} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Royalty:</label>
                                    <input type="number" step="0.01" name="royalty" value={fieldsData.royalty} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};