import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BooksCollection } from '../../../api/collections/BooksCollection';

export const BooksList = () => {
    const { isLoading, books } = useTracker(() => {
        const handleBooks = Meteor.subscribe('books');
        const isLoading = !handleBooks.ready();
        const books = BooksCollection.find().fetch();
        return { isLoading, books };
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>List of books</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Title</th>
                        <th>Print run</th>
                        <th>Publication date</th>
                        <th>Cost price</th>
                        <th>Selling price</th>
                        <th>Royalty</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((books, index) => (
                        <tr key={books._id}>
                            <td>{index + 1}</td>
                            <td>{books.title}</td>
                            <td>{books.print_run}</td>
                            <td>{books.publication_date}</td>
                            <td>{books.cost_price}</td>
                            <td>{books.selling_price}</td>
                            <td>{books.royalty}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};