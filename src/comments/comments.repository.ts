import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';


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
    



  

  addPostQuery(): string {
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
    const postsquery = this.addPostQuery();

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
    


    
}
