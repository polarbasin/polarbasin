import React from 'react';

import Button from './Button.jsx';
import Search from './Search.jsx';
import Coords from './Coords.jsx';
import helpers from '../helpers';
import '../css/app.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoClick = this.handleGoClick.bind(this);

    this.state = {
      currCoods: {},
      localeUpdateCount: 0,
      err: { message: '' },
    };
  }

  componentDidMount() {
    helpers.watchGeolocation((err, position) => {
      if (err) {
        console.error(err);
        this.setState({ err });
      } else {
        console.log('getting new location', position);
        this.setState({
          currCoods: position.coords,
          localeUpdateCount: this.state.localeUpdateCount += 1,
        });
      }
    });
  }

  handleGoClick() {
    // GET req to our server with location and search query
    // loading pacifier?
  }

  render() {
    return (
      <div>
        <h1>foodigi</h1>
        <p>What do you<br />want to eat?</p>
        <Coords
          location={this.state.currCoods}
          count={this.state.localeUpdateCount}
          err={this.state.err}
        />
        <Search />
        <Button handleClick={this.handleGoClick} />
      </div>
    );
  }
}

export default App;