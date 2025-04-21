import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { Briefcase, Building, GraduationCap, MapPin, Trash2, Upload } from "lucide-react";

type UserProfile = {
  fullName: string;
  institution: string;
  interests: string;
  location: string;
  resumeUrl: string | null;
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    institution: "",
    interests: "",
    location: "",
    resumeUrl: null,
  });

  // Check authentication
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      
      // Fetch profile data
      setLoading(false);
      
      // Simulate fetching existing profile data
      // In a real app, you would fetch this from your database
      setTimeout(() => {
        setProfile({
          fullName: session.user.email?.split('@')[0] || "",
          institution: "",
          interests: "",
          location: "",
          resumeUrl: null,
        });
        setLoading(false);
      }, 500);
    };
    
    checkUser();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Here you would save the profile to your database
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please upload a PDF file.",
      });
      return;
    }
    
    setUploadingResume(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would upload this to storage and get a URL
      setProfile(prev => ({
        ...prev,
        resumeUrl: URL.createObjectURL(file),
      }));
      
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully uploaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload resume. Please try again.",
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleResumeDelete = async () => {
    try {
      // In a real app, you would delete the file from storage
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProfile(prev => ({
        ...prev,
        resumeUrl: null,
      }));
      
      toast({
        title: "Resume removed",
        description: "Your resume has been successfully removed.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove resume. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-primary">Loading profile...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Information */}
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="fullName"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution/Company</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="institution"
                        name="institution"
                        value={profile.institution}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="University or company name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interests">Areas of Interest</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Textarea 
                        id="interests"
                        name="interests"
                        value={profile.interests}
                        onChange={handleInputChange}
                        className="pl-10 min-h-[100px]"
                        placeholder="Web Development, Data Science, etc."
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="location"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                        className="pl-10"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? "Saving..." : "Save Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Resume Management */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.resumeUrl ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">Resume uploaded</p>
                    <div className="flex justify-center mb-4">
                      <a 
                        href={profile.resumeUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-4 py-2 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
                      >
                        View Resume
                      </a>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={handleResumeDelete}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Resume
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <Upload className="h-10 w-10 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload your resume in PDF format
                    </p>
                    <label htmlFor="resumeUpload">
                      <Input 
                        id="resumeUpload" 
                        type="file" 
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        as="span"
                        disabled={uploadingResume}
                      >
                        {uploadingResume ? "Uploading..." : "Choose File"}
                      </Button>
                    </label>
                  </div>
                )}
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Your resume will be used to match you with job opportunities that fit your skills and experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Jobify
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;


// "use client";

// import React, { useState, useEffect } from "react";
// import { supabase } from "@/integrations/supabase/client";
// import { useUser } from "@supabase/auth-helpers-react";
// import { Loader2, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// interface ProfileData {
//   fullName: string;
//   institution: string;
//   interests: string;
//   location: string;
//   resumeUrl: string | null;
// }

// export default function Profile() {
//   const user = useUser();
//   const [profile, setProfile] = useState<ProfileData>({
//     fullName: "",
//     institution: "",
//     interests: "",
//     location: "",
//     resumeUrl: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const checkUser = async () => {
//       if (!user) return;
//       setLoading(true);

//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .single();

//       if (error && error.code !== "PGRST116") {
//         console.error("Fetch error:", error);
//       } else if (data) {
//         setProfile({
//           fullName: data.full_name || "",
//           institution: data.institution || "",
//           interests: data.interests || "",
//           location: data.location || "",
//           resumeUrl: data.resume_url || null,
//         });
//       }

//       setLoading(false);
//     };

//     checkUser();
//   }, [user]);

//   const handleProfileUpdate = async () => {
//     if (!user) return;

//     setSaving(true);

//     const { error } = await supabase.from("profiles").upsert({
//       id: user.id,
//       full_name: profile.fullName,
//       institution: profile.institution,
//       interests: profile.interests,
//       location: profile.location,
//       resume_url: profile.resumeUrl,
//     });

//     if (error) {
//       console.error("Profile update error:", error);
//     }

//     setSaving(false);
//   };

//   const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !user) return;

//     setLoading(true);
//     const filePath = `resumes/${user.id}-${file.name}`;

//     const { error: uploadError } = await supabase.storage
//       .from("resumes")
//       .upload(filePath, file, { upsert: true });

//     if (uploadError) {
//       console.error("Upload error:", uploadError);
//       setLoading(false);
//       return;
//     }

//     const { data: urlData } = await supabase.storage
//       .from("resumes")
//       .getPublicUrl(filePath);

//     setProfile((prev) => ({
//       ...prev,
//       resumeUrl: urlData?.publicUrl || null,
//     }));

//     await supabase
//       .from("profiles")
//       .update({ resume_url: urlData?.publicUrl || null })
//       .eq("id", user.id);

//     setLoading(false);
//   };

//   const handleResumeDelete = async () => {
//     if (!profile.resumeUrl || !user) return;

//     setLoading(true);
//     const fileName = profile.resumeUrl.split("/").pop();

//     await supabase.storage.from("resumes").remove([`resumes/${fileName}`]);

//     setProfile((prev) => ({ ...prev, resumeUrl: null }));

//     await supabase
//       .from("profiles")
//       .update({ resume_url: null })
//       .eq("id", user.id);

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Profile</h1>
//       {loading ? (
//         <div className="flex items-center space-x-2">
//           <Loader2 className="animate-spin" /> <span>Loading...</span>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4">
//             <div>
//               <Label>Full Name</Label>
//               <Input
//                 value={profile.fullName}
//                 onChange={(e) =>
//                   setProfile({ ...profile, fullName: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <Label>Institution</Label>
//               <Input
//                 value={profile.institution}
//                 onChange={(e) =>
//                   setProfile({ ...profile, institution: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <Label>Tech Stack / Interests</Label>
//               <Textarea
//                 value={profile.interests}
//                 onChange={(e) =>
//                   setProfile({ ...profile, interests: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 value={profile.location}
//                 onChange={(e) =>
//                   setProfile({ ...profile, location: e.target.value })
//                 }
//               />
//             </div>
//           </div>

//           <div>
//             <Label>Resume</Label>
//             {profile.resumeUrl ? (
//               <div className="flex items-center justify-between p-2 border rounded-md">
//                 <a
//                   href={profile.resumeUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   View Resume
//                 </a>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={handleResumeDelete}
//                 >
//                   <X className="w-4 h-4" />
//                 </Button>
//               </div>
//             ) : (
//               <Input type="file" accept=".pdf" onChange={handleResumeUpload} />
//             )}
//           </div>

//           <Button onClick={handleProfileUpdate} disabled={saving}>
//             {saving ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               "Save Profile"
//             )}
//           </Button>
//         </>
//       )}
//     </div>
//   );
// }
