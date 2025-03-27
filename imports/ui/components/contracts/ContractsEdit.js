import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ContractsCollection } from '../../../api/collections/ContractsCollection';
import { WritersCollection } from '../../../api/collections/WritersCollection';

export const ContractsEdit = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
        _id: '',
        writers_id: '',
        contract_date: '',
        contract_duration: '',
        is_terminated: false,
        termination_date: '',
    });

    const openDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setFieldsData({
            _id: '',
            writers_id: '',
            contract_date: '',
            contract_duration: '',
            is_terminated: false,
            termination_date: '',
        });
    };

    const contracts = useTracker(() => {
        Meteor.subscribe('contracts');
        return ContractsCollection.find().fetch();
    });

    const writers = useTracker(() => {
        Meteor.subscribe('writers');
        return WritersCollection.find().fetch();
    });

    const handleUpdate = async () => {
        if (!invalid.includes(fieldsData._id) && !invalid.includes(fieldsData.writers_id)) {
            await Meteor.call('contracts.update', fieldsData._id, fieldsData);
        }
    };

    const handleSubmit = () => {
        handleUpdate();
    };

    const handleDelete = () => {
        if (!invalid.includes(fieldsData._id)) {
            Meteor.call('contracts.delete', fieldsData._id);
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
                                    <label>Contracts:</label>
                                    <select className="form-group" name="_id" value={fieldsData._id} onChange={handleInputChange}>
                                        <option value="select">Select</option>
                                        {contracts.map((row, index) => (
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
                                </div>
                                <div className="form-group">
                                    <label>Contract date:</label>
                                    <input type="date" name="contract_date" value={fieldsData.contract_date} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Contract duration (years):</label>
                                    <input type="number" step="1" name="contract_duration" value={fieldsData.contract_duration} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Is terminated:</label>
                                    <input type="checkbox" name="is_terminated" checked={fieldsData.is_terminated} onChange={(e) => setFieldsData({
                                        ...fieldsData,
                                        is_terminated: e.target.checked
                                    })} />
                                </div>
                                <div className="form-group">
                                    <label>Termination date:</label>
                                    <input type="date" name="termination_date" value={fieldsData.termination_date} onChange={handleInputChange} disabled={!fieldsData.is_terminated} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};