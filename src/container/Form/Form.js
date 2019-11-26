import React, { Component } from 'react';
import Element from '../../Components/Element/Element';
import clasess from './Form.module.css'
import { identifier } from '@babel/types';
import { get } from 'https';
class ConfigForm extends Component {


    // state = {
    //     configForm: {
    //         formSubmitted: false,
    //         formHeading: 'Config Form',
    //         username: {
    //             label: 'userName',
    //             type: 'text',
    //             value: '',
    //             validation: false,
    //             validationMssg: false

    //         },

    //         password: {
    //             label: 'password',
    //             type: 'password',
    //             value: '',
    //             validation: false,
    //             validationMssg: false

    //         },

    //         textArea: {
    //             label: 'Address',
    //             type: 'textArea',
    //             value: '',
    //             validation: true,
    //             validationMssg: false

    //         },

    //         dropDown: {
    //             label: 'configDropDown',
    //             type: 'select',
    //             optionValue: [
    //                 {
    //                     displayValue: 'select',
    //                     serverID: ''
    //                 },

    //                 {
    //                     displayValue: 'option1',
    //                     serverID: '1'
    //                 },
    //                 {
    //                     displayValue: 'option2',
    //                     serverID: '2'
    //                 }
    //             ],
    //             value: '',
    //             validation: true,
    //             validationMssg: false

    //         },

    //         radioBtn: {
    //             label: 'Radio Button',
    //             type: 'radio',
    //             radioValue: [

    //                 {
    //                     label: 'optio1',
    //                     radioValue: '1'
    //                 },
    //                 {
    //                     label: 'optio2',
    //                     radioValue: '1'
    //                 }
    //             ],
    //             value: '',
    //             validation: true,
    //             validationMssg: false

    //         },

    //         number: {
    //             label: 'Number',
    //             type: 'number',
    //             value: '',
    //             validation: true,
    //             validationMssg: false

    //         }, 

    //         multiselect: {
    //             label: 'Multiselect',
    //             type: 'multiselect',
    //             optionValue: [

    //                 {
    //                     displayValue: 'option1',
    //                     serverID: '1'
    //                 },
    //                 {
    //                     displayValue: 'option2',
    //                     serverID: '2'
    //                 },

    //                 {
    //                     displayValue: 'option3',
    //                     serverID: '3'
    //                 }, 

    //                 {
    //                     displayValue: 'option4',
    //                     serverID: '4'
    //                 }
    //             ],
    //             value: '',
    //             validation: true,
    //             validationMssg: false,
    //             toggleMultiselect : false

    //         }
    //     },
    //     externalStyle: false,
    //     styleClass: clasess

    // }

    multiSelectCheckBoxesArr = [];


    async elementChangeHandler(event, configElementArrayElement) {
        const copyConfigForm = { ...this.props.formState.configForm };
        const cpyElementForm = { ...copyConfigForm[configElementArrayElement] };
        cpyElementForm.value = event.target.value;
        if (this.props.formState.formSubmitted) {
            const validatiomMssg = this.setValidationMessageHandler(cpyElementForm.validation, cpyElementForm.value);
            cpyElementForm.validationMssg = validatiomMssg;
        }
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

   



    toggleMultiselectDropDownHandler = (value) => {
        const getConfigFormData = {...this.state.configForm};
        const getMultiSelectData = {...this.state.configForm[value]};
        getMultiSelectData.toggleMultiselect = !getMultiSelectData.toggleMultiselect;
        getConfigFormData[value] = getMultiSelectData;
        this.setState({
            configForm : getConfigFormData
        })
        
    }

    multiselectCheckBoxHandler = async(event, indetifier) => {
        const selectedOptionIndex = event.target.value;
        const getMultiSelectData = {...this.state.configForm[indetifier]};
       const selectedOption = getMultiSelectData.optionValue[selectedOptionIndex];
       console.log('selectedOption', selectedOption);
        if(event.target.checked){
            this.multiSelectCheckBoxesArr.push(selectedOption);
        }
        else {
            const getIndex =this.multiSelectCheckBoxesArr.indexOf(selectedOption);
            this.multiSelectCheckBoxesArr.splice(getIndex, 1);
        }  

        const copyConfigForm = { ...this.state.configForm };
        const cpyElementForm = { ...copyConfigForm[indetifier] };
        cpyElementForm.value = this.multiSelectCheckBoxesArr;
        if (this.state.formSubmitted) {
            const validatiomMssg = this.setValidationMessageHandler(cpyElementForm.validation, cpyElementForm.value);
            cpyElementForm.validationMssg = validatiomMssg;
        }
        copyConfigForm[indetifier] = cpyElementForm;
        await this.setState({
            configForm: copyConfigForm
        });
        console.log(this.state.configForm);
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
        this.setState({
            formSubmitted: true
        })
    }

    render() {
        let manadatorField = null;
        let manadatorFieldValidation = null;
        let element = null;
        let customClasses = null;
        if (!this.props.formState.configForm.externalStyle) {
            customClasses = clasess;
        }
        const configElementArray = Object.keys(this.props.formState.configForm);
        if (configElementArray && configElementArray.length > 0) {
            element = configElementArray.map((configElementArrayElement) => {
                const validationMessageLabel = this.props.formState.configForm[configElementArrayElement].label
                { this.props.formState.configForm[configElementArrayElement].validation ? manadatorField = <span className={clasess.MandatoryFields}>*</span> : manadatorField = null };
                { this.props.formState.configForm[configElementArrayElement].validationMssg ? manadatorFieldValidation = <div className={clasess.configErrrAlert}> {validationMessageLabel}  is manadotry</div> : manadatorFieldValidation = null };
                return (
                    <div className={customClasses.configFormElement}>
                        <label className={customClasses.configLable}>{this.props.formState.configForm[configElementArrayElement].label} {manadatorField}</label>
                        <Element
                            key={this.props.formState.configForm[configElementArrayElement].label}
                            elementDetails={this.props.formState.configForm[configElementArrayElement]}
                            elementType={this.props.formState.configForm[configElementArrayElement].type}
                            elementValue={this.props.formState.configForm[configElementArrayElement].value}
                            elementChange={(event) => this.elementChangeHandler(event, configElementArrayElement)}
                            externalStyle={this.props.formState.externalStyle}
                            styleClass={this.props.formState.styleClass}
                            onMultiSelectCheckBox = {(event) => this.multiselectCheckBoxHandler(event, configElementArrayElement)}
                            toggleMultiselectDropDown = {() => this.toggleMultiselectDropDownHandler(configElementArrayElement)}
                        />
                        {manadatorFieldValidation}
                    </div>
                )
            })

        }
        return (
            <form className={customClasses.configForm}>
                {element}
                <button onClick={this.onSubmitHandler}>Submit</button>
            </form>
        )

    }


}

export default ConfigForm;