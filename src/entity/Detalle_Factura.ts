import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Producto } from "./Producto";

@Entity()
export class Detalle_Factura{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    numero:number;
    @Column({type: 'int', nullable: true})
    cantidad:number;
    @ManyToOne(()=> Producto, (producto) => producto.codigo_Producto) //De uno a varios productos
    @JoinColumn({name: 'codigo_Producto'})
    codigo_Producto: Producto;
}