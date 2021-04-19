import CPF from '../models/CPF';
import abordagemsView from './abordagems_view';


export default {
    render(cpf: CPF) {
        return {
            id: cpf.id,
            name: cpf.name,
            cpf_number: cpf.cpf_number,
            address: cpf.address,
            city: cpf.city,
            contact: cpf.contact,
            abordagens: abordagemsView.renderMany(cpf.abordagens),
        }
    },

    renderMany(cpfs: CPF[]) {
        return cpfs.map(cpf => this.render(cpf));
    }
}