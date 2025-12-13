import { getCollection, removeFromCollection } from "./utils.mjs";

const params = new URLSearchParams(window.location.search);
const currentCollection = params.get('tcg') || 'ygo';

const collection = getCollection(currentCollection);

collection.forEach(card => {
    const card
    
});