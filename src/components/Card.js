import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Card.css';
import { ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CocktailCard(props) {

    const {name, image, ingredients, id, isCoctailOfTheDay } = props.cocktail;


    return <Card className={isCoctailOfTheDay ? 'cocktailCard cocktailOfTheDay' : 'cocktailCard'}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
                {ingredients.join(', ')}
            </Card.Text>
            <ButtonGroup>
                <Button onClick={() => props.onFavChange(id, props.isFavorite)} variant={isCoctailOfTheDay ? "light" : "primary" }>{!props.isFavorite ? 'Add to fav' : 'Remove fav'}</Button>
                <Button variant={isCoctailOfTheDay ? "light" : "primary" }><Link className='link' to={`/details/${id}`}>Details</Link></Button>
            </ButtonGroup>
        </Card.Body>
    </Card>;

}