import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Monday', cases: 4000, resolved: 2400 },
  { name: 'Tuesday', cases: 3000, resolved: 1398 },
  { name: 'Wednesday', cases: 2000, resolved: 9800 },
  { name: 'Thursday', cases: 2780, resolved: 3908 },
  { name: 'Friday', cases: 1890, resolved: 4800 },
  { name: 'Saturday', cases: 2390, resolved: 3800 },
  { name: 'Sunday', cases: 3490, resolved: 4300 },
];

export default function DashboardMetrics() {
  return (
    <section id="dashboard" className="section container" style={{ padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Live Impact <span className="gradient-text">Dashboard</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Real-time analytics monitored and orchestrated by Sahayak AI.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Active Critical Cases', value: '1,492', color: 'var(--priority-high)', trend: '+12% this hour' },
          { label: 'Volunteers Deployed', value: '8,304', color: 'var(--primary-blue)', trend: 'Optimal coverage' },
          { label: 'Resources Allocated', value: '45.2', unit: 'tons', color: 'var(--primary-purple)', trend: '+5% vs yesterday' },
          { label: 'AI Resolution Rate', value: '94', unit: '%', color: 'var(--primary-green)', trend: 'Industry leading' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass glow-on-hover"
            style={{ padding: '2rem', borderTop: `2px solid ${stat.color}` }}
          >
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{stat.label}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: stat.color, marginBottom: '0.5rem' }}>
              {stat.value}<span style={{ fontSize: '1.2rem', marginLeft: '4px' }}>{stat.unit}</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', opacity: 0.8 }}>{stat.trend}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass" 
          style={{ padding: '2rem', height: '400px' }}
        >
          <h3 style={{ marginBottom: '2rem' }}>Case Resolution Trajectory</h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                itemStyle={{ color: 'white' }}
              />
              <Line type="monotone" dataKey="cases" stroke="var(--primary-purple)" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="resolved" stroke="var(--primary-blue)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="glass" 
          style={{ padding: '2rem', height: '400px' }}
        >
          <h3 style={{ marginBottom: '2rem' }}>Resource Requests</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data.slice(0, 4)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              />
              <Bar dataKey="cases" fill="var(--primary-green)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
