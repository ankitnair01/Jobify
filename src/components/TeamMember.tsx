
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Github, Mail } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

const TeamMember = ({ name, role, bio, imageSrc, linkedin, github, email }: TeamMemberProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square w-full overflow-hidden">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage src={imageSrc} alt={name} className="object-cover h-full w-full" />
          <AvatarFallback className="text-2xl font-bold rounded-none">{initials}</AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{role}</p>
        <p className="text-gray-600 mb-4 text-sm">{bio}</p>
        <div className="flex space-x-4">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors" aria-label={`${name}'s LinkedIn profile`}>
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors" aria-label={`${name}'s GitHub profile`}>
              <Github className="h-5 w-5" />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="text-gray-500 hover:text-primary transition-colors" aria-label={`Email ${name}`}>
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
