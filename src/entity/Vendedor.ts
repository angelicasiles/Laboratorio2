import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class Vendedor{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    codigo_Vendedor:number;
    @Column({type: 'varchar', length: 50, nullable: true})
    nombres_Vendedor:string;
    @Column({type: 'varchar', length: 50, nullable: true})
    apellidos_Vendedor:string;
    @Column({type: 'varchar', length: 150, nullable: true})
    direccion_Vendedor:string;
    @Column({type: 'int', nullable: true})
    telefono_Vendedor:number;
    @Column({type: 'int', nullable: true})
    celular_Vendedor:number;

}