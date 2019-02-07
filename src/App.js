import React, { PureComponent } from "react";
import "./App.css";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import Error from "./components/Error";
import { withRouter } from "react-router";
import loader from "./img/loader.svg";
import cx from "classnames";
import { API_key } from './API_key'

class App extends PureComponent {
  state = {
    recipes: [],
    displayLoader: false,
    noItemsFound: false,
    searchedItem: "",
    page: 1,
    limitError: false
  };

  getRecipe = async (textInput, page = 1) => {
    if (this.state.recipes) {
      this.setState({
        displayLoader: true,
        noItemsFound: false,
        recipes: []
      });
    }

    // FETCH API
    const API_CALL = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_key}&q=${textInput}&page=${page}`
    );
    const data = await API_CALL.json();

    if (data.error) {
      this.setState({ displayLoader: false, limitError: true });
    }

    if (data.recipes) {
      this.setState(
        {
          recipes: data.recipes,
          displayLoader: false,
          searchedItem: textInput,
          noItemsFound: data.recipes.length === 0
        },
        () => {
          this.props.history.push(`?search=${textInput}&page=${page}`);
          // if(this.state.recipes.length === 0) this.setState({ noItemsFound: true })
        }
      );
    }
  };

  // CLEAR SEARCH

  clearSearch = () => {
    this.setState(
      {
        recipes: [],
        searchedItem: "",
        page: 1
      },
      () => {
        this.props.history.push("/");
      }
    );
    const filter = JSON.stringify(this.state.searchedItem);
    localStorage.setItem("filter", filter);
  };

  componentDidMount = () => {
    // const json = localStorage.getItem('filter');
    // const filter = JSON.parse(json);
    const queryParams = {};
    this.props.location.search
      .substring(1)
      .split("&")
      .forEach(pair => {
        const [key, value] = pair.split("=");
        queryParams[key] = value;
      });
    this.setState(
      { searchedItem: queryParams.search, page: parseInt(queryParams.page) },
      () => {
        if (queryParams.search)
          this.getRecipe(queryParams.search, queryParams.page);
      }
    );
  };

  changePage = e => {
    this.setState({ page: parseInt(e.target.value) }, () => {
      const searchedItem = this.state.searchedItem;
      this.getRecipe(searchedItem, this.state.page);
    });
  };

  render() {
    const {
      recipes,
      searchedItem,
      displayLoader,
      noItemsFound,
      page,
      limitError
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />

        {/* ERROR HANDLING */}
        {limitError && <Error />}

        {/*** SHOW FILTER AND CLEAR BUTTON ***/}
        {recipes.length !== 0 && (
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <h2 className="filter">
                Displaying results for:{" "}
                <span className="filter__item">{searchedItem}</span>
              </h2>
              <button
                onClick={this.clearSearch}
                type="button"
                className="form__button"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/*** DISPLAY LOADER ***/}
        {displayLoader && (
          <div>
            <img className="loader" src={loader} alt="Loader icon" />
          </div>
        )}

        {/*** EMPTY STATE ***/}
        {noItemsFound && <h2>No recipes found</h2>}

        <Recipes recipes={recipes} />

        {/*** PAGINATION ***/}
        {recipes.length !== 0 && (
          <div className="container">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className="page-link button-color"
                    value="1"
                    disabled={page === 1}
                  >
                    &laquo;
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className="page-link button-color"
                    disabled={page === 1}
                    value={this.state.page - 1}
                  >
                    Prev
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className={cx("page-link button-color", {
                      selected: page === 1
                    })}
                    value="1"
                  >
                    1
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className={cx("page-link button-color", {
                      selected: page === 2
                    })}
                    value="2"
                  >
                    2
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className={cx("page-link button-color", {
                      selected: page === 3
                    })}
                    value="3"
                  >
                    3
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className="page-link button-color"
                    disabled={page === 3}
                    value={this.state.page + 1}
                  >
                    Next
                  </button>
                </li>
                <li className="page-item">
                  <button
                    onClick={this.changePage}
                    className="page-link button-color"
                    value="3"
                    disabled={page === 3}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(App);
