import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CONTENT: Record<string, { title: string; body: string }> = {
  'neural-engine': {
    title: 'Neural Engine',
    body: 'Neural Engine: Dynamic yield optimization that adjusts prices and creatives in real-time based on local telemetry and audience signals.'
  },
  'edge-api': {
    title: 'Edge API',
    body: 'Edge API: Lightweight, low-latency endpoints for device registration, proof-of-play, and telemetry ingestion.'
  },
  'hardware': {
    title: 'Hardware',
    body: 'Hardware: Industrial-grade players and certified displays optimized for 24/7 operation in public venues.'
  },
  'documentation': {
    title: 'Documentation',
    body: 'Documentation: Integration guides, API references, and onboarding tutorials for advertisers and owners.'
  },
  'proof-of-play': {
    title: 'Proof of Play',
    body: 'Proof of Play: Immutable playback receipts and verification to guarantee impressions.'
  },
  'security': {
    title: 'Security',
    body: 'Security: Best practices for securing edge devices and protecting creative assets.'
  },
  'audit-logs': {
    title: 'Audit Logs',
    body: 'Audit Logs: Full transparency into system events, user actions, and playback history.'
  },
  'founders': {
    title: 'Founders',
    body: 'Founders: Meet the team building the future of physical advertising.'
  },
  'careers': {
    title: 'Careers',
    body: 'Careers: Join our team — we are hiring across engineering, product, and operations.'
  },
  'contact': {
    title: 'Contact',
    body: 'Contact: Reach out to our partnerships and support teams for enterprise onboarding.'
  },
  'press-kit': {
    title: 'Press Kit',
    body: 'Press Kit: Download logos, screenshots, and brand assets for media use.'
  },
  'privacy-protocol': {
    title: 'Privacy Protocol',
    body: 'Privacy Protocol: How we handle data and protect user privacy across the network.'
  },
  'service-agreement': {
    title: 'Service Agreement',
    body: 'Service Agreement: Terms of service and SLA for AdGrid platform usage.'
  }
};

export function InfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const key = slug || 'documentation';
  const page = CONTENT[key.replace(/\s+/g, '-').toLowerCase()] || { title: 'Info', body: 'Content coming soon.' };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-xl">
        <h1 className="text-4xl font-black mb-3">{page.title}</h1>
        <p className="text-zinc-600">{page.body}</p>
      </div>
      <div>
        <Link to="/" className="text-sm font-bold text-orange-500">← Back to Home</Link>
      </div>
    </div>
  );
}

export default InfoPage;
