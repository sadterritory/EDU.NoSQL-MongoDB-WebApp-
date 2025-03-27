import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import 'react-datepicker/dist/react-datepicker.css';

export const BooksCreate = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
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
            title: '',
            print_run: '',
            publication_date: '',
            cost_price: '',
            selling_price: '',
            royalty: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFieldsData({
            ...fieldsData,
            [name]: value
        });
    };

    const handleCreate = async () => {
        await Meteor.callAsync('books.insert', fieldsData);
    };

    const handleSave = () => {
        handleCreate();
    };
    return (
        <div>
            <button className="open-dialog-button" onClick={openDialog}>New</button>
            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-content">
                        <h2>Input Data</h2>
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