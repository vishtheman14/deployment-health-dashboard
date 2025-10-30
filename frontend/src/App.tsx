import React, { useEffect, useState } from 'react';

type Service = {
  service: string;
  status: string;
  version: string;
  last_deploy: string;
};

const API = import.meta.env.VITE_API_BASE_URL as string;

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!API) throw new Error('VITE_API_BASE_URL is not defined');
      const res = await fetch(`${API}/status`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServices(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>Deployment Health Dashboard</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Environment: <code>{API || '(missing VITE_API_BASE_URL)'}</code>
      </p>
      <button onClick={fetchStatus} style={{ padding: '8px 12px', marginBottom: 16, borderRadius: 8, border: '1px solid #ccc' }}>
        Refresh
      </button>
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Service</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Status</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Version</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Last Deploy</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.service}>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{s.service}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{s.status}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{s.version}</td>
                <td style={{ borderBottom: '1px solid #f0f0f0', padding: 8 }}>{s.last_deploy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
