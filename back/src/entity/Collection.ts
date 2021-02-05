import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm"
import Doc from "./Doc"

@Entity()
export default class Collection {
    @PrimaryGeneratedColumn('uuid') id: string
    @Column({ nullable: false }) title: string
    @ManyToMany(() => Doc, {
        cascade: true
    }) @JoinTable() docs: Doc[]
}