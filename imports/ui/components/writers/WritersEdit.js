import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { WritersCollection } from '../../../api/collections/WritersCollection';

export const WritersEdit = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        _id: '',
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
            _id: '',
            passport_num: '',
            last_name: '',
            first_name: '',
            middle_name: '',
            address: '',
            phone: '',
        });
    };

    const writers = useTracker(() => {
        Meteor.subscribe('writers');
        return WritersCollection.find().fetch();
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
            await Meteor.call('writers.update', fieldsData._id, fieldsData);
        }
    };

    const handleSubmit = () => {
        handleUpdate();
    };

    const handleDelete = () => {
        if (!invalid.includes(fieldsData._id)) {
            Meteor.call('writers.delete', fieldsData._id);
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
                                    <label>Writers:</label>
                                    <select className="form-group" name="_id" value={fieldsData._id} onChange={handleInputChange}>
                                        <option value="select">Select</option>
                                        {writers.map((row, index) => (
                                            <option key={row._id} value={row._id}>
                                                {`${index + 1} ${row.first_name} ${row.last_name} ${row.phone}`}
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};