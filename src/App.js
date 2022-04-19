import React, {Component} from 'react';
import './App.css';
import Navigation from './component/Navigation/Navigation.js';
import Logo from './component/Logo/Logo.js';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm.js';
import Rank from './component/Rank/Rank.js';
import FaceRecognition from './component/FaceRecognition/FaceRecognition.js';
import Particles from "react-tsparticles";
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/Register';




const particlesOptions = {
   "particles": {
    "links": {
      "enable": true,
      "opacity": 0.5
    },
    "move": {
      "enable": true
    },
    "opacity": {
      "value": 0.5
    },
    "size": {
      "value": 2
    },

    "number": {
      "value": 200
    }
  }
}


const initialState = {

      input: '',
      url: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      detectStatus: false,
      count: 0,
      user: {

        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: '', 
      },

  
}



class App extends Component {
  constructor(){

    super();
    this.state = initialState;
  }

 inputUser = (user) => {
  this.setState({ user: {
    id: user.id,
    name: user.name,
    email: user.email,
    entries: user.entries,
    joined: user.joined,

    } 
  })
 }

 incrementCount() {
  this.setState((state) => {
    // Important: read `state` instead of `this.state` when updating.
    return {count: this.state.count + 1}
  });
}

  detectFace = async () => {

    await fetch('http://quiet-brushlands-00971.herokuapp.com/imageURL', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url: this.state.input
      })
    })
    .then(response => response.json())
    .then(data => {
      this.displayBox(this.calculateFaceBox(data))
      console.log(data.FaceDetails)
    })
    .catch(err => console.log(err))

  if(this.state.detectStatus){
   fetch('http://quiet-brushlands-00971.herokuapp.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
   .then(response => response.json())
   .then(count => {
     this.setState(Object.assign(this.state.user, { entries: count}))
     console.log(count)
    })
   .catch(err => console.log(err))
  } 

  }


  calculateFaceBox = (response) => {

    let faceboxes = []
    let facelength = response.FaceDetails.length;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height)
    
    for(var i=0; i < facelength; i++){

        let face = response.FaceDetails[i].BoundingBox;
        faceboxes.push({

          top: Number(face.Top) * height, 
          left: Number(face.Left) * width, 
          bottom: height-(Number(face.Top)*height)-(height * Number(face.Height)), 
          right: width-(Number(face.Left) * width)-(width * Number(face.Width)),

        })
    }
  
     return faceboxes;
  }

  

  displayBox = (box) => {

    this.setState({box: box})
    this.setState({detectStatus: true})
  }


  
  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onClickChange = () =>{

  this.setState({url: this.state.input})
   this.detectFace();

  }

  onRouteChange = (route) => {

    this.setState({route: route})

    if(route === 'signout' ){
       this.setState(initialState)
       this.setState({route: 'signin'})
    }

    else if (route === 'home'){
      this.setState({ isSignedIn : true})
    } 
   
  }


  render(){


    return (
      <div className="App">
        
        <Particles className ='particles' params = {particlesOptions} />
       
        <Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn}/>
        { this.state.route === 'home'

          ?<div>

              <Logo/>
              <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
              <ImageLinkForm onInputChange = {this.onInputChange} onClickChange = {this.onClickChange}/>
              <FaceRecognition facebox = {this.state.box} imageUrl = {this.state.url} />
            </div>
          :(

             this.state.route === 'signin'
             ? <SignIn onRouteChange = {this.onRouteChange} inputUser = {this.inputUser}/>
             : <Register onRouteChange = {this.onRouteChange} inputUser = {this.inputUser}/>

            ) 
        }
   
      </div>
    );
  }
}

export default App;