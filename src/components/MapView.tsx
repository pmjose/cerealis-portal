import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import type { MapPoint } from '../data/types';

maplibregl.setWorkerUrl(workerUrl);

const KEY = import.meta.env.VITE_CARTO_KEY as string | undefined;
const STYLE = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json' + (KEY ? `?api_key=${KEY}` : '');
const COLORS = { ok: '#17924B', aviso: '#E08600', critico: '#D92D20' };
const LABEL = { ok: 'Normal', aviso: 'Atenção', critico: 'Crítico' };
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function MapView({ points, routes, height = 440 }: { points: MapPoint[]; routes?: [number, number][][]; height?: number }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibregl.Map({ container: el.current!, style: STYLE, center: [-8.6, 41.2], zoom: 4, attributionControl: { compact: true }, cooperativeGestures: false });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.scrollZoom.disable();
    const bounds = new maplibregl.LngLatBounds();
    points.forEach(a => {
      bounds.extend([a.lng, a.lat]);
      const m = document.createElement('div');
      const c = a.color ?? COLORS[a.status];
      const sz = a.size ? Math.max(12, Math.min(30, 10 + Math.sqrt(a.size) * 6)) : 15;
      m.style.cssText = `width:${sz}px;height:${sz}px;border-radius:50%;background:${c};border:2px solid #fff;box-shadow:0 0 0 5px ${c}2e,0 4px 14px rgba(0,0,0,.25);cursor:pointer`;
      if (a.status === 'critico') m.style.animation = 'pulse 1.4s infinite';
      new maplibregl.Marker({ element: m }).setLngLat([a.lng, a.lat])
        .setPopup(new maplibregl.Popup({ offset: 14, closeButton: false, maxWidth: '280px' }).setHTML(
          `<div style="font-size:13px;min-width:200px"><div style="font-weight:650;margin-bottom:3px">${esc(a.name)}</div><div style="color:#6F6B60;font-size:12px">${esc(a.type)}</div><div style="margin-top:8px;display:flex;gap:6px;align-items:center;font-size:12px"><span style="width:8px;height:8px;border-radius:50%;background:${COLORS[a.status]}"></span>${LABEL[a.status]}</div><div style="margin-top:4px;font-size:12px;line-height:1.45">${esc(a.detail)}</div></div>`))
        .addTo(map);
    });
    map.on('load', () => {
      if (routes?.length) {
        map.addSource('routes', { type: 'geojson', data: { type: 'FeatureCollection', features: routes.map(r => ({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: r } })) } });
        map.addLayer({ id: 'routes-glow', type: 'line', source: 'routes', paint: { 'line-color': '#FDB704', 'line-width': 6, 'line-opacity': .18 } });
        map.addLayer({ id: 'routes', type: 'line', source: 'routes', paint: { 'line-color': '#D99A00', 'line-width': 2, 'line-dasharray': [2, 2] } });
      }
      if (points.length > 1) map.fitBounds(bounds, { padding: 60, maxZoom: 7, duration: 1600 });
      else if (points.length === 1) map.flyTo({ center: [points[0].lng, points[0].lat], zoom: 11, duration: 1600 });
    });
    return () => map.remove();
  }, [points, routes]);
  return <div ref={el} style={{ height, borderRadius: 16, overflow: 'hidden' }} />;
}
