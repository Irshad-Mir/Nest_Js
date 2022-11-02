import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { User } from './user.dto';


const userFragment = gql`
  fragment users on user {
    id

    name

    username

    password
  }
`;

@Injectable()
export default class UserRepository {
  getUser(id: number) {
      throw new Error('Method not implemented.');
  }
  findById(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly client: HasuraService) {}

  getUserQuery(): string {
    const query = gql`
      query {
        user {
          ...users
        }
      }

      ${userFragment}
    `;

    return query;
  }

  addUserQuery(): string {
    const query = gql`
      mutation ($body: user_insert_input!) {
        insert_user_one(object: $body) {
          name

          password

          username
        }
      }

      ${userFragment}
    `;

    return query;
  }

  getuserQueryById(): string {
    const query = gql`
      query ($id: Int!) {
        user(id: $id) {
          id
          name
          username
          password
        }
      }

      ${userFragment}
    `;

    return query;
  }

  async createUsers(body: any): Promise<any> {
    const usersquery = this.addUserQuery();

    type result = [
      {
        data: { users: User[] };
      },
    ];

    const newusers = await this.client.batchRequests<result>([
      {
        document: usersquery,

        variables: { body },
      },
    ]);

    return newusers;
  }

  async getusers(): Promise<any> {
    const userQuery = this.getUserQuery();

    type result = [
      {
        data: { users: User[] };
      },
    ];

    const users = await this.client.batchRequests<result>([
      {
        document: userQuery,

        variables: {},
      },
    ]);

    return users;
  }

  async getuser(): Promise<any> {
    const userQuery = this.getuserQueryById();

    type result = [
      {
        data: { users: User };
      },
    ];

    const users = await this.client.batchRequests<result>([
      {
        document: userQuery,

        variables: {},
      },
    ]);

    return users;
  }
}
