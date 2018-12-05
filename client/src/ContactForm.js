import React, { Component } from 'react';
import './App.css';
import Background from './images/bg-01.jpg';
import  { Field } from './Field';
import './vendor/bootstrap/css/bootstrap.min.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './vendor/animate/animate.css';
import './vendor/css-hamburgers/hamburgers.min.css';
import './vendor/select2/select2.min.css';
import './css/util.css';
import './css/main.css';
const sectionStyle = {
    backgroundImage: 'url(' + Background + ')',
};



class ContactForm extends Component {

    constructor(props) {
      super(props);
      this.state = {name: '0',
                    email: "1",
                    message: '',
                    isMailValid : true,
                    isMessageValid : true,
                    isNameValid: true,
                    serverName: '',
                    body: '',
                    response: '',
                    post: '',
                    responseToPost: '',
    };
    }

    componentDidMount() {
     
    }
    handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value})
    }
    
    ValidateUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      let isValid= false;
      switch(name) {
        case 'email':
          isValid=this.valideMail(value)
          break
        case 'name':
          isValid=this.valideName(value)
          break
        case 'message' : 
          isValid=this.valideMessage(value)
          break

        default:
        break;
      }
        if (!isValid) {      e.target.className  = " error-input100 input100"
      }
      else       e.target.className  = " success-input100 input100"

    }

    valideMail = (mail) => {
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      if( mail.match(mailformat))
      {
          this.setState ({isMailValid : true})
          return true;
      }
      else
      {
        this.setState ({isMailValid : false})
      return false;
      
      }
    }
    valideMessage = (message) => {
      if (message === ''){
        this.setState ({isMessageValid : false})
          return false;
      }
      else {
        this.setState ({isMessageValid : true})
        return true;
      }
    }
    valideName = (name) => {
      return true;
    }


  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.name, 
                             email: this.state.email,
                             message: this.state.message }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
    
    this.callApi()
    .then(res => this.setState({ response: res.data[0].Name }))
    .catch(err => console.log(err));
  };
  
  
  render() {
    
    return (
      <div className="App">
        <div className="bg-contact100" style={ sectionStyle } >
            <div className="container-contact100">
              <div className="wrap-contact100">
                <div className="contact100-pic js-tilt" data-tilt>
                  <img src={require('./images/img-01.png')}  alt="IMG"/>
                </div>
                <form className="contact100-form validate-form" onSubmit={this.handleSubmit}>
                  <span className="contact100-form-title">
                    Get in touch
                    response : {this.state.response} 
                  </span>
                  <Field type="text" 
                         name="name" 
                         icon="fa-user" 
                         onchange= {(e) => {this.handleUserInput(e)}}
                         onBlur = {(e) => {this.ValidateUserInput(e)}} 
                         value={this.state.name}
                         isValid = {this.state.isNameValid}/>

                      
                  <Field type="text" 
                         name="email" 
                         icon="fa-envelope" 
                         onchange= {(e) => {this.handleUserInput(e)}} 
                         onBlur = {(e) => {this.ValidateUserInput(e)}} 
                         value={this.state.email}
                         isValid = {this.state.isMailValid} />

                 
                  <Field type="textarea"
                         name="message"
                         onchange= {(e) => {this.handleUserInput(e)}}
                         onBlur = {(e) => {this.ValidateUserInput(e)}}
                         value={this.state.message}
                         isValid = {this.state.isMessageValid}/>
                  
                  <div className="container-contact100-form-btn">
                    <input type="submit" value="send"  className="contact100-form-btn" />
                   
                      
                    <p>{this.state.responseToPost}</p>
                  </div>
                </form>
              </div>
            </div>
        </div>

        

      </div>
    );
  }
}

export default ContactForm;
