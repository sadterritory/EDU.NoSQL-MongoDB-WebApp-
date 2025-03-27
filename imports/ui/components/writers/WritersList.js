import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { WritersCollection } from '../../../api/collections/WritersCollection';

export const WritersList = () => {
    const { isLoading, writers } = useTracker(() => {
        const handleWriters = Meteor.subscribe('writers');
        const isLoading = !handleWriters.ready();
        const writers = WritersCollection.find().fetch();
        return { isLoading, writers };
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>List of writers</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Passport num</th>
                        <th>Last name</th>
                        <th>First name</th>
                        <th>Middle name</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {writers?.map((writers, index) => (
                        <tr key={writers._id}>
                            <td>{index + 1}</td>
                            <td>{writers.passport_num}</td>
                            <td>{writers.last_name}</td>
                            <td>{writers.first_name}</td>
                            <td>{writers.middle_name}</td>
                            <td>{writers.address}</td>
                            <td>{writers.phone}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};