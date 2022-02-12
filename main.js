const pokemonContainer = document.querySelector('.pokemon-container');
const POKEMONS_NUMBER = 50;
const ERROR_MESSAGE =
  'При загрузке данных с сервера произошла ошибка. Попробуйте ещё раз';

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
};

const main_types = Object.keys(colors);

const showAlert = message => {
  const ALERT_SHOW_TIME = 500;
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 10;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const createPokemonCard = pokemon => {
  const pokemonEl = document.createElement('div');
  const img = pokemon.sprites.other.dream_world.front_default;
  const id = pokemon.id.toString().padStart(3, '0');
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const poke_types = pokemon.types.map(type => type.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);

  const color = colors[type];

  pokemonEl.classList.add('pokemon');
  pokemonEl.style.backgroundColor = color;

  const pokeInnerHTML = `
    <div class="img-container">
      <img src=${img} alt="${name}">
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h2 class="name">${name}</h2>
      <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;
  pokemonContainer.append(pokemonEl);
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);

  try {
    if (response.ok) {
      const jsonResponse = await response.json();
      createPokemonCard(jsonResponse);
    }
  } catch (e) {
    console.log(e);
    showAlert(ERROR_MESSAGE);
  }
};

const fetchPokemon = async () => {
  for (let i = 1; i <= POKEMONS_NUMBER; i++) {
    await getPokemon([i]);
  }
};

fetchPokemon();
