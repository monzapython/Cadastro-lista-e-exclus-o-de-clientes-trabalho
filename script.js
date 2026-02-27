const clientes = document.getElementById("listaClientes");

// Carregar clientes ao iniciar a página
fetch("https://crudcrud.com/api/e5fa731493e7485cb350dbf1caafc40c/clientes")
.then(resposta => resposta.json())
.then((listaDeClientes) => {
    listaDeClientes.forEach(cliente => {
        adicionarClienteNaLista(cliente);
    });
})
.catch(erro => console.error("Erro ao carregar clientes:", erro));

// Função para adicionar cliente na lista
function adicionarClienteNaLista(cliente) {
    const item = document.createElement("li");
    item.id = `cliente-${cliente._id}`;
    item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="excluirCliente('${cliente._id}')">X</button>`;
    clientes.appendChild(item);
}

// Cadastrar novo cliente
document.getElementById("cadastrarBtn").addEventListener("click", () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    
    if (!nome || !email) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    fetch("https://crudcrud.com/api/e5fa731493e7485cb350dbf1caafc40c/clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
    .then(resposta => resposta.json())
    .then((cliente) => {
        adicionarClienteNaLista(cliente);
        // Limpar campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    })
    .catch(erro => {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao cadastrar cliente. Tente novamente.");
    });
});

// Função para excluir cliente
function excluirCliente(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        fetch(`https://crudcrud.com/api/e5fa731493e7485cb350dbf1caafc40c/clientes/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            document.getElementById(`cliente-${id}`).remove();
        })
        .catch(erro => {
            console.error("Erro ao excluir:", erro);
            alert("Erro ao excluir cliente. Tente novamente.");
        });
    }
}