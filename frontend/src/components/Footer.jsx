import React from 'react';
import { Award, Twitter, Instagram, Linkedin, Github, Mail, MapPin, ArrowRight, Code } from 'lucide-react';
import { redirect } from 'react-router';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-400 to-orange-600 p-2 rounded-xl">
                <Award className="w-5 h-5 text-slate-950" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tighter">My Event</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Redefining how you experience live events. From exclusive concerts to global tech summits, we bring the world to your fingertips.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Code className="w-4 h-4" />} href="https://leetcode.com/u/Amansingh2311/"/>
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} href="https://www.linkedin.com/in/aman-singh-347871276/"/>
              <SocialIcon icon={<Github className="w-4 h-4" />} href="https://github.com/Aman23Singh"/>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Explore</h3>
            <ul className="space-y-4">
              <FooterLink label="Upcoming Events" />
              <FooterLink label="Featured Artists" />
              <FooterLink label="Venues" />
              <FooterLink label="Gift Cards" />
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <FooterLink label="Help Center" />
              <FooterLink label="Terms of Service" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Community Guidelines" />
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">Get the latest event updates delivered to your inbox.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500 p-2 rounded-lg text-slate-950 hover:bg-amber-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

       
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-medium uppercase tracking-widest">
          <p>© {currentYear} My Event. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Noida, India</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> rvst2311@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


function FooterLink({ label }) {
  return (
    <li>
      <a href="#" className="text-slate-400 text-sm hover:text-amber-500 transition-colors duration-300 flex items-center gap-2 group">
        <span className="w-0 h-px bg-amber-500 group-hover:w-3 transition-all duration-300"></span>
        {label}
      </a>
    </li>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a href={href} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 transition-all duration-300">
      {icon}
    </a>
  );
}

export default Footer;