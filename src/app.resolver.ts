import { Query, Resolver,  } from "@nestjs/graphql";


@Resolver(of=> String)
export class AppResolver{

    @Query(returns=>String)


    index():string{
        return "nestJs Graphql Server"
    }
}