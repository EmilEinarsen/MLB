import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import Doc from "./Doc"
import { User } from "./User"

@Entity()
export default class Collection {
	@PrimaryGeneratedColumn('uuid') 
	id: string

	@Column({ nullable: false }) 
	title: string
	
    @ManyToMany(() => Doc, {
        cascade: true
	}) @JoinTable() 
	docs: Doc[]

	@ManyToOne(() => User, user => user.docs)
	user: User
}