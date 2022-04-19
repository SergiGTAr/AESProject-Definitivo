import { UserModel } from "./user.model";

export class PostModel {
    content: string;
    user: UserModel;
    created_at: Date;
    likes: Number;
    category: string;
    
    constructor(content: string, user: UserModel, created_at: Date, likes: Number, category: string) {
        this.content = content;
        this.user = user;
        this.created_at = created_at;
        this.likes = likes;
        this.category = category;
    }
}
