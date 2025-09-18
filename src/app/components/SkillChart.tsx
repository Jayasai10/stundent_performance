"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type SkillData = {
  name: string;
  averageValue: number;
};

export default function SkillChart({ data }: { data: SkillData[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Average Cognitive Skills</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-md" />
          <Legend />
          <Bar dataKey="averageValue" fill="#14b8a6" name="Average Value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}