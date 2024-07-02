import { TagsPosts } from "./models/tags-posts.model";
import { CreateTagsPost } from "./data/CreateTagsPost.data";
export declare class TagsPostsService {
    private tagsPostsRepository;
    constructor(tagsPostsRepository: typeof TagsPosts);
    createAssociationTagsPosts(tagsPost: CreateTagsPost[]): Promise<object>;
}
