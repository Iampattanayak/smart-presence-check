
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload, RefreshCw, Check, AlertCircle, User, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FaceRegistration: React.FC = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    department: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Clean up function for camera stream
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      // Reset any previous error
      setCameraError(null);
      
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Ensure the video plays
        await videoRef.current.play();
        setStream(mediaStream);
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      let errorMessage = "Unable to access camera. Please check permissions.";
      
      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          errorMessage = "Camera access denied. Please allow camera permission in your browser settings.";
        } else if (error.name === "NotFoundError") {
          errorMessage = "No camera found on your device.";
        } else if (error.name === "NotReadableError") {
          errorMessage = "Camera is already in use by another application.";
        }
      }
      
      setCameraError(errorMessage);
      
      toast({
        title: "Camera access issue",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsCapturing(false);
    }
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current && isCapturing) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Match canvas dimensions to video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw current video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL and add to captured images
        const imageDataUrl = canvas.toDataURL('image/png');
        
        if (capturedImages.length < 5) {
          setCapturedImages(prev => [...prev, imageDataUrl]);
          
          // Show success toast
          toast({
            title: `Image ${capturedImages.length + 1} captured`,
            description: capturedImages.length < 4 ? "Please capture more angles of your face." : "You've captured enough images!",
          });
        }
      }
    }
  }, [isCapturing, capturedImages, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (capturedImages.length < 3) {
      toast({
        title: "Not enough images",
        description: "Please capture at least 3 images of your face from different angles.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userData.name || !userData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      toast({
        title: "Registration successful!",
        description: "Your face has been registered successfully.",
      });
      
      // Reset form
      setCapturedImages([]);
      setUserData({
        name: '',
        email: '',
        department: '',
      });
      setIsSubmitting(false);
      stopCamera();
    }, 2000);
  };

  const retryCamera = () => {
    setCameraError(null);
    startCamera();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="frosted-card overflow-hidden">
        <CardHeader>
          <CardTitle>Face Registration</CardTitle>
          <CardDescription>
            Capture multiple images of your face to register for the attendance system
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department (Optional)</Label>
                <Input
                  id="department"
                  name="department"
                  value={userData.department}
                  onChange={handleInputChange}
                  placeholder="Engineering, Marketing, etc."
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
                {cameraError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <ShieldAlert className="h-12 w-12 mb-4 text-destructive opacity-70" />
                    <p className="mb-4 text-destructive">{cameraError}</p>
                    <Button 
                      type="button" 
                      onClick={retryCamera}
                      variant="outline" 
                      size="sm"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : isCapturing ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover z-10"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Camera className="h-12 w-12 mb-2 opacity-20" />
                    <p>Camera preview will appear here</p>
                  </div>
                )}
                
                {isCapturing && (
                  <div className="camera-frame inset-10 z-20"></div>
                )}
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              {cameraError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Camera Access Error</AlertTitle>
                  <AlertDescription>
                    Please ensure that camera permissions are allowed in your browser settings.
                    You may need to refresh the page after enabling permission.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-wrap gap-2">
                {capturedImages.map((image, index) => (
                  <div key={index} className="relative w-16 h-16 rounded-md overflow-hidden border border-border bg-black/5">
                    <img 
                      src={image} 
                      alt={`Captured face ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                ))}
                
                {Array.from({ length: Math.max(0, 5 - capturedImages.length) }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-16 h-16 rounded-md border border-dashed border-border bg-black/5 flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col xs:flex-row gap-2">
                {isCapturing ? (
                  <>
                    <Button 
                      type="button" 
                      onClick={captureImage}
                      disabled={capturedImages.length >= 5}
                      className="flex-1"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Capture Face ({capturedImages.length}/5)
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={stopCamera}
                      className="flex-none"
                    >
                      Stop Camera
                    </Button>
                  </>
                ) : (
                  <Button 
                    type="button" 
                    onClick={startCamera} 
                    className="w-full"
                    disabled={!!cameraError}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                )}
              </div>
              
              {capturedImages.length > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <p className="text-muted-foreground">
                    <Check className="inline-block h-4 w-4 mr-1 text-primary" />
                    {capturedImages.length} image{capturedImages.length !== 1 ? 's' : ''} captured
                  </p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCapturedImages([])}
                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Reset
                  </Button>
                </div>
              )}
              
              {capturedImages.length < 3 && (
                <div className="flex items-center p-3 text-sm rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                  <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p>Please capture at least 3 different angles of your face</p>
                </div>
              )}
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col xs:flex-row gap-4 border-t bg-secondary/30 px-6 py-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || capturedImages.length < 3 || !userData.name || !userData.email}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Complete Registration
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FaceRegistration;
