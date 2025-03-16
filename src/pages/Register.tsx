
import React from 'react';
import Layout from '@/components/Layout';
import FaceRegistration from '@/components/FaceRegistration';

const Register: React.FC = () => {
  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Register Your Face</h1>
            <p className="text-lg text-muted-foreground">
              Enroll your face in our secure system to enable automatic attendance tracking
            </p>
          </div>
          
          <FaceRegistration />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
