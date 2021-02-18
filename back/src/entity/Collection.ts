import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, getRepository } from "typeorm"
import Doc from "./Doc"
import User from "./User"

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



	static async getById(id) {
		try {
			return await getRepository(this).findOneOrFail(id)
		} catch (error) {
			return { status: 404, message: 'Collection not found' }
		}
	}

	static async create(userId,  { title, docs }) {
		const collectionRepository = getRepository(this)

		const user: any = await User.getByIdDangerously(userId)
		if(user.status) return user

		let collection = collectionRepository.create({ title, docs, user })

		try {
			return await collectionRepository.save(collection)
		} catch (error) {
			return { status: 404, message: 'Request failed' }
		}
	}

	static async update({ id, ...payload }) {
		const collectionRepository = getRepository(this)

		const collection: any = await this.getById(id)
		if(collection.status) return collection

		Object.keys(payload).forEach(key => (collection[key] = payload[key]))

		try {
			await collectionRepository.save(collection)
		} catch (e) {
			return { status: 409, message: 'Failed to update' }
		}
	}

	static async delete(id) {
		const collectionRepository = getRepository(this)

		const collection: any = await this.getById(id)
		if(collection.status) return collection

		try {
			await collectionRepository.delete(collection)
		} catch (error) {
			return { status: 404, message: 'Failed to delete' }
		}
	}

	static async getAll() {
		return await getRepository(this).find()
	}

	static async createMult(userId, payload) {
		const collectionRepository = getRepository(this)

		const user: any = await User.getByIdWithoutRelations(userId)
		if(user.status) return user

		try {
			return await collectionRepository.save(
				payload.map(collection => collectionRepository.create({ ...collection, user }))
			)
		} catch (error) {
			return { status: 404, message: 'Request failed' }
		}
	}
}