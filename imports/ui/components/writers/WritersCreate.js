import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import 'react-datepicker/dist/react-datepicker.css';

export const WritersCreate = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        passport_num: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        address: '',
        phone: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            passport_num: '',
            last_name: '',
            first_name: '',
            middle_name: '',
            address: '',
            phone: '',
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
        await Meteor.callAsync('writers.insert', fieldsData);
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
                            <label>Passport num:</label>
                            <input type="number" step="1" name="passport_num" value={fieldsData.passport_num} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Last name:</label>
                            <input type="text" name="last_name" value={fieldsData.last_name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>First name:</label>
                            <input type="text" name="first_name" value={fieldsData.first_name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Middle name:</label>
                            <input type="text" name="middle_name" value={fieldsData.middle_name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" name="address" value={fieldsData.address} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" name="phone" value={fieldsData.phone} onChange={handleInputChange} />
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