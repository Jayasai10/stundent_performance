"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

type Student = {
  comprehension: number;
  attention: number;
  focus: number;
  retention: number;
  name: string;
};

export default function ProfileRadarChart({ student }: { student: Student | null }) {
  if (!student) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-[376px]">
        <p className="text-gray-500 text-center">Click on a student in the table below to see their profile</p>
      </div>
    );
  }

  const data = [
    { subject: 'Comprehension', A: student.comprehension, fullMark: 100 },
    { subject: 'Attention', A: student.attention, fullMark: 100 },
    { subject: 'Focus', A: student.focus, fullMark: 100 },
    { subject: 'Retention', A: student.retention, fullMark: 100 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Cognitive Profile: {student.name}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name={student.name} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}