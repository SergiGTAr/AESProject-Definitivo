import { UserModel } from "./user.model";

export class CommentModel {
    comment_id: string; 
    user: UserModel;
    post_id: string;
    content: string;
    created_at: string;
}
