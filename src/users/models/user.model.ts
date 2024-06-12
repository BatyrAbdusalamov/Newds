import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreation {
    id:number;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    photo:string;
}

@Table({tableName:'user'})
export class User extends Model <User, UserCreation>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, allowNull: false, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING,unique:true, allowNull: false})
    login: string;

    @Column({type:DataType.STRING, allowNull: false})
    password: string;

    @Column({type:DataType.STRING, allowNull: false})
    firstName: string;

    @Column({type:DataType.STRING, allowNull: false})
    lastName: string;

    @Column({type:DataType.STRING})
    photo: string;
}