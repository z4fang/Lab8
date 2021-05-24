/**
 * @jest-environment jsdom
 */

import {pushToHistory } from '../scripts/router.js';

describe("pushToHistory Testing", ()=>{
    test("settings state test", () => {
        let test = pushToHistory("settings", 1);
        expect(test.state.page).toBe("settings");
        expect(test.length).toBe(2);
    })

    test("entry state test", () => {
        let test = pushToHistory("entry", 3);
        expect(test.state.page).toBe("entry3");
        expect(test.length).toBe(3);
    })

    test("default state test", () => {
        let test = pushToHistory("", 0);
        expect(test.state.page).toBe(undefined);
        expect(test.length).toBe(4);
    })
});