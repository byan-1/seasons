/* eslint-disable no-useless-constructor */
import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner"

class App extends React.Component {
  //initialization
  state = { lat: null, errorMessage: ''};
  constructor(props) {
    super(props);
  }
  //initial data loading
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    );
  }
  //data loading when state/props change
  componentDidUpdate() {
    console.log('Updated')
  }
  //cleanup
  componentWillUnmount() {
    console.log('Unmounted')
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>
    }
    return <Spinner message="Please accept location request"/>
  }

  //return JSX only
  render() {
    return (
    <div className="border red">
      {this.renderContent()}
    </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
