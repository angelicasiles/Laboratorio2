import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import {Detalle_Factura} from "../entity/Detalle_Factura";


class Detalles_FacturasController {
    static getAll = async (req: Request, resp: Response) => {

        //Creamos el trycatch, para que el server no se caiga en posible error.
        try {
            //Creamos metodo de GetAll, Creamos instancia de AppDataSource.
            const DetallesRepo = AppDataSource.getRepository(Detalle_Factura)
            //Siempre vamos a usar un await, await = espere
            //Dentro del Find, podemos crear una condicion. Por ejemplo : 
            //find({where: {estado:true}})
            const listaDetalles = await DetallesRepo.find();
            //Creamos validacion para ver si hay datos en la tabala
            if (listaDetalles.length == 0) {
                return resp.status(404).json({ mensaje: 'No hay datos en la base de datos' });
            }
            //Siempre tiene que devolver un dato, para el cliente.
            // Y si en un caso si hubiera datos en la base de datos, 
            //devolvemos la lista de productos
            return resp.status(200).json(listaDetalles);
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }

    } 
    static getById = async (req: Request, resp: Response) => {
        //Ponemos ecepxiones
        try {
            //Extraemos el id, en fomrato Int
            const numero = parseInt(req.params["id"]);
            if (!numero) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            //Hacemos la instancia del repositorio
            const DetallesRepo = AppDataSource.getRepository(Detalle_Factura);
            let detalles;

            // Podemos utilizar tambien el trycatch, y asi nos ahorramos el if
            try {
                //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                // Encuentre
                detalles = await DetallesRepo.findOneOrFail({ where: { numero } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            }
            
            // const producto = await ProductosRepo.findOne({ where: { id } })
            // //Validamos producto tiene algo
            // if (!producto) {
            //     return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            // }

            // //En caso de que si alla algo, lo mande
            return resp.status(200).json({detalles})
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }
    }
     



}
export default Detalles_FacturasController;