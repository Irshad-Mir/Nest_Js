import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { Post } from './posts.dto';


const userFragment = gql`
  fragment post on posts {
    userId
    id

    title

    body

    
  }
`;

@Injectable()
export default class PostsRepository {
  constructor(private readonly client: HasuraService) {}

  getPostQuery(): string {
    const query = gql`
      query {
        posts {
          ...post
        }
      }

      ${userFragment}
    `;

    return query;
  }

  addPostQuery(): string {
    const query = gql`
      mutation ($body: posts_insert_input!) {
        insert_posts_one(object: $body) {
          userId
          title

          body
        }
      }

      ${userFragment}
    `;

    return query;
  }
  async createPosts(body: any): Promise<any> {
    const postsquery = this.addPostQuery();

    type result = [
      {
        data: { post: Post[] };
      },
    ];

    const newposts = await this.client.batchRequests<result>([
      {
        document: postsquery,

        variables: { body },
      },
    ]);

    return newposts;
  }

  async getposts(): Promise<any> {
    const postQuery = this.getPostQuery();

    type result = [
      {
        data: { post: Post[] };
      },
    ];

    const posts = await this.client.batchRequests<result>([
      {
        document: postQuery,

        variables: {},
      },
    ]);

    return posts;
  }
}
