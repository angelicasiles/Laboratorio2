import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Proveedor } from "./Proveedor";

@Entity()
export class Producto{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    codigo_Producto:number;
    @Column({type: 'varchar', length: 50, nullable: true})
    descripcion:string;
    @Column({type: 'float', nullable: true})
    precio_Producto:number;
    @Column({type: 'int', nullable: true})
    stock_Maximo_Producto:number;
    @Column({type: 'int', nullable: true})
    stock_Minimo_Producto:number;
    @OneToOne(()=> Proveedor)
    @JoinColumn({name:'codigoProveedor'})
    codigoProveedor:Proveedor;
    @Column({type: 'char', nullable: true})
    estado:boolean;

}