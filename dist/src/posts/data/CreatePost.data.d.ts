/// <reference types="node" />
interface Image {
    type: string;
    data: Buffer;
}
export declare class CreatePostData {
    readonly content: string;
    readonly topic: string;
    readonly idPostUser: number;
    readonly tag?: Array<string>;
    readonly image?: Image;
}
export {};
