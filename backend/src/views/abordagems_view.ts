import Abordagem from '../models/Abordagem'

export default {
    render(abordagem: Abordagem) {
        return {
            date: abordagem.created_at.toLocaleDateString(),
            time: abordagem.created_at.toLocaleTimeString(),
            location: abordagem.location,
            gcm: abordagem.gcm,
            obs: abordagem.obs,
        }
    },

    renderMany(abordagens: Abordagem[]) {
        return abordagens.map(abordagem => this.render(abordagem));
    }
}