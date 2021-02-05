import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export default class Image {
    @PrimaryGeneratedColumn('uuid') uid: string
    @Column({ nullable: false }) name: string
    @Column({ nullable: false }) url: string
}