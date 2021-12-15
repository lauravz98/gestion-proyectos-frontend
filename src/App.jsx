import React, { useState, useEffect } from 'react';
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
import IndexProyectos from 'pages/proyectos/IndexProyectos';
import Inscripciones from 'pages/Inscripciones';
import Avances from 'pages/Avances';
import AuthLayout from 'layouts/AuthLayout';
import Register from 'pages/auth/register';
import Login from 'pages/auth/Login';
import { AuthContext } from 'context/authContext';
import PrivateRoute from 'components/PrivateRoute';
import jwt_decode from "jwt-decode";
import NuevoProyecto from "pages/proyectos/NuevoProyecto";

const httpLink = createHttpLink({
  uri: "https://servidor-gql-mintic-back.herokuapp.com/graphql",
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
    } else { //quitar el token para el logout
      localStorage.removeItem("token")
    }
  };

  useEffect(() => {
    // console.log("token effect", authToken)
    // console.log("token decode ", jwt_decode(authToken))
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken])

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
                <Route path="gestion-proyectos" element={<IndexProyectos />} />
                <Route path="/proyectos/nuevo" element={<NuevoProyecto />} />
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