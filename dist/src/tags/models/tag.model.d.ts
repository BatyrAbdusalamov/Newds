import { Model } from "sequelize-typescript";
interface TagCreation {
    id: number;
    nameTag: string;
}
export declare class Tag extends Model<Tag, TagCreation> {
    id: number;
    nameTag: string;
}
export {};
