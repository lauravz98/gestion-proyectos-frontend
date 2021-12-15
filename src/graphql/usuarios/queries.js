import { gql } from '@apollo/client'

//consulta que retorna todo el listado de usuarios
const GET_USUARIOS = gql`
    query Query($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
        _id
        nombre
        apellido
        identificacion
        correo
        rol
        estado
        }
    }`;

    //devuelve un unico usuario
const GET_USUARIO = gql`
    query Usuario($id: String!) {
        Usuario(_id: $id) {
            _id
            nombre
            apellido
            identificacion
            correo
            rol
            estado
        }
    }`;
export {GET_USUARIOS, GET_USUARIO}