import { Tag } from './models/tag.model';
export declare class TagService {
    private tagRepository;
    constructor(tagRepository: typeof Tag);
    searchTags(userTags: Array<string>): Promise<{
        newTags: object[];
        idTags: number[];
    }>;
    getIdTagsByPost(userTags: Array<string>): Promise<{
        newTags: object[];
        idTags: number[];
    }>;
}
