const book = './ygo_rules.pdf';
const read = document.getElementById('bookrules');

pdfjsLib.getDocument(book).promise.then(pdf => {
    pdf.getPage(1).then(page => {

        const canvas = document.createElement('canvas');
        read.appendChild(canvas);
        const context = canvas.getContext('2d');

        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
}).catch(err => {
    console.error('Error loading PDF:', err)
});

//----------random card--------//

import { getRandomCard } from './randomcard.mjs';

const cardContainer = document.getElementById('lightcard');

async function displayRandomCard() {
    const card = await getRandomCard();
    if (!card) {
        cardContainer.innerHTML = '<p>Failed to load card data. Please try again later.</p>';
        return;
    }

    cardContainer.innerHTML = '';

    const section = document.createElement('section');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    const description = document.createElement('p');

    name.textContent = card.name;
    image.src = card.card_images[0].image_url;
    image.alt = `Image of ${card.name}`;
    image.width = 250;
    image.height = 350;
    image.loading = 'lazy';
    description.textContent = card.desc;

    section.appendChild(name);
    section.appendChild(image);
    section.appendChild(description);

    cardContainer.appendChild(section);
}

displayRandomCard();

// ----------local storage--------//

const visitCount = document.getElementById("visits");

let numVisits = Number(window.localStorage.getItem("visits")) || 0;
numVisits++;
localStorage.setItem("visits", numVisits);
visitCount.textContent = `number of visits to this website: ${numVisits}`;