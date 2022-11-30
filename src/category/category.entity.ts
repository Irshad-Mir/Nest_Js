import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql";

import { Employee } from "src/employee/employee.entity";

@ObjectType()
@Entity()

export class Category {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;


    @Field()
    @Column()
    name: string;


    @ManyToOne(() => Employee, (employee) => employee.categories)
    @Field(() => Employee)
    employee: Employee;

    @Field({ nullable: true })
    @Column({ nullable: true })
    employeeId: number;


}