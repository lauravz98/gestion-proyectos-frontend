import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from 'context/userContext';
import Index from 'pages/Index';
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
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

// import PrivateRoute from 'components/PrivateRoute';

// const httpLink = createHttpLink({
//   uri="" //uri del backend
// })
const client = new ApolloClient({
  //"https://servidor-gql-mintic-back.herokuapp.com/graphql"
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
    const [userData, setUserData] = useState({});

  return (
    <ApolloProvider client={client}>
      {/* <Auth0Provider
        domain="misiontic-concesionario.us.auth0.com"
        clientId="WsdhjjQzDLIZEHA6ouuxXGxFONFGAQ4g"
        redirectUri="http://localhost:3000/admin"
        audience="api-autenticacion-concesionario-mintic"
      > */}
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
              <Route path="gestion-inscripciones" element={<Inscripciones />} />
              <Route path="gestion-avances" element={<Avances />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      {/* </Auth0Provider> */}
    </ApolloProvider>
  );
    }

export default App;