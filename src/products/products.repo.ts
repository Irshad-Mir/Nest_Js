import { Injectable } from "@nestjs/common";
import { gql } from "graphql-request";
import { HasuraService } from "src/service/hasura.service";
import { Product } from "./products.dto";

const productFragment = gql`
  fragment products on product {
    
    userId
    id

    name

    price
    category

    
  }
`;

@Injectable()
export default class ProductsRepository {
  constructor(private readonly client: HasuraService) {}

  getPostQuery(): string {
    const query = gql`
      query {
        product {
          ...products
        }
      }

      ${productFragment}
    `;

    return query;
  }

  addPostQuery(): string {
    const query = gql`
      mutation ($body: product_insert_input!) {
        insert_product_one(object: $body) {
          userId

          name

          price
          category
        }
      }

      ${productFragment}
    `;

    return query;
  }
  async createProduct(body: any): Promise<any> {
    const postsquery = this.addPostQuery();

    type result = [
      {
        data: { products: Product[] };
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

  async getproducts(): Promise<any> {
    const postQuery = this.getPostQuery();

    type result = [
      {
        data: { products: Product[] };
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