import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { GET_USUARIOS } from 'graphql/usuarios/queries'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { Enum_Rol } from 'utils/enums';
import { Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

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

    if (loading) return <div>Cargando...</div>
    
  return (
    <PrivateRoute roleList={["ADMINISTRADOR"]}>
      <div className="p-10 flex flex-col">
        <h1 className="ml-3 text-lg text-gray-200">Gestión de usuarios</h1>

        <div className="flex w-full ml-3 items-center ">
          <h1 className="text-3xl font-bold text-gray-900 pb-3">
            Lista de usuarios
          </h1>
        </div>
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
            {data && data.Usuarios ? (
              <>
                {data.Usuarios.map((u) => {
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
              </>
            ) : (
              <div>No autorizado</div>
            )}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
}

export default IndexUsuarios
