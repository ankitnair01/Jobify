
import React from "react";
import { Info, Clock, Users, TrendingUp } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Info className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">About Jobify</h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Jobify is designed to streamline the job application process for students and fresh graduates. 
              By analyzing your resume, we match you with relevant job opportunities that align with your skills and qualifications, 
              saving you time and increasing your chances of finding the right position.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">The Problem We're Solving</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The primary motivation for developing this platform stems from the inefficiencies in traditional job application methods. These include:
            </p>
            
            <div className="space-y-8 mb-6">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-soft-purple rounded-full p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">1. Time-Consuming Process</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Candidates spend hours searching for and applying to jobs, often missing out on opportunities 
                    due to the manual nature of the process.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-soft-blue rounded-full p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">2. Mismatch Between Candidates and Jobs</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Without automated matching, many candidates apply for roles that don't align with their qualifications, 
                    leading to lower success rates.
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-soft-yellow rounded-full p-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">3. Growing Job Market Competition</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The increasing number of job seekers and job postings calls for a streamlined system 
                    to improve efficiency and accuracy.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Solution</h2>
            <p className="text-gray-700 leading-relaxed">
              This project aims to address these issues by automating job applications and providing real-time job matches 
              tailored to the candidate's profile. By leveraging modern technology, we're making the job search process 
              more efficient, accurate, and accessible for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
