import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';


// ##### Graphql Query And Mutations ##### //

const commentFragment = gql`
  fragment comments on comment {
    userId
    postId
    id

    name
    email

    body
  }
`;

@Injectable()
export default class CommentsRepository {
  getcommentsRecord(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly client: HasuraService) {}

  getcommentQuery(): string {
    const query = gql`
      query {
        comment {
          ...comments
        }
      }

      ${commentFragment}
    `;

    return query;
  }

  addCommentQuery(): string {
    const query = gql`
      mutation ($body: comment_insert_input!) {
        insert_comment_one(object: $body) {
          userId
          postId

          name
          email

          body
        }
      }

      ${commentFragment}
    `;

    return query;
  }
  async createComments(body: any): Promise<any> {
    const postsquery = this.addCommentQuery();

    type result = [
      {
        data: { comments: Comment[] };
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

  async getcomments(): Promise<any> {
    const commentQuery = this.getcommentQuery();

    type result = [
      {
        data: { comments: Comment[] };
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

  async getcommentsRecords(commentId: number): Promise<any> {
    const query = gql`
      query ($commentId: Int!) {
        comment_by_pk(id: $commentId) {
          userId
          postId
          id
          name
          email
          body
        }
      }
      ${commentFragment}
    `;

    type result = [
      {
        data: { comment: Comment[] };
      },
    ];

    const comments = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { commentId },
      },
    ]);

    return comments;
  }

  async getcommentsAll(userId: number): Promise<any> {
    const query = gql`
      query ($userId: Int) {
        comment(where: { _and: [{ userId: { _eq: $userId } }] }) {
          id
          userId
          name
          email
          body
        }
      }
      ${commentFragment}
    `;

    type result = [
      {
        data: { comments: Comment[] };
      },
    ];

    const comments = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { userId },
      },
    ]);

    return comments;
  }
}
