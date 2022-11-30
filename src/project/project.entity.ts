import { Column, PrimaryGeneratedColumn, Entity , ManyToOne, OneToMany} from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Employee } from "src/employee/employee.entity";


@ObjectType()
@Entity()

export class Project {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Field()
    @Column()
    name: string;


    

    @Field(()=>Int)
    @Column()
    code: number;

  

  

    @OneToMany(()=> Employee, (employee)=> employee.project)
    @Field(() => Employee, {nullable:true})
    categories:Employee[];
    employees: any;
}