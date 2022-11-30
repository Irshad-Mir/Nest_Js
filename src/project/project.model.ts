import { Field, InputType, Int, PartialType, } from "@nestjs/graphql";

@InputType()
export class CreateProjectDto {
  

  @Field()
  name: string;

  @Field((type)=> Int)
  code: number;
}


@InputType()
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  
@Field()
id: number;

@Field()
 name: string;

  @Field((type)=> Int)
  code: number;
}


