
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm"


@Entity({ name: 'book' })

export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    title: string;

    @Column()
    price: number;
}