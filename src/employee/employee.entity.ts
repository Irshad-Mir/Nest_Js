import { Column, PrimaryGeneratedColumn, Entity , ManyToOne, OneToMany} from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql";

import { Category } from "src/category/category.entity";
import { Project } from "src/project/project.entity";

@ObjectType()
@Entity()

export class Employee {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Field()
    @Column()
    firstname: string;


    @Field()
    @Column()
    lastname: string;

    @Field()
    @Column()
    designation: string;

    @Field({nullable:true})
    @Column({nullable:true})
    city: string;

    @ManyToOne(()=>Project, (project)=>project.employees)
    @Field(() => Project, {nullable:true})
    project:Project;

    @Field({nullable:true})
    @Column({nullable:true})
    projectId: number;

    @OneToMany(()=> Category, (category)=> category.employee)
    @Field(() => [Category], {nullable:true})
    categories:Category;
}