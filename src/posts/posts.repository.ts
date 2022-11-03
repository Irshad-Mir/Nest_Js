import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { Post } from './posts.dto';


// ##### Graphql Query And Mutations ##### //


const postFragment = gql`
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

      ${postFragment}
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

      ${postFragment}
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

  async getpostsrecords(postId: number): Promise<any> {
    const query = gql`
      query ($postId: Int!) {
        posts_by_pk(id: $postId) {
          ...post
        }
      }
      ${postFragment}
    `;

    type result = [
      {
        data: { post: Post[] };
      },
    ];

    const posts = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { postId },
      },
    ]);

    return posts;
  }

  async getAposts(userId: number): Promise<any> {
    const query = gql`
      query ($userId: Int) {
        posts(where: { _and: [{ userId: { _eq: $userId } }] }) {
          id
          userId
          title
          body
        }
      }
      ${postFragment}
    `;

    type result = [
      {
        data: { post: Post[] };
      },
    ];

    const posts = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { userId },
      },
    ]);

    return posts;
  }
}
