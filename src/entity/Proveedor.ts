import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Proveedor{

    @PrimaryColumn({type: 'int', unique: true})
    codigo_Proveedor:number;
    @Column({type: 'varchar', length: 50, nullable: true})
    nombre_Proveedor:string;
    @Column({type: 'varchar', length: 50, nullable: true})
    apellidos_Proveedor:string;
    @Column({type: 'varchar', length: 150, nullable: true})
    direccion_Proveedor:string;
    @Column({type: 'varchar', length: 15, nullable: true})
    provincia_Proveedor:string;
    @Column({type: 'int', nullable: true})
    telefono_Proveedor:number;



}