/*
    React Pop Input
*/
import React, {FormEvent} from 'react';

import './style.css';

interface PopInputProps {
    inputClassName?: string;
    inputPosition?: string;
    onSave : Function;
    rootClassName?: string;
    saveOnEnter : boolean;
    style?: object;
    value : string;
}

interface PopInputState {
    inputValue : string;
    isPopVisible : boolean;
    value : string;
}

interface InputOptions {
    className?: string;
    saveOnEnter : boolean;
    value : string;
}

export default class PopInput extends React.Component < PopInputProps,
PopInputState > {
    public static defaultProps : Partial < PopInputProps > = {
        inputClassName: '',
        inputPosition: 'bottom',
        onSave: () => {},
        rootClassName: '',
        saveOnEnter: true,
        value: ''
    }

    constructor(props : PopInputProps) {
        super(props);
        this.state = {
            inputValue: props.value,
            isPopVisible: false,
            value: props.value
        };
    }

    componentDidUpdate(prevProps : any, prevState : any) {}

    _toggleInput = () : void => {
        this.setState({
            isPopVisible: !this.state.isPopVisible
        });
    }

    _handleChange = (e : FormEvent < HTMLInputElement >) : void => {
        this.setState({inputValue: e.currentTarget.value});
    }

    _handleSave = (value : string) : void => {
        this.setState({value: value, isPopVisible: false});
        this
            .props
            .onSave(value);
    }

    _renderInput = (opt : InputOptions) : JSX.Element => {
        return <input
            className={`PopInput__Input ${opt.className}`}
            type="text"
            value={opt.value}
            onChange={this._handleChange}
            onKeyPress={(e : any) => {
            if (opt.saveOnEnter && e.key === 'Enter') {
                this._handleSave(opt.value);
            }
        }}/>;
    }

    render() {
        let {rootClassName, inputClassName, inputPosition, style, saveOnEnter} = this.props;

        return (
            <span
                className={`PopInput ${inputPosition} ${rootClassName
                ? rootClassName
                : ''}`}
                style={style}>
                <span className="PopInput__Root" onClick={this._toggleInput}>{this.state.value}</span>
                {this.state.isPopVisible && this._renderInput({value: this.state.inputValue, className: inputClassName, saveOnEnter})}
            </span>
        );
    }
}