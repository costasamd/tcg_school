const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

export async function getRandomCard() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const cards = data.data.length;
            const randomIndex = Math.floor(Math.random() * cards);
            
            const oneCard = await fetch(`${url}?num=1&offset=${randomIndex}`);
            const cardData = await oneCard.json();
            return cardData.data[0];

        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Fetch operation failed: ', error);
        return null;
    }
}