const DEFAULT_BIRTH_COLOR = "#2a9d8f";
const DEFAULT_DEATH_COLOR = "#c44536";
const DEFAULT_LINE_COLOR = "#4a6fa5";
const MARKER_RADIUS = 10;

let map = null;
let markersLayer = null;
let birthColor = DEFAULT_BIRTH_COLOR;
let deathColor = DEFAULT_DEATH_COLOR;
let lineColor = DEFAULT_LINE_COLOR;

function cssColor(variableName, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    return value || fallback;
}

function createMarker(latLng, label, color) {
    const marker = L.circleMarker(latLng, {
        radius: MARKER_RADIUS,
        fillColor: color,
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
    });

    marker.bindTooltip(label, {
        permanent: true,
        direction: "top",
        offset: [0, -8],
        className: "map-label"
    });

    return marker;
}

function createLine(latLng1, latLng2) {
    return L.polyline([latLng1, latLng2], {
        color: lineColor,
        weight: 2,
        opacity: 0.7,
        dashArray: "6, 6"
    });
}

export function init(containerId) {
    if (map) {
        return;
    }

    birthColor = cssColor("--color-success", DEFAULT_BIRTH_COLOR);
    deathColor = cssColor("--color-danger", DEFAULT_DEATH_COLOR);
    lineColor = cssColor("--color-primary", DEFAULT_LINE_COLOR);

    map = L.map(containerId, {
        zoomControl: false,
        attributionControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);

    map.setView([20, 0], 1);
    map.invalidateSize();
}

export function update(birth, death) {
    if (!map || !markersLayer) {
        console.error("Mapa não foi inicializado.");
        return;
    }

    markersLayer.clearLayers();

    const birthLatLng = [birth.latitude, birth.longitude];
    const deathLatLng = [death.latitude, death.longitude];

    const birthMarker = createMarker(birthLatLng, birth.city, birthColor);
    const deathMarker = createMarker(deathLatLng, death.city, deathColor);

    markersLayer.addLayer(birthMarker);
    markersLayer.addLayer(deathMarker);

    if (birth.latitude !== death.latitude || birth.longitude !== death.longitude) {
        markersLayer.addLayer(createLine(birthLatLng, deathLatLng));
    }

    const bounds = L.latLngBounds([birthLatLng, deathLatLng]);
    map.flyToBounds(bounds, {
        padding: [60, 60],
        maxZoom: 10,
        duration: 0.8
    });
}

export function resize() {
    if (map) {
        map.invalidateSize();
    }
}
