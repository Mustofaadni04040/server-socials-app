import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import type { UserDocument } from 'src/user/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

export class MediaType {
  public_id: string;
  version: number;
  display_name: string;
  format: string;
  resource_type: string;
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: UserDocument;
  @Prop({ default: '#ffffff' })
  backgroundColor: string;
  @Prop()
  content: string;
  @Prop({ default: [] })
  mediaFiles: MediaType[];
  @Prop({ enum: ['public', 'private', 'friends'], default: 'public' })
  privacy: IPrivacy;
}

export const PostSchema = SchemaFactory.createForClass(Post);
