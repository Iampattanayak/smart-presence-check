
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Check, User, MapPin, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const AttendanceCapture: React.FC = () => {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedUser, setRecognizedUser] = useState<{
    name: string;
    time: string;
    status: 'check-in' | 'check-out';
  } | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  // Update the current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCapturing(true);
        
        // Start recognition sequence after camera is started
        setTimeout(() => {
          simulateRecognition();
        }, 2000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access for facial recognition.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCapturing(false);
    }
  }, [stream]);

  const captureFrame = useCallback(() => {
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
        
        // Process the image (in a real app, you would send this to a face recognition service)
        return canvas.toDataURL('image/png');
      }
    }
    return null;
  }, [isCapturing]);

  // This is a simulated face recognition function for demo purposes
  const simulateRecognition = () => {
    setIsProcessing(true);
    
    // Capture the current frame
    captureFrame();
    
    // Animate the frame to show active recognition
    if (frameRef.current) {
      frameRef.current.classList.add('actively-processing');
    }
    
    // Simulate processing delay
    setTimeout(() => {
      // Simulate successful recognition
      const users = [
        { name: 'John Smith', status: 'check-in' as const },
        { name: 'Sarah Johnson', status: 'check-out' as const },
        { name: 'Alex Wong', status: 'check-in' as const }
      ];
      
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      setRecognizedUser({
        name: randomUser.name,
        time: currentTime,
        status: randomUser.status
      });
      
      setIsProcessing(false);
      
      if (frameRef.current) {
        frameRef.current.classList.remove('actively-processing');
      }
      
      // Show success toast
      toast({
        title: `${randomUser.status === 'check-in' ? 'Check-in' : 'Check-out'} successful!`,
        description: `${randomUser.name} has been ${randomUser.status === 'check-in' ? 'checked in' : 'checked out'} at ${currentTime}.`,
      });
      
      // Reset after a few seconds
      setTimeout(() => {
        setRecognizedUser(null);
      }, 5000);
    }, 3000);
  };

  const handleCapture = () => {
    setRecognizedUser(null);
    simulateRecognition();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="frosted-card overflow-hidden">
        <CardHeader>
          <CardTitle>Attendance Check-In</CardTitle>
          <CardDescription>
            Use the camera to automatically recognize your face and record attendance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
              {isCapturing ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                  <Camera className="h-12 w-12 mb-2 opacity-20" />
                  <p>Camera preview will appear here</p>
                </div>
              )}
              
              {isCapturing && (
                <div 
                  ref={frameRef}
                  className={`camera-frame inset-10 ${isProcessing ? 'actively-processing' : ''}`}
                  style={{ 
                    borderColor: isProcessing ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.3)',
                    borderWidth: isProcessing ? '3px' : '2px',
                    boxShadow: isProcessing ? '0 0 0 2px hsl(var(--primary) / 0.2)' : 'none',
                  }}
                ></div>
              )}
              
              <canvas ref={canvasRef} className="hidden" />
              
              {recognizedUser && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">{recognizedUser.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{recognizedUser.time}</p>
                  <Badge variant={recognizedUser.status === 'check-in' ? 'default' : 'secondary'}>
                    {recognizedUser.status === 'check-in' ? 'Checked In' : 'Checked Out'}
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-4 rounded-lg border border-border bg-secondary/20">
                <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="text-sm font-medium">Current Time</p>
                  <p className="text-lg">{currentTime}</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 rounded-lg border border-border bg-secondary/20">
                <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-lg">Main Office</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col xs:flex-row gap-4 border-t bg-secondary/30 px-6 py-4">
          {isCapturing ? (
            <>
              <Button 
                onClick={handleCapture}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Recognizing Face...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Attendance
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={stopCamera}
                className="w-full sm:w-auto"
              >
                <X className="mr-2 h-4 w-4" />
                Stop Camera
              </Button>
            </>
          ) : (
            <Button 
              onClick={startCamera} 
              className="w-full"
            >
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AttendanceCapture;
