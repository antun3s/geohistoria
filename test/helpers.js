const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");

function loadScript(relativePath, exportName) {
    const source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
    const declaration = source.match(/^const\s+([A-Za-z_$][\w$]*)\s*=/m);
    const name = exportName === null ? null : exportName || (declaration && declaration[1]);
    return name ? eval(`${source}\n;${name}`) : eval(source);
}

function createFakeElement(id) {
    const classes = new Set();
    const listeners = {};
    const children = [];

    return {
        id,
        textContent: "",
        className: "",
        innerHTML: "",
        value: "",
        disabled: false,
        style: {},
        children,
        classList: {
            add(name) { classes.add(name); },
            remove(name) { classes.delete(name); },
            contains(name) { return classes.has(name); }
        },
        addEventListener(type, handler) { listeners[type] = handler; },
        listeners,
        appendChild(child) { children.push(child); },
        focus() {}
    };
}

function installFakeDocument() {
    const elements = new Map();

    globalThis.document = {
        getElementById(id) {
            if (!elements.has(id)) {
                elements.set(id, createFakeElement(id));
            }
            return elements.get(id);
        },
        createElement(tagName) {
            return createFakeElement(tagName);
        },
        body: createFakeElement("body")
    };

    return globalThis.document;
}

function installLeafletStub() {
    const fakeMap = {
        setView() {},
        invalidateSize() {},
        flyToBounds() {}
    };

    globalThis.L = {
        map: () => fakeMap,
        tileLayer: () => ({ addTo() {} }),
        control: { zoom: () => ({ addTo() {} }) },
        layerGroup: () => ({
            addTo() { return this; },
            clearLayers() {},
            addLayer() {}
        }),
        circleMarker: () => ({ bindTooltip() { return this; } }),
        polyline: () => ({}),
        latLngBounds: () => ({})
    };

    return fakeMap;
}

function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

module.exports = {
    loadScript,
    installFakeDocument,
    installLeafletStub,
    sleep
};
