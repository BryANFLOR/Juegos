class RickAndMortyAPI {
    constructor() {
      this.charactersContainer = document.getElementById('characters');
    }
  
    async fetchCharacters() {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        const characters = data.results;
        this.displayCharacters(characters);
      } catch (error) {
        console.log('Error:', error);
      }
    }
  
    displayCharacters(characters) {
      characters.forEach(character => {
        const characterCard = new CharacterCard(character);
        this.charactersContainer.appendChild(characterCard.element);
      });
    }
  }
  
  class CharacterCard {
    constructor(character) {
      this.character = character;
      this.element = document.createElement('div');
      this.element.classList.add('character-card');
      this.createCard();
    }
  
    createCard() {
      const { image, name, status, species, type, gender, origin } = this.character;
  
      const imageElement = document.createElement('img');
      imageElement.classList.add('character-image');
      imageElement.src = image;
      imageElement.alt = name;
  
      const nameElement = document.createElement('h2');
      nameElement.classList.add('character-name');
      nameElement.textContent = name;
  
      const btnMore = document.createElement('button');
      btnMore.textContent = 'Ver más...';
      btnMore.addEventListener('click', () => {
        this.showAdditionalInfo();
      });
  
      const additionalInfo = document.createElement('div');
      additionalInfo.classList.add('additional-info');
      additionalInfo.style.display = 'none';
  
      const statusElement = document.createElement('p');
      statusElement.textContent = `Estado: ${status}`;
  
      const speciesElement = document.createElement('p');
      speciesElement.textContent = `Especie: ${species}`;
  
      const typeElement = document.createElement('p');
      typeElement.textContent = `Tipo: ${type}`;
  
      const genderElement = document.createElement('p');
      genderElement.textContent = `Género: ${gender}`;
  
      const originElement = document.createElement('p');
      originElement.textContent = `Origen: ${origin.name}`;
  
      additionalInfo.appendChild(statusElement);
      additionalInfo.appendChild(speciesElement);
      additionalInfo.appendChild(typeElement);
      additionalInfo.appendChild(genderElement);
      additionalInfo.appendChild(originElement);
  
      this.element.appendChild(imageElement);
      this.element.appendChild(nameElement);
      this.element.appendChild(btnMore);
      this.element.appendChild(additionalInfo);
    }
  
    showAdditionalInfo() {
      const additionalInfo = this.element.querySelector('.additional-info');
      additionalInfo.style.display = additionalInfo.style.display === 'none' ? 'block' : 'none';
    }
  }
  
  const api = new RickAndMortyAPI();
  api.fetchCharacters();
  