import { getCollection, saveCollection, addToCollection, removeFromCollection, isInCollection } from "./utils.mjs";

//----------------------------API Selection -----------------------//

document.querySelector('#tcg').addEventListener('change', getCardsLibrary)


//---------------------------- Library Section -----------------------//

async function getCardsLibrary() {
    const typeTCG = document.querySelector('#tcg').value;
    let url = '';

    if (typeTCG === 'ygo') {
        url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0';

        const data = await fetch(url).then(response => response.json());

        displayCards(typeTCG, data);
        return;

    } else if (typeTCG === 'mtg') {
        url = "https://api.magicthegathering.io/v1/cards";

        
        const data = await fetch(url).then(response => response.json());
    
        displayCards(typeTCG, data);
    
        return;
    }
}


function displayCards(typeTCG, data) {

    const showCards = document.querySelector('#cards');
    
    showCards.innerHTML = ''; // Clear previous results//

    if (typeTCG === 'ygo') {
        data.data.forEach(card => {
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

            if (card.atk !== undefined) {
                cardAttack.textContent = `Atk: ${card.atk}`;
            }
            if (card.def !== undefined) {
                cardDef.textContent = `Def: ${card.def}`;
            }

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
        data.cards.forEach(card => {
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

}


getCardsLibrary();
