const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menuHam');

//add event listener//

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('show');
    hambutton.classList.toggle('show');
});

