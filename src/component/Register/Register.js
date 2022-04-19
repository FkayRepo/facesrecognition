import { Fragment, default as React } from 'react';
import './Register.css'


class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: ''

    }
  }

  onNameRegister = (event) => {

    this.setState({registerName: event.target.value})
  }

  onEmailRegister = (event) => {

    this.setState({registerEmail: event.target.value})
  }

  onPasswordRegister = (event) => {

    this.setState({registerPassword: event.target.value})
  }

  onSubmitRegister = () => {

    console.log(this.state)

    fetch('http://quiet-brushlands-00971.herokuapp.com/register', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    }).then(response => response.json())
    .then(user => {

      if(user.id){
        console.log(user)
        this.props.inputUser(user)
        this.props.onRouteChange('home')
      }

    })


  }

  render(){

    const { onRouteChange } = this.props

     return (
      <div className = 'body'>

        <div className="Signform shadow-5 inherit">
          <p className=" f2 b">Register</p>
          <div>
            <p className="mb0 b">Name</p>
            <input className="br1 ba b--black-90 inherit c-black" name="Name" onChange = {this.onNameRegister}/>
          </div>

          <div>
            <p className="mb0 b">Email</p>
            <input className="br1 ba b--black-90 m0 inherit c-black"  name="Email" onChange={this.onEmailRegister}/>
          </div>

          <div>
            <p className="mb0 b">Password</p>
            <input className="br1 ba b--black-90 m0 inherit c-black" type='password' name="Password" onChange={this.onPasswordRegister}/>
          </div>


          <button className ='mt4 inherit ba b b--black pointer grow btn-sign mb4' onClick = {this.onSubmitRegister} >Sign Up</button>
          

        </div>
      </div>

        
 
     );
  

  }
 
    
}

export default Register;