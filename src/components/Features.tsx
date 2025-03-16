
import React from 'react';
import { 
  UserPlus, Camera, BarChart3, Bell, Users, FileText, ShieldCheck, Zap
} from 'lucide-react';

const features = [
  {
    icon: <UserPlus className="h-8 w-8 text-primary" />,
    title: 'Easy Registration',
    description: 'Simple onboarding process with face enrollment in less than a minute'
  },
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: 'Real-time Recognition',
    description: 'Advanced facial recognition with 95%+ accuracy in varied conditions'
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Powerful Analytics',
    description: 'Comprehensive dashboards with actionable attendance insights'
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: 'Smart Notifications',
    description: 'Automated alerts for check-ins, anomalies, and attendance patterns'
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Team Management',
    description: 'Organize users by departments with customizable access controls'
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Exportable Reports',
    description: 'Generate and export reports in CSV/PDF formats with custom filters'
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Privacy Focused',
    description: 'GDPR-compliant with consent management and data protection'
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'High Performance',
    description: 'Optimized for speed with <1-second response time even at scale'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of attendance tracking with our comprehensive solution
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="frosted-card p-6 hover-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
