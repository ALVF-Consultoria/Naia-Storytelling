import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("text", { nullable: true })
    prompt!: string;

    @Column("text", { nullable: true })
    title!: string;

    @Column("text", { nullable: true })
    synopsis!: string;

    @Column("text", { nullable: true })
    visualStyle!: string;

    @Column("json", { nullable: true })
    chapters!: any;

    @Column("text")
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, user => user.stories, { onDelete: 'CASCADE' })
    user!: User;
}
