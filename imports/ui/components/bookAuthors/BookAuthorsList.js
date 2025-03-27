import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BookAuthorsCollection } from '../../../api/collections/BookAuthorsCollection';
import { BooksCollection } from '../../../api/collections/BooksCollection';
import { WritersCollection } from '../../../api/collections/WritersCollection';


export const BookAuthorsList = () => {
    const { isLoading, result } = useTracker(() => {
        const handleWriters = Meteor.subscribe('writers');
        const handleBooks = Meteor.subscribe('books');
        const handleBookAuthors = Meteor.subscribe('book_authors')
        const isLoading = !handleBookAuthors.ready() || !handleBooks.ready() || !handleWriters.ready();
        const writers = WritersCollection.find().fetch();
        const books = BooksCollection.find().fetch();
        const book_authors = BookAuthorsCollection.find().fetch();

        const result = book_authors.map(object => {
            const writerFirstName = writers.find(e => e._id === object.writers_id)?.first_name || '<deleted>';
            const writerLastName = writers.find(e => e._id === object.writers_id)?.last_name || '<deleted>';
            const writerPhone = writers.find(e => e._id === object.writers_id)?.phone || '<deleted>';
            const bookTitle = books.find(e => e._id === object.books_id)?.title || '<deleted>';
            const bookPublicationDate = books.find(e => e._id === object.books_id)?.publication_date || '<deleted>';
            const bookSellingPrice = books.find(e => e._id === object.books_id)?.selling_price || '<deleted>';
            return {
                ...object,
                writerFirstName,
                writerLastName,
                writerPhone,
                bookTitle,
                bookPublicationDate,
                bookSellingPrice,
            };
        });
        return { isLoading, result };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>List of Exhibitions</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Writer first name</th>
                        <th>Writer last name</th>
                        <th>Writer phone</th>
                        <th>Book title</th>
                        <th>Book publication date</th>
                        <th>Book selling price</th>
                    </tr>
                </thead>
                <tbody>
                    {result?.map((book_authors, index) => (
                        <tr key={book_authors._id}>
                            <td>{index + 1}</td>
                            <td>{book_authors.writerFirstName}</td>
                            <td>{book_authors.writerLastName}</td>
                            <td>{book_authors.writerPhone}</td>
                            <td>{book_authors.bookTitle}</td>
                            <td>{book_authors.bookPublicationDate}</td>
                            <td>{book_authors.bookSellingPrice}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
};