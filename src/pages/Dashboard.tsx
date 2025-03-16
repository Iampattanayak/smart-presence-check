
import React from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import UserProfile from '@/components/UserProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Track your attendance records and manage your profile
            </p>
          </div>
          
          <Tabs defaultValue="attendance" className="max-w-6xl mx-auto">
            <TabsList className="mb-8">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="attendance" className="animate-fade-in">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="profile" className="animate-fade-in">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
