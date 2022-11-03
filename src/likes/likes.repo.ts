import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { Like } from './likes.dto';

// ##### Graphql Query And Mutations ##### //

const likeFragment = gql`
  fragment likess on Like {
    userId
    postId
    id

    likes
  }
`;

@Injectable()
export default class LikesRepository {
  constructor(private readonly client: HasuraService) {}

  getcommentQuery(): string {
    const query = gql`
      query {
        Like {
          ...likess
        }
      }

      ${likeFragment}
    `;

    return query;
  }

  addCommentQuery(): string {
    const query = gql`
      mutation ($body: Like_insert_input!) {
        insert_Like_one(object: $body) {
          userId
          postId
          

          likes
        }
      }

      ${likeFragment}
    `;

    return query;
  }
  async createLikes(body: any): Promise<any> {
    const postsquery = this.addCommentQuery();

    type result = [
      {
        data: { likess: Like[] };
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

  async getLikes(): Promise<any> {
    const commentQuery = this.getcommentQuery();

    type result = [
      {
        data: { likess: Like[] };
      },
    ];

    const comments = await this.client.batchRequests<result>([
      {
        document: commentQuery,

        variables: {},
      },
    ]);

    return comments;
  }

  async getlikesRecords(likeId: number): Promise<any> {
    const query = gql`
      query ($likeId: Int!) {
        Like_by_pk(id: $likeId) {
          userId
          postId
          id
          likes
      post {
      title
      body
    }
    user {
      name
      username
      password
          
    }   
        }
      }
      ${likeFragment}
    `;

    type result = [
      {
        data: { likess: Like[] };
      },
    ];

    const likes = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { likeId },
      },
    ]);

    return likes;
  }

  async getlikesAll(userId: number): Promise<any> {
    const query = gql`
      query ($userId: Int) {
        comment(where: { _and: [{ userId: { _eq: $userId } }] }) {
          id
          userId
          name
          postId
          likes
          posts {
            title
            body
            comment {
              name
              email
              body
            }
          }
        }
      }
      ${likeFragment}
    `;

    type result = [
      {
        data: { likess: Like[] };
      },
    ];

    const likes = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { userId },
      },
    ]);

    return likes;
  }
}
