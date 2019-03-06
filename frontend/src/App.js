import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './Navigation/Navigation';
import Signin from './Signin/Signin';
import Register from './Register/Register';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm'
import Rank from './Rank/Rank'
import FaceRecognition from './FaceRecognition/FaceRecognition'
import './App.css';

const app = new Clarifai.App({
 apiKey: '889ca510c2d14b4ab76113119b072a60'
});


const particlesOptions ={
    particles:{ 
        number:{
           value:90,
               density:{
                      enable:true,
                      value_area:800 
       }
      }
    }
  } 

  
class App extends Component {

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:'0',
        joined: ''
      }
    }
  }

  loadUser=(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined:data.joined
    }

    })
  }


  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
    
  // }

  calculateFaceLocation = (data) =>{
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   //console.log(width, height);
   
   return{
    leftCol:clarifaiFace.left_col*width,
    topRow:clarifaiFace.top_row*height,
    rightCol:width-(clarifaiFace.left_col*width),
    bottomRow:height-(clarifaiFace.bottom_row*height)
   } 

  }
  
  displayFaceBox = (box) =>{
    //console.log(box);
    this.setState({box:box});

  }

  onInputChange = (event) =>{

        this.setState({input:event.target.value});
    }

  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input});
      app.models
      .predict( 
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response =>{
        this.displayFaceBox(this.calculateFaceLocation(response))
        if(response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
        })
      })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {entries:count})) 
          })
        }
      })
      .catch(err=> console.log(err));
       
    }

    onRouteChange = (route) =>{
      if(route === 'signout'){
       this.setState({ isSignedIn: false })
       }else if(route === 'home'){
        this.setState({ isSignedIn: true })
       }      


      this.setState({route : route});

    }

  render() {
    const{ isSignedIn, route, imageUrl, box} = this.state;
    return (
      <div className="App">
       <Particles className='particles'
        params={particlesOptions}
        />
      <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
      
      { route === 'home'
      ?  <div>
        
       <Logo />
       <Rank name={this.state.user.name} entries={this.state.user.entries}/>
       <ImageLinkForm 
       onInputChange={this.onInputChange}
       onButtonSubmit={this.onButtonSubmit}
       />

      <FaceRecognition box={box} imageUrl={imageUrl}/>
      </div>

      :( route === 'signin'
      ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>    
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
       
       )
    }

      </div>
    );
  }
}

export default App;
