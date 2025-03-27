import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CustomersCollection } from '../../../api/collections/CustomersCollection';

export const CustomersEdit = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        _id: '',
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
            _id: '',
            name: '',
            address: '',
            phone: '',
            contact_person: '',
        });
    };

    const customers = useTracker(() => {
        Meteor.subscribe('customers');
        return CustomersCollection.find().fetch();
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
            await Meteor.call('customers.update', fieldsData._id, fieldsData);
        }
    };

    const handleSubmit = () => {
        handleUpdate();
    };

    const handleDelete = () => {
        if (!invalid.includes(fieldsData._id)) {
            Meteor.call('customers.delete', fieldsData._id);
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
                                    <label>Customers:</label>
                                    <select className="form-group" name="_id" value={fieldsData._id} onChange={handleInputChange}>
                                        <option value="select">Select</option>
                                        {customers.map((row, index) => (
                                            <option key={row._id} value={row._id}>
                                                {`${index + 1} ${row.name} ${row.address} ${row.contract_person}`}
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};