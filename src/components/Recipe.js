import React, { Component } from 'react';
import loader from '../img/loader.svg';
import Error from './Error'
import { API_key } from '../API_key';

class Recipe extends Component {
    state = {
        activeRecipe: {}
    }

    componentDidMount =  async () => {
        const title = this.props.match.params.id;
        
        // FETCH API
        const req = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_key}&q=${title}`);
        const res = await req.json();

        if (res.error) {
            this.setState({ activeRecipe: {} });
        } else {
            this.setState({ activeRecipe: res.recipes[0] });
        }
        
        console.log(this.state.activeRecipe)
    }



    render() {
        const { title, image_url, publisher, publisher_url } = this.state.activeRecipe;
        return (
            <div className="container">
                {
                    Object.keys(this.state.activeRecipe).length > 0
                    ?
                    <div className="active-recipe">
                        <img className="active-recipe__img" src={image_url} alt={ title }/>
                        <hr className="my-4"></hr>
                        <h3 className="active-recipe__title">{ title }</h3>
                        <h4 className="active-recipe__publisher">
                            Publisher: <span>{ publisher }</span>
                        </h4>
                        <p className="active-recipe__website">
                            Website: <span><a href={publisher_url} target="_blank" rel="noopener noreferrer">{ publisher_url }</a></span>
                        </p>
                        <button onClick={this.props.history.goBack} className="active-recipe__button">
                            Go Back
                        </button>
                    </div>
                    :
                    <div>
                        <img className="loader" src={ loader } alt="Loader icon" />
                    </div>
                }

                {
                    !this.state.activeRecipe
                    &&
                    <Error />
                }
            </div>
        );
    }
}
 
export default Recipe;