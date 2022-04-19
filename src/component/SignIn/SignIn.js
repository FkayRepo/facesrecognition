import { Fragment, default as React } from 'react';
import './SignIn.css'



class SignIn extends React.Component {

	constructor(props){
			super(props);
			this.state = {
				signinEmail: '',
				signinPassword: ''
			}
		}

		onEmailChange = (event) =>{

			this.setState({signinEmail: event.target.value})
		}

		onPasswordChange = (event) =>{

			this.setState({signinPassword: event.target.value})

		}

		onSubmitSignin = () => {
			
			fetch('http://quiet-brushlands-00971.herokuapp.com/signin', {
				method: 'post',
				headers: {'content-type': 'application/json'},
				body: JSON.stringify({
					email: this.state.signinEmail,
					password: this.state.signinPassword

				})



			})
			.then(response => response.json())
			.then(user => {
			 if(user.id){
			 	this.props.inputUser(user)
			 	this.props.onRouteChange('home');
			}})
			
			
 
		}

		

	render(){

		const { onRouteChange } = this.props;
		return (

		    <div className = 'body'>

				
				<div className="Signform shadow-5 inherit">
					<p className=" f2 b">Sign In</p>
					<div>
						<p className="mb0 b">Email</p>
						<input className="br1 ba b--black-90 inherit c-black" name="Email"  onChange = {this.onEmailChange} />
					</div>

					<div>
						<p className="mb0 b">Password</p>
						<input className="br1 ba b--black-90 m0 inherit c-black"  name="Password" type="password"  onChange = {this.onPasswordChange} />
					</div>

					<button className ='mt4 inherit ba b b--black pointer grow btn-sign' onClick = {this.onSubmitSignin}  >Sign In</button>
					<p className="grow pointer underline b--black-10 w-70 center bold" onClick = {() => onRouteChange('Register')} >Register</p>

					

				</div>
		    </div>

        
 
     );

	}

	
	
		
}

export default SignIn;