import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ContractsCollection } from '../../../api/collections/ContractsCollection';
import { WritersCollection } from '../../../api/collections/WritersCollection';

export const ContractsList = () => {
    const { isLoading, result } = useTracker(() => {
        const handleContracts = Meteor.subscribe('contracts');
        const handleWriters = Meteor.subscribe('writers')
        const isLoading = !handleContracts.ready() || !handleWriters.ready();
        const contracts = ContractsCollection.find().fetch();
        const writers = WritersCollection.find().fetch();

        const result = contracts.map(object => {
            const writerFirstName = writers.find(e => e._id === object.writers_id)?.first_name || '<deleted>';
            const writersLastName = writers.find(e => e._id === object.writers_id)?.last_name || '<deleted>';
            const writersPhone = writers.find(e => e._id === object.writers_id)?.phone || '<deleted>';
            return {
                ...object,
                writerFirstName,
                writersLastName,
                writersPhone
            };
        });
        return { isLoading, result };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>List of contracts</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Contract date</th>
                        <th>Contract duration (years)</th>
                        <th>Is terminated</th>
                        <th>Termination date</th>
                        <th>Writer first name</th>
                        <th>Writer last name</th>
                        <th>Writer phone</th>
                    </tr>
                </thead>
                <tbody>
                    {result?.map((contracts, index) => (
                        <tr key={contracts._id}>
                            <td>{index + 1}</td>
                            <td>{contracts.contract_date}</td>
                            <td>{contracts.contract_duration}</td>
                            <td>{contracts.is_terminated  ? 'Yes' : 'No'}</td>
                            <td>{contracts.termination_date}</td>
                            <td>{contracts.writerFirstName}</td>
                            <td>{contracts.writersLastName}</td>
                            <td>{contracts.writersPhone}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};