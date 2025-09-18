"use client";

import { useState, useMemo } from 'react';
import studentData from './student_data.json';
import SkillChart from './components/SkillChart';
import AttentionChart from './components/AttentionChart';
import ProfileRadarChart from './components/ProfileRadarChart';

type Student = typeof studentData[0];

export default function Home() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(studentData[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: string } | null>({ key: 'student_id', direction: 'ascending' });

  const displayedStudents = useMemo(() => {
    let sortableStudents = [...studentData];
    if (searchTerm) {
      sortableStudents = sortableStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      sortableStudents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStudents;
  }, [searchTerm, sortConfig]);

  const requestSort = (key: keyof Student) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const totalStudents = studentData.length;
  const averageScore = Math.round(
    studentData.reduce((acc, student) => acc + student.assessment_score, 0) / totalStudents
  );
   const averageAttention = Math.round(
    studentData.reduce((acc, student) => acc + student.attention, 0) / totalStudents
  );

  const skillData = [
    { name: 'Comprehension', averageValue: Math.round(studentData.reduce((acc, s) => acc + s.comprehension, 0) / studentData.length) },
    { name: 'Attention', averageValue: Math.round(studentData.reduce((acc, s) => acc + s.attention, 0) / studentData.length) },
    { name: 'Focus', averageValue: Math.round(studentData.reduce((acc, s) => acc + s.focus, 0) / studentData.length) },
    { name: 'Retention', averageValue: Math.round(studentData.reduce((acc, s) => acc + s.retention, 0) / studentData.length) },
  ];

  const getSortIndicator = (key: keyof Student) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <main className="p-8 md:p-12 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Student Performance Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
          <h2 className="text-slate-500 text-lg">Total Students</h2>
          <p className="text-slate-900 text-4xl font-bold">{totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
          <h2 className="text-slate-500 text-lg">Average Score</h2>
          <p className="text-teal-600 text-4xl font-bold">{averageScore}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer">
           <h2 className="text-slate-500 text-lg">Average Attention</h2>
           <p className="text-indigo-500 text-4xl font-bold">{averageAttention}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <SkillChart data={skillData} />
        <AttentionChart data={studentData} />
        <ProfileRadarChart student={selectedStudent} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by student name..."
            className="w-full md:w-1/3 p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('student_id')} className="font-semibold text-slate-600 hover:text-indigo-600">ID{getSortIndicator('student_id')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('name')} className="font-semibold text-slate-600 hover:text-indigo-600">Name{getSortIndicator('name')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('class')} className="font-semibold text-slate-600 hover:text-indigo-600">Class{getSortIndicator('class')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('assessment_score')} className="font-semibold text-slate-600 hover:text-indigo-600">Score{getSortIndicator('assessment_score')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('comprehension')} className="font-semibold text-slate-600 hover:text-indigo-600">Comprehension{getSortIndicator('comprehension')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('attention')} className="font-semibold text-slate-600 hover:text-indigo-600">Attention{getSortIndicator('attention')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('focus')} className="font-semibold text-slate-600 hover:text-indigo-600">Focus{getSortIndicator('focus')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('retention')} className="font-semibold text-slate-600 hover:text-indigo-600">Retention{getSortIndicator('retention')}</button></th>
              <th className="py-3 px-4 text-left"><button onClick={() => requestSort('engagement_time')} className="font-semibold text-slate-600 hover:text-indigo-600">Engagement (min){getSortIndicator('engagement_time')}</button></th>
            </tr>
          </thead>
          <tbody className="text-slate-800">
            {displayedStudents.map((student) => (
              <tr 
                key={student.student_id} 
                onClick={() => setSelectedStudent(student)}
                className={`cursor-pointer border-b border-slate-200 transition-colors duration-200 ${
                  selectedStudent?.student_id === student.student_id ? 'bg-indigo-100' : 'hover:bg-slate-50'
                }`}
              >
                <td className="py-3 px-4">{student.student_id}</td>
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.class}</td>
                <td className="py-3 px-4 font-medium">{student.assessment_score}</td>
                <td className="py-3 px-4">{student.comprehension}</td>
                <td className="py-3 px-4">{student.attention}</td>
                <td className="py-3 px-4">{student.focus}</td>
                <td className="py-3 px-4">{student.retention}</td>
                <td className="py-3 px-4">{student.engagement_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}