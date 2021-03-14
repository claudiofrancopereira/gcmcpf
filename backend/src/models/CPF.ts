import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import { v4 } from 'uuid'

import Abordagem from './Abordagem';

@Entity('cpf')
export default class CPF {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    cpf_number: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    contact: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Abordagem, abordagem => abordagem.cpf_id, {
        cascade: ['update', 'insert']
    })
    @JoinColumn({ name: 'cpf_id' })
    abordagens: Abordagem[];

    constructor() {
        if (!this.id) {
            this.id = v4();
        }
    }
}

export { CPF };