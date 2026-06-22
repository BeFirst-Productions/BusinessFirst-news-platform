'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Globe } from 'lucide-react';

interface CountryData {
  code: string;
  country: string;
  users: number;
}

interface GeoMapProps {
  countries: CountryData[];
  isLoading?: boolean;
}

type ChartTooltip = { role: string; p: { html: boolean } };

type ChartRow = 
  | [string, string, ChartTooltip]
  | [string, number, string];

interface GoogleDataTable {
  _brand?: string;
}

interface GoogleChartInstance {
  draw(data: GoogleDataTable, options: GoogleGeochartOptions): void;
  clearChart(): void;
}

interface GoogleGeochartOptions {
  colorAxis: { colors: string[] };
  backgroundColor: string;
  datalessRegionColor: string;
  defaultColor: string;
  keepAspectRatio: boolean;
  width: string;
  legend: { textStyle: { color: string; fontSize: number } };
  region?: string;
  resolution?: 'countries' | 'provinces' | 'metros';
}

interface GoogleVisualization {
  arrayToDataTable(data: ChartRow[]): GoogleDataTable;
  GeoChart: new (container: HTMLDivElement) => GoogleChartInstance;
  events: {
    addListener(
      source: GoogleChartInstance,
      eventName: string,
      handler: (e: { region: string }) => void
    ): void;
  };
}

declare global {
  interface Window {
    google: {
      charts: {
        load(version: string, options: { packages: string[] }): void;
        setOnLoadCallback(callback: () => void): void;
      };
      visualization: GoogleVisualization;
    };
  }
}

// Complete static map of ISO 2-letter codes to Country Names
const ALL_COUNTRIES: Record<string, string> = {
  AF: 'Afghanistan', AX: 'Aland Islands', AL: 'Albania', DZ: 'Algeria', AS: 'American Samoa',
  AD: 'Andorra', AO: 'Angola', AI: 'Anguilla', AQ: 'Antarctica', AG: 'Antigua and Barbuda',
  AR: 'Argentina', AM: 'Armenia', AW: 'Aruba', AU: 'Australia', AT: 'Austria', AZ: 'Azerbaijan',
  BS: 'Bahamas', BH: 'Bahrain', BD: 'Bangladesh', BB: 'Barbados', BY: 'Belarus', BE: 'Belgium',
  BZ: 'Belize', BJ: 'Benin', BM: 'Bermuda', BT: 'Bhutan', BO: 'Bolivia', BQ: 'Bonaire',
  BA: 'Bosnia and Herzegovina', BW: 'Botswana', BV: 'Bouvet Island', BR: 'Brazil',
  IO: 'British Indian Ocean Territory', BN: 'Brunei', BG: 'Bulgaria', BF: 'Burkina Faso',
  BI: 'Burundi', CV: 'Cabo Verde', KH: 'Cambodia', CM: 'Cameroon', CA: 'Canada', KY: 'Cayman Islands',
  CF: 'Central African Republic', TD: 'Chad', CL: 'Chile', CN: 'China', CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands', CO: 'Colombia', KM: 'Comoros', CD: 'Congo (DRC)', CG: 'Congo (Republic)',
  CK: 'Cook Islands', CR: 'Costa Rica', HR: 'Croatia', CU: 'Cuba', CW: 'Curaçao', CY: 'Cyprus',
  CZ: 'Czechia', DK: 'Denmark', DJ: 'Djibouti', DM: 'Dominica', DO: 'Dominican Republic',
  EC: 'Ecuador', EG: 'Egypt', SV: 'El Salvador', GQ: 'Equatorial Guinea', ER: 'Eritrea',
  EE: 'Estonia', SZ: 'Eswatini', ET: 'Ethiopia', FK: 'Falkland Islands', FO: 'Faroe Islands',
  FJ: 'Fiji', FI: 'Finland', FR: 'France', GF: 'French Guiana', PF: 'French Polynesia',
  TF: 'French Southern Territories', GA: 'Gabon', GM: 'Gambia', GE: 'Georgia', DE: 'Germany',
  GH: 'Ghana', GI: 'Gibraltar', GR: 'Greece', GL: 'Greenland', GD: 'Grenada', GP: 'Guadeloupe',
  GU: 'Guam', GT: 'Guatemala', GG: 'Guernsey', GN: 'Guinea', GW: 'Guinea-Bissau', GY: 'Guyana',
  HT: 'Haiti', HM: 'Heard Island and McDonald Islands', VA: 'Holy See', HN: 'Honduras', HK: 'Hong Kong',
  HU: 'Hungary', IS: 'Iceland', IN: 'India', ID: 'Indonesia', IR: 'Iran', IQ: 'Iraq', IE: 'Ireland',
  IM: 'Isle of Man', IL: 'Israel', IT: 'Italy', JM: 'Jamaica', JP: 'Japan', JE: 'Jersey',
  JO: 'Jordan', KZ: 'Kazakhstan', KE: 'Kenya', KI: 'Kiribati', KP: 'North Korea', KR: 'South Korea',
  KW: 'Kuwait', KG: 'Kyrgyzstan', LA: 'Laos', LV: 'Latvia', LB: 'Lebanon', LS: 'Lesotho', LR: 'Liberia',
  LY: 'Libya', LI: 'Liechtenstein', LT: 'Lithuania', LU: 'Lubembourg', MO: 'Macao', MG: 'Madagascar',
  MW: 'Malawi', MY: 'Malaysia', MV: 'Maldives', ML: 'Mali', MT: 'Malta', MH: 'Marshall Islands',
  MQ: 'Martinique', MR: 'Mauritania', MU: 'Mauritius', YT: 'Mayotte', MX: 'Mexico',
  FM: 'Micronesia', MD: 'Moldova', MC: 'Monaco', MN: 'Mongolia', ME: 'Montenegro', MS: 'Montserrat',
  MA: 'Morocco', MZ: 'Mozambique', MM: 'Myanmar', NA: 'Namibia', NR: 'Nauru', NP: 'Nepal',
  NL: 'Netherlands', NC: 'New Caledonia', NZ: 'New Zealand', NI: 'Nicaragua', NE: 'Niger',
  NG: 'Nigeria', NU: 'Niue', NF: 'Norfolk Island', MP: 'Northern Mariana Islands', NO: 'Norway',
  OM: 'Oman', PK: 'Pakistan', PW: 'Palau', PS: 'Palestine', PA: 'Panama', PG: 'Papua New Guinea',
  PY: 'Paraguay', PE: 'Peru', PH: 'Philippines', PN: 'Pitcairn', PL: 'Poland', PT: 'Portugal',
  PR: 'Puerto Rico', QA: 'Qatar', RE: 'Réunion', RO: 'Romania', RU: 'Russia', RW: 'Rwanda',
  BL: 'Saint Barthélemy', SH: 'Saint Helena', KN: 'Saint Kitts and Nevis', LC: 'Saint Lucia',
  MF: 'Saint Martin', PM: 'Saint Pierre and Miquelon', VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa', SM: 'San Marino', ST: 'São Tomé and Príncipe', SA: 'Saudi Arabia', SN: 'Senegal',
  RS: 'Serbia', SC: 'Seychelles', SL: 'Sierra Leone', SG: 'Singapore', SX: 'Sint Maarten',
  SK: 'Slovakia', SI: 'Slovenia', SB: 'Solomon Islands', SO: 'Somalia', ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands', SS: 'South Sudan', ES: 'Spain', LK: 'Sri Lanka',
  SD: 'Sudan', SR: 'Suriname', SJ: 'Svalbard and Jan Mayen', SE: 'Sweden', CH: 'Switzerland',
  SY: 'Syria', TW: 'Taiwan', TJ: 'Tajikistan', TZ: 'Tanzania', TH: 'Thailand', TL: 'Timor-Leste',
  TG: 'Togo', TK: 'Tokelau', TO: 'Tonga', TT: 'Trinidad and Tobago', TN: 'Tunisia', TR: 'Türkiye',
  TM: 'Turkmenistan', TC: 'Turks and Caicos Islands', TV: 'Tuvalu', UG: 'Uganda', UA: 'Ukraine',
  AE: 'United Arab Emirates', GB: 'United Kingdom', US: 'United States', UY: 'Uruguay',
  UZ: 'Uzbekistan', VU: 'Vanuatu', VE: 'Venezuela', VN: 'Vietnam', VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (U.S.)', WF: 'Wallis and Futuna', EH: 'Western Sahara', YE: 'Yemen',
  ZM: 'Zambia', ZW: 'Zimbabwe'
};

export function GeoMap({ countries, isLoading = false }: GeoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [region, setRegion] = useState<string>('world');
  const chartRef = useRef<GoogleChartInstance | null>(null);

  // ── Dynamic Script Loading ──────────────────────────────
  useEffect(() => {
    if (window.google) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  // ── Google Charts Library Init ───────────────────────────
  useEffect(() => {
    if (!scriptLoaded) return;

    const initGoogleCharts = () => {
      try {
        window.google.charts.load('current', {
          packages: ['geochart'],
        });
        window.google.charts.setOnLoadCallback(() => {
          setApiReady(true);
        });
      } catch (err) {
        console.error('Error loading Google Geochart module:', err);
      }
    };

    initGoogleCharts();
  }, [scriptLoaded]);

  // ── Draw Geochart ─────────────────────────────────────────
  useEffect(() => {
    if (!apiReady || !containerRef.current || isLoading) return;

    const drawChart = () => {
      if (!containerRef.current) return;
      try {
        const tooltipConfig: ChartTooltip = { role: 'tooltip', p: { html: true } };
        const chartData: ChartRow[] = [
          ['Country', 'Active Users', tooltipConfig]
        ];

        // 1) Initialize all global countries with 0 users to ensure they are named and interactive
        const mergedMap = new Map<string, number>();
        Object.keys(ALL_COUNTRIES).forEach((code) => {
          mergedMap.set(code, 0);
        });

        // 2) Merge actual live viewer counts
        countries.forEach((c) => {
          const upperCode = c.code.toUpperCase();
          if (mergedMap.has(upperCode)) {
            mergedMap.set(upperCode, c.users);
          }
        });

        // 3) Push rows to chartData
        mergedMap.forEach((users, code) => {
          const countryName = ALL_COUNTRIES[code] || code;
          chartData.push([
            code,
            users,
            `${countryName}: ${users.toLocaleString()} users`
          ]);
        });

        const dataTable = window.google.visualization.arrayToDataTable(chartData);

        const options: GoogleGeochartOptions = {
          colorAxis: { 
            colors: ['#f1f5f9', '#24214c', '#cd2027'] // harmonized light gray to brand purple to brand red
          },
          backgroundColor: 'transparent',
          datalessRegionColor: '#f8fafc',
          defaultColor: '#f1f5f9',
          keepAspectRatio: true,
          width: '100%',
          legend: {
            textStyle: { color: '#64748b', fontSize: 11 }
          },
          region: region,
          // Switch to provinces view if a 2-letter country code is clicked/selected
          resolution: region.length === 2 ? 'provinces' : 'countries'
        };

        if (chartRef.current) {
          chartRef.current.clearChart();
        }

        const chart = new window.google.visualization.GeoChart(containerRef.current);
        chartRef.current = chart;

        // Register regionClick event listener for clicking to zoom in
        window.google.visualization.events.addListener(
          chart,
          'regionClick',
          (eventData: { region: string }) => {
            const clickedRegion = eventData.region;
            setRegion(clickedRegion);
          }
        );

        chart.draw(dataTable, options);
      } catch (error) {
        console.error('Failed to draw GeoChart:', error);
      }
    };

    drawChart();

    // Responsive redraw
    const handleResize = () => {
      drawChart();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [apiReady, countries, isLoading, region]);

  return (
    <div className="relative w-full h-[450px] bg-card rounded-xl border border-border flex flex-col justify-between overflow-hidden shadow-sm">
      {/* Map Header with select dropdown and zoom out controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary animate-pulse" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">Global Visitor Locations</h3>
            <p className="text-xs text-muted-foreground">Click country to zoom in. All regions are interactive.</p>
          </div>
        </div>

        {/* Region / Zoom Controls */}
        <div className="flex items-center gap-2">
          {region !== 'world' && (
            <button
              onClick={() => setRegion('world')}
              className="text-xs font-semibold text-primary hover:underline px-2 py-1 rounded bg-muted/60 transition-colors"
            >
              Reset to World View
            </button>
          )}
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="h-8 px-3 text-xs font-medium border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="world">World View</option>
            <option value="142">Asia</option>
            <option value="150">Europe</option>
            <option value="021">Northern America</option>
            <option value="005">South America</option>
            <option value="002">Africa</option>
            <option value="009">Oceania</option>
            {region.length === 2 && (
              <option value={region}>Zoomed: {ALL_COUNTRIES[region] || region}</option>
            )}
          </select>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 flex items-center justify-center p-4 relative min-h-[340px]">
        {(!scriptLoaded || !apiReady || isLoading) ? (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-xs font-medium">Loading interactive world map...</span>
          </div>
        ) : null}

        <div 
          ref={containerRef} 
          className={`w-full h-full flex items-center justify-center ${
            (!scriptLoaded || !apiReady || isLoading) ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } transition-opacity duration-300`}
        />
      </div>
    </div>
  );
}
