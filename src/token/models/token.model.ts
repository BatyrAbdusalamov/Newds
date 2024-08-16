import { Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from '../../users/models/user.model'

@Table({tableName:'token'})
export class Token extends Model <Token>{
    @Column({type:DataType.INTEGER, unique:true,autoIncrement:true, allowNull: false, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING,unique:true,allowNull:false})
    refresh:string;

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER, unique:true, allowNull: false, primaryKey: true})
    userId:number;
}