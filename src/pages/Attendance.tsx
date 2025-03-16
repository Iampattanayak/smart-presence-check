
import React from 'react';
import Layout from '@/components/Layout';
import AttendanceCapture from '@/components/AttendanceCapture';

const Attendance: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Attendance Check-In</h1>
            <p className="text-lg text-muted-foreground">
              Use facial recognition to instantly check in and out of your workspace
            </p>
          </div>
          
          <AttendanceCapture />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
