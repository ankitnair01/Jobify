
import { useState, useEffect } from "react";
import { Filter, SortAsc, SortDesc } from "lucide-react";
import JobCard, { Job } from "./JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface JobListingsProps {
  skills: string[];
}

const JobListings = ({ skills }: JobListingsProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching matching jobs based on skills
  useEffect(() => {
    if (skills.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const matchedJobs = getMatchingJobs(skills);
      setJobs(matchedJobs);
      setFilteredJobs(matchedJobs);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [skills]);
  
  // Filter jobs by search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);
  
  // Sort jobs by match score
  const handleSortToggle = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    
    const sorted = [...filteredJobs].sort((a, b) => {
      return newOrder === "desc" 
        ? b.matchScore - a.matchScore 
        : a.matchScore - b.matchScore;
    });
    
    setFilteredJobs(sorted);
  };
  
  if (skills.length === 0) return null;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {isLoading ? (
        <JobListingsSkeleton />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredJobs.length} Matching Jobs
            </h2>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleSortToggle}
              >
                {sortOrder === "desc" ? (
                  <>
                    <SortDesc className="mr-1 h-4 w-4" />
                    Highest Match
                  </>
                ) : (
                  <>
                    <SortAsc className="mr-1 h-4 w-4" />
                    Lowest Match
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                  <SelectItem value="recent">Recently Posted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Filter className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No matching jobs</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

const JobListingsSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-8 w-32" />
    </div>
    
    <div className="mb-6 flex gap-4">
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-10 w-40" />
    </div>
    
    {Array(3).fill(0).map((_, i) => (
      <div key={i} className="border rounded-lg overflow-hidden">
        <div className="p-6">
          <Skeleton className="h-6 w-3/5 mb-3" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-4 w-2/5 mb-4" />
          <div className="flex flex-wrap gap-2 mt-4">
            {Array(4).fill(0).map((_, j) => (
              <Skeleton key={j} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    ))}
  </div>
);

export default JobListings;

// Utility function to generate mock matching jobs
const getMatchingJobs = (skills: string[]): Job[] => {
  const companies = [
    "TechCorp", "InnovateSoft", "DataDynamics", "FutureTech", 
    "SoftSolutions", "WebWorks", "CodeCrafters", "ByteBuilders",
    "CloudCompute", "DevDreams", "NexusNet", "QuantumQueries"
  ];
  
  const locations = [
    "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
    "Boston, MA", "Remote", "Chicago, IL", "Denver, CO",
    "Los Angeles, CA", "Atlanta, GA", "Portland, OR", "Remote (US)"
  ];
  
  const days = [1, 2, 3, 5, 7, 10, 14, 21, 30];
  
  const jobBoards = [
    "https://www.linkedin.com/jobs/",
    "https://www.indeed.com/jobs?q=",
    "https://www.glassdoor.com/Job/jobs.htm?suggestCount=0&suggestChosen=false&clickSource=searchBtn&typedKeyword=",
    "https://www.monster.com/jobs/search/?q=",
    "https://www.ziprecruiter.com/candidate/search?search=",
  ];
  
  const generateJobTitle = (skill: string) => {
    const titles = {
      "JavaScript": ["Frontend Developer", "Web Developer", "JavaScript Engineer"],
      "React": ["React Developer", "Frontend Engineer", "UI Developer"],
      "Python": ["Python Developer", "Backend Engineer", "Data Engineer"],
      "Data Analysis": ["Data Analyst", "Business Analyst", "Data Scientist"],
      "Java": ["Java Developer", "Backend Engineer", "Full Stack Developer"],
      "Product Management": ["Product Manager", "Product Owner", "Associate Product Manager"],
      "Marketing": ["Marketing Specialist", "Digital Marketer", "Marketing Coordinator"],
      "Social Media": ["Social Media Manager", "Content Creator", "Social Media Specialist"],
      "UX Design": ["UX Designer", "UI/UX Designer", "Product Designer"],
      "Machine Learning": ["ML Engineer", "Data Scientist", "AI Researcher"],
      "SQL": ["Database Developer", "Data Analyst", "SQL Developer"],
      "Node.js": ["Backend Developer", "Full Stack Engineer", "Node.js Developer"],
      "AWS": ["Cloud Engineer", "DevOps Engineer", "AWS Specialist"],
      "Project Management": ["Project Manager", "Scrum Master", "Project Coordinator"],
      "Sales": ["Sales Representative", "Account Executive", "Sales Specialist"],
      "Customer Service": ["Customer Support Specialist", "Customer Success Manager", "Support Agent"],
      "Communication": ["Communications Specialist", "Content Writer", "PR Specialist"],
      "Leadership": ["Team Lead", "Manager", "Director"]
    };
    
    const defaultTitles = ["Associate", "Specialist", "Coordinator"];
    const options = titles[skill as keyof typeof titles] || defaultTitles;
    return options[Math.floor(Math.random() * options.length)];
  };
  
  const getRandomSkills = (userSkills: string[]) => {
    // Ensure some matching skills
    const matchCount = 2 + Math.floor(Math.random() * 3); // 2-4 matching skills
    const shuffled = [...userSkills].sort(() => 0.5 - Math.random());
    const matching = shuffled.slice(0, matchCount);
    
    // Add some other skills
    const otherSkills = [
      "Teamwork", "Communication", "Problem Solving", 
      "Critical Thinking", "Time Management", "Agile",
      "Jira", "Git", "REST API", "GraphQL", "TypeScript"
    ];
    
    const otherCount = Math.floor(Math.random() * 3); // 0-2 other skills
    const other = [...otherSkills]
      .sort(() => 0.5 - Math.random())
      .slice(0, otherCount)
      .filter(skill => !matching.includes(skill));
    
    return [...matching, ...other];
  };
  
  const calculateMatchScore = (jobSkills: string[], userSkills: string[]) => {
    const matchingCount = jobSkills.filter(skill => userSkills.includes(skill)).length;
    const matchPercentage = Math.round((matchingCount / jobSkills.length) * 100);
    
    // Add some randomness for varied results
    return Math.min(100, matchPercentage + Math.floor(Math.random() * 15));
  };
  
  // Generate 8-12 jobs
  const jobCount = 8 + Math.floor(Math.random() * 5);
  const jobs: Job[] = [];
  
  for (let i = 0; i < jobCount; i++) {
    // Pick a primary skill for this job
    const primarySkill = skills[Math.floor(Math.random() * skills.length)];
    const title = generateJobTitle(primarySkill);
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const day = days[Math.floor(Math.random() * days.length)];
    const postedDate = `Posted ${day} day${day === 1 ? '' : 's'} ago`;
    
    const jobSkills = getRandomSkills(skills);
    const matchScore = calculateMatchScore(jobSkills, skills);
    
    // Create a valid and working URL
    const jobBoard = jobBoards[Math.floor(Math.random() * jobBoards.length)];
    const searchTerm = `${title.replace(/ /g, '+')}+${primarySkill.replace(/ /g, '+')}`;
    const applyUrl = `${jobBoard}${searchTerm}`;
    
    jobs.push({
      id: `job-${i + 1}`,
      title,
      company,
      location,
      postedDate,
      skills: jobSkills,
      matchScore,
      applyUrl
    });
  }
  
  // Sort by match score descending
  return jobs.sort((a, b) => b.matchScore - a.matchScore);
};
