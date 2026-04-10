import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fmt } from './constants'

const COLORS = ['#fb7185', '#fbbf24', '#818cf8', '#34d399', '#60a5fa', '#c084fc', '#6ee7b7', '#f472b6'];

const CHART_THEME = {
  tooltipBg: '#1a1d2e',
  tooltipBorder: 'rgba(255,255,255,0.1)',
  textPrimary: '#e8ecf8',
  textSecondary: '#6b7494',
  gridStroke: 'rgba(255,255,255,0.05)',
  axisLine: 'rgba(255,255,255,0.07)',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: CHART_THEME.tooltipBg,
        border: `1px solid ${CHART_THEME.tooltipBorder}`,
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
        color: CHART_THEME.textPrimary,
      }}>
        <p style={{ color: CHART_THEME.textSecondary, marginBottom: 4, textTransform: 'capitalize' }}>{label}</p>
        <p style={{ fontWeight: 600 }}>${fmt(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={32}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_THEME.gridStroke}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: CHART_THEME.textSecondary, fontSize: 12, fontFamily: 'Plus Jakarta Sans' }}
            axisLine={{ stroke: CHART_THEME.axisLine }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: CHART_THEME.textSecondary, fontSize: 12, fontFamily: 'Plus Jakarta Sans' }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
