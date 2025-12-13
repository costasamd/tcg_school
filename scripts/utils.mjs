// ---------------header and footer template for all pages-----------------

export function renderWithTemplate(template, parentElement) {
    parentElement.innerHTML = template;
}

async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
   
    return template;
}
export async function headerFooter() {
    const headerTemplate = await loadTemplate('partials/header.html');
    const header = document.querySelector('#header');

    const footerTemplate = await loadTemplate('partials/footer.html');
    const footer = document.querySelector('#footer');

    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);

    initResponsiveNav();
}

function initResponsiveNav() {
    const mainnav = document.querySelector('.navigation');
    const hambutton = document.querySelector('#menuHam');

    if (!hambutton || !mainnav) return;

    //add event listener//

    hambutton.addEventListener('click', (e) => {
        e.preventDefault();
        mainnav.classList.toggle('show');
        hambutton.classList.toggle('show');
    });

    //----footer info-----//
    const year = document.getElementById('currentyear');
    const today = new Date();

    year.innerHTML = `${today.getFullYear()} | Manchester UK`;


}

//---------------add, save, retrieve user data to/from local storage-----------------

export function getCollection(tcg) {
    const collection = localStorage.getItem(`${tcg}Collection`);
    return collection ? JSON.parse(collection) : [];
}

export function saveCollection(tcg, collection) {
    localStorage.setItem(`${tcg}Collection`, JSON.stringify(collection));
}

export function addToCollection(card, tcg) {
    const collection = getCollection(tcg);
    if (!collection.find(c => c.id === card.id)) {
        collection.push(card);
        saveCollection(tcg, collection);
    }
}

export function removeFromCollection(cardId, tcg) {
    let collection = getCollection(tcg);
    collection = collection.filter(c => c.id !== cardId);
    saveCollection(tcg, collection);
}

export function isInCollection(cardId, tcg){
    return getCollection().some(c => c.id === cardId);
}
