import { Router } from "express";
import Cabeceras_FacturasController from "../controller/Cabeceras_FacturasController";



const routes = Router();

routes.get("", Cabeceras_FacturasController.getAll);
//Para que determine que es paracmetro, ponemos los dos :
routes.get("/getById/:id", Cabeceras_FacturasController.getById);
//Para poder agregar un dato a la base de datos, desde el postman
routes.post("", Cabeceras_FacturasController.add);

export default routes;