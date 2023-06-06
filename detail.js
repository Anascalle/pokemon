const params = new URLSearchParams(window.location.search);
const characterId = params.get('id');

// Obtener el ID del elemento actual
var elementId = characterId;

// Obtener la lista de favoritos del LocalStorage o inicializarla como un array vacío
var favoriteList = JSON.parse(localStorage.getItem("favoriteList")) || [];

async function getCharacter() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Anascalle/Pokemon-Go/main/js/data1.json');
    const data = await response.json();

    const character = searchById(data, characterId);

    if (!character) {
      console.log('Personaje no encontrado');
      return;
    }

    const type1 = character.types[0].type.name;
    const type2 = character.types[1] ? character.types[1].type.name : null;
    const abilities = character.abilities.map(ability => ability.ability.name);
    const moves = character.moves.map(move => move.move.name);

    const types = type2 ? [type1, type2] : [type1];

    const characterObject = {
      id: character.id,
      name: character.name,
      image: character.sprites.other["official-artwork"].front_default,
      types: types,
      weight: character.weight,
      height: character.height,
      abilities: abilities,
      base_experience: character.base_experience,
      stats: character.stats,
      moves: moves
    };

    const nameH1 = document.getElementById("name");
    nameH1.innerHTML = characterObject.name;

    const idH1 = document.getElementById("id");
    idH1.innerHTML = `N°${characterObject.id.toString().padStart(4, '0')}`;

    const typeH1 = document.getElementById('type');
    typeH1.innerHTML = characterObject.types.join(', ');

    const imageElement = document.getElementById("image");
    imageElement.src = characterObject.image;

    const weightH1 = document.getElementById("weight");
    weightH1.innerHTML = `Weight: ${characterObject.weight} kg`;

    const heightH1 = document.getElementById("height");
    heightH1.innerHTML = `Height: ${characterObject.height} m`;

    const abilitiesUL = document.getElementById("abilities");
    abilitiesUL.innerHTML = '';
    characterObject.abilities.forEach((ability) => {
      const li = document.createElement("li");
      li.textContent = ability;
      abilitiesUL.appendChild(li);
    });

    const base_experienceH1 = document.getElementById("base_experience");
    base_experienceH1.innerHTML = `Base experience: ${characterObject.base_experience}`;

    const statsUL = document.getElementById("stats");
    statsUL.innerHTML = '';
    characterObject.stats.forEach((stat) => {
      const li = document.createElement("li");
      const statName = stat.stat.name;
      const baseStat = stat.base_stat;
      li.textContent = `${statName}: ${baseStat}`;
      statsUL.appendChild(li);
    });

    const movesUL = document.getElementById("moves");
    characterObject.moves.slice(0, 15).forEach(move => {
      const li = document.createElement("li");
      li.textContent = move;
      movesUL.appendChild(li);
    });
// Obtener el botón de estrella
var starButton = document.querySelector(".star-icon");

// Verificar si el elemento está en favoritos al cargar la página
if (favoriteList.includes(characterObject.id)) {
  starButton.classList.add("selected");
}

// Evento clic en el botón de estrella
starButton.addEventListener("click", function () {
  // Verificar si el elemento ya está en favoritos
  if (favoriteList.includes(characterObject.id)) {
    // El elemento ya está en favoritos, se remueve de la lista
    var index = favoriteList.indexOf(characterObject.id);
    favoriteList.splice(index, 1);
    starButton.classList.remove("selected");
  } else {
    // El elemento no está en favoritos, se agrega a la lista
    favoriteList.push(characterObject.id);
    starButton.classList.add("selected");

 
  }

  // Guardar la lista de favoritos en el LocalStorage
  updateFavorites();
});

// Función para actualizar la lista de favoritos en el LocalStorage
function updateFavorites() {
  localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
}


  } catch (error) {
    console.log('Error al obtener los datos del personaje:', error);
  }
}

function searchById(data, id) {
  return data.find(character => character.id.toString() === id);
}

function goBack() {
  window.location.href = 'Pokedex.html';
}

getCharacter();
