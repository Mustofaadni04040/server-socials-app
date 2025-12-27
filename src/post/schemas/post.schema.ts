import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import type { UserDocument } from 'src/user/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: UserDocument;
  @Prop()
  content: string;
  @Prop()
  mediaUrls?: string[];
  @Prop({ enum: ['public', 'private', 'friends'], default: 'public' })
  privacy: IPrivacy;
}

export const PostSchema = SchemaFactory.createForClass(Post);
