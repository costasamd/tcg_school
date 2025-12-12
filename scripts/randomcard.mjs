export async function getRandomCard(url) {
    try {

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        

        const data = await response.json();

        //ygo API structure
        if (Array.isArray(data.data)) {
            const cards = data.data.length;
            const randomIndex = Math.floor(Math.random() * cards);
            return data.data[randomIndex];
        }

        //mtg API structure
        if (Array.isArray(data.cards)) {
            const cards = data.cards.length;
            const randomIndex = Math.floor(Math.random() * cards);
            return data.cards[randomIndex];
        }
        throw new Error('Unexpected data structure from API');
    } catch (error) {
        console.error('Error fetching card data:', error);
        return null;
    }
}