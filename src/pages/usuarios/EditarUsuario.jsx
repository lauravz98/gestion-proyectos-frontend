import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useQuery } from "@apollo/client";
import { GET_USUARIO } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const EditarUsuario = () => {
    const { data, error, loading } = useQuery(GET_USUARIO);

    useEffect(() => {
      if (error) {
        toast.error("Error consultando el usuario");
      }
    }, [error]);

    if (loading) return <di>Cargando...</di>;

    
    return {
      /*
            const {_id} = useParams()
             <div className="flew flex-col w-full h-full items-center justify-center p-10">
        <Link to="/usuarios">
          <i className="fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
        </Link>
        <h1 className="m-4 text-3xl text-gray-800 font-bold text-center">
          Editar Usuario
        </h1>
          <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className="flex flex-col items-center justify-center"
        ><Input
            label="Nombre de la persona:"
            type="text"
            name="nombre"
            defaultValue={queryData.Usuario.nombre}
            required={true}
          />
          <Input
            label="Apellido de la persona:"
            type="text"
            name="apellido"
            defaultValue={queryData.Usuario.apellido}
            required={true}
          />
          <Input
            label="Correo de la persona:"
            type="email"
            name="correo"
            defaultValue={queryData.Usuario.correo}
            required={true}
          />
          <Input
            label="Identificación de la persona:"
            type="text"
            name="identificacion"
            defaultValue={queryData.Usuario.identificacion}
            required={true}
          />
          <DropDown
            label="Estado de la persona:"
            name="estado"
            defaultValue={queryData.Usuario.estado}
            required={true}
            options={Enum_EstadoUsuario}
          />
          <span>Rol del usuario: {queryData.Usuario.rol}</span>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text="Confirmar"
          />
          </form> 
        </div>*/
    };
}

export default EditarUsuario
