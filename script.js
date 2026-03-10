const clientes = document.getElementById("listaClientes");

// Carregar clientes ao iniciar a página
fetch("https://crudcrud.com/api/e5fa731493e7485cb350dbf1caafc40c/clientes")
.then(resposta => resposta.json())//} Serve para converter a resposta da API em um formato que o JavaScript possa entender, ou seja, ele pega a resposta bruta da API e transforma em um objeto JavaScript que pode ser manipulado no código.
.then((listaDeClientes) => {               //}
    listaDeClientes.forEach(cliente => {   //}  Recebe dados da API, converte para JSON percorre cada cliente recebido e adiciona cada um deles na lista com a função feita abaixo.
        adicionarClienteNaLista(cliente);  //}
    });
})
.catch(erro => console.error("Erro ao carregar clientes:", erro)); //} Catch serve para capturar erros de uma promise.

// Função para adicionar cliente na lista
function adicionarClienteNaLista(cliente) {
    const item = document.createElement("li"); //} Cria uma variavel para criar um elemento (li) pra cada cliente que for adicionado, ou seja, cada cliente vai ser um item da lista.
    item.id = `cliente-${cliente._id}`; //} Atribui um ID único para cada cliente usando o ID gerado pela API, isso facilita a exclusão do cliente específico da lista, como se fosse um CPF para cada cliente.
    item.innerHTML = `${cliente.nome} - ${cliente.email} <button onclick="excluirCliente('${cliente._id}')">X</button>`; //} Exibe o nome e email do cliente, ele monta o visual da lista como se fosse um molde, e adiciona um botão de exclusão que chama a função excluirCliente passando o ID do cliente.
    clientes.appendChild(item);//} Adiciona o item criado à lista de clientes no HTML, ou seja, ele insere o cliente na tela para o usuário visualizar.
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
        body: JSON.stringify({//Serve para converter um objeto JavaScript em uma string JSON, ou seja, ele pega o objeto com nome e email e transforma em um formato que pode ser enviado para a API, ele prepara os dados para serem enviados ao servidor.
            nome: nome,
            email: email
        })
    })
    .then(resposta => resposta.json())//} Serve para converter a resposta da API em um formato que o JavaScript possa entender, ou seja, ele pega a resposta bruta da API e transforma em um objeto JavaScript que pode ser manipulado no código.
    .then((cliente) => {
        adicionarClienteNaLista(cliente);//}Chama a funçao de adicionar clientes e logo abaixo tem a função de limpar os campos, ou seja, depois de cadastrar um cliente ele adiciona o cliente na lista e limpa os campos para o próximo cadastro.
        // Limpar campos
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    })
    .catch(erro => {//} Catch serve para capturar erros de uma promise. SEMPRE IMPORTANTE COLOCAR O CATCH PARA TRATAR ERROS, POIS SE A API FALHAR, É MAIS FACIL IDENTIFICAR O PROBLEMA E INFORMAR O USUÁRIO AO INVÉS DE DEIXAR O SISTEMA QUEBRAR SEM EXPLICAÇÃO.
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao cadastrar cliente. Tente novamente.");
    });
});

// Função para excluir cliente
function excluirCliente(id) {// } A função de excluir cliente recebe o ID do cliente que deve ser excluído, esse ID é passado quando o usuário clica no botão de exclusão ao lado do cliente na lista, ele identifica qual cliente deve ser removido.
    if (confirm("Tem certeza que deseja excluir este cliente?")) {//} Antes de excluir, ele pede uma confirmação ao usuário para evitar exclusões acidentais, é uma boa prática para melhorar a experiência do usuário e evitar perda de dados.
        fetch(`https://crudcrud.com/api/e5fa731493e7485cb350dbf1caafc40c/clientes/${id}`, {//} Ele faz uma requisição para a API usando o método DELETE, passando o ID do cliente na URL para indicar qual cliente deve ser excluído, ou seja, ele envia uma solicitação para o servidor para remover o cliente específico.
            method: "DELETE"
        })
        .then(() => {
            document.getElementById(`cliente-${id}`).remove();//} Depois que a API confirma que o cliente foi excluído, ele remove o item correspondente da lista no HTML usando o ID do cliente para identificar qual item deve ser removido, ou seja, ele atualiza a interface do usuário para refletir a exclusão do cliente.
        })
        .catch(erro => {//} Catch serve para capturar erros de uma promise. SEMPRE IMPORTANTE COLOCAR O CATCH PARA TRATAR ERROS, POIS SE A API FALHAR, É MAIS FACIL IDENTIFICAR O PROBLEMA E INFORMAR O USUÁRIO AO INVÉS DE DEIXAR O SISTEMA QUEBRAR SEM EXPLICAÇÃO.
            console.error("Erro ao excluir:", erro);
            alert("Erro ao excluir cliente. Tente novamente.");
        });
    }
}