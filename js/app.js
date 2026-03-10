import { 
    adicionarClienteNaLista, 
    validarCliente, 
    extrairNomes, 
    contarClientes,
    encontrarCliente,
    calcularTotalCaracteres,
    extrairEmails
} from './util.js';

// URL da API (usada em todos os fetches)
const API_URL = "https://crudcrud.com/api/cedafd85d8c84dbfa0e1568edaebb990/clientes";

const listaElemento = document.getElementById("listaClientes");
let clientes = []; // Array para armazenar os clientes carregados

// ===== 1. MAP - CARREGAR CLIENTES =====
fetch(API_URL)
    .then(resposta => resposta.json())
    .then((dados) => {
        clientes = dados; // Guarda na variável global
        
        // Usando MAP para transformar e adicionar cada cliente na lista
        clientes.map(cliente => adicionarClienteNaLista(cliente, listaElemento));
        
        // ===== EXEMPLOS PRÁTICOS DOS MÉTODOS =====
        console.log("=== DEMONSTRAÇÃO DOS MÉTODOS ===");
        
        // 1. MAP - Extrair apenas os nomes
        const nomes = extrairNomes(clientes);
        console.log("📌 MAP - Nomes dos clientes:", nomes);
        
        // 2. MAP - Extrair apenas os emails
        const emails = extrairEmails(clientes);
        console.log("📌 MAP - Emails dos clientes:", emails);
        
        // 3. REDUCE - Contar total de clientes
        const total = contarClientes(clientes);
        console.log("📌 REDUCE - Total de clientes:", total);
        
        // 4. REDUCE - Calcular total de caracteres nos nomes
        const totalCaracteres = calcularTotalCaracteres(clientes);
        console.log("📌 REDUCE - Total de caracteres nos nomes:", totalCaracteres);
        
        // 5. FIND - Encontrar um cliente específico (se houver)
        if (clientes.length > 0) {
            const primeiroId = clientes[0]._id;
            const clienteEncontrado = encontrarCliente(clientes, primeiroId);
            console.log("📌 FIND - Cliente encontrado:", clienteEncontrado?.nome);
        }
    })
    .catch(erro => console.error("Erro ao carregar:", erro));

// ===== 2. POST - CADASTRAR CLIENTE =====
document.getElementById("cadastrarBtn").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    
    // Usando função pura para validar
    if (!validarCliente(nome, email)) {
        alert("Preencha nome e email corretamente!");
        return;
    }
    
    fetch(API_URL, { // Usando a mesma URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email })
    })
    .then(resposta => resposta.json())
    .then((novoCliente) => {
        // Adiciona ao array e à lista
        clientes.push(novoCliente);
        adicionarClienteNaLista(novoCliente, listaElemento);
        
        // Limpar campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        
        // Demonstração do MAP após cadastro
        const nomesAtualizados = extrairNomes(clientes);
        console.log("📌 MAP - Clientes atualizados:", nomesAtualizados);
    })
    .catch(erro => {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao cadastrar. Tente novamente.");
    });
});