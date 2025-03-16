
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Filter, 
  ArrowUpDown, 
  FileDown, 
  User, 
  MapPin, 
  Clock,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Mock data for attendance records
const mockAttendanceData = [
  { 
    id: 1, 
    date: '2023-09-10', 
    checkInTime: '09:01:22', 
    checkOutTime: '17:04:56', 
    status: 'Present',
    location: 'Main Office' 
  },
  { 
    id: 2, 
    date: '2023-09-09', 
    checkInTime: '08:56:34', 
    checkOutTime: '17:31:12', 
    status: 'Present',
    location: 'Main Office' 
  },
  { 
    id: 3, 
    date: '2023-09-08', 
    checkInTime: '09:14:02', 
    checkOutTime: '16:49:30', 
    status: 'Late',
    location: 'Main Office' 
  },
  { 
    id: 4, 
    date: '2023-09-07', 
    checkInTime: '08:59:47', 
    checkOutTime: '17:02:11', 
    status: 'Present',
    location: 'Main Office' 
  },
  { 
    id: 5, 
    date: '2023-09-06', 
    checkInTime: '--:--:--', 
    checkOutTime: '--:--:--', 
    status: 'Absent',
    location: '--' 
  },
  { 
    id: 6, 
    date: '2023-09-05', 
    checkInTime: '09:03:18', 
    checkOutTime: '17:00:25', 
    status: 'Present',
    location: 'Main Office' 
  },
  { 
    id: 7, 
    date: '2023-09-04', 
    checkInTime: '08:50:22', 
    checkOutTime: '16:55:42', 
    status: 'Present',
    location: 'Main Office' 
  }
];

// Analytics data
const analyticsData = {
  present: 5,
  absent: 1,
  late: 1,
  totalHours: 40.5,
  avgCheckIn: '09:01',
  avgCheckOut: '17:02'
};

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'MMMM'));
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="frosted-card md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>View your attendance stats for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="frosted-card p-4 hover-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Present</p>
                    <p className="text-2xl font-semibold">{analyticsData.present} days</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="frosted-card p-4 hover-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Absent</p>
                    <p className="text-2xl font-semibold">{analyticsData.absent} day</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="frosted-card p-4 hover-card">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Late</p>
                    <p className="text-2xl font-semibold">{analyticsData.late} day</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="frosted-card p-4 hover-card">
                <p className="text-sm text-muted-foreground mb-1">Total Hours</p>
                <p className="text-2xl font-semibold">{analyticsData.totalHours}h</p>
              </div>
              
              <div className="frosted-card p-4 hover-card">
                <p className="text-sm text-muted-foreground mb-1">Avg. Check-in</p>
                <p className="text-2xl font-semibold">{analyticsData.avgCheckIn}</p>
              </div>
              
              <div className="frosted-card p-4 hover-card">
                <p className="text-sm text-muted-foreground mb-1">Avg. Check-out</p>
                <p className="text-2xl font-semibold">{analyticsData.avgCheckOut}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="frosted-card">
          <CardHeader className="pb-3">
            <CardTitle>Calendar</CardTitle>
            <CardDescription>September 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
      
      <Card className="frosted-card">
        <CardHeader className="pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Recent attendance records and status</CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{selectedMonth}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Select
                  value={selectedMonth}
                  onValueChange={setSelectedMonth}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </SelectContent>
                </Select>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <FileDown className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Check-in
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.date}
                    </TableCell>
                    <TableCell>
                      {record.checkInTime}
                    </TableCell>
                    <TableCell>
                      {record.checkOutTime}
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        record.status === 'Present' && 'bg-green-100 text-green-800 hover:bg-green-200',
                        record.status === 'Absent' && 'bg-red-100 text-red-800 hover:bg-red-200',
                        record.status === 'Late' && 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
                      )}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.location}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">Showing 7 of 30 records</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
