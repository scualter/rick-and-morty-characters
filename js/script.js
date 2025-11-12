// script.js

const characterList = document.getElementById('character-list');
const prevButton = document.getElementById('prev-page');
const nextButton = document.getElementById('next-page');

let currentPage = 1;

async function getCharacters(page) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();
    console.log(data); 

    showCharacters(data.results);

    prevButton.disabled = page === 1;

    nextButton.disabled = !data.info.next;
  } catch (error) {
    console.error("Error al obtener los personajes:", error);
  }
}

function showCharacters(characters) {

  characterList.innerHTML = '';

  characters.forEach(character => {
    const li = document.createElement('li');
    li.classList.add('character-item');
    li.innerHTML = `
      <div class="character-card">
        <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>
        <p>${character.species}</p>
      </div>
    `;
    characterList.appendChild(li);
  });
}


nextButton.addEventListener('click', () => {
  currentPage++;
  getCharacters(currentPage);
});

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    getCharacters(currentPage);
  }
});


getCharacters(currentPage);
