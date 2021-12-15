import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { useMutation, useQuery } from "@apollo/client";
import { PROYECTOS } from "graphql/proyectos/queries";
import DropDown from "components/Dropdown";
import { Dialog } from "@mui/material";
import { Enum_EstadoProyecto } from "utils/enums";
import ButtonLoading from "components/ButtonLoading";
import { EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import useFormData from "hooks/useFormData";
import PrivateComponent from "components/PrivateComponent";
import { Link } from "react-router-dom";

const AccordionStyled = styled((props) => <Accordion {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#f2f2f2",
  })
);
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: "#004466",
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(({ theme }) => ({
  backgroundColor: "#f2f2f2",
}));

const IndexProyectos = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log("datos proyecto", queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      <div className="p-10 flex flex-col">
        <h1 className="ml-3 text-lg text-gray-200">Gestión de proyectos</h1>

        <div className="flex w-full ml-3 items-center ">
          <h1 className="text-3xl font-bold text-gray-900">
            Lista de Proyectos
          </h1>
        </div>
        <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
          <div className="my-2 self-end">
            <button className="bg-blue-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-blue-400">
              <Link to="/gestion-proyectos/nuevo">Crear nuevo proyecto</Link>
            </button>
          </div>
        </PrivateComponent>

        {queryData.Proyectos.map((proyecto) => {
          return <AccordionProyecto proyecto={proyecto} />;
        })}
      </div>
    );
  }

  return <></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>      
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={<i className="fas fa-chevron-down text-gray-100" />}
        >
          <div className="flex w-full justify-between">
            <div className="capitalize font-bold text-gray-100 ">
              {proyecto.nombre} - Estado actual: {proyecto.estado}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <PrivateComponent roleList={["ADMINISTRADOR"]}>
            <div
              className="m-2 flex float-right text-gray-350 hover:text-gray-200 cursor-pointer"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              <span className="text-sm"> Editar proyecto </span>
              <i className="ml-3 flex fas fa-pen " />
            </div>
          </PrivateComponent>
          <div>
            Liderado por: {proyecto.lider.correo}
          </div>
          <div className="flex">
            {proyecto.objetivos.map((objetivo) => {
              return (
                <Objetivo
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                />
              );
            })}
          </div>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} />
      </Dialog>
    </>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] =
    useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
  };

  useEffect(() => {
    console.log("data mutation", dataMutation);
  }, [dataMutation]);

  return (
    <div className="p-4">
      <h1 className="font-bold">Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className="flex flex-col items-center"
      >
        <DropDown
          label="Estado del Proyecto"
          name="estado"
          options={Enum_EstadoProyecto}
        />
        <ButtonLoading disabled={false} loading={loading} text="Confirmar" />
      </form>
    </div>
  );
};

const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className="mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl">
      <div className="uppercase font-light text-sm">
        Tipo de objetivo: {tipo}
      </div>
      <div className="uppercase text-lg">{descripcion}</div>
      <PrivateComponent roleList={["ADMINISTRADOR"]}>
        <div className="flex text-sm text-gray-200">
          Editar objetivo
          <i className="ml-2 flex fas fa-pen " />
        </div>
      </PrivateComponent>
    </div>
  );
};

export default IndexProyectos;
