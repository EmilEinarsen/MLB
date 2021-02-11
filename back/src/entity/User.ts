import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, getRepository, Unique, OneToMany } from "typeorm"
import { Length, MaxLength, MinLength, validate, validateOrReject } from "class-validator"
import * as bcrypt from 'bcryptjs'
import { extractMessage, resObj } from "../utils"
import Doc from "./Doc"
import Collection from "./Collection"

@Entity()
@Unique(["email"])
export class User {

	@PrimaryGeneratedColumn('uuid') 
	id: string

	@Column()
	email: string

	@Column() 
	@MinLength(4, { message: 'Minimal length is $constraint1 characters' }) 
	@MaxLength(20, { message: 'Maximal length is $constraint1 characters' })
	username: string
	
	@Column() @Length(4, 100)
	password: string

	@OneToMany(() => Doc, doc => doc.user)
	docs: Doc[]

	@OneToMany(() => Collection, collection => collection.user)
	collections: Collection[]

	@Column() @CreateDateColumn()
	createdAt: Date

	@Column() @UpdateDateColumn()
	updatedAt: Date



	static async getAll() {
		return await getRepository(this).find({
			select: ["id", "username", "email"],
			relations: ["docs", "collections"]
		})
	}

	static async getById(id) {
		return await getRepository(this).findOneOrFail(id, {
			select: ["id", "username", "email"],
			relations: ["docs", "collections"]
		})
	}

	static async create({ email, username, password }) {
		const 
			userRepository = getRepository(this),
			user = userRepository.create({ email, username, password })

		try {
			await validateOrReject(user)
		} catch (errors) {
			return { status: 400, message: extractMessage(errors) }
		}

		user.hashPassword()
		try {
			await userRepository.save(user)
		} catch (error) {
			return { status: 409, message: { email: 'Email is unavailable' } }
		}
	}

	static async update(id, { username }) {
		let user: User
		const userRepository = getRepository(this)
		
		try {
			user = await userRepository.findOneOrFail(id)
		} catch (error) {
			return resObj({ status: 404, message: 'User not found' })
		}
		
		username && ( user.username = username )
		
		try {
			await validateOrReject(user)
		} catch (errors) {
			return { status: 400, message: extractMessage(errors) }
		}
		
		try {
			await userRepository.save(user)
		} catch (e) {
			return resObj({ status: 409, message: 'Email is unavailable' })
		}
	}

	static async changePassword(id, { oldPassword, newPassword }) {
		if(!(oldPassword && newPassword)) return resObj({ status: 400 })

		const userRepository = getRepository(this)
		let user: User
		
		try {
			user = await userRepository.findOneOrFail(id)
		} catch (error) {
			return resObj({ status: 401 })
		}

		if(!user.isUnencryptedPasswordValid(oldPassword)) return resObj({ status: 401 })

		user.password = newPassword

		try {
			await validateOrReject(user)
		} catch (errors) {
			return { status: 400, message: extractMessage(errors) }
		}
		
		user.hashPassword()
		try {
			await userRepository.save(user)
		} catch (error) {
			return { status: 404, message: 'Request failed' }
		}
	}

	static async delete(id) {
		const userRepository = getRepository(this)

		try {
			await User.getById(id)
		} catch (error) {
			return resObj({ status: 404, message: 'User not found' })
		}

		try {
			await userRepository.delete(id)
		} catch (error) {
			return { status: 404, message: 'Request failed' }
		}
	}

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	isUnencryptedPasswordValid(unencryptedPassword: string) {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}
}
