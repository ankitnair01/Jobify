
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
// import { supabase } from "@/integrations/supabase/client";
// import { useNavigate } from "react-router-dom";
// import Header from "@/components/Header";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is already logged in
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) {
//         navigate("/");
//       }
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session) {
//         navigate("/");
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       if (!formData.email || !formData.password) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Please fill in all fields",
//         });
//         setLoading(false);
//         return;
//       }

//       if (!isLogin && formData.password !== formData.confirmPassword) {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Passwords do not match",
//         });
//         setLoading(false);
//         return;
//       }

//       let error;
//       if (isLogin) {
//         const { error: signInError } = await supabase.auth.signInWithPassword({
//           email: formData.email,
//           password: formData.password,
//         });
//         error = signInError;
//       } else {
//         const { error: signUpError } = await supabase.auth.signUp({
//           email: formData.email,
//           password: formData.password,
//         });
//         error = signUpError;
//       }

//       if (error) throw error;

//       if (isLogin) {
//         toast({
//           title: "Welcome back!",
//           description: "Successfully signed in",
//         });
//       } else {
//         toast({
//           title: "Account created",
//           description: "Please check your email to confirm your account",
//         });
//       }

//     } catch (error: any) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
//       <Header />
      
//       {/* Animated background elements */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full">
//           <div 
//             className={`absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse transition-all duration-1000 ease-in-out ${isLogin ? 'scale-100' : 'scale-150 -translate-x-10 -translate-y-10'}`} 
//             style={{animationDuration: '8s'}}
//           ></div>
//           <div 
//             className={`absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse transition-all duration-1000 ease-in-out ${isLogin ? 'scale-100' : 'scale-75 translate-x-20 translate-y-10'}`} 
//             style={{animationDuration: '10s', animationDelay: '1s'}}
//           ></div>
//           <div 
//             className={`absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse transition-all duration-1000 ease-in-out ${isLogin ? 'scale-100' : 'scale-125 translate-y-20'}`} 
//             style={{animationDuration: '12s', animationDelay: '2s'}}
//           ></div>
//         </div>
//       </div>
      
//       <div className="flex-1 flex items-center justify-center p-4 z-10">
//         <Card className={`w-full max-w-md shadow-xl ${isLogin ? 'animate-in' : 'animate-in'} fade-in slide-in-from-bottom-4 duration-700`}>
//           <form onSubmit={handleSubmit}>
//             <CardHeader className="space-y-1 text-center">
//               <CardTitle className="text-3xl font-bold tracking-tight text-primary">
//                 {isLogin ? "Welcome back" : "Create an account"}
//               </CardTitle>
//               <CardDescription className="text-lg">
//                 {isLogin
//                   ? "Enter your credentials to sign in"
//                   : "Enter your information to get started"}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6 p-6">
//               <div className="space-y-4">
//                 <div className="relative group">
//                   <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
//                   <Input
//                     type="email"
//                     placeholder="Email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="pl-10 h-12 text-base transition-all duration-200 border-2 hover:border-primary focus:border-primary focus-visible:ring-1"
//                     disabled={loading}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="relative group">
//                   <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="pl-10 pr-10 h-12 text-base transition-all duration-200 border-2 hover:border-primary focus:border-primary focus-visible:ring-1"
//                     disabled={loading}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
//                     disabled={loading}
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               {!isLogin && (
//                 <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
//                   <div className="relative group">
//                     <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Confirm Password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       className="pl-10 pr-10 h-12 text-base transition-all duration-200 border-2 hover:border-primary focus:border-primary focus-visible:ring-1"
//                       disabled={loading}
//                     />
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex flex-col space-y-4 px-6 pb-6">
//               <Button 
//                 type="submit" 
//                 size="lg"
//                 className="w-full h-12 text-lg font-semibold transition-all duration-300 bg-primary hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02]"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <div className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </div>
//                 ) : (
//                   isLogin ? "Sign in" : "Create account"
//                 )}
//               </Button>
//               <div className="text-center">
//                 <p className="text-base text-muted-foreground">
//                   {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//                   <button
//                     type="button"
//                     onClick={() => setIsLogin(!isLogin)}
//                     className="text-primary hover:underline font-medium transition-colors"
//                     disabled={loading}
//                   >
//                     {isLogin ? "Sign up" : "Sign in"}
//                   </button>
//                 </p>
//               </div>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LockIcon, UserIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import "../styles/auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      let error;
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        error = signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({ email, password });
        error = signUpError;
      }

      if (error) throw error;

      toast({
        title: isLogin ? "Welcome back!" : "Account created successfully!",
        description: isLogin
          ? "You have successfully signed in."
          : "Please check your email to confirm your account.",
      });

      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8 animate-fade-in auth-form-container">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-jobify-dark">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <p className="mt-2 text-gray-600">
              {isLogin
                ? "Access your personalized job recommendations"
                : "Start your AI-powered job search journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full auth-input"
                  disabled={isLoading}
                />
              </div>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full auth-input"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="auth-toggle-link"
                disabled={isLoading}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="md:w-1/2 auth-gradient-background p-8 text-white flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-6">Welcome to <span className="text-white">Jobify AI</span></h1>
          <p className="text-xl mb-4">Job Chaiye? Yaha Milegi.</p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm auth-illustration">
            <p className="text-sm">"Smart Jobs for Smart People."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;





