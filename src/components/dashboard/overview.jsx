"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Feb",
    total: 18,
  },
  {
    name: "Mar",
    total: 24,
  },
  {
    name: "Apr",
    total: 32,
  },
  {
    name: "May",
    total: 28,
  },
  {
    name: "Jun",
    total: 42,
  },
  {
    name: "Jul",
    total: 38,
  },
  {
    name: "Aug",
    total: 45,
  },
  {
    name: "Sep",
    total: 52,
  },
  {
    name: "Oct",
    total: 48,
  },
  {
    name: "Nov",
    total: 58,
  },
  {
    name: "Dec",
    total: 68,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

