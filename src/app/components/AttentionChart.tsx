"use client";

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

type Student = {
  attention: number;
  assessment_score: number;
};

export default function AttentionChart({ data }: { data: Student[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Attention vs. Assessment Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="attention" name="Attention Score" stroke="#6b7280" />
          <YAxis type="number" dataKey="assessment_score" name="Final Score" unit="%" stroke="#6b7280" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperClassName="!bg-white !border-gray-300 !rounded-md" />
          <Legend />
          <Scatter name="Student" data={data} fill="#6366f1" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}