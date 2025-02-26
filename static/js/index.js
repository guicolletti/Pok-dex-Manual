class Pokemon {
    constructor(nome, pokedex, peso, tipo, altura) {
        this.nome = nome;
        this.pokedex = pokedex;
        this.peso = peso;
        this.tipo = tipo;
        this.altura = altura;
    }
}

const pokemons = [];
let pokemonEditando = null;

const formulario = document.getElementById('pokemon-form');
const tabelaPokemons = document.getElementById('tabela-pokemons');
const btnSalvar = document.getElementById('btn-salvar');

function adicionarPokemonATabela(pokemon) {
    const novaLinha = document.createElement('tr');

    novaLinha.innerHTML = `
        <td>${pokemon.nome}</td>
        <td>${pokemon.pokedex}</td>
        <td>${pokemon.peso}</td>
        <td>${pokemon.tipo}</td>
        <td>${pokemon.altura}</td>
        <td>
            <button class="btn btn-danger btn-retirar">Retirar</button>
            <button class="btn btn-success btn-editar">Editar</button>
        </td>
    `;

    tabelaPokemons.appendChild(novaLinha);

    const btnRetirar = novaLinha.querySelector('.btn-retirar');
    btnRetirar.addEventListener('click', () => {
        tabelaPokemons.removeChild(novaLinha);
        const index = pokemons.indexOf(pokemons);
        if (index > -1) {
            pokemons.splice(index, 1);
        }
    });

    const btnEditar = novaLinha.querySelector('.btn-editar');
    btnEditar.addEventListener('click', () => {
        preencherFormularioComPokemonAtual(pokemons);
        pokemonEditando = pokemons;
        btnSalvar.disabled = false;
    });
}

function preencherFormularioComPokemonAtual(pokemons) {
    document.getElementById('nome').value = pokemons.nome;
    document.getElementById('pokedex').value = pokemons.pokedex;
    document.getElementById('peso').value = pokemons.peso;
    document.getElementById('tipo').value = pokemons.tipo;
    document.getElementById('altura').value = pokemons.altura;
}

function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('pokedex').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('altura').value = '';
    pokemonEditando = null;
    btnSalvar.disabled = true;
}

function validarFormulario(nome, pokedex, peso, tipo, altura) {
    if (!nome || !pokedex || !altura) {
        alert('Todos os campos são obrigatórios!');
        return false;
    }

    if (altura < 0 || altura > 10) {
        alert('A altura deve estar entre 0 e 10!');
        return false;
    }

    return true;
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const pokedex = parseInt(document.getElementById('pokedex').value);
    const peso = parseInt(document.getElementById('peso').value);
    const tipo = document.getElementById('tipo').value.trim();
    const altura = parseFloat(document.getElementById('altura').value);

    if (!validarFormulario(nome, pokedex, peso, tipo, altura)) {
        return;
    }

    const new_pokemon = new Pokemon(nome, pokedex, peso, tipo, altura);
    pokemons.push(new_pokemon)
    adicionarPokemonATabela(new_pokemon);
    limparFormulario();
});

btnSalvar.addEventListener('click', () => {
    if (pokemonEditando) {
        pokemonEditando.nome = document.getElementById('nome').value;
        pokemonEditando.pokedex = parseFloat(document.getElementById('pokedex').value);
        pokemonEditando.peso = parseFloat(document.getElementById('peso').value);
        pokemonEditando.tipo = document.getElementById('tipo').value;
        pokemonEditando.altura = parseFloat(document.getElementById('altura').value);


        tabelaPokemons.innerHTML = '';
        pokemons.forEach(adicionarPokemonATabela);
        limparFormulario();
    }
});

const btnTirar = document.getElementById('btn-tirar');
btnTirar.addEventListener('click', (evento) => {
    evento.preventDefault();
    limparFormulario();
});

const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        toggleButton.src = "static/img/black_pkball.png";
    } else {
        toggleButton.src = "static/img/white_pkball.png";
    }
});