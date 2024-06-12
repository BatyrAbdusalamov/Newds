import { TagsPosts } from "./tags-posts.model";
export declare class TagsPostsService {
    private tagsPostsRepository;
    constructor(tagsPostsRepository: typeof TagsPosts);
    createAssociationTagsPosts(idPost: number, idTags: number): Promise<object>;
}
