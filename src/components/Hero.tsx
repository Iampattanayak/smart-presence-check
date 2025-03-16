
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, Database } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Introducing Smart Presence
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl animate-blur-in">
            <span className="gradient-text">Face Recognition</span> Attendance System
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-in">
            Automate attendance tracking with our advanced facial recognition technology. Secure, accurate, and effortless.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link to="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link to="/attendance">Try Demo</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-fade-in">
            <div className="frosted-card p-6 text-center hover-card">
              <div className="flex justify-center mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">End-to-end encryption with GDPR compliance built-in</p>
            </div>
            
            <div className="frosted-card p-6 text-center hover-card">
              <div className="flex justify-center mb-4">
                <Clock className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-muted-foreground">Instant check-in/out with < 1 second latency</p>
            </div>
            
            <div className="frosted-card p-6 text-center hover-card">
              <div className="flex justify-center mb-4">
                <Database className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Cloud Synced</h3>
              <p className="text-sm text-muted-foreground">All data instantly synchronized to secure cloud database</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
