import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../mocks/markers';
import { City, PointI } from '../../types/offer-type';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    city: City,
    points: PointI[],
    selectedPoint: PointI | undefined
    mapClass?: string
};

const defaultCustomIcon = new Icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

export default function MapComponent({ city, points, selectedPoint, mapClass }: MapProps) {

    const mapRef = useRef(null);
    const map = useMap(mapRef, city);

    useEffect(() => {
        if (map) {
            const markerLayer = layerGroup().addTo(map);

            points.forEach(point => {
                const marker = new Marker({
                    lat: point.lat,
                    lng: point.lng
                })

                marker.setIcon(
                    selectedPoint !== undefined && point.title === selectedPoint.title
                        ? currentCustomIcon
                        : defaultCustomIcon
                )
                    .addTo(markerLayer);
            });

            return () => {
                map.removeLayer(markerLayer);
            };
        }
    }, [city, points, selectedPoint, map]);

    return (
        <section
            ref={mapRef}
            className={`${mapClass} map`}
        >
        </section>
    )
}