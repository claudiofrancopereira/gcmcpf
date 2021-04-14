import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 } from 'uuid'

import CPF from './CPF';

@Entity('abordagens')
export default class Abordagem {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    location: string;

    @Column()
    gcm: string;

    @Column()
    obs: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => CPF, cpf => cpf.abordagens)
    @JoinColumn({ name: 'cpf_id' })
    cpf_id: CPF

    constructor() {
        if (!this.id) {
            this.id = v4();
        }
    }
}

export { Abordagem };