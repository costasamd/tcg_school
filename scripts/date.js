const year = document.getElementById('currentyear');
const lastmod = document.getElementById('lastModified');

const today = new Date();

year.innerHTML = `${today.getFullYear()} | Manchester UK`;
lastmod.innerHTML = `Last Modified: ${document.lastModified}`;


