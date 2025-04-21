
import Header from "@/components/Header";
import TeamMember from "@/components/TeamMember";
import { Users } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Ankit Nair",
      role: "Co-Founder & CTO",
      bio: "Passionate technologist with expertise in AI and resume parsing algorithms. Leads the technical development of Jobify's matching engine.",
      imageSrc: "/lovable-uploads/b07c08a4-23ce-41c5-b866-fac99bd1555d.png",
      linkedin: "https://www.linkedin.com/in/ankit-nair01/",
      github: "https://github.com/ankitnair01",
      email: "ankitnair01@gmail.com",
    },
    {
      name: "Harsh Singh",
      role: "Co-Founder & CEO",
      bio: "Former recruiter with a vision to streamline the job application process for students. Oversees business strategy and partnerships.",
      imageSrc: "/lovable-uploads/b309295c-76d4-412c-969f-91b0fd998417.png",
      linkedin: "https://www.linkedin.com/in/harsh-singh-762035221/",
      email: "harshsinghggn@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Meet Our Team
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate minds behind Jobify, dedicated to connecting students with their dream jobs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Jobify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team;
