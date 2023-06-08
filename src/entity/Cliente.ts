import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cliente{
    //PrimaryColumn es para decirle que va a ser una llave primaria
    //PrimaryGeneratedColumn es para decirle que va a ser una llave primaria y que va a ser autoicrementar 
    @PrimaryColumn({type: 'int', unique: true})
    ruc_Cliente:number;
    @Column({type: 'varchar', length: 50, nullable: true})
    nombres_Cliente:string;
    @Column({type: 'varchar', length: 50, nullable: true})
    apellidos_Cliente:string;
    @Column({type: 'varchar', length: 150, nullable: true})
    direccion_Cliente:string;
    @Column({type: 'int', nullable: true})
    telefono_Cliente:number;

}