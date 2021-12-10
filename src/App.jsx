import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from 'context/userContext';
import Index from 'pages/Index';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/client/link/context'
import 'styles/globals.css';
import "styles/tabla.css";
import IndexUsuarios from 'pages/usuarios/IndexUsuarios';
import EditarUsuario from 'pages/usuarios/EditarUsuario';
import Proyectos from 'pages/Proyectos';
import Inscripciones from 'pages/Inscripciones';
import Avances from 'pages/Avances';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/Login';
import { AuthContext } from 'context/authContext';
// import PrivateRoute from 'components/PrivateRoute';
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

//se saco de la documentacion de apollo
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers, //concatenar autorization al header para ver el token desde el back
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  //"https://servidor-gql-mintic-back.herokuapp.com/graphql"
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('')

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  };

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<Index />} />
                <Route path="gestion-usuarios" element={<IndexUsuarios />} />
                <Route
                  path="gestion-usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
                <Route path="gestion-proyectos" element={<Proyectos />} />
                <Route
                  path="gestion-inscripciones"
                  element={<Inscripciones />}
                />
                <Route path="gestion-avances" element={<Avances />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
    }

export default App;