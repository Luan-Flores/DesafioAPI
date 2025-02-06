const token = "eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Mzg4Njk3NjAsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3Mzg5NTYxNjAsImp0aSI6IjM0ZjYxNzgwLTFlZWEtNDMzNC1iOGI1LTQ0ZTE3NGRjMDMxYiIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQRiIsImlwIjoiMTcwLjE1MC4yNDAuMjIxLCAxOTIuMTY4LjEuMTMyIiwiY3BmIjoiMDU0ODA2MjIxODgiLCJpZCI6IjA1NDgwNjIyMTg4In0.qJqT13bojC_KG8akdu9nilW35EIS0sFLLywsaPmNGpWMryl6NnEaUUkKXT1F4aZO61OoM276_4czALvUXEgdxo3JgZQXzs-RHKMs1KAFKtVOLITqTXyHgI0S2V56m5lm21dgDGlpGn4lhksBvb_8PKxm6vChQVyXiXg3w2fURS45OjRShoGgvoGhSMjxnay0S4tcBuvaZAjYu72ET5RqDXqnqSt1kOFeCjb5VrFBK4gSbDY691t3H3f48nMA79sYX0-3DTXUgtq8cHEiYImkf_BtYi-EpiNLpmMI8I1JtfZ4SqpAd5qoY45nEreXmvH2Z1LoWFyUFgBHATKPRF4cvQ"; // Substitua pelo seu token real
const log = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const localidade = document.getElementById('localidade');
const uf = document.getElementById('uf');

document.getElementById("btnBuscar").addEventListener('click', async function() {
    const cep = document.getElementById("inputCep").value.trim(); // Pega o valor do input após o clique
    if (!cep) {
        console.error("Por favor, digite um CEP.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();

        if (data.erro) {
            console.error("CEP não encontrado.");
        } else {
            console.log(data);
            log.innerText += ` ${data.logradouro}`
            bairro.innerText += ` ${data.bairro}`
            localidade.innerText += ` ${data.localidade}`
            uf.innerText += ` ${data.uf}`
        }
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
    }
});

