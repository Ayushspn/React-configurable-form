import React from 'react';

const Element = (props) => {
    let element = null;;
    let externalClasses = null;

    if (props.externalStyle) {
        externalClasses = props.styleClass;
    }
    switch (props.elementType) {
        case 'text':
            element = <input type={props.elementType} value={props.elementValue} onChange={props.elementChange} />;
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
        case 'multiselect':
            let txtValue = 'Select Option';
            let valueArray = [];
            if(props.elementDetails.value && props.elementDetails.value.length > 0 ){
                props.elementDetails.value.map((value) => {
                    valueArray.push(value.displayValue);
                })
                txtValue = valueArray.toString();

            }
            else {
                txtValue = 'Select Option';
            }
            const multiselect = <div className="selectBox">
                <input type="text" value={txtValue} disabled/><span style={{
                    fontSize: '26px',
                    position: 'relative',
                    top: '4px',
                    right: '30px',
                    cursor: 'pointer'
                }} onClick={props.toggleMultiselectDropDown}>&#9662;</span>
            </div>
            let toggelStyle = {
                display: 'none',
                width: '183px',
                border: '1px #dadada solid'
            }
            if (props.elementDetails.toggleMultiselect) {
                toggelStyle.display = 'block';
            }

            const customSelectBoxes = <div>
                {multiselect}
                <div id="checkboxes" onChange={props.onMultiSelectCheckBox} style={toggelStyle}>
                    {props.elementDetails.optionValue.map((option, index) => {
                    // const checkBoxValue = {option.serverID : option.displayValue}
                        return (
                            <div>
                                <input type="checkbox" onChange={props.toggleMultiSelect} value={index} />{option.displayValue}
                            </div>
                        )
                    })}
                </div>
            </div>
            element = customSelectBoxes
            break;
    }

    return element;
}

export default Element;