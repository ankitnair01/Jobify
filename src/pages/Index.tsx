
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ResumeUploader from "@/components/ResumeUploader";
import SkillsDisplay from "@/components/SkillsDisplay";
import JobListings from "@/components/JobListings";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [detectedSkills, setDetectedSkills] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleResumeProcessed = (skills: string[]) => {
    setIsProcessing(true);
    // Simulate a slight delay for the skills extraction
    setTimeout(() => {
      setDetectedSkills(skills);
      setIsProcessing(false);
    }, 500);
  };

  const renderContent = () => {
    const session = supabase.auth.getSession();
    
    if (!session) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Sign in to Get Started
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            To upload your resume and find matching job opportunities, please sign in or create an account.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="default" 
              onClick={() => navigate("/auth")}
              size="lg"
              className="min-w-[120px]"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/auth")}
              size="lg"
              className="min-w-[120px]"
            >
              Sign Up
            </Button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Upload Your Resume
          </h2>
          <ResumeUploader onResumeProcessed={handleResumeProcessed} />
        </div>
        
        <SkillsDisplay 
          skills={detectedSkills} 
          isLoading={isProcessing}
        />
        
        {detectedSkills.length > 0 && (
          <div className="mt-8">
            <JobListings skills={detectedSkills} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform -skew-y-2"></div>
            <div className="relative z-10 py-10 px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
                Find Your Perfect Job Match
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Upload your resume and our AI will match you with the best job opportunities 
                based on your <span className="text-primary font-medium">skills</span> and 
                <span className="text-accent font-medium"> experience</span>.
              </p>
            </div>
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gradient-to-tr from-secondary/10 to-accent/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-bl from-primary/10 to-secondary/20 rounded-full blur-3xl z-0"></div>
          </div>
          
          {renderContent()}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Jobify
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
