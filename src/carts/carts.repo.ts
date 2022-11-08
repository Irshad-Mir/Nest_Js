import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { Cart } from './carts.dto';


// ##### Graphql Query And Mutations ##### //

const cartFragment = gql`
  fragment carts on cart {
    id
    userId
    productId
    quantity
    price
    total_price
  }
`;

@Injectable()
export default class CartsRepository {
  constructor(private readonly client: HasuraService) {}

  getcommentQuery(): string {
    const query = gql`
      query {
        cart {
          ...carts
        }
      }

      ${cartFragment}
    `;

    return query;
  }

  addCommentQuery(): string {
    const query = gql`
      mutation ($input: cart_insert_input!) {
        insert_cart_one(object: $input) {
          userId
          productId
          quantity
          price
          total_price
        }
      }

      ${cartFragment}
    `;

    return query;
  }
  async createCarts(body: any, total_price: number): Promise<any> {
    const cartsquery = this.addCommentQuery();

    type result = [
      {
        data: { carts: Cart[] };
      },
    ];

    const input = { total_price,   ...body };

    const newcarts = await this.client.batchRequests<result>([
      {
        document: cartsquery,

        variables: { input },
      },
    ]);

    return newcarts;
  }

  async getCarts(): Promise<any> {
    const commentQuery = this.getcommentQuery();

    type result = [
      {
        data: { carts: Cart[] };
      },
    ];

    const carts = await this.client.batchRequests<result>([
      {
        document: commentQuery,

        variables: {},
      },
    ]);

    return carts;
  }
}
