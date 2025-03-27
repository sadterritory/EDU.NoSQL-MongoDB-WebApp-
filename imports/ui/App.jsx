import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './components/LoginForm'
import { Accounts } from 'meteor/accounts-base';
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

export const App = () => {
  const { user } = useTracker(() => {
    return ({
      user: Meteor.user(),
    });
  });

  if (!user) {
    return (
      <>
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Header user={user} />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};
