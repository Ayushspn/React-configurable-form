import React from 'react';

const Element = (props) => {
    let element = null;;
    let externalClasses = null;
    if(props.externalStyle){
        externalClasses = props.styleClass;
    }
    switch (props.elementType) {
        case 'text':
            element = <input type={props.elementType} value={props.elementValue} onChange={props.elementChange}  className = {externalClasses.border}/>;
            break;
        case 'password':
            element = <input type={props.elementType} value={props.elementValue} onChange={props.elementChange} />;
            break;
        case 'select':
            const selectOption = props.elementDetails.optionValue.map((selectValue) => <option>{selectValue.displayValue}</option>)
            element = (
                <select onChange={props.elementChange}>
                    {selectOption}
                </select>);
            break;
        case 'textArea':
            element = <input type={props.elementType} onChange={props.elementChange} />
            break;
        case 'radio':
            const radioButton = props.elementDetails.radioValue.map((selectValue) => {
                return (
                    <div>
                        <label>{selectValue.label}</label>
                        <input type="radio" name="configRadioBtn" onChange={props.elementChange} value={selectValue.radioValue} />
                    </div>
                )
            })
            element = radioButton;
            break;
        case 'number':
            element = <input type={props.elementType} value={props.elementValue} onChange={props.elementChange} />;
            break;
    }

    return element;
}

export default Element;