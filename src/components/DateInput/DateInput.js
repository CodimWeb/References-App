import React, {Component} from 'react';
import Inputmask from "inputmask";

class DateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }

    componentDidMount() {
        Inputmask("datetime", {
            inputFormat: "mm-dd-yyyy",
            outputFormat: "mm-dd-yyyy",
            inputEventOnly: true
        }).mask(".masked-date");
    }

    render() {
        const { type, name, className, id, value, onFocus, onChange, onBlur } = this.props;
        return (
            <input data-inputmask-inputformat="mm-dd-yyyy" inputMode="numeric" type={ type } name={ name } id={ id } className={className} value={value} onFocus={onFocus} onChange={onChange} onBlur={onBlur} />
        )
    }
}

export default DateInput;