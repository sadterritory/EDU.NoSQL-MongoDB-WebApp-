import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


import { CustomersCollection } from '../imports/api/collections/CustomersCollection';
import { OrdersCollection } from '../imports/api/collections/OrdersCollection';
import { BooksCollection } from '../imports/api/collections/BooksCollection'
import { BookAuthorsCollection } from '../imports/api/collections/BookAuthorsCollection'
import { WritersCollection } from '../imports/api/collections/WritersCollection'
import { ContractsCollection } from '../imports/api/collections/ContractsCollection'


Meteor.startup(() => {
  Meteor.users.find().countAsync().then(count => {
    if (count === 0) {
      const id = Accounts.createUser({ username: 'admin', password: 'admin' });
      // Roles.createRoleAsync('user');
      // Roles.createRoleAsync('admin');
      // Roles.addUsersToRolesAsync(id, 'admin', Roles.GLOBAL_GROUP);
    }
  });
});

Meteor.methods({
  'user.login'({ username, password }) {
    const user = Meteor.users.findOne({ username });
    return !!(user && Accounts._checkPassword(user, password));
  },
});

const defineCrudMethods = (collection) => {
  Meteor.methods({
    [`${collection._name}.insert`](document) {
      const newDocumentId = collection.insertAsync(document);
      return newDocumentId;
    },

    [`${collection._name}.update`](documentId, updatedDocument) {
      const result = collection.updateAsync({ _id: documentId }, updatedDocument);
      return result;
    },

    [`${collection._name}.delete`](documentId) {
      const result = collection.removeAsync(documentId);
      return result;
    },
  });

  Meteor.publish(`${collection._name}`, function () {
    return collection.find();
  });
};

defineCrudMethods(CustomersCollection)
defineCrudMethods(OrdersCollection)
defineCrudMethods(BooksCollection)
defineCrudMethods(BookAuthorsCollection)
defineCrudMethods(WritersCollection)
defineCrudMethods(ContractsCollection)

defineCrudMethods(Meteor.users)