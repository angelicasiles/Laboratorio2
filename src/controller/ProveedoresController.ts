import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { Proveedor} from "../entity/Proveedor";
import { Vendedor } from "../entity/Vendedor";

class ProveedoresController {
    
    static getAll = async (req: Request, resp: Response) => {

        //Creamos el trycatch, para que el server no se caiga en posible error.
        try {
            //Creamos metodo de GetAll, Creamos instancia de AppDataSource.
            const ProveedorRepo = AppDataSource.getRepository(Proveedor)
            //Siempre vamos a usar un await, await = espere
            //Dentro del Find, podemos crear una condicion. Por ejemplo : 
            //find({where: {estado:true}})
            const listaProvedores = await ProveedorRepo.find();
            //Creamos validacion para ver si hay datos en la tabala
            if (listaProvedores.length == 0) {
                return resp.status(404).json({ mensaje: 'No hay datos en la base de datos' });
            }
            //Siempre tiene que devolver un dato, para el cliente.
            // Y si en un caso si hubiera datos en la base de datos, 
            //devolvemos la lista de productos
            return resp.status(200).json(listaProvedores);
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }

    }
    static getById = async (req: Request, resp: Response) => {
        //Ponemos ecepxiones
        try {
            //Extraemos el id, en fomrato Int
            const codigo_Proveedor = parseInt(req.params["id"]);
            if (!codigo_Proveedor) {
                return resp.status(404).json({ mensaje: 'No se indica el ID' })
            }
            //Hacemos la instancia del repositorio
            const VendedorRepo = AppDataSource.getRepository(Proveedor);
            let proveedor;

            // Podemos utilizar tambien el trycatch, y asi nos ahorramos el if
            try {
                //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                // Encuentre
                proveedor = await VendedorRepo.findOneOrFail({ where: { codigo_Proveedor } })
            } catch (error) {
                return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            }
            
            // const producto = await ProductosRepo.findOne({ where: { id } })
            // //Validamos producto tiene algo
            // if (!producto) {
            //     return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
            // }

            // //En caso de que si alla algo, lo mande
            return resp.status(200).json({ proveedor})
        } catch (error) {
            //En posible error, lo que hacemos es devolver el error
            return resp.status(400).json({ mensaje: error.error });
        }




    }

    static add = async (req: Request, resp: Response) => {
        //Agregamos el trycath
        try {
            // Destructuring
            // De esa manera estamos sacando del body esos datos:
            const {codigo_Proveedor,nombre_Proveedor,apellidos_Proveedor,direccion_Proveedor,provincia_Proveedor, telefono_Proveedor} = req.body;
            //Validamos los datos de entrada
            if(!codigo_Proveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar el código del producto' })
            }
            if(!nombre_Proveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar la descripción del producto' })
            }
            if(!apellidos_Proveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar el precio del producto' })
            }
            if(!direccion_Proveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar el precio del producto mayor a 0' })
            }
            if(!provincia_Proveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar un stock maximo para el producto' })
            }
            if(!telefono_Proveedor){
                return resp.status(404).json({ mensaje: 'Debe indicar el stock minimo para el producto' })
            }
            
            // Validaciones de reglas de negocio
            const ProductosRepo = AppDataSource.getRepository(Proveedor);
            //Buscamoms el producto en la base de datos, para ver si existe
            const pro = await ProductosRepo.findOne({where:{codigo_Proveedor}});

            // Validamos si el producto esta en la base de datos
            if(pro){
                return resp.status(404).json({ mensaje: 'El producto ya existe en la base de datos' })
            }

            //Se puede usar para agarrar la fecha de hoy
            const fecha = new Date();
            //Creamos el nuevo producto
            let proveedor = new Proveedor();
            proveedor.codigo_Proveedor = codigo_Proveedor;
            proveedor. nombre_Proveedor =  nombre_Proveedor;
            proveedor.apellidos_Proveedor = apellidos_Proveedor;
            proveedor.direccion_Proveedor = direccion_Proveedor;
            proveedor.provincia_Proveedor = provincia_Proveedor;
            proveedor.telefono_Proveedor = telefono_Proveedor;

            //Guardamos
            await ProductosRepo.save(proveedor);
            return resp.status(200).json({ mensaje: 'El producto fue creado con éxito' });

        } catch (error) {
            return resp.status(400).json({mensaje:error})
        }
        
    }

    static update = async (req: Request, resp: Response) => {

    }
    static delete = async (req: Request, resp: Response) => {

    }
}

export default ProveedoresController;