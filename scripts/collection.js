import { getCollection, removeFromCollection } from "./utils.mjs";

const params = new URLSearchParams(window.location.search);
const currentCollection = params.get('tcg');

if (!currentCollection) {
    alert('collection can only be accessed from a subpage.');
    window.location.ref = '/';
}

function renderCollection() {
    const myCollection = document.querySelector('#cards');
    myCollection.innerHTML = '';

    const collected = getCollection(currentCollection);

    if (!collected || collected.length === 0) {
        myCollection.textContent = 'Your collection is empty. Go to library to add cards to your collection';

        return;
    }

    collected.forEach(card => {
        const cardFrame = document.createElement('section');
        const cardName = document.createElement('p');
        cardName.textContent = card.name;

        const cardImg = document.createElement('img');
        cardImg.src = card.image;
        cardImg.alt = card.name;
        cardImg.width = 100;
        cardImg.height = 150;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'remove';
        removeBtn.addEventListener('click', () => {
            removeFromCollection(card.id, currentCollection);
            
            renderCollection();
        });

        cardFrame.append(cardName, cardImg, removeBtn);
        myCollection.appendChild(cardFrame);
    });
}

renderCollection();