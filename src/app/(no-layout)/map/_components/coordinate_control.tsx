import {useMap} from "react-leaflet";
import React from "react";
import L from "leaflet";

const MouseCoordinates = L.Control.extend({
    onAdd: function (map: L.Map) {
        const container = L.DomUtil.create('div', 'leaflet-control-mouse-coordinates');
        container.className = 'bg-background/80 rounded-lg p-1 text-slate-50 text-sm font-bold'

        map.on('mousemove', (e) => {
            const { lat: z, lng: x } = e.latlng;
            container.innerHTML = `${Math.floor(x)}, ${-Math.floor(z)}`;
        });

        return container;
    }
});

export const MouseCoordinatesControl = () => {
    const map = useMap();

    React.useEffect(() => {
        const control = new MouseCoordinates({ position: 'topleft' });
        control.addTo(map);

        return () => {
            map.removeControl(control);
        };
    }, [map]);

    return null;
};