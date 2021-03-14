import { Request, Response } from 'express';
import { getRepository } from 'typeorm'

import CPF from '../models/CPF';
import cpfView from '../views/cpf_viewss';

export default {
    async index(request: Request, response: Response) {
        const CPFRepository = getRepository(CPF);

        const cpfs = await CPFRepository.find({
            relations: ['abordagens']
        });

        return response.json(cpfView.renderMany(cpfs));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const CPFRepository = getRepository(CPF);

        const cpf = await CPFRepository.findOneOrFail(id, {
            relations: ['abordagens']
        })

        return response.json(cpfView.render(cpf));
    },

    async create(request: Request, response: Response) {
        const CPFRepository = getRepository(CPF);
        
        const {
            cpf_number,
            name,
            address,
            contact
        } = request.body
        
        let newCPF = await CPFRepository.findOne({
            where: { cpf_number } })

        if (!newCPF) {
            newCPF = CPFRepository.create({
                cpf_number,
                name,
                address,
                contact
            });

            await CPFRepository.save(newCPF);
            return response.status(201).json(newCPF);
        }

        return response.status(400).send('CPF Already Registered');
        
    }
}