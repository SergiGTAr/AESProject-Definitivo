import { UserModel } from "./user.model";

export class PostModel {
    id: string
    content: string;
    user: UserModel;
    created_at: string;
    likes: string;
    comments: string;
    category: string;
}
