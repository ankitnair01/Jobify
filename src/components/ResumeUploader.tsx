
import { ChangeEvent, useState } from "react";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
  onResumeProcessed: (keywords: string[]) => void;
}

const ResumeUploader = ({ onResumeProcessed }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setError(null);
    setSuccess(false);
    
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf' && 
        selectedFile.type !== 'application/msword' && 
        selectedFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setError("Please upload a PDF or Word document");
      setFile(null);
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
      setError("File size should be less than 5MB");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate upload delay
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setUploading(false);
      simulateProcessing();
    }, 2000);
  };
  
  const simulateProcessing = () => {
    setProcessing(true);
    
    // Simulate resume processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Extract simulated keywords based on filename
      const keywords = extractKeywords(file?.name || "");
      onResumeProcessed(keywords);
    }, 2000);
  };
  
  const extractKeywords = (filename: string) => {
    // This is a simplified simulation. In a real app, this would use an API for NLP
    const randomSkills = [
      "JavaScript", "React", "Python", "Data Analysis", "Java", 
      "Product Management", "Marketing", "Social Media", "UX Design",
      "Machine Learning", "SQL", "Node.js", "AWS", "Project Management",
      "Sales", "Customer Service", "Communication", "Leadership"
    ];
    
    // Pick 5-8 random skills
    const count = 5 + Math.floor(Math.random() * 4);
    const shuffled = [...randomSkills].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center space-y-4 transition-all",
          file ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50",
          error ? "border-destructive bg-destructive/5" : ""
        )}
      >
        <div className="text-center">
          {!file && (
            <div className="mb-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {file && !error && !uploading && !processing && !success && (
            <div className="mb-4">
              <FileText className="mx-auto h-12 w-12 text-primary" />
            </div>
          )}
          
          {success && (
            <div className="mb-4">
              <CheckCircle className="mx-auto h-12 w-12 text-accent" />
            </div>
          )}
          
          {error && (
            <div className="mb-4">
              <XCircle className="mx-auto h-12 w-12 text-destructive" />
            </div>
          )}
          
          <h3 className="text-lg font-medium text-gray-900">
            {!file ? "Upload your resume" : file.name}
          </h3>
          
          <p className="mt-1 text-sm text-gray-500">
            {!file ? "PDF or Word files (Max 5MB)" : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
          </p>
          
          {error && (
            <p className="mt-2 text-sm text-destructive font-medium">{error}</p>
          )}
          
          {success && (
            <p className="mt-2 text-sm text-accent font-medium">
              Resume processed successfully!
            </p>
          )}
        </div>
        
        {!file && (
          <label className="cursor-pointer">
            <Button variant="outline" className="relative">
              <span>Select file</span>
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </Button>
          </label>
        )}
        
        {file && !uploading && !processing && !success && (
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setFile(null)}>
              Change
            </Button>
            <Button onClick={handleUpload}>
              Upload & Process
            </Button>
          </div>
        )}
        
        {(uploading || processing) && (
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {uploading ? "Uploading..." : "Processing..."}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {uploading ? `${uploadProgress}%` : ""}
              </span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUploader;
