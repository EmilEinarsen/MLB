import { validateOrReject } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, getRepository } from "typeorm"
import fs from 'fs'
import path from 'path'

@Entity()
export default class File {
    @PrimaryGeneratedColumn('uuid') 
	uid: string
	
    @Column({ nullable: false }) 
	name: string

    @Column({ nullable: false }) 
	url: string


	static async getById(uid) {
		try {
			return await getRepository(this).findOneOrFail(uid)
		} catch (error) {
			return { status: 404, message: 'Image not found' }
		}
	}

	static async create({ name, url }) {
		const 
			fileRepository = getRepository(this),
			file = fileRepository.create({ name, url })

		try {
			return await fileRepository.save(file)
		} catch (error) {
			return { status: 500 }
		}
	}

	static async delete(payload) {
		const 
			fileRepository = getRepository(this),
			file = payload.file ?? await this.getById(payload.uid)
		if(file.status) return file

		try {
			await fileRepository.delete(file.uid)
			fs.unlinkSync(path.resolve(file.url))
		} catch (error) {
			return { status: 500 }
		}
	}
}

