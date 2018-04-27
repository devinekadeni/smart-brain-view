import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errorSignIn: false,
      errorMessage: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value })
  }

  onSignIn = () => {
    this.setState({ errorSignIn: false });
    fetch('https://fierce-coast-49838.herokuapp.com/signIn', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(res => {
        if(res.id){          
          this.props.loadUser(res);
          this.props.onRouteChange('home');
        }else {
          this.setState({ errorSignIn: true, errorMessage: res });
        }
      })
  }

  render() {
    const errorMessage = this.state.errorSignIn ? <div className='red'>{this.state.errorMessage}</div> : null;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
              </div>
            </fieldset>
            <div className="">
              <input 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in"
                onClick={this.onSignIn}/>
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => this.props.onRouteChange('register')} style={{ cursor: 'pointer' }} className="f6 link dim black db">Register</p>
            </div>
            {errorMessage}
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;