import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { User } from './user.dto';


// ##### Graphql query and Mutation ##### //

export interface OnboardingsByPk {
  userId: string;
  id: string;
  name: string;
}

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
  constructor(private readonly client: HasuraService) { }

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
          email
          role
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
          password
          username
          posts {
            id
            title
            body
            userId
           
            }
          }
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

  async getusersRecord(userId: number): Promise<any> {
    const query = gql`
      query ($userId: Int!) {
        user_by_pk(id: $userId) {
          id
          name
          password
          username
          posts {
            id
            userId
            title
            body
            comments {
              id
              userId
              postId
              name
              email
              body
            }
            Likes {
              id
              postId
              userId
              likes
            }
          }
          products {
            id
            userId
            name
            price
            category
            carts {
              id
              userId
              productId
              quantity
              total_price
              price
            }
          }
          Orders {
            id
            userId
            cartId
            quantity
            price
            total_price
            status
            created_at
          }
        }
      }

      ${userFragment}
    `;

    type result = [
      {
        data: { user: User[] };
      },
    ];

    const users = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { userId },
      },
    ]);

    return users;
  }

  async deleteuser(id: any): Promise<any> {
    const query = gql`
      mutation ($id: Int!) {
        delete_user_by_pk(id: $id) {
          name
          username
          password
        }
      }
      ${userFragment}
    `;

    type result = [
      {
        data: { users: User[] };
      },
    ];

    const users = await this.client.batchRequests<result>([
      {
        document: query,
        variables: { id },
      },
    ]);

    return users;
  }

  async usersUpdate(body: any, id: any): Promise<any> {
    const userquery = gql`
      mutation ($id: Int!, $body: user_set_input!) {
        update_user_by_pk(pk_columns: { id: $id }, _set: $body) {
          id
          name
          username
          password
        }
      }
    `;

    type result = [
      {
        data: { users: User[] };
      },
    ];
    const newusers = await this.client.batchRequests<result>([
      {
        document: userquery,
        variables: { body, id },
      },
    ]);

    return newusers;
  }

  async getUserr(email: string, role: string) {
    const query = gql`
        query ($email: String, $role: String) {
          user(
            where: {
              _and: [{ email: { _eq: $email } }, { role: { _eq: $role } }]
            }
          ) {
            name
            email
            password
            role
            username
            id
          }
        }
        ${userFragment}
      `;
    console.log('query', query)
    const users = await this.getUserss(query, { email, role });
    console.log('users', users);

    return users;
  }
  private async getUserss(query: string, variables = {}) {
    const { user } = await this.client.request<{ user: User[] }>(
      query,
      variables,
    );
    return user;
  }

  async updateUserById(id: string, refresh_token: string) {
    const updates = {
      refresh_token: refresh_token
    }
    const mutation = gql`
        mutation updateUserById($id: Int!, $updates: user_set_input) {
          update_user_by_pk(pk_columns: { id: $id }, _set: $updates) {
            id
            refresh_token
          }
        }
        ${userFragment}
      `;
    return this.client.request<{ update_user_by_pk: User[] }>(mutation, {
      id,
      updates,
    });
  }
  async getOnboardingByUserId(userId: string) {
    const query = gql`
        query ($userId: Int!) {
          onboardings_by_pk(userId: $userId) {
            screen
            is_completed
          }
        }
      `;
    const { onboardings_by_pk } = await this.client.request<{
      onboardings_by_pk: OnboardingsByPk;
    }>(query, { userId });
    return onboardings_by_pk;
  }
}