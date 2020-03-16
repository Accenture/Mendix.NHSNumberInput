import { Component, ReactNode, createElement } from "react";
import { NHSNumberPreviewProps, VisibilityMap } from "../typings/NHSNumberProps";
import { TextInput } from "./components/TextInput";

declare function require(name: string): string;

export class preview extends Component<NHSNumberPreviewProps> {
    render(): ReactNode {
        const value = `[${this.props.textAttribute}]`;
        // systemProperty key="Editability" will be supported starting from Mendix 8.3
        return <TextInput value={value} />;
    }
}

export function getVisibleProperties(_valueMap: NHSNumberPreviewProps, visibilityMap: VisibilityMap): VisibilityMap {
    /* To hide any property in Mendix Studio, please assign the property in visibilityMap to false */
    return visibilityMap;
}

export function getPreviewCss(): string {
    return require("./ui/NHSNumber.css");
}
