import React from 'react';

class SearchBar extends React.Component {

    constructor() {
        super();
    }

    onInputChange(term) {
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <input placeholder="Enter text to search for gifs!"
                       onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

}

export default SearchBar;
