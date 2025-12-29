import { Expose, Transform, Type } from 'class-transformer';
import { PostDocument } from '../schemas/post.schema';
import { ObjectId } from 'src/_cores/decorators/object-id.decorator';

// https://res.cloudinary.com/djfa29z9d/image/upload/v1766998879/qpkel1dnxyp02ohirxrd.png

export class MediaType {
  @Expose()
  @Transform(
    ({ obj }: { obj: MediaType }) =>
      `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/v${obj.version}/${obj.display_name}.${obj.format}`,
  )
  url: string;
  @Expose()
  public_id: string;
  @Expose()
  version: number;
  @Expose()
  display_name: string;
  @Expose()
  format: string;
  @Expose()
  resource_type: string;
}

export class ResponsePostDto {
  @Expose()
  @ObjectId()
  _id: string;
  @Expose()
  backgroundColor: string;
  @Expose()
  content: string;
  @Expose()
  @Type(() => MediaType)
  mediaFiles?: MediaType[];
  @Expose()
  privacy: IPrivacy;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;

  @Expose()
  @Transform(({ obj }: { obj: PostDocument }) => obj.author._id)
  authorId: string;
  @Expose()
  @Transform(({ obj }: { obj: PostDocument }) => obj.author.name)
  authorName: string;
  @Expose()
  @Transform(({ obj }: { obj: PostDocument }) => obj.author.email)
  authorEmail: string;
}
