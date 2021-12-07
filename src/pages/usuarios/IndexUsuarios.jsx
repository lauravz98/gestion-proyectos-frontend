import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enums';
import { Enum_EstadoUsuario } from 'utils/enums';

const IndexUsuarios = () => {
    const { data, error, loading } = useQuery(GET_USUARIOS)
    
    useEffect(() => {
        console.log("data servidor", data)
    }, [data])

    useEffect(() => {
        if (error) {
            toast.error("Error consultando los usuarios")
        }
    }, [error]);

    if (loading) return <di>Cargando...</di>
    
    return (
      <div>
        <h1 className="m-3 text-3xl text-gray-800 font-bold text-center">
          Listado de usuarios:
        </h1>
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.Usuarios.map((u) => {
                return (
                  <tr key={u._id}>
                    <td>{u.nombre}</td>
                    <td>{u.apellido}</td>
                    <td>{u.correo}</td>
                    <td>{u.identificacion}</td>
                    <td>{Enum_Rol[u.rol]}</td>
                    <td>{Enum_EstadoUsuario[u.estado]}</td>
                    <td>
                      <Link to={`/gestion-usuarios/editar/${u._id}`}>
                        <i className="fas fa-pen text-blue-600 hover:text-blue-400 cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
}

export default IndexUsuarios
