
import { Lightbulb, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SkillsDisplayProps {
  skills: string[];
  isLoading?: boolean;
}

const SkillsDisplay = ({ skills, isLoading = false }: SkillsDisplayProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-xl mx-auto my-6 p-4 bg-muted/50 rounded-lg animate-pulse">
        <div className="h-5 w-40 bg-muted rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-6 w-20 bg-muted rounded-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!skills.length) {
    return null;
  }

  return (
    <div className="w-full max-w-xl mx-auto my-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-4 space-x-2 text-secondary">
        <Lightbulb className="h-5 w-5" />
        <h3 className="font-medium">Skills Detected</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="outline" className="bg-secondary/10 hover:bg-secondary/20">
            {skill}
          </Badge>
        ))}
      </div>
      
      <div className="mt-4 flex items-center text-sm text-muted-foreground">
        <Search className="h-4 w-4 mr-1" />
        <span>Finding matching jobs based on these skills...</span>
      </div>
    </div>
  );
};

export default SkillsDisplay;
