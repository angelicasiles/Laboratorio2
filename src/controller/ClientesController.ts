import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import {Cliente} from "../entity/Cliente";

class ClientesController {

        static getAll = async (req: Request, resp: Response) => {

                //Creamos el trycatch, para que el server no se caiga en posible error.
                try {
                    //Creamos metodo de GetAll, Creamos instancia de AppDataSource.
                    const ClienteRepo = AppDataSource.getRepository(Cliente)
                    //Siempre vamos a usar un await, await = espere
                    //Dentro del Find, podemos crear una condicion. Por ejemplo : 
                    //find({where: {estado:true}})
                    const listaCliente = await ClienteRepo.find();
                    //Creamos validacion para ver si hay datos en la tabala
                    if (listaCliente .length == 0) {
                        return resp.status(404).json({ mensaje: 'No hay datos en la base de datos' });
                    }
                    //Siempre tiene que devolver un dato, para el cliente.
                    // Y si en un caso si hubiera datos en la base de datos, 
                    //devolvemos la lista de productos
                    return resp.status(200).json(listaCliente);
                } catch (error) {
                    //En posible error, lo que hacemos es devolver el error
                    return resp.status(400).json({ mensaje: error.error });
                }
        
            }
            static getById = async (req: Request, resp: Response) => {
                //Ponemos ecepxiones
                try {
                    //Extraemos el id, en fomrato Int
                    const ruc_Cliente = parseInt(req.params["id"]);
                    if (!ruc_Cliente) {
                        return resp.status(404).json({ mensaje: 'No se indica el ID' })
                    }
                    //Hacemos la instancia del repositorio
                    const ClienteRepo = AppDataSource.getRepository(Cliente);
                    let client;
        
                    // Podemos utilizar tambien el trycatch, y asi nos ahorramos el if
                    try {
                        //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
                        // Encuentre
                        client = await ClienteRepo.findOneOrFail({ where: {ruc_Cliente} })
                    } catch (error) {
                        return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
                    }
                    
                    // const producto = await ProductosRepo.findOne({ where: { id } })
                    // //Validamos producto tiene algo
                    // if (!producto) {
                    //     return resp.status(404).json({ mensaje: 'No se encontro el producto con ese ID' })
                    // }
        
                    // //En caso de que si alla algo, lo mande
                    return resp.status(200).json({ client})
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
                    const {ruc_Cliente,nombres_Cliente,apellidos_Cliente,direccion_Cliente,telefono_Cliente} = req.body;
                    //Validamos los datos de entrada
                    if(!ruc_Cliente){
                        return resp.status(404).json({ mensaje: 'Debe indicar el código del producto' })
                    }
                    if(!nombres_Cliente){
                        return resp.status(404).json({ mensaje: 'Debe indicar la descripción del producto' })
                    }
                    if(!apellidos_Cliente){
                        return resp.status(404).json({ mensaje: 'Debe indicar el precio del producto' })
                    }
                    if(!direccion_Cliente){
                        return resp.status(404).json({ mensaje: 'Debe indicar el precio del producto mayor a 0' })
                    }
                    if(!telefono_Cliente){
                        return resp.status(404).json({ mensaje: 'Debe indicar un stock maximo para el producto' })
                
                    }
                    
                    // Validaciones de reglas de negocio
                    const ClienteRepo = AppDataSource.getRepository(Cliente);
                    //Buscamoms el producto en la base de datos, para ver si existe
                    const pro = await ClienteRepo.findOne({where:{ruc_Cliente}});
        
                    // Validamos si el producto esta en la base de datos
                    if(pro){
                        return resp.status(404).json({ mensaje: 'El producto ya existe en la base de datos' })
                    }
        
                    //Se puede usar para agarrar la fecha de hoy
                    const fecha = new Date();
                    //Creamos el nuevo producto
                    let client = new Cliente();
                    client.ruc_Cliente = ruc_Cliente;
                    client. nombres_Cliente =  nombres_Cliente;
                    client.apellidos_Cliente = apellidos_Cliente;
                    client.direccion_Cliente = direccion_Cliente;
                    client.telefono_Cliente = telefono_Cliente;
                    
        
                    //Guardamos
                    await ClienteRepo.save(client);
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
        




export default ClientesController;