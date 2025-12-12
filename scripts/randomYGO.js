import { getRandomCard } from './randomcard.mjs';

const cardContainer = document.getElementById('lightcard');
const ygoUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';


async function displayRandomCard() {
    const card = await getRandomCard(ygoUrl);
    if (!card) {
        cardContainer.innerHTML = '<p>Failed to load card data. Please try again later.</p>';
        return;
    }

    cardContainer.innerHTML = '';

    const section = document.createElement('section');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    

    name.textContent = card.name;
    image.src = card.card_images[0].image_url;
    image.alt = `Image of ${card.name}`;
    image.width = 250;
    image.height = 350;
    image.loading = 'lazy';
    
    section.appendChild(name);
    section.appendChild(image);

    cardContainer.appendChild(section);
}

displayRandomCard();
