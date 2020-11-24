import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../../src/demo/App";
import { getValue, wait } from "./TestHelper";

describe("test useImReady", () => {
    beforeEach(() => {
        document.body.innerHTML = `<div class="container"></div>`;
    });
    afterEach(() => {
        const container = document.querySelector(".container");

        if (container) {
            ReactDOM.unmountComponentAtNode(container);
        }
    });
    it("should check demo's working.", async () => {
        // Given, When
        ReactDOM.render(<App />, document.querySelector(".container"));


        // first mount
        const preReadyCount1 = getValue("preReadyCount");
        const readyCount1 = getValue("readyCount");
        const totalCount1 = getValue("totalCount");

        await wait();
        // first update
        const preReadyCount2 = getValue("preReadyCount");
        const readyCount2 = getValue("readyCount");
        const totalCount2 = getValue("totalCount");

        await wait();
        // second update for preReadyElement
        const preReadyCount3 = getValue("preReadyCount");
        const readyCount3 = getValue("readyCount");

        // Then
        expect(preReadyCount1).to.be.equals("0");
        expect(readyCount1).to.be.equals("0");
        expect(totalCount1).to.be.equals("0");

        expect(preReadyCount2).to.be.equals("0");
        expect(readyCount2).to.be.equals("0");
        expect(totalCount2).to.be.equals("9");

        expect(preReadyCount3).to.be.equals("7");
        expect(readyCount3).to.be.equals("0");
    });
});
