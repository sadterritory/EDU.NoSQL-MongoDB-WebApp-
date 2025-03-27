import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CustomersCollection } from '../../../api/collections/CustomersCollection';

export const CustomersList = () => {
    const { isLoading, customers } = useTracker(() => {
        const handleCustomers = Meteor.subscribe('customers');
        const isLoading = !handleCustomers.ready();
        const customers = CustomersCollection.find().fetch();
        return { isLoading, customers };
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>List of customers</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Contact person</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customers, index) => (
                        <tr key={customers._id}>
                            <td>{index + 1}</td>
                            <td>{customers.name}</td>
                            <td>{customers.address}</td>
                            <td>{customers.phone}</td>
                            <td>{customers.contact_person}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};