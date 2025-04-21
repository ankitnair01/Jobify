
import { Building, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  postedDate: string;
  skills: string[];
  matchScore: number;
  applyUrl: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const handleApply = () => {
    // Open the link in a new tab
    window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-md border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
            <div className="flex items-center mt-1 text-gray-600">
              <Building className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{job.company}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{job.postedDate}</span>
            </div>
          </div>
          
          <div className="bg-primary/10 px-3 py-1 rounded-full">
            <span className="text-primary font-medium">
              {job.matchScore}% Match
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Matching Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary/10">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Button 
          className="w-full" 
          onClick={handleApply}
        >
          Apply Now <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
