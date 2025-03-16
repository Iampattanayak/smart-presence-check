
import React from 'react';
import Layout from '@/components/Layout';
import FaceRegistration from '@/components/FaceRegistration';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const Register: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Register Your Face</h1>
            <p className="text-lg text-muted-foreground">
              Enroll your face in our secure system to enable automatic attendance tracking
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="bg-muted/50 border-muted">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-2">Privacy & Security Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Your facial data is encrypted and stored securely</li>
                      <li>• We do not share your biometric data with third parties</li>
                      <li>• You can request deletion of your data at any time</li>
                      <li>• Camera permission is required for registration</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <FaceRegistration />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
