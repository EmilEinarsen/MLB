import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, getRepository } from "typeorm"
import { clean, resObj } from "../utils"
import File from "./File"
import User from "./User"

export const KEYS = {
    title: 'title',
    id: 'id',
    subtitle: 'subtitle',
    text: 'text',
    img: 'img',
    music: 'music',
}

@Entity()
export default class Doc {
	@PrimaryGeneratedColumn('uuid') 
	id: string

	@Column({ nullable: false }) 
	title: string

	@Column({ nullable: true }) 
	subtitle: string

	@Column({ nullable: true, type: 'text' }) 
	text: string

	@OneToOne(() => File, { onDelete: 'SET NULL' }) @JoinColumn() 
	img: File

	@OneToOne(() => File, { onDelete: 'SET NULL' }) @JoinColumn()
	music: File

	@ManyToOne(() => User, user => user.docs)
	user: User



	static async getById(id) {
		try {
			return await getRepository(this).findOneOrFail(id, { relations: ["img", "music"] })
		} catch (error) {
			return { status: 404, message: 'Doc not found' }
		}
	}

	static async create(userId, payload) {
		const docRepository = getRepository(this)
		
		const user: any = await User.getByIdDangerously(userId)
		if(user.status) return user

		let doc = docRepository.create({ ...clean(payload, KEYS), user })

		try {
			return await docRepository.save(doc)
		} catch (error) {
			return { status: 404, message: 'Request failed' }
		}
	}

    static async update(payload) {
		const docRepository = getRepository(this)
		
		const doc: any = await this.getById(payload.id)
		if(doc.status) return doc
		
		payload.img && doc.img && await File.delete({ file: doc.img })
		payload.music && doc.music && await File.delete({ file: doc.music })
		
		try {
			await docRepository.update(doc, payload)
		} catch (e) {
			return resObj({ status: 409, message: 'Failed to update' })
		}
	}

	static async delete(id) {
		const docRepository = getRepository(this)

		const doc: any = await this.getById(id)
		if(doc.status) return doc

		doc.img && await File.delete({ file: doc.img })
		doc.music && await File.delete({ file: doc.music })
		
		try {
			await docRepository.delete(doc)
		} catch (error) {
			return { status: 404, message: 'Failed to delete' }
		}
	}

	static async getAll() {
		return await getRepository(this).find({ relations: ["img", "music"] })
	}

	static async createMult(userId, payload) {
		const docRepository = getRepository(this)

		const user: any = await User.getByIdWithoutRelations(userId)
		if(user.status) return user

		try {
			return await docRepository.save(
				payload.map(doc => docRepository.create({ ...clean(doc, KEYS), user }))
			)
		} catch (error) {
			return resObj({ status: 404, message: 'Request failed' })
		}
	}

	static async deleteMult(ids) {
		const errors = (await Promise.all(ids.map(id => this.delete(id)))).filter(error=>error)
		
		console.log(errors.length, errors)
	}
}