
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  Calendar, 
  MapPin, 
  Clock, 
  Camera, 
  Edit2, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const UserProfile: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2020-05-12',
    location: 'Main Office',
    schedule: '09:00 - 17:00'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1500);
  };

  const handleUpdatePhoto = () => {
    toast({
      title: "Photo update",
      description: "Profile photo update feature will be available soon.",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="frosted-card overflow-hidden">
        <CardHeader className="relative pb-0">
          <div className="absolute top-4 right-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              disabled={isSaving}
            >
              {isEditing ? (
                <>Cancel</>
              ) : (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="w-24 h-24 border-4 border-background">
                <AvatarImage src="https://i.pravatar.cc/150?img=32" alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                onClick={handleUpdatePhoto}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <CardDescription>{userData.position}</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="name" 
                      name="name" 
                      value={userData.name} 
                      onChange={handleInputChange} 
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground mt-1">{userData.name}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={userData.email} 
                      onChange={handleInputChange} 
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground mt-1">{userData.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="department" className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                    <Building className="h-4 w-4" /> Department
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="department" 
                      name="department" 
                      value={userData.department} 
                      onChange={handleInputChange} 
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground mt-1">{userData.department}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="position" className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> Position
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="position" 
                      name="position" 
                      value={userData.position} 
                      onChange={handleInputChange} 
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground mt-1">{userData.position}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="joinDate" className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Join Date
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="joinDate" 
                      name="joinDate" 
                      type="date" 
                      value={userData.joinDate} 
                      onChange={handleInputChange} 
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground mt-1">{new Date(userData.joinDate).toLocaleDateString()}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="location" className="text-sm font-normal text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Default Location
                  </Label>
                  {isEditing ? (
                    <Input 
                      id="location" 
                      name="location" 
                      value={userData.location} 
                      onChange={handleInputChange} 
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-foreground mt-1">{userData.location}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-md font-medium mb-3">Work Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="frosted-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Working Hours</p>
                    {isEditing ? (
                      <Input 
                        id="schedule" 
                        name="schedule" 
                        value={userData.schedule} 
                        onChange={handleInputChange} 
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium">{userData.schedule}</p>
                    )}
                  </div>
                </div>
                
                <div className="frosted-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Primary Office</p>
                    <p className="font-medium">{userData.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        {isEditing && (
          <CardFooter className="border-t bg-secondary/30 px-6 py-4">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="ml-auto"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default UserProfile;
