// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', async function () {
    // Obtém referência para o campo de entrada de busca, botão de busca e contêiner para os cartões de Pokémon
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const pokedex = document.getElementById('pokedex');
    // Cria uma lista vazia para armazenar os Pokémon buscados
    let listaPokemon = [];

    // Adiciona um ouvinte de evento de clique ao botão de busca
    searchButton.addEventListener('click', async function () {
        // Obtém o termo de busca e converte para minúsculas
        const termoBusca = searchInput.value.toLowerCase();
        // Faz uma solicitação à API do Pokémon com o termo de busca
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoBusca}`);
        // Obtém os dados da resposta no formato JSON
        const dados = await resposta.json();

        // Verifica se o Pokémon foi encontrado na API
        if (dados.name) {
            // Adiciona os dados do Pokémon à lista
            listaPokemon.push(dados);
            // Renderiza os cartões dos Pokémon na tela
            renderizarListaPokemon();
        } else {
            // Se o Pokémon não for encontrado, exibe um alerta
            alert('Pokémon não encontrado!');
        }
    });

    // Função para renderizar os cartões dos Pokémon na tela
    function renderizarListaPokemon() {
        // Limpa o conteúdo atual do contêiner de cartões de Pokémon
        pokedex.innerHTML = '';
        // Para cada Pokémon na lista, cria e adiciona um cartão ao contêiner
        listaPokemon.forEach(function (pokemon) {
            const carta = criarCartaPokemon(pokemon);
            pokedex.appendChild(carta);
        });
    }

    // Função para criar um cartão de Pokémon
    function criarCartaPokemon(pokemon) {
        // Cria um elemento div para representar o cartão de Pokémon
        const carta = document.createElement('div');
        carta.classList.add('carta');

        // Cria uma imagem para o Pokémon e define seu atributo src e alt
        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;

        // Cria um elemento h2 para o nome do Pokémon e define seu texto
        const nome = document.createElement('h2');
        nome.textContent = pokemon.name.toUpperCase();

        // Cria um parágrafo para os tipos do Pokémon e define seu texto
        const tipos = document.createElement('p');
        tipos.textContent = `Tipo: ${pokemon.types.map(tipo => tipo.type.name).join(', ')}`;

        // Cria um parágrafo para as estatísticas do Pokémon e define seu texto
        const estatisticas = document.createElement('p');
        estatisticas.textContent = `Força: ${pokemon.stats[0].base_stat}, Defesa: ${pokemon.stats[1].base_stat}, Velocidade: ${pokemon.stats[5].base_stat}`;

        // Adiciona os elementos criados ao cartão de Pokémon
        carta.appendChild(img);
        carta.appendChild(nome);
        carta.appendChild(tipos);
        carta.appendChild(estatisticas);

        // Retorna o cartão de Pokémon
        return carta;
    }
});
