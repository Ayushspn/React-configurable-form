import React, { Component } from 'react';
import Element from '../../Components/Element/Element';
import clasess from './Form.module.css'
class ConfigForm extends Component {
    state = {
        configForm: {
            username: {
                label: 'user',
                type: 'text',
                value: '',
                validation: true,
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
                label: 'drop-down',
                type: 'select',
                optionValue: [
                    {
                        displayValue: 'select',
                        serverID: ''
                    },

                    {
                        displayValue: 'a',
                        serverID: '1'
                    },
                    {
                        displayValue: 'b',
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
                        label: 'a',
                        radioValue: '1'
                    },
                    {
                        label: 'b',
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

            }
        },
        externalStyle : true,
        styleClass : clasess
        
    }


    async elementChangeHandler(event, configElementArrayElement) {
        const copyConfigForm = { ...this.state.configForm };
        const cpyElementForm = { ...copyConfigForm[configElementArrayElement] };
        cpyElementForm.value = event.target.value;
        copyConfigForm[configElementArrayElement] = cpyElementForm;
        await this.setState({
            configForm: copyConfigForm
        });
    }

    setValidationMessageHandler = (validationParameter, value) => {
        if (validationParameter) {
            if (!value) {
                return true
            }
            else {
                return false
            }
        }
        return false;

    }


    onSubmitHandler = (event) => {
        event.preventDefault()
        let copyConfigForm = { ...this.state.configForm };
        let cpyElementForm = {};
        Object.keys(this.state.configForm).map((keyConfig) => {
            const elemValue = this.state.configForm[keyConfig].value
            const elemValidation = this.state.configForm[keyConfig].validation;
            const setValidationMssg = this.setValidationMessageHandler(elemValidation, elemValue);
            cpyElementForm = { ...copyConfigForm[keyConfig] };
            cpyElementForm.validationMssg = setValidationMssg;
            copyConfigForm[keyConfig] = cpyElementForm;
            this.setState({
                configForm: copyConfigForm
            });
        });
        console.log('this.setState', this.state.configForm);

    }

    render() {
        let manadatorField = null;
        let manadatorFieldValidation = null;
        let element = null;
        const configElementArray = Object.keys(this.state.configForm);
        if (configElementArray && configElementArray.length > 0) {
            element = configElementArray.map((configElementArrayElement) => {
                const validationMessageLabel = this.state.configForm[configElementArrayElement].label
                { this.state.configForm[configElementArrayElement].validation ? manadatorField = <span className={clasess.MandatoryFields}>*</span> : manadatorField = null };
                { this.state.configForm[configElementArrayElement].validationMssg ? manadatorFieldValidation = <div> {validationMessageLabel}  is manadotry</div> : manadatorFieldValidation = null };
                return (
                    <div>
                        <label>{this.state.configForm[configElementArrayElement].label} {manadatorField}</label>
                        <Element
                            key={this.state.configForm[configElementArrayElement].label}
                            elementDetails={this.state.configForm[configElementArrayElement]}
                            elementType={this.state.configForm[configElementArrayElement].type}
                            elementValue={this.state.configForm[configElementArrayElement].value}
                            elementChange={(event) => this.elementChangeHandler(event, configElementArrayElement)}
                            externalStyle = {this.state.externalStyle}
                            styleClass = {this.state.styleClass}
                            
                        />
                        {manadatorFieldValidation}
                    </div>
                )
            })

        }
        return (
            <form>
                {element}
                <button onClick={this.onSubmitHandler}>Submit</button>
            </form>
        )

    }


}

export default ConfigForm;