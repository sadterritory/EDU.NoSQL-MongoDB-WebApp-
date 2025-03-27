import React from 'react';
import '../../styles/crud.css'

export const UsersPage = () => {
    Meteor.subscribe("users.list");
    const users = Meteor.users.find().fetch();
    console.log(users, users.count);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                    </tr>))}
            </tbody>
        </table>
    );
} 