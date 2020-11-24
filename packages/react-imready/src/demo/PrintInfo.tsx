import * as React from "react";
import { ImReadyValue } from "../react-imready";

export function PrintInfo(props: Partial<ImReadyValue>) {
    const printProps = {...props};

    delete printProps.register;
    return <div id="printInfo">
        {Object.keys(printProps).map(name => (
            <p key={name}>{name}: <span id={name}>{(printProps as any)[name].toString()}</span></p>
        ))}
    </div>;
}
