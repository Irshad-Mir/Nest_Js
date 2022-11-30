import { Book } from "src/book/book.schema";
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"


@Entity({ name: 'user' })

export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

   
}