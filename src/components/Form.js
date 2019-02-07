import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    state = {
        inputValue: ''
    }

    getInput = (e) => {
        e.preventDefault();
        const textInput = this.state.inputValue;
        this.props.getRecipe(textInput);
    }

    getValue = (e) => this.setState({ inputValue: e.target.value });


    render() {
        return(
            <form onSubmit={this.getInput} style={{ marginBottom: '1rem' }}>
                <input onChange={this.getValue} className="form__input" type="text" placeholder="Search Item" name="recipeName" />
                <button className="form__button" disabled={ this.state.inputValue.length === 0 }>Search</button>
            </form>
        )
    }
}

Form.propTypes = {
    getRecipe: PropTypes.func.isRequired
}

export default Form;