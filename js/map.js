const GameMap = (function () {
    const BIRTH_COLOR = "#2a9d8f";
    const DEATH_COLOR = "#c44536";
    const MARKER_RADIUS = 10;

    let map = null;
    let markersLayer = null;

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
            color: "#4a6fa5",
            weight: 2,
            opacity: 0.7,
            dashArray: "6, 6"
        });
    }

    function init(containerId) {
        if (map) {
            return;
        }

        map = L.map(containerId, {
            zoomControl: false,
            attributionControl: true
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
            attribution: "&copy; OpenStreetMap contributors, &copy; CARTO",
            subdomains: "abcd",
            maxZoom: 18
        }).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

        markersLayer = L.layerGroup().addTo(map);

        map.setView([20, 0], 2);
        map.invalidateSize();
    }

    function update(birth, death) {
        if (!map || !markersLayer) {
            console.error("Mapa não foi inicializado.");
            return;
        }

        markersLayer.clearLayers();

        const birthLatLng = [birth.latitude, birth.longitude];
        const deathLatLng = [death.latitude, death.longitude];

        const birthMarker = createMarker(birthLatLng, birth.city, BIRTH_COLOR);
        const deathMarker = createMarker(deathLatLng, death.city, DEATH_COLOR);

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

    function resize() {
        if (map) {
            map.invalidateSize();
        }
    }

    return {
        init,
        update,
        resize
    };
}());
