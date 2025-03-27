import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import 'react-datepicker/dist/react-datepicker.css';

export const CustomersCreate = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        name: '',
        address: '',
        phone: '',
        contact_person: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            name: '',
            address: '',
            phone: '',
            contact_person: '',
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
        await Meteor.callAsync('customers.insert', fieldsData);
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
                            <label>Name:</label>
                            <input type="text" name="name" value={fieldsData.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" name="address" value={fieldsData.address} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="phone" value={fieldsData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Contact person:</label>
                            <input type="text" name="contact_person" value={fieldsData.contact_person} onChange={handleInputChange} />
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