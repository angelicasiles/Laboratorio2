import { Router } from "express";
import producto from "./productos";
import Vendedor  from "./vendedores";
import Proveedor from "./proveedores";
import Detalles_Facturas from "./detalles_Facturas";
import Cabecera_Factura from "./cebeceras_Facturas";
import Cliente from "./cliente";


const routes = Router();

routes.use('/productos',producto);
routes.use('/vendedores',Vendedor);
routes.use("/proveedores",Proveedor);
routes.use("/detalles_facturas",Detalles_Facturas);
routes.use("/cabeceras_Facturas",Cabecera_Factura);
routes.use("/cliente",Cliente);




export default routes;