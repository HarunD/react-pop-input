/*
    React Pop Input
    todo:
    - optional label
*/
import React, {FormEvent} from 'react';

import './style.css';

interface PopInputProps {
    closeOnEsc?: boolean;
    closeOnOutsideClick?: boolean;
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
    closeOnEsc?: boolean;
    closeOnOutsideClick?: boolean;
    saveOnEnter : boolean;
    value : string;
}

export default class PopInput extends React.Component < PopInputProps,
PopInputState > {
    public static defaultProps : Partial < PopInputProps > = {
        closeOnEsc: true,
        closeOnOutsideClick: true,
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

    _handleOutsideClickListener = (isPopVisible : boolean) : void => {
        if (isPopVisible) {
            document.addEventListener('mousedown', this._handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', this._handleOutsideClick);
        }

    }

    _handleOutsideClick = (e : MouseEvent) : void => {
        let t = e.target as HTMLElement;
        if (t && t.id !== 'floater') {
            this._hideInput();
        }
    }

    _hideInput = () => {
        this.setState({inputValue: this.state.value, isPopVisible: false});
    }

    _toggleInput = () : void => {
        const isPopVisible = !this.state.isPopVisible;

        if (isPopVisible && this.props.closeOnOutsideClick) {
            this._handleOutsideClickListener(isPopVisible);
        }

        this.setState({isPopVisible});
    }

    _handleChange = (e : FormEvent < HTMLInputElement >) : void => {
        this.setState({inputValue: e.currentTarget.value});
    }

    _handleKeyPress = (e : any, opt : InputOptions) => {
        if (opt.saveOnEnter && e.key === 'Enter') {
            this._handleSave(opt.value);
            return;
        }

        if (opt.closeOnEsc && e.key === 'Escape') {
            this._hideInput();
        }
    }

    _handleSave = (value : string) : void => {
        this.setState({value: value, isPopVisible: false});
        this
            .props
            .onSave(value);
    }

    _renderInput = (opt : InputOptions) : JSX.Element => {
        return (
            <div className="PopInput__Input-Wrapper"><input
                id="floater"
                className={`PopInput__Input ${opt.className}`}
                type="text"
                value={opt.value}
                onChange={this._handleChange}
                onKeyDown={(e : any) => this._handleKeyPress(e, opt)}/></div>
        );
    }

    render() {
        let {
            rootClassName,
            inputClassName,
            inputPosition,
            style,
            closeOnEsc,
            saveOnEnter
        } = this.props;

        return (
            <span
                className={`PopInput ${inputPosition} ${rootClassName
                ? rootClassName
                : ''}`}
                style={style}>
                <span className="PopInput__Root" onClick={this._toggleInput}>{this.state.value}</span>
                {this.state.isPopVisible && this._renderInput({value: this.state.inputValue, className: inputClassName, closeOnEsc, saveOnEnter})}
            </span>
        );
    }
}