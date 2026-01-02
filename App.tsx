import React, { useState, useEffect } from 'react';
import { Language, translations } from './translations';
import ServiceModal, { ServiceType } from './components/ServiceModal';

const InfoIcon = () => (
  <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  </div>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fa'); 
  const [modalState, setModalState] = useState<{isOpen: boolean, type: ServiceType | 'SELECTION' | 'GENERAL'}>({
    isOpen: false,
    type: 'SELECTION'
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.className = lang === 'fa' ? 'rtl gradient-bg' : 'ltr gradient-bg';
  }, [lang]);

  const openModal = (type: ServiceType | 'SELECTION' | 'GENERAL') => {
    setModalState({ isOpen: true, type });
  };

  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-[#172B4D] text-[14px]">
      {/* Navigation */}
      <nav className="sticky-nav fixed top-0 w-full z-50">
        <div className="max-w-[1200px] mx-auto px-5 h-14 flex items-center justify-between gap-4">
          {/* Brand & Tagline Area - Flexible to accommodate text */}
          <div className="flex items-center gap-3 min-w-0 shrink">
            <div 
              className="flex items-center gap-3 shrink-0 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="text-[18px] font-[800] tracking-tighter text-[#091E42]">
                Insights<span className="text-[#0076CE]">Oman</span>
              </span>
              <div className="hidden md:block w-[1px] h-4 bg-[#DFE1E6]"></div>
            </div>
            <span className="hidden md:block text-[11px] font-medium text-[#5E6C84] opacity-80 truncate max-w-[500px]">
              {t.nav.tagline}
            </span>
          </div>

          {/* Centered Services Link */}
          <div className="flex-1 flex justify-center min-w-0">
            <button 
              onClick={scrollToSolutions}
              className="text-[11px] font-black text-[#5E6C84] hover:text-[#0076CE] uppercase tracking-widest transition-colors hidden lg:block whitespace-nowrap"
            >
              {t.nav.services}
            </button>
          </div>

          {/* Right/Left Action Area (Buttons) */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => setLang(lang === 'en' ? 'fa' : 'en')}
              className="text-[10px] font-black text-[#5E6C84] hover:text-[#091E42] px-2.5 py-1.5 rounded border border-[#DFE1E6] hover:border-[#091E42] transition-all tracking-widest uppercase"
            >
              {lang === 'en' ? 'فارسی' : 'English'}
            </button>
            <button 
              onClick={() => openModal('SELECTION')}
              className="btn-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/10 whitespace-nowrap"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-24 pb-16 lg:pt-36 lg:pb-24 px-6 max-w-[1000px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center animate-reveal relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#DEEBFF] text-[#0052CC] text-[9px] font-black rounded-full mb-6 tracking-widest uppercase shadow-sm border border-[#0052CC]/10">
              <span className="w-1 h-1 bg-[#0052CC] rounded-full animate-pulse"></span>
              {t.hero.tag}
            </div>
            <h1 className="text-3xl lg:text-[40px] font-[900] text-[#091E42] leading-[1.1] mb-6 tracking-tight text-balance">
              {t.hero.headline}
            </h1>
            <p className="text-[15px] lg:text-[16px] text-[#42526E] mb-8 leading-relaxed font-medium text-balance opacity-80">
              {t.hero.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => openModal('SELECTION')}
                className="btn-primary px-7 py-3 rounded-full text-[12px] font-bold shadow-xl transition-all active:scale-95"
              >
                {t.hero.cta}
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative group">
            <div className="bg-[#002B49] rounded-[28px] p-7 text-white shadow-[0_20px_40px_-10px_rgba(0,43,73,0.2)] transform rotate-1 group-hover:rotate-0 transition-transform duration-700">
              <div className="flex justify-between items-start mb-8">
                 <div className="space-y-1">
                    <div className="h-2 w-20 bg-blue-400 rounded-full"></div>
                    <div className="h-2 w-12 bg-blue-400 opacity-40 rounded-full"></div>
                 </div>
                 <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">📊</div>
              </div>
              <div className="space-y-4">
                 <div className="text-2xl font-black">94.8% Integrity</div>
                 <div className="text-[13px] opacity-70 font-medium leading-relaxed">Our dataset maps over 12,000 active commercial entities across the Sultanate to identify untapped niches.</div>
                 <div className="flex gap-1.5">
                    {[1,2,3,4,5,6,7].map(i => <div key={i} className={`h-5 w-1.5 flex-grow rounded-full transition-all duration-500 ${i < 6 ? 'bg-blue-500' : 'bg-blue-500/20'}`}></div>)}
                 </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#DFE1E6] p-4 rounded-xl shadow-lg transform -rotate-3 hover:rotate-0 transition-all duration-500">
               <div className="text-[#091E42] font-black text-xs mb-1">FIELD VERIFIED</div>
               <div className="flex items-center gap-2 text-[#0076CE] text-[9px] font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Muscat Logic Unit
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Strategic Imperative */}
      <section id="philosophy" className="py-20 px-6 bg-[#091E42] text-white overflow-hidden relative">
        <div className="max-w-[1000px] mx-auto grid lg:grid-cols-12 gap-10 items-start relative z-10">
          <div className="lg:col-span-7">
             <h2 className="text-[#0076CE] text-[10px] font-black uppercase tracking-[0.3em] mb-6">Methodology & Ethics</h2>
             <div className="text-2xl lg:text-[34px] font-[800] leading-[1.1] mb-8 tracking-tighter">
               {t.problem.p1}
             </div>
             <blockquote className="text-lg lg:text-[24px] font-light italic text-[#B3BAC5] border-l-4 border-[#0076CE] pl-6 py-2 mb-8 leading-tight">
               «{t.problem.quote}»
             </blockquote>
          </div>
          <div className="lg:col-span-5 lg:mt-8">
             <div className="bg-white/5 p-7 rounded-[24px] border border-white/10 backdrop-blur-xl shadow-lg">
                <h3 className="text-[15px] font-black mb-6 text-[#FF5630] flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FF5630]/20 flex items-center justify-center text-[10px]">!</span>
                  {t.problem.aiWarning}
                </h3>
                <ul className="space-y-6">
                   <li className="flex gap-4">
                      <div className="w-1 h-1 bg-[#FF5630] rounded-full mt-2 shrink-0"></div>
                      <p className="text-[14px] text-white/80 font-medium leading-snug">{t.problem.aiWarning1}</p>
                   </li>
                   <li className="flex gap-4">
                      <div className="w-1 h-1 bg-[#FF5630] rounded-full mt-2 shrink-0"></div>
                      <p className="text-[14px] text-white/80 font-medium leading-snug">{t.problem.aiWarning2}</p>
                   </li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
             <h2 className="text-2xl lg:text-[36px] font-[900] text-[#091E42] mb-4 tracking-tighter leading-none uppercase">{t.solutions.title}</h2>
             <p className="text-[16px] text-[#42526E] font-medium opacity-60 leading-relaxed">{t.whatWeDo.intro}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Suite 01 */}
            <div className="card-premium p-7 rounded-[24px] flex flex-col h-full bg-white group hover:scale-[1.01] transition-all">
               <div className="flex-grow">
                 <div className="inline-block px-2 py-0.5 bg-[#DEEBFF] text-[#0076CE] text-[8px] font-black uppercase tracking-widest rounded mb-3">
                   {t.solutions.suiteLabel} 01
                 </div>
                 <h3 className="text-xl font-extrabold text-[#091E42] mb-3 leading-tight">{t.service1.title}</h3>
                 <p className="text-[#0076CE] text-[10px] font-bold mb-4 italic">{t.service1.subtitle}</p>
                 <p className="text-[13px] text-[#42526E] mb-6 leading-relaxed font-medium opacity-80 whitespace-pre-wrap">{t.service1.desc}</p>
                 <ul className="space-y-2 mb-6">
                    {t.service1.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[11px] font-bold text-[#172B4D]">
                         <div className="w-1 h-1 rounded-full bg-[#0076CE]"></div> {d}
                      </li>
                    ))}
                 </ul>
                 <div className="flex items-start gap-2.5 text-[11px] font-bold text-blue-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100/50 mb-4 leading-relaxed">
                   <InfoIcon /> <span>{t.service1.session}</span>
                 </div>
                 <p className="text-[#5E6C84] text-[11px] font-medium italic mt-3 opacity-70 leading-relaxed">{t.service1.example}</p>
               </div>
               <div className="pt-6 border-t border-[#DFE1E6] flex items-center justify-between mt-auto">
                 <div className="text-xl font-[900] text-[#091E42] tracking-tighter">{t.service1.price}</div>
                 <button 
                  onClick={() => openModal('ANALYSIS')}
                  className="px-5 py-2 border-2 border-[#091E42] text-[#091E42] rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#091E42] hover:text-white transition-all"
                 >
                    {t.service1.cta}
                 </button>
               </div>
            </div>

            {/* Suite 02 */}
            <div className="card-premium p-7 rounded-[24px] flex flex-col h-full bg-[#F4F5F7] border border-[#0076CE]/10 shadow-md group relative overflow-hidden transition-all">
               <div className="flex-grow">
                 <div className="inline-block px-2 py-0.5 bg-[#DEEBFF] text-[#0076CE] text-[8px] font-black uppercase tracking-widest rounded mb-3">
                   {t.solutions.suiteLabel} 02
                 </div>
                 <h3 className="text-xl font-extrabold text-[#091E42] mb-3 leading-tight">{t.service2.title}</h3>
                 <p className="text-[#0076CE] text-[10px] font-bold mb-4 italic">{t.service2.subtitle}</p>
                 <p className="text-[13px] text-[#42526E] mb-6 leading-relaxed font-medium opacity-80 whitespace-pre-wrap">{t.service2.desc}</p>
                 <div className="mt-5 space-y-2.5">
                    {t.service2.items.map((it, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-[11px] font-bold text-[#091E42]">
                         <div className="w-1 h-1 rounded-full bg-[#0076CE]"></div> {it}
                      </div>
                    ))}
                 </div>
               </div>
               <div className="pt-6 border-t border-[#DFE1E6] flex items-center justify-between gap-3 mt-auto">
                 <div className="text-[14px] lg:text-[15px] font-[900] text-[#0076CE] tracking-tighter whitespace-nowrap">
                   {lang === 'en' ? 'From' : 'شروع از'} {t.service2.price}
                 </div>
                 <button 
                  onClick={() => openModal('FIELD_RESEARCH')}
                  className="px-4 py-2 bg-[#0076CE] text-white rounded-full text-[8.5px] lg:text-[9.5px] font-black uppercase tracking-widest hover:bg-[#005EA3] transition-all shadow-md shadow-blue-500/10 shrink-0"
                 >
                    {t.service2.cta}
                 </button>
               </div>
            </div>

            {/* Suite 03 */}
            <div className="card-premium p-7 rounded-[24px] flex flex-col h-full bg-white group hover:scale-[1.01] transition-all">
               <div className="flex-grow">
                 <div className="inline-block px-2 py-0.5 bg-[#DEEBFF] text-[#0076CE] text-[8px] font-black uppercase tracking-widest rounded mb-3">
                   {t.solutions.suiteLabel} 03
                 </div>
                 <h3 className="text-xl font-extrabold text-[#091E42] mb-3 leading-tight">{t.service3.title}</h3>
                 <p className="text-[#0076CE] text-[10px] font-bold mb-4 italic">{t.service3.subtitle}</p>
                 <p className="text-[12px] text-[#42526E] mb-6 leading-relaxed font-medium opacity-80 whitespace-pre-wrap">{t.service3.desc}</p>
                 
                 <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                       {t.service3.for.map((it, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-[11px] font-bold text-[#172B4D] leading-snug">
                             <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 shrink-0"></div> <span>{it}</span>
                          </div>
                       ))}
                    </div>
                    <div className="space-y-2">
                       {t.service3.notFor.map((it, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-[11px] font-bold text-red-500 leading-snug">
                             <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5 shrink-0"></div> <span>{it}</span>
                          </div>
                       ))}
                    </div>
                    <p className="text-[11px] font-bold text-blue-700 leading-relaxed border-t border-blue-100 pt-4">
                       {t.service3.note}
                    </p>
                 </div>

                 <div className="mt-4 space-y-2 mb-8 border-t border-[#DFE1E6] pt-6">
                    {t.service3.items.map((it, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-[11px] font-bold text-[#172B4D]">
                         <div className="w-1 h-1 rounded-full bg-[#0076CE]"></div> {it}
                      </div>
                    ))}
                 </div>
                 <div className="space-y-1 mb-6">
                    <div className="text-xl font-[900] text-[#091E42] tracking-tighter">{t.service3.price1}</div>
                    <div className="text-[12px] font-bold text-[#42526E] opacity-40">{t.service3.price2}</div>
                 </div>
               </div>
               <div className="pt-6 border-t border-[#DFE1E6] mt-auto">
                 <button 
                  onClick={() => openModal('REGISTRATION')}
                  className="w-full py-2.5 bg-[#F4F5F7] text-[#091E42] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#091E42] hover:text-white transition-all font-bold"
                 >
                    {t.service3.cta}
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-white border-t border-[#DFE1E6]">
        <div className="max-w-[800px] mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-[40px] font-[900] text-[#091E42] mb-4 tracking-tighter uppercase">{t.faq.title}</h2>
              <p className="text-[16px] text-[#42526E] font-medium opacity-60 leading-relaxed">{t.faq.subtitle}</p>
           </div>
           <div className="space-y-4">
              {t.faq.items.map((item, i) => (
                <div key={i} className="border border-[#DFE1E6] rounded-2xl overflow-hidden transition-all duration-300 bg-white">
                   <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-8 py-5 text-start flex justify-between items-center group"
                   >
                      <span className="text-[15px] lg:text-[16px] font-extrabold text-[#091E42] group-hover:text-[#0076CE] transition-colors">{item.q}</span>
                      <svg className={`w-5 h-5 text-[#42526E] transform transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                   </button>
                   <div className={`transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <div className="px-8 pb-6 text-[14px] lg:text-[15px] leading-relaxed text-[#42526E] font-medium border-t border-[#DFE1E6] pt-4 bg-[#F4F5F7]/30">
                        {item.a}
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12 text-center">
              <button 
                onClick={() => openModal('GENERAL')}
                className="text-[13px] font-black text-[#0076CE] hover:text-[#091E42] uppercase tracking-widest border-b-2 border-transparent hover:border-[#091E42] transition-all pb-1"
              >
                {t.faq.cta}
              </button>
           </div>
        </div>
      </section>

      {/* Comparison Callout */}
      <section className="py-20 px-6 bg-[#F4F5F7] border-y border-[#DFE1E6]">
        <div className="max-w-[800px] mx-auto">
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#DFE1E6]">
                 <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5E6C84] mb-6">{t.comparison.generic.title}</h4>
                 <ul className="space-y-5">
                    {t.comparison.generic.list.map((l, i) => (
                        <li key={i} className="text-[14px] font-semibold text-[#5E6C84] flex items-center gap-3">
                           <div className="w-1 h-1 bg-[#DFE1E6] rounded-full"></div> {l}
                        </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-[#091E42] p-8 rounded-[24px] shadow-lg border border-blue-500/10 text-white">
                 <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6">{t.comparison.ours.title}</h4>
                 <ul className="space-y-5">
                    {t.comparison.ours.list.map((l, i) => (
                        <li key={i} className="text-[14px] font-bold text-white flex items-center gap-3">
                           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div> {l}
                        </li>
                    ))}
                 </ul>
              </div>
           </div>
           <div className="mt-12 text-center text-xl font-extrabold text-[#091E42] max-w-xl mx-auto leading-tight text-balance">
              {t.comparison.warning}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 bg-[#002B49] text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl lg:text-[48px] font-[900] mb-10 tracking-tighter leading-[0.95] text-balance">
            {t.footer.headline}
          </h2>
          <button 
            onClick={() => openModal('SELECTION')}
            className="btn-primary px-10 py-5 rounded-full text-lg font-black shadow-xl transition-all active:scale-95 uppercase tracking-wide mb-12"
          >
            {t.footer.cta}
          </button>
          
          <div className="mt-12 pt-10 border-t border-white/10 flex flex-col items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-[12px] font-bold text-white/60">
                 <svg className="w-4 h-4 text-[#0076CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-white/60">
                 <svg className="w-4 h-4 text-[#0076CE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 <a href="mailto:insightsoman@gmail.com" className="hover:text-white transition-colors">insightsoman@gmail.com</a>
              </div>
            </div>
            <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] cursor-default mt-4">
              © 2025 InsightsOman Strategic Group
            </div>
          </div>
        </div>
      </footer>

      {/* Selection Modal */}
      {modalState.isOpen && modalState.type === 'SELECTION' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#091E42]/85 backdrop-blur-xl">
          <div className={`bg-white rounded-[24px] w-full max-w-[600px] shadow-2xl p-10 ${lang === 'fa' ? 'rtl' : 'ltr'}`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-[900] text-[#091E42] tracking-tighter uppercase">{t.selection.title}</h2>
              <button onClick={() => setModalState(prev => ({ ...prev, isOpen: false }))} className="p-2.5 text-[#42526E] hover:bg-[#F4F5F7] rounded-full transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="grid gap-5">
              <button 
                onClick={() => setModalState({ isOpen: true, type: 'ANALYSIS' })}
                className="group p-7 text-start bg-[#F4F5F7] hover:bg-[#EBECF0] rounded-[20px] transition-all border border-transparent hover:border-[#0076CE]/30 flex items-center justify-between shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-black text-[#091E42] mb-1.5 uppercase">{t.selection.initial}</h3>
                  <p className="text-[#5E6C84] text-[13px] font-medium leading-relaxed">{t.selection.initialDesc}</p>
                </div>
                <div className="text-xl font-[900] text-[#0076CE] tracking-tighter ml-5 whitespace-nowrap">{t.service1.price}</div>
              </button>
              <button 
                onClick={() => setModalState({ isOpen: true, type: 'FIELD_RESEARCH' })}
                className="group p-7 text-start bg-[#DEEBFF] hover:bg-[#B3D4FF] rounded-[20px] transition-all border border-transparent hover:border-[#0076CE]/50 flex items-center justify-between shadow-sm"
              >
                <div>
                  <h3 className="text-lg font-black text-[#0052CC] mb-1.5 uppercase">{t.selection.specialized}</h3>
                  <p className="text-[#0747A6] text-[13px] font-medium leading-relaxed">{t.selection.specializedDesc}</p>
                </div>
                <div className="text-xl font-[900] text-[#0052CC] tracking-tighter ml-5 whitespace-nowrap">{t.service2.price}</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Specific Service Modal */}
      {modalState.isOpen && modalState.type !== 'SELECTION' && (
        <ServiceModal 
          isOpen={modalState.isOpen} 
          onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))} 
          lang={lang} 
          type={modalState.type as ServiceType}
        />
      )}
    </div>
  );
};

export default App;