import Abordagem from '../models/Abordagem'

export default {
    render(abordagem: Abordagem) {
        return {
            date: abordagem.date,
            time: abordagem.time,
            address: abordagem.address,
            gcm: abordagem.gcm,
            obs: abordagem.obs
        }
    },

    renderMany(abordagens: Abordagem[]) {
        return abordagens.map(abordagem => this.render(abordagem));
    }
}