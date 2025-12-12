import { getRandomCard } from './randomcard.mjs';

const cardContainer = document.getElementById('lightcard');
const mtgUrl = 'https://api.magicthegathering.io/v1/cards?page=1';


async function displayRandomCard() {
    const card = await getRandomCard(mtgUrl);

    if (!card) {
        
        cardContainer.innerHTML = '<p>Error loading card data.</p>';
        return;
    }

    cardContainer.innerHTML = '';

    const section = document.createElement('section');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    

    name.textContent = card.name;
    image.src = card.imageUrl || './images/mtg_card_back.webp';
    image.alt = `Image of ${card.name}`;
    image.width = 250;
    image.height = 350;
    image.loading = 'lazy';
    
    section.appendChild(name);
    section.appendChild(image);

    cardContainer.appendChild(section);
}

displayRandomCard();
