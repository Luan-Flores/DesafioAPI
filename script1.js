const form = document.getElementById('formCep');
const divResultado = document.getElementById("result");
let card;



form.addEventListener('submit', async function req(e) {
    e.preventDefault();
    
    try {
        const localidade = document.getElementById("localidade").value;
        const uf = document.getElementById("uf").value;
        const logradouro = document.getElementById("logradouro").value;
        
        if (localidade.trim() || uf.trim() || logradouro.trim() === ''){
            divResultado.innerHTML = `Nada encontrado, tente novamente.`
        }
        
        const url = `https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json`
        const req = await fetch(url)
        
        .then(res => {
            if (!res.ok){
                throw new Error(`Erro na Requisição ${res.status}`);
            }
            return res.json();
        })

        .then(dados => {
            if (dados.length > 0) {
                card = '';
                
                
                dados.forEach((index) => {
                    
                    const cep = index.cep; 
                    const logradouro = index.logradouro;  
                    const bairro = index.bairro;
                    const localidade = index.localidade; 
                    const uf = index.uf;
                    const estado = index.estado
                    card += `
                                    <ul class="ulRes">
                                    <li class="liRes" id="cepRes">CEP: ${cep}</li>
                                    <li class="liRes" id="logradouro">Logradouro: ${logradouro}</li>
                                    <li class="liRes" id="bairro">Bairro: ${bairro}</li>
                                    <li class="liRes" id="localidade">Localidade: ${localidade}</li>
                                    <li class="liRes" id="uf">UF: ${uf}</li>
                                    <li class="liRes" id="Estado">Estado: ${estado}</li>
                                    </ul>
                                    `
                })
                divResultado.innerHTML = card               
        }else {
            divResultado.innerHTML = `Nenhum resultado encontrado.`
            setTimeout(()=> {
                card = ``
                divResultado.innerHTML = card
            }, 4000);
        }})

        .catch(e => {
            console.error(`Erro Gerado: ${e}`)
        })
        
    } catch (erro) {
        console.error("Erro ao realizar o fetch:", erro.message);
    }

});