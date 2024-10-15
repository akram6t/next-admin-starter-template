'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Books', value: 200 },
  { name: 'Home & Garden', value: 100 },
]

export function PieChartComponent() {

  // Generate an array of colors based on Shadcn UI theme variables
  const generateColors = () => {
    return [
      'hsl(var(--primary))',
      'hsl(var(--primary) / 0.8)',
      'hsl(var(--primary) / 0.6)',
      'hsl(var(--primary) / 0.4)',
    ]
  }

  const COLORS = generateColors()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}