import React, { FormEvent, useState } from 'react';

import './styles.css';

import logo from '../../assets/logo.png'

import api from '../../services/api';

interface Abordagem {
    id: string,
    date: string,
    time: string,
    location: string,
    gcm: string,
    obs: string
}

interface PersonalData {
    id: string,
    name: string,
    address: string,
    city: string,
    contact: string,
    abordagens: Abordagem[]

}

function NewCPF() {
    const [procurarCPF, setProcurarCPF] = useState('');
    const [person, setPerson] = useState<PersonalData | null>(null);
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');

    const [location, setLocation] = useState('');
    const [gcm, setGCM] = useState('');
    const [obs, setObs] = useState('');

    async function handleSearchCPF(event: FormEvent) {
        event.preventDefault();

        const response = await api.get(`cpf/${procurarCPF}`);

        setPerson(response.data);
    }

    async function handleNewAbordagem(event: FormEvent) {
        event.preventDefault();

        const data = {
            location,
            gcm,
            obs,
        }

        if (person) {
            const response = await api.post('abordagem', data, {
                headers: {
                    Authorization: person.id
                }
            });

            const reload = await api.get(`cpf/${procurarCPF}`);
            setPerson(reload.data);

            setLocation('');
            setGCM('');
            setObs('');
        }

        
    }

    async function handleNewCpf(event: FormEvent) {
        event.preventDefault();

        const data = {
            cpf_number: procurarCPF,
            name,
            address,
            city,
            contact
        }

        const response = await api.post('cpf', data);
        
        setName('');
        setAddress('');
        setCity('');
        setContact('');
        
    }

    return( 
        
        <div id="main">
         
            <div id="logo">
                <img src={logo} alt="logo" />
            </div>
        
            <form id="searchCPF" onSubmit={handleSearchCPF}>
                <input 
                    name="cpf" 
                    type="number"
                    placeholder="CPF"  
                    value={procurarCPF}
                    onChange={ event => setProcurarCPF(event.target.value)}
                />
                <button type="submit">Procurar</button>
            
            </form>

            {person ? (
                <>
                    <div id="dados">        
                        <fieldset>
                            <h2>Dados Pessoais</h2>
                            <p>Nome: {person.name}</p>
                            <p>Endereço: {person.address}</p>
                            <p>Cidade/Estado: {person.city}</p>
                            <p>Contato: {person.contact}</p>
                        </fieldset>
                    </div>

                    <div id="abordagens">
                        <h2>Abordagens</h2>
                        <ul>
                            {person.abordagens.map( abordagem => (
                                <li key={abordagem.id}>
                                    <p>Data: <strong>{abordagem.date}</strong> as <strong>{abordagem.time}</strong></p>
                                    <p>Local: <strong>{abordagem.location}</strong></p>
                                    <p>GCM(s): <strong>{abordagem.gcm}</strong></p>
                                    <p>Observação(ões)</p>
                                    <p>{abordagem.obs}</p>
                            </li>
                            )).reverse()}

                        </ul>

                    </div>

                    <form id="nova-abordagem" onSubmit={handleNewAbordagem}>
                        <fieldset>
                            <h2>Nova abordagem</h2>
                            <label htmlFor="location">Local</label>
                            <input 
                                type="text"
                                name="location"
                                id="location"
                                value={location}
                                onChange={ event => setLocation(event.target.value)}
                            />
                            
                            <label htmlFor="gcm">GCM</label>
                            <input 
                                type="text"
                                name="gcm"
                                id="gcm"
                                value={gcm}
                                onChange={ event => setGCM(event.target.value)}

                            />

                            <label htmlFor="obs">Observações</label>
                            <textarea 
                                name="obs"
                                id="obs"
                                value={obs}
                                onChange={ event => setObs(event.target.value)}

                            />
                        </fieldset>
                        <button type="submit">Inserir Nova Abordagem</button>                 
                    </form>  
                </>

            ) : (
                <>
                    <form id="novo-cpf" onSubmit={handleNewCpf}>
                        <fieldset>
                            <h2>Dados Pessoais</h2>
                            <label htmlFor="name">Nome</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                            
                            <label htmlFor="address">Endereço</label>
                            <input 
                                type="text"
                                name="addresss"
                                id="address"
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                            />
            
                            <label htmlFor="city">Cidade/Estado</label>
                            <input 
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                            />
            
                            <label htmlFor="contact">Contato</label>
                            <input 
                                type="text"
                                name="contact"
                                id="contact"
                                value={contact}
                                onChange={event => setContact(event.target.value)}
                            />
            
                        </fieldset>
                        <button type="submit">Salvar</button>
                    </form>

                </>
                          
            )}
        </div>
    );   
}

export default NewCPF;