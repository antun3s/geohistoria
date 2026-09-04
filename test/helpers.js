export function createFakeElement(id) {
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
        focusCount: 0,
        classList: {
            add(name) { classes.add(name); },
            remove(name) { classes.delete(name); },
            contains(name) { return classes.has(name); }
        },
        addEventListener(type, handler) { listeners[type] = handler; },
        listeners,
        appendChild(child) { children.push(child); },
        append(...nodes) { children.push(...nodes); },
        replaceChildren() { children.length = 0; },
        focus() { this.focusCount++; }
    };
}

export function installFakeDocument() {
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

    globalThis.getComputedStyle = () => ({
        getPropertyValue: () => ""
    });

    return globalThis.document;
}

export function installLeafletStub() {
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

export function installFakeStorage() {
    const store = new Map();

    globalThis.localStorage = {
        getItem(key) {
            return store.has(key) ? store.get(key) : null;
        },
        setItem(key, value) {
            store.set(key, String(value));
        },
        removeItem(key) {
            store.delete(key);
        },
        clear() {
            store.clear();
        }
    };

    return store;
}

export function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
