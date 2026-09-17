import { NavBarSubsection } from "../Desktop/sections/NavBarSubsection/NavBarSubsection";
import { Button } from "../../components/ui/button";
import { TeslaMockupCard } from "./TeslaMockupCard";

import teslaBackground from "../../assets/Tesla Background.png";
import teslaHome from "../../assets/tesla-home.jpg";
import teslaSavings from "../../assets/tesla-savings.jpg";
import teslaSettings from "../../assets/tesla-settings.jpg";
import teslaCaseStudyPdf from "../../assets/Tesla Off-Peak Charging Concept Case Study.pdf";

export const TeslaProject = (): JSX.Element => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center relative">
      {/* Background Image for Desktop */}
      <div className="hidden md:block absolute inset-0 w-full h-[801px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('${teslaBackground}')`}}></div>
      {/* Background Image for Mobile */}
      <div className="md:hidden absolute inset-0 w-full h-[500px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('${teslaBackground}')`}}></div>
      
      <div className="absolute inset-0 w-full h-[500px] md:h-[801px] bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>

      <NavBarSubsection />
      
      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-8 pt-32 md:pt-48 pb-20 flex flex-col gap-20 md:gap-32">
        {/* Hero */}
        <div className="flex flex-col gap-6 md:gap-10 animate-fade-up">
            <h1 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-6xl md:text-9xl tracking-tighter leading-[0.9] text-white">
                Tesla Off-Peak Charging
            </h1>
            <p className="[font-family:'Bricolage_Grotesque',Helvetica] font-light text-2xl md:text-4xl text-white max-w-4xl leading-tight">
                Designing a smarter and more user-friendly home charging experience.
            </p>
        </div>

        {/* Introduction Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-gray-200 pt-12">
            <div className="flex flex-col gap-4">
                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl">Goal</h3>
                <p className="text-lg font-light text-gray-800 leading-relaxed">Enable Tesla owners to charge effortlessly at the lowest cost and with full confidence, by automating off-peak charging and providing clear savings insights.</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl">Reasoning</h3>
                <p className="text-lg font-light text-gray-800 leading-relaxed">Owners currently struggle with manual scheduling and lack of cost transparency. A smarter system reduces hassle and builds trust in the ecosystem.</p>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl">Vision</h3>
                <p className="text-lg font-light text-gray-800 leading-relaxed">Home charging should feel automatic and stress-free, adapting to rates and preferences to save money and reduce grid strain.</p>
            </div>
        </section>

        {/* Problems Section */}
        <section className="flex flex-col gap-12">
             <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-5xl md:text-6xl tracking-tight">Current Problems</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#F5F5F7] p-10 rounded-3xl transition-all hover:scale-[1.01] duration-300 border border-transparent hover:border-[#E31937]/20 hover:shadow-[0_10px_40px_-10px_rgba(227,25,55,0.1)]">
                    <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl mb-4">Lack of Support</h3>
                    <p className="text-lg font-light leading-relaxed text-gray-700">The app only allows manual time setting. It doesn't suggest cheapest off-peak times or show any savings data, leaving users in the dark about their efficiency.</p>
                </div>
                <div className="bg-[#F5F5F7] p-10 rounded-3xl transition-all hover:scale-[1.01] duration-300 border border-transparent hover:border-[#E31937]/20 hover:shadow-[0_10px_40px_-10px_rgba(227,25,55,0.1)]">
                    <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl mb-4">Reliance on User</h3>
                    <p className="text-lg font-light leading-relaxed text-gray-700">To charge efficiently, the onus is entirely on the user to research their local utility rates, calculate their own off-peak hours, and manually program the schedule.</p>
                </div>
                <div className="bg-[#F5F5F7] p-10 rounded-3xl md:col-span-2 transition-all hover:scale-[1.01] duration-300 border border-transparent hover:border-[#E31937]/20 hover:shadow-[0_10px_40px_-10px_rgba(227,25,55,0.1)]">
                    <h3 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-2xl mb-4">Confusing UI & Reliability</h3>
                    <p className="text-lg font-light leading-relaxed text-gray-700">Users report frustration with the scheduling interface, often confusing "start by" and "depart by" times. Many testimonials highlight that schedules often fail to stick or start immediately upon plugging in, defeating the purpose.</p>
                </div>
             </div>
        </section>

        {/* Personas Section */}
        <section className="flex flex-col gap-12">
             <div className="flex flex-col gap-4">
                <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-5xl md:text-6xl tracking-tight">User Personas</h2>
                <p className="text-xl font-light text-gray-600 max-w-2xl">Understanding the different types of drivers to build a unified solution.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Persona 1 */}
                <div className="border border-gray-200 p-8 rounded-2xl hover:border-[#E31937] transition-colors duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mb-6 flex items-center justify-center text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <h3 className="font-bold text-2xl mb-1 [font-family:'Bricolage_Grotesque',Helvetica]">Everyday Driver</h3>
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-medium">25-35 years old</p>
                    <p className="font-light text-gray-700 leading-relaxed">Works long hours with a consistent commute. Often forgets to schedule charging and pays peak prices. <strong>Needs automation.</strong></p>
                </div>

                {/* Persona 2 */}
                <div className="border border-gray-200 p-8 rounded-2xl hover:border-[#E31937] transition-colors duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-full mb-6 flex items-center justify-center text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="font-bold text-2xl mb-1 [font-family:'Bricolage_Grotesque',Helvetica]">Value Focused</h3>
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-medium">35-60 years old</p>
                    <p className="font-light text-gray-700 leading-relaxed">Varied trips and high battery usage. Wants to track every dollar saved to budget effectively. <strong>Needs transparency.</strong></p>
                </div>

                {/* Persona 3 */}
                <div className="border border-gray-200 p-8 rounded-2xl hover:border-[#E31937] transition-colors duration-300">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full mb-6 flex items-center justify-center text-emerald-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="font-bold text-2xl mb-1 [font-family:'Bricolage_Grotesque',Helvetica]">Green User</h3>
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider font-medium">25-45 years old</p>
                    <p className="font-light text-gray-700 leading-relaxed">Eco-conscious first. Wants to charge when the grid is cleanest to minimize environmental impact. <strong>Needs control.</strong></p>
                </div>
             </div>
        </section>

        {/* Solution Section */}
        <section className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
                <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-5xl md:text-6xl tracking-tight">The Solution</h2>
                <p className="text-xl font-light text-gray-600 max-w-3xl">I designed 3 key views to address user pain points: a dashboard prompt, a detailed savings breakdown, and an easy-to-use preferences screen.</p>
            </div>
            
            {/* Mockups Container */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                <TeslaMockupCard 
                  imageSrc={teslaHome}
                  alt="Tesla Smart Dashboard Mockup"
                  captionTitle="Smart Dashboard"
                  captionText="Instant visibility of savings right on home."
                  delay="0ms"
                />
                
                <TeslaMockupCard 
                  imageSrc={teslaSavings}
                  alt="Tesla Savings Screen Mockup"
                  captionTitle="Transparent Analytics"
                  captionText="Clear breakdown of cost vs savings."
                  delay="100ms"
                />
                
                <TeslaMockupCard 
                  imageSrc={teslaSettings}
                  alt="Tesla Settings Screen Mockup"
                  captionTitle="Effortless Control"
                  captionText="Set it once and forget it."
                  delay="200ms"
                />
             </div>
        </section>

        {/* Impact Section */}
        <section className="bg-[#1a1a1a] text-white p-10 md:p-20 rounded-[40px] my-8 shadow-2xl">
            <h2 className="[font-family:'Bricolage_Grotesque',Helvetica] font-bold text-4xl md:text-5xl mb-16 text-center">Project Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest font-bold">User Value</h3>
                    <p className="text-2xl font-light leading-relaxed">Saves drivers ~40% on energy bills annually.</p>
                </div>
                 <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest font-bold">Business Value</h3>
                    <p className="text-2xl font-light leading-relaxed">Increases app stickiness and brand loyalty.</p>
                </div>
                 <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-gray-400 text-sm uppercase tracking-widest font-bold">Social Value</h3>
                    <p className="text-2xl font-light leading-relaxed">Supports grid sustainability by shifting demand.</p>
                </div>
            </div>
        </section>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4 pb-8">
            <button
                onClick={() => {
                    // Handle PDF download
                    const link = document.createElement('a');
                    link.href = teslaCaseStudyPdf;
                    link.download = 'Tesla Off-Peak Charging Concept Case Study.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
                className="bg-[#E31937] text-white px-8 py-4 rounded-full hover:bg-[#c41530] transition-colors duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
            >
                <span>Download PDF</span>
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>

            <button
                onClick={scrollToTop}
                className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl"
            >
                <span>Back to Top</span>
                <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </button>
        </div>

      </div>
    </div>
  );
};

