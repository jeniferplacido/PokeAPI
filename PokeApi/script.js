document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const pokedex = document.getElementById('pokedex');
    let listaPokemon = [];

    searchButton.addEventListener('click', async function () {
        const termoBusca = searchInput.value.toLowerCase();
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoBusca}`);
        const dados = await resposta.json();

        if (dados.name) {
            listaPokemon.push(dados);
            renderizarListaPokemon();
        } else {
            alert('Pokémon não encontrado!');
        }
    });

    function renderizarListaPokemon() {
        pokedex.innerHTML = '';
        listaPokemon.forEach(function (pokemon) {
            const carta = criarCartaPokemon(pokemon);
            pokedex.appendChild(carta);
        });
    }

    function criarCartaPokemon(pokemon) {
        const carta = document.createElement('div');
        carta.classList.add('carta');

        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;

        const nome = document.createElement('h2');
        nome.textContent = pokemon.name.toUpperCase();

        const tipos = document.createElement('p');
        tipos.textContent = `Tipo: ${pokemon.types.map(tipo => tipo.type.name).join(', ')}`;

        const estatisticas = document.createElement('p');
        estatisticas.textContent = `Força: ${pokemon.stats[0].base_stat}, Defesa: ${pokemon.stats[1].base_stat}, Velocidade: ${pokemon.stats[5].base_stat}`;

        carta.appendChild(img);
        carta.appendChild(nome);
        carta.appendChild(tipos);
        carta.appendChild(estatisticas);

        return carta;
    }
});
