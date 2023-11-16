const espaco = document.getElementById('resposta')

async function Requisicao(x) {
    const url = `https://viacep.com.br/ws/${x}/json/`
    
    await fetch(url)
    .then(async response => {

        if(!response.ok) {
            throw new Error(response.status)
        }

       return await response.json()
    })
    .then(data => {
        espaco.innerHTML = '' // VAZIO PARA SUMIR O ENDEREÇO ANTERIOR
        
        let resultado = document.createElement('p')

        if (data.erro) {
            resultado.innerHTML = `
            Esse CEP não existe. Por favor verifique ele!
            `
        } else {
            resultado.innerHTML = `
            ${data.logradouro} - ${data.localidade}
            <br>
            ${data.complemento}
            ` 
        }
        
        espaco.appendChild(resultado)
    })
    .catch(e => {
        console.log(e)
        console.log('x-x error x-x')
    })
}

document.getElementById('enviar').addEventListener('click', () => {
    const cep = document.getElementById('valor').value;

    if (cep.length !== 8) {
        document.getElementById('alerta').textContent = 'O CEP deve ter exatamente 8 números'
        document.getElementById('alerta').classList.remove('oculto')
        
        setTimeout(() => {
            document.getElementById('alerta').classList.add('oculto')
        }, 5000);
    }
    
    Requisicao(cep);
})