import { UserModel } from "./user.model";

export class PostModel {
    content: string;
    user: UserModel;
    created_at: string;
    likes: string;
    comments: string;
    category: string;
}
