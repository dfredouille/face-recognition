import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesOptions = {
  particules: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

var app = new Clarifai.App({
  apiKey: '9e4bd7704be84ac48540d7e5eddb6a46'
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: 'https://images.popbuzz.com/images/63063?crop=16_9&width=660&relax=1&signature=YY3yb4mnau4LYXb7YrtahWe1lIM=',
      imageUrl: 'https://images.popbuzz.com/images/63063?crop=16_9&width=660&relax=1&signature=YY3yb4mnau4LYXb7YrtahWe1lIM=',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    // do something with responseconsole.log(response);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace, width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {

    // FIXME https://reactjs.org/docs/react-component.html#setstate
    // this.setState((state, props) => 
    //   {
    //     return {imageUrl: state.input};
    //   }
    // );
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
          this.state.input
      )
      .then( response => this.displayFaceBox(this.calculateFaceLocation(response) ) )
      .catch( err => console.log(err)
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
            params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
