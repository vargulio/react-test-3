import axios from "axios";

class Cocktail {
    constructor(cocktail, isCoctailOfTheDay = false) {

        const ingredients = Object.keys(cocktail)
                .filter(key => key.startsWith('strIngredient'))
                .map(key => cocktail[key])
                .filter(Boolean);

        this.name = cocktail.strDrink;
        this.image = cocktail.strDrinkThumb;
        this.ingredients = ingredients;
        this.id = cocktail.idDrink;
        this.isCoctailOfTheDay = isCoctailOfTheDay;

    }
}

class CocktailManager {



    getCocktailOfTheDay() {
        return axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(res => {
            return new Cocktail(res.data.drinks[0], true);
        })
    }

    getFavorites() {
        return axios.get('http://localhost:8080/favorite-cocktails', { headers: { 'identity': '641bea0f5b51e56afdcd6599' } })
            .then(res => res.data.favorites)
            .then(favIds => Promise.all(favIds.map(id => this.getCocktailById(id))))
            .then(responses => {
                return responses;
            });
    }

    getCocktailById(id) {
        return axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='+id).then(res => {
            return new Cocktail(res.data.drinks[0]);
        })
    }

    addToFavorites(id) {
        return axios.post(
            'http://localhost:8080/favorite-cocktails',
            { id },
            { headers: { 'identity': '641bea0f5b51e56afdcd6599' } }
        );
    }

    removeFromFavorites(id) {
        return axios.delete(
            'http://localhost:8080/favorite-cocktails',
            { headers: { 'identity': '641bea0f5b51e56afdcd6599', 'cocktailId': id } }
        );
    }

    getCocktailList() {
        return axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(res => {
            return res.data.drinks.map(cocktail => new Cocktail(cocktail));
        })
    }
}
const cocktailManager = new CocktailManager();

export default cocktailManager;