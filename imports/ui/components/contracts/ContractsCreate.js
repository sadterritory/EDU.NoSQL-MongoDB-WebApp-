import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import 'react-datepicker/dist/react-datepicker.css';
import { WritersCollection } from '../../../api/collections/WritersCollection';

import { useTracker } from 'meteor/react-meteor-data';

export const ContractsCreate = () => {
    const invalid = ['select', ''];
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [fieldsData, setFieldsData] = useState({
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
            writers_id: '',
            contract_date: '',
            contract_duration: '',
            is_terminated: false,
            termination_date: '',
        });
    };

    const writers = useTracker(() => {
        Meteor.subscribe('writers');
        return WritersCollection.find().fetch();
    });

    const handleCreate = async () => {
        if (!invalid.includes(fieldsData.writers_id)) {
            const newContract = fieldsData;
            await Meteor.callAsync('contracts.insert', newContract);
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