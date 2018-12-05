import React from 'react';

export class Field extends React.Component {

    render(){
         return(
             <div className="wrap-input100 validate-input" data-validate = "Name is required">
                    { (this.props.type === "text") &&
                    <input className="input100 "
                           type="text" name={this.props.name} 
                           placeholder={this.props.name}
                           onBlur = {this.props.onBlur}
                           onChange= {this.props.onchange}
                           value =  {this.props.value}/>
                    }

                    {(this.props.type === "textarea") &&
                    <textarea className="input100 " name="message" 
                              placeholder="Message" 
                              value = {this.props.value} 
                              onChange= {this.props.onchange}
                              onBlur = {this.props.onBlur}/>
                    }

                    <span className="focus-input100"> </span>

                    { (this.props.type === "text") &&   
                    <span className="symbol-input100">
                      <i className={"fa " + this.props.icon} aria-hidden="true"></i>
                    </span> 
                    }
                     <span style ={ {display : this.props.isValid ? "none" : "block",
                    color : 'red'}}> 
                    <i className={"fa fa-exclamation-triangle"} aria-hidden="true"></i> Mail is wrong</span>
            </div>
                  
         )
    }
}
Field.defaultProps = {
    message: 'j',
  };