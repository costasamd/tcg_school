const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const cards = document.querySelector('#cards');

async function getCardsLibrary() {
    const response = await fetch(url);
    const ygo = await response.json();
    //console.table(ygo.data);
    displayCards(ygo.data);
}

function displayCards(ygo) {
    
    cards.innerHTML = ''; // Clear previous results//

    ygo.forEach(card => {
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

        cardImg.style.display = 'none';

        if (card.atk !== undefined) {
            cardAttack.textContent = `Atk: ${card.atk}`;
        }
        if (card.def !== undefined) {
            cardDef.textContent = `Def: ${card.def}`;
        }
        
        cardDesc.textContent = `${card.desc}`;
        cardDesc.style.display = 'none';

        cardName.addEventListener('click', () => {
            if (cardDesc.style.display === 'none') {
                cardDesc.style.display = 'block';
                if (cardImg.style.display === 'none') {
                    cardImg.style.display = 'block';
                }
            } else {
                cardDesc.style.display = 'none';
                cardImg.style.display = 'none';

            }
        })


        library.appendChild(cardName);
        library.appendChild(cardImg);
        library.appendChild(cardDesc);
        library.appendChild(cardAttack);
        library.appendChild(cardDef)
        

        cards.appendChild(library);
    });
}

getCardsLibrary();
