import { getCollection, saveCollection, addToCollection, removeFromCollection, isInCollection } from "./utils.mjs";

let currentTCG = null;
let currentData = null;
let page = 1;

const cardPerPage = 50;


//----------------------------API Selection -----------------------//

document.querySelector('#tcg').addEventListener('change', getCardsLibrary)


//---------------------------- Library Section -----------------------//

async function getCardsLibrary() {
    
    currentTCG = document.querySelector('#tcg').value;
    page = 1;

    let url = '';

    if (currentTCG === 'ygo') {
        url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

        const data = await fetch(url).then(response => response.json());
        currentData = data;

        displayCards(currentTCG, currentData);
        
        return;        

    }
    
    if (currentTCG === 'mtg') {
        url = "https://api.magicthegathering.io/v1/cards";

        
        const data = await fetch(url).then(response => response.json());
        currentData = data;

        displayCards(currentTCG, currentData);
    
        return;
    }
}

document.querySelector('#cardSearch').addEventListener('input', () => {
    page = 1;
    displayCards(currentTCG, currentData);
});



function displayCards(typeTCG, data) {

    const showCards = document.querySelector('#cards');
    const searchValue = document.querySelector('#cardSearch').value.toLowerCase();

    showCards.innerHTML = ''; // Clear previous results//

    let cardsArray = [];

    if(typeTCG === 'ygo') {
        cardsArray = data.data.filter(card => card.name.toLowerCase().includes(searchValue));
    } else if (typeTCG === 'mtg') {
        cardsArray = data.cards.filter(card => card.name.toLowerCase().includes(searchValue));
    }

    // Pagination logic //
    const start = (page - 1) * cardPerPage;
    const end = start + cardPerPage;
    const paginatedCards = cardsArray.slice(start, end);


// cards display logic //
    if (typeTCG === 'ygo') {
        paginatedCards.forEach(card => {
            let library = document.createElement('section');
            let cardName = document.createElement('p');
            let cardImg = document.createElement('img')
            let cardAttack = document.createElement('p');
            let cardDef = document.createElement('p');
            let cardDesc = document.createElement('p');

            cardName.textContent = `${card.name}`;
            cardImg.setAttribute('src', card.card_images[0].image_url_small);
            cardImg.setAttribute('alt', `${card.name}`);
            cardImg.setAttribute('loading', 'lazy');
            cardImg.setAttribute('width', '100');
            cardImg.setAttribute('height', '150');

            if (card.atk !== undefined) { cardAttack.textContent = `Atk: ${card.atk}`;}
            if (card.def !== undefined) { cardDef.textContent = `Def: ${card.def}`;}

            cardDesc.textContent = `${card.desc}`;
            cardDesc.style.display = 'none';

            cardImg.addEventListener('click', () => {
                if (cardDesc.style.display === 'none') {
                    cardDesc.style.display = 'block';

                } else {
                    cardDesc.style.display = 'none';

                }
            })

            //-----------button to add to collection-------------//

            const uniqueId = `ygo-${card.id}`;
            const collectionBtn = document.createElement('button');
            collectionBtn.textContent = 'Add to Collection';

            collectionBtn.disabled = isInCollection(uniqueId, 'ygo');

            collectionBtn.addEventListener('click', () => {
                addToCollection({ id: uniqueId, name: card.name, image: card.card_images[0].image_url_small, type: 'ygo' }, 'ygo');
                collectionBtn.disabled = true;
                collectionBtn.textContent = 'Added';
            }
            );




            library.appendChild(cardName);
            library.appendChild(cardImg);
            library.appendChild(cardDesc);
            library.appendChild(cardAttack);
            library.appendChild(cardDef)
            library.appendChild(collectionBtn);


            showCards.appendChild(library);
        })
    } else if (typeTCG === 'mtg') {
        paginatedCards.forEach(card => {
            let library = document.createElement('section');
            let cardName = document.createElement('p');
            let cardImg = document.createElement('img');
            let cardDesc = document.createElement('p');

            cardName.textContent = `${card.name}`

            cardImg.setAttribute('src', card.imageUrl || './images/mtg_card_back.webp');
            cardImg.setAttribute('alt', `${card.name}`);
            cardImg.setAttribute('loading', 'lazy');
            cardImg.setAttribute('width', '100');
            cardImg.setAttribute('height', '150');

            cardDesc.textContent = `${card.originalText || 'No description available.'}`;
            cardDesc.style.display = 'none';

            cardImg.addEventListener('click', () => {
                if (cardDesc.style.display === 'none') {
                    cardDesc.style.display = 'block';

                } else {
                    cardDesc.style.display = 'none';

                }
            })

            //-----------button to add to collection-------------//

            const uniqueId = `mtg-${card.id || card.multiverseid || card.name}`;
            const collectionBtn = document.createElement('button');
            collectionBtn.textContent = 'Add to Collection';

            collectionBtn.disabled = isInCollection(uniqueId, 'mtg');

            collectionBtn.addEventListener('click', () => {
                addToCollection({ id: uniqueId, name: card.name, image: card.imageUrl || './images/mtg_card_back.webp', type: 'mtg' }, 'mtg');
                collectionBtn.disabled = true;
                collectionBtn.textContent = 'Added';
            }
            );
            
            library.appendChild(cardName);
            library.appendChild(cardImg);
            library.appendChild(cardDesc);
            library.appendChild(collectionBtn);

            showCards.appendChild(library);
        });

    }

    renderPagination(cardsArray.length);
}

function renderPagination(totalCards) {
    const paginationNav = document.querySelector('#pagination');
    paginationNav.innerHTML = '';

    const totalPages = Math.ceil(totalCards / cardPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        if (i === page) button.disabled = true;

            button.addEventListener('click', () => {
                page = i;
                displayCards(currentTCG, currentData);
            });

            paginationNav.appendChild(button);
        }
    }

getCardsLibrary();
