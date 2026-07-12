"use client"; // Note: We need use client for Firebase fetching

import { useState, useEffect, use } from 'react';
import { ArrowLeft, BookText, FileQuestion, BookOpen, Play } from 'lucide-react';
import Link from 'next/link';
import { db } from '../../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// 1. Fully Populated Database (Used for UI Structure)
const subjectDatabase: Record<string, { branchName: string, subjects: any[] }> = {
  cse: {
    branchName: "Computer Science & Engineering",
    subjects: [
      { id: 'oop', name: 'Object Oriented Programming (OOP)', code: 'CS201', semester: '3rd Semester' },
      { id: 'ds', name: 'Digital Systems', code: 'CS202', semester: '3rd Semester' },
      { id: 'dsa', name: 'Data Structure and Algorithms (DSA)', code: 'CS203', semester: '3rd Semester' },
      { id: 'bss', name: 'Basics of Signals and Systems', code: 'CS204', semester: '3rd Semester' },
      { id: 'coa', name: 'Computer Organization & Architecture (COA)', code: 'CS301', semester: '4th Semester' },
      { id: 'os', name: 'Operating Systems (OS)', code: 'CS302', semester: '4th Semester' },
      { id: 'java', name: 'JAVA Programming', code: 'CS303', semester: '4th Semester' },
      { id: 'gt', name: 'Graph Theory', code: 'CS304', semester: '4th Semester' },
      { id: 'dbms', name: 'Database Management System (DBMS)', code: 'CS401', semester: '5th Semester' },
      { id: 'daa', name: 'Design and Analysis of Algorithm (DAA)', code: 'CS402', semester: '5th Semester' },
      { id: 'toc', name: 'Theory Of Computation (TOC / FLAT)', code: 'CS403', semester: '5th Semester' },
      { id: 'micro', name: 'Microcontrollers and Applications', code: 'CS404', semester: '5th Semester' },
      { id: 'cd', name: 'Compiler Design', code: 'CS501', semester: '6th Semester' },
      { id: 'cn', name: 'Computer Network', code: 'CS502', semester: '6th Semester' },
      { id: 'se', name: 'Software Engineering', code: 'CS503', semester: '6th Semester' },
      { id: 'dm', name: 'Data Mining', code: 'CS601', semester: '7th Semester' },
      { id: 'ip', name: 'Image Processing', code: 'CS602', semester: '7th Semester' }
    ]
  },
  me: { 
    branchName: "Mechanical Engineering", 
    subjects: [
      { id: 'et', name: 'Electrical Technology', code: 'ME201', semester: '3rd Semester' },
      { id: 'bt', name: 'Basic Thermodynamics', code: 'ME202', semester: '3rd Semester' },
      { id: 'tom', name: 'Theory of Machines', code: 'ME203', semester: '3rd Semester' },
      { id: 'ae', name: 'Applied Electronics', code: 'ME204', semester: '3rd Semester' },
      { id: 'wtp1', name: 'Workshop Theory and Practice-I', code: 'ME205', semester: '3rd Semester' },
      { id: 'fm1', name: 'Fluid Mechanics-I', code: 'ME301', semester: '4th Semester' },
      { id: 'msa', name: 'Materials Science A', code: 'ME302', semester: '4th Semester' },
      { id: 'mom', name: 'Mechanics of Materials', code: 'ME303', semester: '4th Semester' },
      { id: 'at1', name: 'Applied Thermodynamics - I', code: 'ME304', semester: '4th Semester' },
      { id: 'md1', name: 'Machine Design - I', code: 'ME401', semester: '5th Semester' },
      { id: 'mdm', name: 'Mechanisms and Dynamics of Machines', code: 'ME402', semester: '5th Semester' },
      { id: 'ht1', name: 'Heat Transfer - I', code: 'ME403', semester: '5th Semester' },
      { id: 'eim', name: 'Engineering Inspection and Metrology', code: 'ME404', semester: '5th Semester' },
      { id: 'mmi', name: 'Mechanical Measurements and Instrumentation', code: 'ME501', semester: '6th Semester' },
      { id: 'acc', name: 'Accountancy', code: 'ME502', semester: '6th Semester' },
      { id: 'wtp2', name: 'Workshop Theory and Practice-II', code: 'ME503', semester: '6th Semester' },
      { id: 'ht2', name: 'Heat Transfer-II', code: 'ME601', semester: '7th Semester' },
      { id: 'md2', name: 'Machine Design-II', code: 'ME602', semester: '7th Semester' },
      { id: 'fm2', name: 'Fluid Mechanics-II', code: 'ME603', semester: '7th Semester' }
    ] 
  },
  ce: { 
    branchName: "Civil Engineering", 
    subjects: [
      { id: 'surv', name: 'Surveying & Geomatics', code: 'CE201', semester: '3rd Semester' },
      { id: 'som', name: 'Solid Mechanics', code: 'CE202', semester: '3rd Semester' },
      { id: 'bmc', name: 'Building Materials & Construction', code: 'CE203', semester: '3rd Semester' },
      { id: 'eg', name: 'Engineering Geology', code: 'CE204', semester: '3rd Semester' },
      { id: 'ce-fm', name: 'Fluid Mechanics', code: 'CE205', semester: '3rd Semester' },
      { id: 'sa1', name: 'Structural Analysis - I', code: 'CE301', semester: '4th Semester' },
      { id: 'ge1', name: 'Geotechnical Engineering - I', code: 'CE302', semester: '4th Semester' },
      { id: 'ee1', name: 'Environmental Engineering - I', code: 'CE303', semester: '4th Semester' },
      { id: 'ct', name: 'Concrete Technology', code: 'CE304', semester: '4th Semester' },
      { id: 'drcs', name: 'Design of RC Structures', code: 'CE401', semester: '5th Semester' },
      { id: 'sa2', name: 'Structural Analysis - II', code: 'CE402', semester: '5th Semester' },
      { id: 'ge2', name: 'Geotechnical Engineering - II', code: 'CE403', semester: '5th Semester' },
      { id: 'te1', name: 'Transportation Engineering - I', code: 'CE404', semester: '5th Semester' },
      { id: 'hwe', name: 'Hydrology & Water Resources', code: 'CE405', semester: '5th Semester' },
      { id: 'dss', name: 'Design of Steel Structures', code: 'CE501', semester: '6th Semester' },
      { id: 'te2', name: 'Transportation Engineering - II', code: 'CE502', semester: '6th Semester' },
      { id: 'ee2', name: 'Environmental Engineering - II', code: 'CE503', semester: '6th Semester' },
      { id: 'ecv', name: 'Estimation, Costing & Valuation', code: 'CE504', semester: '6th Semester' },
      { id: 'cpm', name: 'Construction Planning & Management', code: 'CE601', semester: '7th Semester' },
      { id: 'ie', name: 'Irrigation Engineering', code: 'CE602', semester: '7th Semester' }
    ] 
  },
  ee: { 
    branchName: "Electrical Engineering", 
    subjects: [
      { id: 'nt', name: 'Network Theory', code: 'EE201', semester: '3rd Semester' },
      { id: 'ae', name: 'Analog Electronics', code: 'EE202', semester: '3rd Semester' },
      { id: 'em1', name: 'Electrical Machines - I', code: 'EE203', semester: '3rd Semester' },
      { id: 'emf', name: 'Electromagnetic Fields', code: 'EE204', semester: '3rd Semester' },
      { id: 'de', name: 'Digital Electronics', code: 'EE301', semester: '4th Semester' },
      { id: 'em2', name: 'Electrical Machines - II', code: 'EE302', semester: '4th Semester' },
      { id: 'ps1', name: 'Power Systems - I', code: 'EE303', semester: '4th Semester' },
      { id: 'eem', name: 'Electrical & Electronic Measurements', code: 'EE304', semester: '4th Semester' },
      { id: 'ps2', name: 'Power Systems - II', code: 'EE401', semester: '5th Semester' },
      { id: 'cs', name: 'Control Systems', code: 'EE402', semester: '5th Semester' },
      { id: 'mpmc', name: 'Microprocessors & Microcontrollers', code: 'EE403', semester: '5th Semester' },
      { id: 'ss', name: 'Signals and Systems', code: 'EE404', semester: '5th Semester' },
      { id: 'pe', name: 'Power Electronics', code: 'EE501', semester: '6th Semester' },
      { id: 'sgp', name: 'Switchgear and Protection', code: 'EE502', semester: '6th Semester' },
      { id: 'ed', name: 'Electric Drives', code: 'EE503', semester: '6th Semester' },
      { id: 'hve', name: 'High Voltage Engineering', code: 'EE601', semester: '7th Semester' },
      { id: 'res', name: 'Renewable Energy Sources', code: 'EE602', semester: '7th Semester' }
    ] 
  },
  ie: { 
    branchName: "Instrumentation Engineering", 
    subjects: [
      { id: 'ae-ie', name: 'Analog Electronics', code: 'IE201', semester: '3rd Semester' },
      { id: 'em-ie', name: 'Electrical Measurements', code: 'IE202', semester: '3rd Semester' },
      { id: 'nt-ie', name: 'Network Theory', code: 'IE203', semester: '3rd Semester' },
      { id: 'ts', name: 'Transducers and Sensors', code: 'IE204', semester: '3rd Semester' },
      { id: 'de-ie', name: 'Digital Electronics', code: 'IE301', semester: '4th Semester' },
      { id: 'ii1', name: 'Industrial Instrumentation - I', code: 'IE302', semester: '4th Semester' },
      { id: 'cs-ie', name: 'Control Systems', code: 'IE303', semester: '4th Semester' },
      { id: 'ss-ie', name: 'Signal & Systems', code: 'IE304', semester: '4th Semester' },
      { id: 'mpmc-ie', name: 'Microprocessors & Microcontrollers', code: 'IE401', semester: '5th Semester' },
      { id: 'ii2', name: 'Industrial Instrumentation - II', code: 'IE402', semester: '5th Semester' },
      { id: 'ai', name: 'Analytical Instrumentation', code: 'IE403', semester: '5th Semester' },
      { id: 'opt', name: 'Optoelectronics', code: 'IE404', semester: '5th Semester' },
      { id: 'pc', name: 'Process Control', code: 'IE501', semester: '6th Semester' },
      { id: 'bmi', name: 'Biomedical Instrumentation', code: 'IE502', semester: '6th Semester' },
      { id: 'dsp', name: 'Digital Signal Processing', code: 'IE503', semester: '6th Semester' },
      { id: 'dcs', name: 'Distributed Control Systems (DCS)', code: 'IE601', semester: '7th Semester' },
      { id: 'vi', name: 'Virtual Instrumentation', code: 'IE602', semester: '7th Semester' }
    ] 
  },
  mca: {
    branchName: "Master of Computer Applications",
    subjects: [
      { id: 'dsa-mca', name: 'Data Structures & Algo', code: 'MCA101', semester: '1st Semester' },
      { id: 'java-mca', name: 'Advanced Java', code: 'MCA102', semester: '1st Semester' },
      { id: 'os-mca', name: 'Operating Systems', code: 'MCA103', semester: '1st Semester' },
      { id: 'dbms-mca', name: 'Database Management Systems', code: 'MCA104', semester: '1st Semester' },
      { id: 'se-mca', name: 'Software Engineering', code: 'MCA201', semester: '2nd Semester' },
      { id: 'wt-mca', name: 'Web Technologies', code: 'MCA202', semester: '2nd Semester' },
      { id: 'cn-mca', name: 'Computer Networks', code: 'MCA203', semester: '2nd Semester' },
      { id: 'ai-mca', name: 'Artificial Intelligence', code: 'MCA301', semester: '3rd Semester' }
    ]
  }
};

// Map URL parameter to Admin Panel dropdown strings
const branchParamToNameMap: Record<string, string> = {
  'cse': 'CSE',
  'ece': 'ECE',
  'ee': 'EE',
  'me': 'ME',
  'ce': 'Civil',
  'mca': 'Economics / Open Elective', // Update this mapping if needed in admin
};

export default function SubjectPage({ params }: { params: Promise<{ branch: string }> }) {
  
  const resolvedParams = use(params);
  const branchData = subjectDatabase[resolvedParams.branch];
  const adminBranchName = branchParamToNameMap[resolvedParams.branch];

  // State to hold fetched Firebase resources
  const [liveResources, setLiveResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      if (!adminBranchName) return;
      try {
        // Query Firebase: Get all resources where the branch matches the current page
        const q = query(collection(db, 'resources'), where("branch", "==", adminBranchName));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => doc.data());
        setLiveResources(fetched);
      } catch (error) {
        console.error("Error fetching live resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [adminBranchName]);

  // Helper function to find a specific resource link
  const getResourceLink = (subjectName: string, type: 'Notes' | 'PYQ' | 'Playlist') => {
    const resource = liveResources.find(
      r => r.subjectName === subjectName && r.type === type
    );
    return resource ? resource.fileLink : null;
  };

  if (!branchData) {
    return (
      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Branch not found</h1>
        <Link href="/resources/branches" className="text-blue-400 hover:underline">Go back</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8">
          <Link href="/resources/branches" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 font-medium text-sm border border-slate-800 px-4 py-2 rounded-full bg-slate-900/50 hover:bg-slate-800">
            <ArrowLeft size={16} /> Back to Branches
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <BookOpen size={24} className="text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
              {branchData.branchName}
            </h1>
          </div>
          <p className="text-slate-400 text-lg">Select a subject to access study materials, PYQs, and video lectures.</p>
        </div>

        {/* Subjects List */}
        {branchData.subjects.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 text-slate-500">
            Subject materials for {branchData.branchName} are being compiled. Check back soon!
          </div>
        ) : isLoading ? (
           <div className="p-8 text-center text-slate-500 animate-pulse">
            Loading Live Knowledge Vault...
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {branchData.subjects.map((subject) => {
              
              // Fetch the live links for this specific subject
              const notesLink = getResourceLink(subject.name, 'Notes');
              const pyqLink = getResourceLink(subject.name, 'PYQ');
              const playlistLink = getResourceLink(subject.name, 'Playlist');

              return (
                <div key={subject.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:border-slate-700 transition-colors shadow-lg">
                  
                  {/* Subject Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 text-xs font-bold text-blue-400 bg-blue-500/10 rounded-md tracking-wider">
                        {subject.code}
                      </span>
                      <span className="text-sm font-medium text-slate-500">{subject.semester}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-100">{subject.name}</h2>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                    
                    {/* Notes Button */}
                    {notesLink ? (
                      <a href={notesLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-blue-500/50 text-sm">
                        <BookText size={16} className="text-blue-400" /> Notes
                      </a>
                    ) : (
                      <button disabled className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900/50 text-slate-600 rounded-xl font-medium border border-slate-800 cursor-not-allowed text-sm">
                        <BookText size={16} /> Notes
                      </button>
                    )}
                    
                    {/* PYQs Button */}
                    {pyqLink ? (
                      <a href={pyqLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-orange-500/50 text-sm">
                         <FileQuestion size={16} className="text-orange-400" /> PYQs
                      </a>
                    ) : (
                       <button disabled className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900/50 text-slate-600 rounded-xl font-medium border border-slate-800 cursor-not-allowed text-sm">
                        <FileQuestion size={16} /> PYQs
                      </button>
                    )}

                    {/* Playlist Button */}
                    {playlistLink ? (
                       <a href={playlistLink} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors border border-slate-700 hover:border-red-500/50 text-sm group">
                        <Play size={16} className="text-red-500 fill-red-500/10 group-hover:fill-red-500/50 transition-all" /> Playlists
                      </a>
                    ) : (
                      <button disabled className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900/50 text-slate-600 rounded-xl font-medium border border-slate-800 cursor-not-allowed text-sm">
                        <Play size={16} /> Playlists
                      </button>
                    )}
                    
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}