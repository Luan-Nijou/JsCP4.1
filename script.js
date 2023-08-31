// Declara um array vazio para armazenar as tarefas
const listaTarefasArray = [];

// Seleciona os botões e a tabela do seu HTML usando seus IDs
const botaoAddTarefa = document.querySelector('#btnAddTarefa');
const botaoExcluirTarefa = document.querySelector('#btnExcluirTarefa');
const btnOrganizar = document.querySelector('#btnOrganizar');
const tabelaTarefas = document.querySelector('#lista-tarefas');

// Adiciona um ouvinte de evento ao botão "Adicionar Tarefa"
botaoAddTarefa.addEventListener("click", (evt) => {
    evt.preventDefault(); // Evita que o formulário seja enviado e a página recarregada

    // Captura os valores dos campos de entrada do formulário
    const inputNomeTarefa = document.getElementById("idNMTarefa");
    const inputDescricaoTarefa = document.getElementById("idDescTarefa");
    const inputDepartamentoTarefa = document.getElementById("idDpTarefa");
    const inputimportanciaTarefa = document.getElementById("idImporTarefa");
    
    // Cria um objeto tarefa com os valores dos campos de entrada
    const tarefaObj = {
        nome: inputNomeTarefa.value,
        descricao: inputDescricaoTarefa.value,
        departamento: inputDepartamentoTarefa.value,
        importancia: inputimportanciaTarefa.value,
    };

    // Adiciona o objeto tarefa ao array listaTarefasArray
    listaTarefasArray.push(tarefaObj);

    // Cria elementos HTML para representar a tarefa na tabela
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const check = document.createElement('input');
    const data = document.createElement('input');

    // Define os tipos e atributos dos elementos criados
    check.type = 'checkbox';
    check.className = "checkbox-tarefa";
    check.id = `checkbox-${listaTarefasArray.length}`;

    data.type = 'date';

    // Preenche as células da linha com os dados da tarefa
    td1.textContent = tarefaObj.nome;
    td2.textContent = tarefaObj.descricao;
    td3.textContent = tarefaObj.departamento;
    td4.textContent = tarefaObj.importancia;

    // Monta a estrutura da tabela
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    td5.appendChild(data);
    tr.appendChild(td6); 
    td6.appendChild(check);

    // Adiciona a linha da tarefa à tabela
    tabelaTarefas.appendChild(tr);

    // Exibe informações no console para depuração
    console.log(check.value);
    console.log(listaTarefasArray);
});

// Adiciona um ouvinte de evento ao botão "Excluir Tarefas"
botaoExcluirTarefa.addEventListener("click", (evt) => {
    evt.preventDefault();

    // Seleciona todas as checkboxes de tarefa
    const checkboxes = [...document.querySelectorAll('.checkbox-tarefa')];

    // Percorre as checkboxes e verifica se estão marcadas
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            // Remove a tarefa do array e a linha da tabela correspondente
            listaTarefasArray.splice(index, 1);
            const trToRemove = checkbox.closest('tr');
            trToRemove.remove();
        }
    });
});

// Adiciona um ouvinte de evento ao botão "Organizar por Importância"
btnOrganizar.addEventListener('click', () => {
    // Classifica as tarefas no array por ordem de importância (do maior para o menor)
    listaTarefasArray.sort((a, b) => b.importancia - a.importancia);

    // Limpa a tabela, exceto a linha de cabeçalho
    while (tabelaTarefas.children.length > 1) {
        tabelaTarefas.removeChild(tabelaTarefas.lastChild);
    }

    // Percorre o array ordenado e recria as linhas da tabela organizada
    listaTarefasArray.forEach(tarefa => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        const check = document.createElement('input');
        const data = document.createElement('input');

        check.type = 'checkbox';
        check.className = "checkbox-tarefa";
        check.id = `checkbox-${listaTarefasArray.length}`;

        data.type = 'date';

        td1.textContent = tarefa.nome;
        td2.textContent = tarefa.descricao;
        td3.textContent = tarefa.departamento;
        td4.textContent = tarefa.importancia;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        td5.appendChild(data);
        tr.appendChild(td6); 
        td6.appendChild(check);

        tabelaTarefas.appendChild(tr);
    });
});
