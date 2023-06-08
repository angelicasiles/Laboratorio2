import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Proveedor } from "./Proveedor";


@Entity()
export class Cabecera_Factura{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    numero:number;
    @Column({type: 'date', nullable: true})
    fecha: Date;
    @OneToOne(()=> Cliente) //De uno a uno
    @JoinColumn({name: 'ruc_Cliente'})
    ruc_Cliente: Cliente;
    @OneToOne(()=> Proveedor)//De uno a uno
    @JoinColumn({name: 'codigo_Proveedor'})
    codigo_Proveedor: Proveedor;
}