import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import Image from "./Image"

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
    @PrimaryGeneratedColumn('uuid') id: string
    @Column({ nullable: false }) title: string
    @Column({ nullable: true }) subtitle: string
    @Column({ nullable: true, type: 'text' }) text: string
    @OneToOne(() => Image, { onDelete: 'SET NULL' }) @JoinColumn() img: Image
    @Column({ nullable: true }) music: string
}