import React from 'react';
import logo from './logo.svg';
import Form from './container/Form/Form';
import  classes  from './App.css';

class App extends React.Component {
  state = {
    configForm: {
        formSubmitted: false,
        formHeading: 'Config Form',
        username: {
            label: 'userName',
            type: 'text',
            value: '',
            validation: false,
            validationMssg: false

        },

        password: {
            label: 'password',
            type: 'password',
            value: '',
            validation: false,
            validationMssg: false

        },

        textArea: {
            label: 'Address',
            type: 'textArea',
            value: '',
            validation: true,
            validationMssg: false

        },

        dropDown: {
            label: 'configDropDown',
            type: 'select',
            optionValue: [
                {
                    displayValue: 'select',
                    serverID: ''
                },

                {
                    displayValue: 'option1',
                    serverID: '1'
                },
                {
                    displayValue: 'option2',
                    serverID: '2'
                }
            ],
            value: '',
            validation: true,
            validationMssg: false

        },

        radioBtn: {
            label: 'Radio Button',
            type: 'radio',
            radioValue: [

                {
                    label: 'optio1',
                    radioValue: '1'
                },
                {
                    label: 'optio2',
                    radioValue: '1'
                }
            ],
            value: '',
            validation: true,
            validationMssg: false

        },

        number: {
            label: 'Number',
            type: 'number',
            value: '',
            validation: true,
            validationMssg: false

        }, 

        multiselect: {
            label: 'Multiselect',
            type: 'multiselect',
            optionValue: [

                {
                    displayValue: 'option1',
                    serverID: '1'
                },
                {
                    displayValue: 'option2',
                    serverID: '2'
                },

                {
                    displayValue: 'option3',
                    serverID: '3'
                }, 

                {
                    displayValue: 'option4',
                    serverID: '4'
                }
            ],
            value: '',
            validation: true,
            validationMssg: false,
            toggleMultiselect : false

        }
    },
    externalStyle: false,
    styleClass: classes

}
  render(){
    return (<Form formState = {this.state}/>
      );
  }
  
}

export default App;
