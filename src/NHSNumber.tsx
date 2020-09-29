import { hot } from "react-hot-loader/root";
import React, { Component, Fragment, ReactNode, createElement, KeyboardEvent } from "react";
import { NHSNumberContainerProps } from "../typings/NHSNumberProps";
import { TextInput } from "./components/TextInput";
import { Alert } from "./components/Alert";

import "./ui/NHSNumber.css";

interface InputState {
    loading: boolean;
}

class NHSNumber extends Component<NHSNumberContainerProps, InputState> {
    private readonly onLeaveHandle = this.onLeave.bind(this);
    private firstInputRef = React.createRef<HTMLInputElement>();
    private secondInputRef = React.createRef<HTMLInputElement>();
    private thirdInputRef = React.createRef<HTMLInputElement>();
    private onKeyUpHandler = this.onKeyUp.bind(this);

    private firstInputValue = "";
    private secondInputValue = "";
    private thirdInputValue = "";

    constructor(props: NHSNumberContainerProps) {
        super(props);
        this.state = { loading: true };
    }

    componentDidUpdate(): void {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }

    render(): ReactNode {
        const validationFeedback = this.props.textAttribute.validation;
        const required = true;
        if (!this.state.loading) {
            this.setValues();
        }
        const readOnlyText = this.props.ReadOnlyStyle === "text" && this.props.textAttribute.readOnly;
        return readOnlyText ? (
            <Fragment>
                <div className="form-control-static">{`${this.props.textAttribute.value}`}</div>
                <Alert id={this.props.id + "-error"}>{validationFeedback}</Alert>
            </Fragment>
        ) : (
            <Fragment>
                <div className="nhs-input-wrapper" role="group" aria-labelledby={`${this.props.id}-label`}>
                    <TextInput
                        id={this.props.id}
                        value={this.firstInputValue}
                        style={this.props.style}
                        className={this.props.class}
                        tabIndex={this.props.tabIndex}
                        disabled={this.props.textAttribute.readOnly}
                        onLeave={this.onLeaveHandle}
                        maxLength={3}
                        required={required}
                        hasError={!!validationFeedback}
                        myRef={this.firstInputRef}
                        objectid={this.props.id}
                        label={"NHS number digits 1 to 3"}
                        onKeyUpHandler={this.onKeyUpHandler}
                    />
                    <TextInput
                        value={this.secondInputValue}
                        style={this.props.style}
                        className={this.props.class}
                        tabIndex={this.props.tabIndex}
                        disabled={this.props.textAttribute.readOnly}
                        onLeave={this.onLeaveHandle}
                        maxLength={3}
                        required={required}
                        hasError={!!validationFeedback}
                        myRef={this.secondInputRef}
                        objectid={this.props.id}
                        label={"NHS number digits 4 to 6"}
                        onKeyUpHandler={this.onKeyUpHandler}
                    />
                    <TextInput
                        value={this.thirdInputValue}
                        style={this.props.style}
                        className={this.props.class}
                        tabIndex={this.props.tabIndex}
                        disabled={this.props.textAttribute.readOnly}
                        onLeave={this.onLeaveHandle}
                        maxLength={4}
                        required={required}
                        hasError={!!validationFeedback}
                        myRef={this.thirdInputRef}
                        objectid={this.props.id}
                        label={"NHS number digits 7 to 10"}
                        onKeyUpHandler={this.onKeyUpHandler}
                    />
                </div>
                <Alert id={this.props.id + "-error"}>{validationFeedback}</Alert>
            </Fragment>
        );
    }

    private onKeyUp(e: KeyboardEvent): void {
        const target = e.target as HTMLInputElement;
        const maxLength = target.maxLength;

        const myLength = target.selectionStart!;
        if (myLength >= maxLength && ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106))) {
            const next = target.nextElementSibling as HTMLElement;
            if (next != null && next.tagName.toLowerCase() === "input") {
                next.focus();
            }
        } else if (e.keyCode === 8 && myLength === 0) {
            const previous = target.previousElementSibling as HTMLElement;
            if (previous != null && previous.tagName.toLowerCase() === "input") {
                previous.focus();
            }
        }
    }

    private onLeave(isChanged: boolean): void {
        if (!isChanged) {
            return;
        }
        const setValue =
            this.firstInputRef.current!.value + this.secondInputRef.current!.value + this.thirdInputRef.current!.value;
        this.props.textAttribute.setTextValue(setValue);
        this.setValues();
    }

    private setValues(): void {
        if (this.props.textAttribute.validation) {
            this.firstInputValue = this.props.textAttribute.value
                ? this.props.textAttribute.value.toString().substr(0, 3)
                : this.firstInputRef.current!.value;
            this.secondInputValue = this.props.textAttribute.value
                ? this.props.textAttribute.value.toString().substr(3, 3)
                : this.secondInputRef.current!.value;
            this.thirdInputValue = this.props.textAttribute.value
                ? this.props.textAttribute.value.toString().substr(6, 4)
                : this.thirdInputRef.current!.value;
        } else {
            this.firstInputValue = this.props.textAttribute.value
                ? this.props.textAttribute.value.toString().substr(0, 3)
                : "";
            this.secondInputValue = this.props.textAttribute.value
                ? this.props.textAttribute.value.toString().substr(3, 3)
                : "";
            this.thirdInputValue = this.props.textAttribute.value
                ? this.props.textAttribute.value.toString().substr(6, 4)
                : "";
        }
    }
}

export default hot(NHSNumber);
