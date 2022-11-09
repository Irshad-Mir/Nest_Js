import { Injectable } from '@nestjs/common';

import { gql } from 'graphql-request';

import { HasuraService } from '../service/hasura.service';
import { Order } from './orders.dto';


// ##### Graphql Query And Mutations ##### //

const cartFragment = gql`
  fragment orders on Order {
    id
    userId
    cartId
    quantity
    price
    total_price
    status
    created_at
  }
`;

@Injectable()
export default class OrdersRepository {
  constructor(private readonly client: HasuraService) {}

  getcommentQuery(): string {
    const query = gql`
      query {
        Order {
          ...orders
        }
      }

      ${cartFragment}
    `;

    return query;
  }

  addCommentQuery(): string {
    const query = gql`
      mutation ($input: Order_insert_input!) {
        insert_Order_one(object: $input) {
          userId
          cartId
          quantity
          price
          total_price
          status
          created_at
        }
      }

      ${cartFragment}
    `;

    return query;
  }
  async createOrders(body: any, total_price: number): Promise<any> {
    const cartsquery = this.addCommentQuery();

    type result = [
      {
        data: { orders: Order[] };
      },
    ];

    const input = { total_price, ...body };

    const newcarts = await this.client.batchRequests<result>([
      {
        document: cartsquery,

        variables: { input },
      },
    ]);

    return newcarts;
  }

  async getOrders(): Promise<any> {
    const commentQuery = this.getcommentQuery();

    type result = [
      {
        data: { orders: Order[] };
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
