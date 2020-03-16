/**
 * This file was generated from NHSNumber.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, EditableValue } from "mendix";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface NHSNumberContainerProps extends CommonProps {
    textAttribute: EditableValue<string>;
    onChangeAction?: ActionValue;
}

export interface NHSNumberPreviewProps extends CommonProps {
    textAttribute: string;
    onChangeAction?: ActionPreview;
}

export interface VisibilityMap {
    textAttribute: boolean;
    onChangeAction: boolean;
}
