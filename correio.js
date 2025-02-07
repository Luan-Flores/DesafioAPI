const token = "eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Mzg4Njk3NjAsImlzcyI6InRva2VuLXNlcnZpY2UiLCJleHAiOjE3Mzg5NTYxNjAsImp0aSI6IjM0ZjYxNzgwLTFlZWEtNDMzNC1iOGI1LTQ0ZTE3NGRjMDMxYiIsImFtYmllbnRlIjoiUFJPRFVDQU8iLCJwZmwiOiJQRiIsImlwIjoiMTcwLjE1MC4yNDAuMjIxLCAxOTIuMTY4LjEuMTMyIiwiY3BmIjoiMDU0ODA2MjIxODgiLCJpZCI6IjA1NDgwNjIyMTg4In0.qJqT13bojC_KG8akdu9nilW35EIS0sFLLywsaPmNGpWMryl6NnEaUUkKXT1F4aZO61OoM276_4czALvUXEgdxo3JgZQXzs-RHKMs1KAFKtVOLITqTXyHgI0S2V56m5lm21dgDGlpGn4lhksBvb_8PKxm6vChQVyXiXg3w2fURS45OjRShoGgvoGhSMjxnay0S4tcBuvaZAjYu72ET5RqDXqnqSt1kOFeCjb5VrFBK4gSbDY691t3H3f48nMA79sYX0-3DTXUgtq8cHEiYImkf_BtYi-EpiNLpmMI8I1JtfZ4SqpAd5qoY45nEreXmvH2Z1LoWFyUFgBHATKPRF4cvQ"; // Substitua pelo seu token real
const log = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const localidade = document.getElementById('localidade');
const uf = document.getElementById('uf');
const pErro = document.getElementById('pErro');
const divErro = document.querySelector('.alert');
const imgErro = document.getElementById('imgErro');

function resetAlert(){
    pErro.innerText = "";
    imgErro.src = "";
}
function resetResult(){
    log.innerText = `Logradouro: `
    bairro.innerText = `Bairro: `
    localidade.innerText = "Localidade: "
    uf.innerText = `UF: `
}
document.getElementById("btnBuscar").addEventListener('click', async function() {
    const cep = document.getElementById("inputCep").value.trim(); // Pega o valor do input após o clique
    if (!cep) {
        console.error("Por favor, digite um CEP.");
        divErro.style.display = "flex";
        pErro.innerText = `Digite o CEP. `;
        imgErro.src = "./imgs/warning.png";
        resetResult();
        return;
    }
    
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            divErro.style.display = "flex";
            pErro.innerText = `Erro no servidor`;
            imgErro.src = "./imgs/warning.png";
            resetResult();
            throw new Error(`Erro: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.erro) {
            divErro.style.display = "flex";
            console.error("CEP não encontrado.");
            pErro.innerText = `CEP não encontrado. `;
            imgErro.src = "./imgs/warning.png";
            resetResult();
        } else {
            console.log(data);
            resetAlert();
            log.innerText = `Logradouro: ${data.logradouro}`
            bairro.innerText = `Bairro: ${data.bairro}`
            localidade.innerText = `Localidade: ${data.localidade}`
            uf.innerText = `UF: ${data.uf}`
        }
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        resetResult();
        divErro.style.display = "flex";
        pErro.innerText = "Erro ao buscar o CEP. ";
        imgErro.src = "./imgs/warning.png";
    }
});

//! ↓ copar as li (logradouro, bairro, localizade, uf) pra area de transferencia ↓

    document.querySelector(".imgCopy").addEventListener("click", function(){
        if(log.innerText === `Logradouro: ` & bairro.innerText === `Bairro: ` & localidade.innerText === `Localidade: ` & uf.innerText === `UF: `){
            alert("ALas");
            return;
        }else{   
            const eliIs = document.querySelectorAll(".ulRes .liRes");
            const elisTransformadosEmStrings = Array.from(eliIs).map(item => item.innerText);
            const copy = elisTransformadosEmStrings.join("\n");
            navigator.clipboard.writeText(copy);
        }
    })

