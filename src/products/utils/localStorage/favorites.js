export const addFavorite = (product) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(product);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const removeFavorite = (product) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.idProduct !== product.idProduct);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const updateFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return storedFavorites;
};