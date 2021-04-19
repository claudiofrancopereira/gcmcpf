import Abordagem from '../models/Abordagem'

export default {
    render(abordagem: Abordagem) {
        return {
            date: abordagem.created_at.toLocaleDateString('pt-BR'),
            time: abordagem.created_at.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo ', hour12: false }),
            location: abordagem.location,
            gcm: abordagem.gcm,
            obs: abordagem.obs,
        }
    },

    renderMany(abordagens: Abordagem[]) {
        return abordagens.map(abordagem => this.render(abordagem));
    }
}