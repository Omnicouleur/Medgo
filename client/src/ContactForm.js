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


var jsonMSGs =[]

class ContactForm extends Component {

    constructor(props) {
      super(props);
      
      this.state = {name: '',
                    email: "",
                    message: '',
                    isMailValid : true,
                    isMessageValid : true,
                    isNameValid: true,
                    responseToPost: '',
                    isSuccessful : false,
                    btnIsDisabled : true ,
                    renderTable: false   };

    }

    componentDidMount() {
     this.fetchData();
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
          isValid = this.valideMail(value)
          this.setState ({isMailValid : isValid})
          break
        case 'name':
          isValid = this.valideName(value)
          this.setState ({isNameValid : isValid})
          break
        case 'message' :
          isValid = this.valideMessage(value)
          this.setState ({isMessageValid : isValid})
          break

        default:
        break;
      }
        if (!isValid) {      e.target.className  = " error-input100 input100"
      }
      else       e.target.className  = " success-input100 input100"
      
      this.setState({
        btnIsDisabled : !( 
         this.valideName(this.state.name) 
        && this.valideMessage(this.state.message) && this.valideMail(this.state.email))
      })
    }

    valideMail = (mail) => {
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      if( mail.match(mailformat))
                 return true;
      else      return false;
    }
    valideMessage = (message) => {
      if (message === ''){
          return false;
      }
      else {
        return true;
      }
    }
    valideName = (name) => {
      let nameformat = /^[a-zA-Z ]+$/
      if( name.match(nameformat))
      {
          return true;
      }
      else
      {
      return false;
      }
      
    }
    fetchData = (e) => {
      fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        jsonMSGs = json
        this.setState({
          renderTable: true
        })
      }).catch(e => {
        this.setState({
          response: `API call failed: ${e}`,
        });
      })
    }
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

      this.setState({ responseToPost: body,
                      isSuccessful : true });

      this.fetchData()
    };
    
  render() {
    return (
      <div className="App">
        <div className="bg-contact100" style={ sectionStyle } >
            <div className="container-contact100">
              <div className="wrap-contact100 row">
                <div className="contact100-pic js-tilt col" data-tilt>
                  <img src={require('./images/img-01.png')}  alt="IMG"/>
                </div>
                { /* -----------------FORM  -------------------------------- */}
                <form className="contact100-form validate-form" onSubmit={this.handleSubmit} style ={ {display : this.state.isSuccessful ? "none" : "block",
                                  }}>
                  <span className="contact100-form-title">
                    Get in touch 
                   
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
                  
                  <div className="container-contact100-form-btn disabled">
                    <input type="submit" value="send"  className="contact100-form-btn" disabled={this.state.btnIsDisabled}/>
                    
                  </div>
                </form>
                { /* ------------- Successfuly sent text -----------*/  }
                <div className="col" style ={ {display : this.state.isSuccessful ? "block" : "none",
                                   color : 'green' , fontSize : '2em' , fontWeight : 'bold' ,
                                   alignSelf: 'center'  }}>
                  
                    <i className={"fa  fa-check-square"} style={{fontSize : '6em', display: 'block' }} aria-hidden="true"></i>
                    <span>  Thank you! <br></br> Your message has been sent successfully </span>
                
                </div> 

              </div>
            </div>
        </div>
        
           {(this.state.renderTable) && <div className="tbl-header  table-responsive">           
                <table className=" table">  
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Message</th>
                        </tr>
                      </thead>
                      <tbody>
                                  { jsonMSGs.map(function(item,index) {
                                      return(
                                      
                                        <tr key={index}>
                                          <td>{item.Name}</td> 
                                          <td>{item.Email ? item.Email : ''}</td>
                                          <td>{item.Message ? item.Message : ''}</td>
                                      </tr>
                                  
                                      )
                                    })}
                      </tbody>
                </table>
          </div>
           }
      </div>
    );
  }
}

export default ContactForm;
