// ===== FUNÇÕES PURAS =====

// ✅ Valida cliente
export function validarCliente(nome, email) {
    return nome && email && nome.trim().length > 0 && email.includes('@');
}

// ✅ MAP - Extrair apenas os nomes dos clientes
export function extrairNomes(listaClientes) {
    return listaClientes.map(cliente => cliente.nome);
}

// ✅ MAP - Extrair apenas os emails
export function extrairEmails(listaClientes) {
    return listaClientes.map(cliente => cliente.email);
}

// ✅ REDUCE - Contar total de clientes
export function contarClientes(listaClientes) {
    return listaClientes.reduce((total) => total + 1, 0);
}

// ✅ REDUCE - Calcular total de caracteres em todos os nomes
export function calcularTotalCaracteres(listaClientes) {
    return listaClientes.reduce((total, cliente) => total + cliente.nome.length, 0);
}

// ✅ FIND - Encontrar cliente por ID
export function encontrarCliente(listaClientes, id) {
    return listaClientes.find(cliente => cliente._id === id);
}

// ✅ Formatar cliente para exibição
export function formatarCliente(cliente) {
    return {
        id: `cliente-${cliente._id}`,
        texto: `${cliente.nome} - ${cliente.email}`
    };
}

// ===== FUNÇÕES COM EFEITO =====

// Adicionar cliente na lista
export function adicionarClienteNaLista(cliente, elementoLista) {
    const clienteFormatado = formatarCliente(cliente);
    
    const item = document.createElement("li");
    item.id = clienteFormatado.id;
    item.innerHTML = `${clienteFormatado.texto} <button onclick="excluirCliente('${cliente._id}')">X</button>`;
    
    elementoLista.appendChild(item);
}

// Excluir cliente (função global para o onclick)
window.excluirCliente = function(id) {
    if (confirm("Tem certeza?")) {
        // URL com o ID para exclusão
        const API_URL = "https://crudcrud.com/api/cedafd85d8c84dbfa0e1568edaebb990/clientes";
        
        fetch(`${API_URL}/${id}`, { 
            method: "DELETE" 
        })
        .then(() => {
            document.getElementById(`cliente-${id}`).remove();
            console.log(`Cliente ${id} excluído com sucesso!`);
        })
        .catch(erro => {
            console.error("Erro ao excluir:", erro);
            alert("Erro ao excluir cliente.");
        });
    }
};