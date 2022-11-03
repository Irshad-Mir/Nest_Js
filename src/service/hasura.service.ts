import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BatchRequestDocument, GraphQLClient } from 'graphql-request';


// ........ # This Service Files Is Integration between Nestjs and Hasura Graphql ......//

// -------- # The Connection Between NestJs And Hasura Graphql By HASURA_URL 
//            And HASURA_ADMIN_SECRET which is present in .env file
//            



@Injectable()
export class HasuraService {
  private client: GraphQLClient;
  constructor(private readonly configService: ConfigService) {
    this.initialize();
  }

  private initialize() {
    const url = this.configService.get<string>('HASURA_URL') as string;
    this.client = new GraphQLClient(url, { keepalive: true });
  }

  async request<T>(query: string, variables = {}, headers = {}) {
    if (!Object.keys(headers).length) {
      const token = this.configService.get<string>(
        'HASURA_ADMIN_SECRET',
      ) as string;
      this.client.setHeader('x-hasura-admin-secret', `${token}`);
    }
    const data = await this.client.request<T>(query, variables, headers);
    return data;
  }

  async batchRequests<T>(queries: BatchRequestDocument[], headers = {}) {
    if (!Object.keys(headers).length) {
      const token = this.configService.get<string>(
        'HASURA_ADMIN_SECRET',
      ) as string;
      this.client.setHeader('x-hasura-admin-secret', `${token}`);
    }
    const data = await this.client.batchRequests<T>(queries, headers);
    return data;
  }
}
