import { Args,  Mutation,  Resolver } from "@nestjs/graphql";
import { AddPost } from "./post.dto";


import { PostService } from "./post.service";

@Resolver('Posts')
export class PostResolver {
  constructor(
    private readonly postService: PostService
  ) {}



  @Mutation(returns => String, {name:'addpost'})
  async upvotePost(@Args("addPost") addpost:AddPost) {
    return this.postService.addbook(addpost);
  }

 
}