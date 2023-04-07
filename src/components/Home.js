import React from "react";
import cocktailManager from "../services/CocktailManager"
import CocktailCard from "./Card";
import './Home.css';

export default class Home extends React.Component {

    state = {
        cocktailOfTheDay: null,
        favorites: [],
        cocktailList: []
    }

    componentDidMount() {
        cocktailManager.getCocktailOfTheDay().then(cocktail => {
            this.setState({ cocktailOfTheDay: cocktail });
        });
        cocktailManager.getFavorites().then(favorites => {
            this.setState({ favorites });
        });
        cocktailManager.getCocktailList().then(response => {
            this.setState({ cocktailList: response });
        })
    }

    getIsFavorite = (id) => {
        return this.state.favorites.some(cocktail => cocktail.id === id);
    }

    handleFavoriteChange = (id, isFavorite) => {
        if (isFavorite) {
            cocktailManager.removeFromFavorites(id).then(res => {
                const index = this.state.favorites.findIndex(cocktail => cocktail.id === id);
                this.setState((prev) => {
                    const favorites = [...prev.favorites];
                    favorites.splice(index, 1);
                    console.log(favorites)
                    return { favorites };
                });
            })
        } else {
            cocktailManager.addToFavorites(id).then(res => {
                cocktailManager.getCocktailById(id)
                    .then(cocktail => {
                        this.setState(
                            (prev) => ({ favorites: prev.favorites.concat([cocktail]) })
                        );
                    })

            })
        }
    }

    render() {
        return <div className="container">
            {this.state.cocktailOfTheDay ?
                <CocktailCard
                    onFavChange={this.handleFavoriteChange}
                    isFavorite={this.getIsFavorite(this.state.cocktailOfTheDay.id)}
                    cocktail={this.state.cocktailOfTheDay}>
                </CocktailCard> : null}
            <h2>Favorites section:</h2>
            {this.state.favorites.length === 0 ? 'No favorites yet' : <div className="cocktailsContainer">{this.state.favorites.map(cocktail =>
                <CocktailCard
                    key={cocktail.id}
                    onFavChange={this.handleFavoriteChange}
                    isFavorite={this.getIsFavorite(cocktail.id)}
                    cocktail={cocktail}>
                </CocktailCard>)}
            </div>
            }
            <h2>Cocktails list:</h2>
            {this.state.cocktailList.length === 0 ? "Loading" : <div className="cocktailsContainer">
                {this.state.cocktailList.map(cocktail =>
                    <CocktailCard
                        key={cocktail.id}
                        onFavChange={this.handleFavoriteChange}
                        isFavorite={this.getIsFavorite(cocktail.id)}
                        cocktail={cocktail}>
                    </CocktailCard>)}
            </div>

            }
        </div>
    }
}