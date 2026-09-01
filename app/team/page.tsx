// "use client";

// import Navbar from '../components/navbar';
// import Image from 'next/image';
// import { User } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function TeamPage() {
//   const teamMembers = [
//     {
//       id: 1,
//       name: "Shibanga Barman",
//       designation: "Chairman",
//       year: "4th Year",
//       branch: "Computer Science & Engineering",
//       image: "/shibanga.jpeg", 
//     },
//     {
//       id: 2,
//       name: "Doly Barman",
//       designation: "General Secretary",
//       year: "4th Year",
//       branch: "Mechanical Engineering",
//       image: "/doly.png",
//     },
//     {
//       id: 3,
//       name: "Himashree Talukdar",
//       designation: "Assistant General Secretary",
//       year: "4th Year",
//       branch: "Computer Science & Engineering",
//       image: "/himashree.png",
//     },
//     {
//       id: 4,
//       name: "Udipta Kumar Sarma",
//       designation: "Secretary",
//       year: "4th Year",
//       branch: "Mechanical Engineering",
//       image: "/udipta.png",
//     },
//     {
//       id: 5,
//       name: "Bhubatswa Batshas Puzari",
//       designation: "",
//       year: "3rd Year",
//       branch: "Civil Engineering",
//       image: "/bhubatswa.png",
//     },
//     {
//       id: 6,
//       name: "Abhinav Neog",
//       designation: "",
//       year: "3rd Year",
//       branch: "Computer Science and Engineering",
//       image: "/abhinav.png",
//     },
//     {
//       id: 7,
//       name: "Deepshikha Gogoi",
//       designation: "",
//       year: "3rd Year",
//       branch: "Branch Name Here",
//       image: "/deepshikha.png",
//     },
//     {
//       id: 8,
//       name: "Ripanshi Kumari",
//       designation: "",
//       year: "3rd Year",
//       branch: "Branch Name Here",
//       image: "/ripanshi.jpeg",
//     },
//     {
//       id: 9,
//       name: "Dipshika Rai",
//       designation: "",
//       year: "3rd Year",
//       branch: "Branch Name Here",
//       image: "/dipshika_rai.png",
//     }
//   ];

//   return (
//     <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative">
//       <Navbar />

//       <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
//       <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

//       <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto relative z-10">
        
//         {/* Header Animation */}
//         <motion.h1 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
//         >
//           Core Team Members of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ISTE JEC</span>
//         </motion.h1>

//         {/* Responsive Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          
//           {teamMembers.map((member, index) => (
//             <motion.div 
//               key={member.id} 
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-50px" }}
//               transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
//               className="flex flex-col items-center group/card cursor-pointer"
//             >
              
//               {/* --- ANIMATED BORDER WRAPPER --- */}
//               {/* p-[1.5px] creates the thickness of the border. overflow-hidden hides the corners of the spinning square */}
//               <div className="relative w-full aspect-[3/4] max-w-sm rounded-[1.25rem] mb-5 p-[1.5px] overflow-hidden transition-transform duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_15px_40px_rgba(34,211,238,0.2)]">
                
                
//                 <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_60%,#2563eb_80%,#22d3ee_100%)] opacity-30 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                
               
//                 <div className="relative w-full h-full bg-[#0a0f1e] rounded-[1.15rem] flex items-center justify-center overflow-hidden z-10">
                  
//                   {member.image ? (
//                     <Image 
//                       src={member.image} 
//                       alt={member.name} 
//                       fill 
//                       className="object-cover"
//                     />
//                   ) : (
//                     <User size={72} strokeWidth={1.5} className="text-slate-700 group-hover/card:text-blue-500/50 transition-colors duration-300" />
//                   )}
                  
                  
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-center">
//                     <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
//                       <p className="text-cyan-400 font-semibold mb-1 text-lg">{member.designation}</p>
//                       <p className="text-slate-200 text-sm">{member.year}</p>
//                       <p className="text-slate-400 text-sm mt-0.5">{member.branch}</p>
//                     </div>
//                   </div>

//                 </div>
//               </div>
             
//               <h3 className="text-xl font-semibold text-slate-300 group-hover/card:text-white transition-colors">
//                 {member.name}
//               </h3>
              
//             </motion.div>
//           ))}

//         </div>
//       </div>
//     </main>
//   );
// }









"use client";

import { useState } from 'react'; // Added this import
import Navbar from '../components/navbar';
import Image from 'next/image';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamPage() {
  // Added state to track which card is tapped on mobile
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: "Shibanga Barman",
      designation: "Chairman",
      year: "4th Year",
      branch: "Computer Science & Engineering",
      image: "/shibanga.jpeg", 
    },
    {
      id: 2,
      name: "Doly Barman",
      designation: "General Secretary",
      year: "4th Year",
      branch: "Mechanical Engineering",
      image: "/doly.png",
    },
    {
      id: 3,
      name: "Himashree Talukdar",
      designation: "Assistant General Secretary",
      year: "4th Year",
      branch: "Computer Science & Engineering",
      image: "/himashree.png",
    },
    {
      id: 4,
      name: "Udipta Kumar Sarma",
      designation: "Secretary",
      year: "4th Year",
      branch: "Mechanical Engineering",
      image: "/udipta.png",
    },
    {
      id: 5,
      name: "Bhubatswa Batshas Puzari",
      designation: "",
      year: "3rd Year",
      branch: "Civil Engineering",
      image: "/bhubatswa.png",
    },
    {
      id: 6,
      name: "Abhinav Neog",
      designation: "",
      year: "3rd Year",
      branch: "Computer Science and Engineering",
      image: "/abhinav.png",
    },
    {
      id: 7,
      name: "Deepshikha Gogoi",
      designation: "",
      year: "3rd Year",
      branch: "Electrical Engineering",
      image: "/deepshikha.png",
    },
    {
      id: 8,
      name: "Ripanshi Kumari",
      designation: "",
      year: "3rd Year",
      branch: "Mechanical Engineering",
      image: "/ripanshi.jpeg",
    },
    {
      id: 9,
      name: "Dipshika Rai",
      designation: "",
      year: "3rd Year",
      branch: "Mechanical Engineering",
      image: "/dipshika_rai.png",
    }
  ];

  return (
    <main className="min-h-screen bg-[#040814] text-white overflow-hidden relative">
      <Navbar />

      <div className="absolute top-32 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto relative z-10">
        
        {/* Header Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
        >
          Core Team Members of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ISTE JEC</span>
        </motion.h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.15 }}
              className="flex flex-col items-center group/card cursor-pointer"
              // Added onClick to toggle the active card
              onClick={() => setActiveCard(activeCard === member.id ? null : member.id)}
            >
              
              {/* --- ANIMATED BORDER WRAPPER --- */}
              <div className={`relative w-full aspect-[3/4] max-w-sm rounded-[1.25rem] mb-5 p-[1.5px] overflow-hidden transition-transform duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_15px_40px_rgba(34,211,238,0.2)] ${activeCard === member.id ? 'scale-105 shadow-[0_15px_40px_rgba(34,211,238,0.2)]' : ''}`}>
                
                <div className={`absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_60%,#2563eb_80%,#22d3ee_100%)] transition-opacity duration-500 ${activeCard === member.id ? 'opacity-100' : 'opacity-30 group-hover/card:opacity-100'}`}></div>
                
                <div className="relative w-full h-full bg-[#0a0f1e] rounded-[1.15rem] flex items-center justify-center overflow-hidden z-10">
                  
                  {member.image ? (
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <User size={72} strokeWidth={1.5} className="text-slate-700 group-hover/card:text-blue-500/50 transition-colors duration-300" />
                  )}
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#040814] via-[#040814]/80 to-transparent flex flex-col justify-end p-6 text-center transition-opacity duration-300 ${activeCard === member.id ? 'opacity-100' : 'opacity-0 group-hover/card:opacity-100'}`}>
                    <div className={`transition-transform duration-300 ${activeCard === member.id ? 'translate-y-0' : 'transform translate-y-4 group-hover/card:translate-y-0'}`}>
                      <p className="text-cyan-400 font-semibold mb-1 text-lg">{member.designation}</p>
                      <p className="text-slate-200 text-sm">{member.year}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{member.branch}</p>
                    </div>
                  </div>

                </div>
              </div>
             
              <h3 className={`text-xl font-semibold transition-colors ${activeCard === member.id ? 'text-white' : 'text-slate-300 group-hover/card:text-white'}`}>
                {member.name}
              </h3>
              
            </motion.div>
          ))}

        </div>
      </div>
    </main>
  );
}