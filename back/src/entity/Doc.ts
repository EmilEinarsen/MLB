import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, getRepository } from "typeorm"
import imgModel from "../models/imgModel"
import { clean, resObj } from "../utils"
import Image from "./Image"
import { User } from "./User"

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

	@OneToOne(() => Image, { onDelete: 'SET NULL' }) @JoinColumn() 
	img: Image

	@Column({ nullable: true }) 
	music: string

	@ManyToOne(() => User, user => user.docs)
	user: User



	static async getById(id) {
		return await getRepository(this).findOneOrFail(id, { relations: ["img"] })
	}

	static async create(userId, payload) {
		const 
			docRepository = getRepository(this),
			userRepository = getRepository(User)
		
		let user
		try {
			user = await userRepository.findOneOrFail(userId)
		} catch (errors) {
			return resObj({ status: 404, message: 'Request failed' })
		}

		let doc = docRepository.create({ ...clean(payload, KEYS), user })

		try {
			docRepository.save(doc)
		} catch (error) {
			return resObj({ status: 404, message: 'Request failed' })
		}
	}

    static async update(payload) {
		const docRepository = getRepository(this)
		
		let doc: Doc
		try {
			doc = await docRepository.findOneOrFail(payload.id)
		} catch (error) {
			return resObj({ status: 404, message: 'Request failed' })
		}
		
		payload.img && doc.img && await imgModel.delete({ img: doc.img })
		
		try {
			await docRepository.update(doc, payload)
		} catch (e) {
			return resObj({ status: 409, message: 'Failed to update' })
		}
	}

	static async delete(id) {
		const docRepository = getRepository(this)

		/* try {
			await Doc.getById(id)
		} catch (error) {
			return resObj({ status: 404, message: 'Doc not found' })
		} */

		try {
			await docRepository.delete(id)
		} catch (error) {
			return { status: 404, message: 'Failed to delete' }
		}
	}

	static async getAll() {
		return await getRepository(this).find({ relations: ["img"] })
	}

	static async createMult(userId, payload) {
		const 
			docRepository = getRepository(this),
			userRepository = getRepository(User)

		let user
		try {
			user = await userRepository.findOneOrFail(userId)
		} catch (errors) {
			return resObj({ status: 404, message: 'Request failed' })
		}

		try {
			docRepository.save(payload.map(doc => docRepository.create({ ...clean(doc, KEYS), user })))
		} catch (error) {
			return resObj({ status: 404, message: 'Request failed' })
		}
	}

	static async deleteMult(ids) {
		const 
			docRepository = getRepository(this)

		try {
			await docRepository.delete(ids)
		} catch (error) {
			return { status: 404, message: 'Failed to delete' }
		}
	}
}