'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockLostFoundItems } from '@/lib/mock-data';

const CAMPUS_ZONES = [
  'Xavier Hall',
  'Bonoan Building',
  'Library',
  'Phelan Building',
  'Dolan Building',
  'Covered Courts',
];

const getZoneName = (location: string) => {
  const normalized = location.toLowerCase();
  if (normalized.includes('xavier')) return 'Xavier Hall';
  if (normalized.includes('bonoan')) return 'Bonoan Building';
  if (normalized.includes('library')) return 'Library';
  if (normalized.includes('phelan')) return 'Phelan Building';
  if (normalized.includes('dolan')) return 'Dolan Building';
  if (normalized.includes('covered')) return 'Covered Courts';
  return 'Other';
};

const getHeatColor = (count: number, max: number) => {
  if (max === 0) return 'bg-slate-100';
  const ratio = count / max;
  if (ratio >= 0.8) return 'bg-red-500';
  if (ratio >= 0.6) return 'bg-orange-500';
  if (ratio >= 0.4) return 'bg-amber-500';
  if (ratio > 0) return 'bg-yellow-400';
  return 'bg-slate-100';
};

const ZONE_COORDINATES: Record<string, { x: string; y: string }> = {
  'Xavier Hall': { x: '29%', y: '73%' },
  'Bonoan Building': { x: '57%', y: '33%' },
  Library: { x: '43%', y: '20%' },
  'Phelan Building': { x: '25%', y: '56%' },
  'Dolan Building': { x: '20%', y: '26%' },
  'Covered Courts': { x: '77%', y: '40%' },
};

const CAMPUS_MAP_SRC = '/adnu-campus-map.png';

type HeatPoint = {
  zone: string;
  x: number;
  y: number;
  intensity: number;
};

export default function StudentHeatmapPage() {
  const zoneCounts = CAMPUS_ZONES.map((zone) => ({
    zone,
    count: mockLostFoundItems.filter((item) => getZoneName(item.location) === zone).length,
  }));

  const maxCount = Math.max(...zoneCounts.map((zone) => zone.count), 0);
  const heatPoints: HeatPoint[] = zoneCounts.map((zone) => {
    const marker = ZONE_COORDINATES[zone.zone];
    const normalizedIntensity = maxCount === 0 ? 0.4 : zone.count / maxCount;

    return {
      zone: zone.zone,
      x: Number(marker.x.replace('%', '')),
      y: Number(marker.y.replace('%', '')),
      intensity: Math.max(normalizedIntensity, 0.3),
    };
  });

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lost & Found Heatmap</h1>
          <p className="text-gray-600">
            Hotspot view of where reports are most frequently submitted.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Campus Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src={CAMPUS_MAP_SRC}
                alt="Ateneo de Naga University campus map"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 pointer-events-none">
                {heatPoints.map((point) => {
                  const diameter = 130 + point.intensity * 170;
                  const opacity = 0.35 + point.intensity * 0.35;

                  return (
                    <div
                      key={`glow-${point.zone}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${diameter}px`,
                        height: `${diameter}px`,
                        opacity,
                        background:
                          'radial-gradient(circle, rgba(255,0,0,0.95) 0%, rgba(255,165,0,0.85) 35%, rgba(255,255,0,0.75) 55%, rgba(0,191,255,0.45) 78%, rgba(0,191,255,0) 100%)',
                      }}
                    />
                  );
                })}
              </div>

            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heatmap Color Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full mb-4">
              <div className="h-5 rounded-full border border-slate-200 bg-[linear-gradient(to_right,#38bdf8_0%,#fde047_50%,#f97316_75%,#ef4444_100%)]" />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-sky-400" />
                Low density (Cool)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-yellow-300" />
                Moderate density
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-orange-500" />
                High density
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-500" />
                Very high density (Hotspot)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {zoneCounts.map((zone) => (
                <div
                  key={zone.zone}
                  className="rounded-lg p-4 bg-blue-50 border border-blue-200 text-blue-900"
                >
                  <p className="text-sm font-medium text-blue-700">Location</p>
                  <p className="text-lg font-semibold">{zone.zone}</p>
                  <p className="text-sm mt-2 text-blue-800">
                    {zone.count} {zone.count === 1 ? 'report' : 'reports'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
