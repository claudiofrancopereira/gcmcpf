import { Request, Response } from 'express';
import { getRepository } from 'typeorm'

import CPF from '../models/CPF';
import Abordagem from '../models/Abordagem';

export default {
    async create(request: Request, response: Response) {
        const CPFRepository = getRepository(CPF);
        const AbordagemRepository = getRepository(Abordagem);

        const person_id = request.headers.authorization
        
        let cpf_id = await CPFRepository.findOne(person_id)
        
        if (!cpf_id) {
            return response.status(400).send('Error identifying ID')
        }

        const {
            address,
            date,
            time,
            gcm,
            obs,
        } = request.body
        

        const abordagem = AbordagemRepository.create({
            address,
            date,
            time,
            gcm,
            obs,
            cpf_id
        });

        await AbordagemRepository.save(abordagem);

        return response.status(201).json(abordagem);
    }
}