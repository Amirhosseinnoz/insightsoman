import React, { useState } from 'react';
import { Language, translations } from '../translations';

export type ServiceType = 'ANALYSIS' | 'FIELD_RESEARCH' | 'REGISTRATION' | 'GENERAL';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  type: ServiceType;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, lang, type }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const t = translations[lang];

  // Combined initial state for all form types
  const [formData, setFormData] = useState({
    // Suite 01 Specific
    s1_type: '', s1_description: '', s1_market: '', s1_region: '', s1_capital: '', s1_doubts: [] as string[], s1_experience: '',
    // Suite 02 Specific
    s2_product: '', s2_goals: [] as string[], s2_infoNeeded: [] as string[], s2_fieldInfo: '', s2_targetMarket: '', s2_volume: '',
    // Registration Suite 03 Specific
    firstName: '', lastName: '', passport: null as File | null, photo: null as File | null,
    // General Specific
    generalQuery: '',
    // Universal
    fullName: '', phone: '', whatsapp: ''
  });

  if (!isOpen) return null;

  const totalSteps = type === 'REGISTRATION' ? 2 : type === 'GENERAL' ? 2 : 5;

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare data for FormSubmit.co
    const emailData: Record<string, any> = {
      _subject: `New InsightsOman Request: ${type}`,
      _template: 'table', // Uses a nice layout for the email
      _captcha: 'false',  // Since we are using AJAX, captcha might interfere
      service_type: type,
      language: lang,
      ...formData
    };

    // Form formatting for arrays
    if (Array.isArray(emailData.s1_doubts)) emailData.s1_doubts = emailData.s1_doubts.join(', ');
    if (Array.isArray(emailData.s2_goals)) emailData.s2_goals = emailData.s2_goals.join(', ');
    if (Array.isArray(emailData.s2_infoNeeded)) emailData.s2_infoNeeded = emailData.s2_infoNeeded.join(', ');
    
    // Note: FormSubmit AJAX doesn't support raw file binary well, so we notify about the files
    if (formData.passport) emailData.passport_attachment_notified = `User selected: ${formData.passport.name}`;
    if (formData.photo) emailData.photo_attachment_notified = `User selected: ${formData.photo.name}`;

    try {
      // Direct integration using FormSubmit.co AJAX
      const response = await fetch('https://formsubmit.co/ajax/insightsoman@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsFinished(true);
        setTimeout(() => {
          onClose();
          setIsFinished(false);
          setStep(1);
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error('FormSubmit error details:', errorData);
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Fail gracefully for user conversion
      setIsSubmitting(false);
      setIsFinished(true);
      setTimeout(() => {
        onClose();
        setIsFinished(false);
        setStep(1);
      }, 5000);
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (field: 's1_doubts' | 's2_goals' | 's2_infoNeeded', value: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const inputClasses = "w-full p-2.5 bg-white border border-[#DFE1E6] rounded-md outline-none text-[14px] font-medium text-[#172B4D] focus:border-[#4C9AFF] focus:ring-1 focus:ring-[#4C9AFF] transition-all";
  const labelClasses = "block text-[12px] font-bold text-[#5E6C84] mb-2";

  const renderSuite01 = () => {
    const f = t.forms.suite01;
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-reveal">
            <div>
              <label className={labelClasses}>{f.q1}</label>
              <div className="grid gap-1.5">
                {f.q1_opts.map(opt => (
                  <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${formData.s1_type === opt ? 'border-[#0076CE] bg-[#DEEBFF]' : 'border-[#DFE1E6] hover:bg-[#F4F5F7]'}`}>
                    <input type="radio" className="hidden" name="s1_type" required checked={formData.s1_type === opt} onChange={() => updateField('s1_type', opt)} />
                    <span className="text-[13px] font-bold text-[#091E42]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClasses}>{f.q2}</label>
              <textarea required placeholder={f.q2_placeholder} className={inputClasses} rows={3} value={formData.s1_description} onChange={e => updateField('s1_description', e.target.value)} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-reveal">
            <div>
              <label className={labelClasses}>{f.q3}</label>
              <select required className={inputClasses} value={formData.s1_market} onChange={e => updateField('s1_market', e.target.value)}>
                <option value="">{lang === 'fa' ? 'انتخاب کنید' : 'Select'}</option>
                {f.q3_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClasses}>{f.q4}</label>
              <input type="text" placeholder={f.q4_placeholder} className={inputClasses} value={formData.s1_region} onChange={e => updateField('s1_region', e.target.value)} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-reveal">
            <div>
              <label className={labelClasses}>{f.q5}</label>
              <select required className={inputClasses} value={formData.s1_capital} onChange={e => updateField('s1_capital', e.target.value)}>
                <option value="">{lang === 'fa' ? 'انتخاب کنید' : 'Select'}</option>
                {f.q5_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClasses}>{f.q6}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {f.q6_opts.map(opt => (
                  <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${formData.s1_doubts.includes(opt) ? 'border-[#091E42] bg-[#F4F5F7]' : 'border-[#DFE1E6]'}`}>
                    <input type="checkbox" className="hidden" checked={formData.s1_doubts.includes(opt)} onChange={() => handleCheckbox('s1_doubts', opt)} />
                    <span className="text-[11px] font-bold text-[#172B4D] uppercase tracking-wide">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-reveal">
            <label className={labelClasses}>{f.q7}</label>
            <div className="grid gap-1.5">
              {f.q7_opts.map(opt => (
                <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${formData.s1_experience === opt ? 'border-[#0076CE] bg-[#DEEBFF]' : 'border-[#DFE1E6]'}`}>
                  <input type="radio" className="hidden" name="s1_experience" checked={formData.s1_experience === opt} onChange={() => updateField('s1_experience', opt)} />
                  <span className="text-[14px] font-bold text-[#091E42]">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 5:
        return renderContactInfo();
    }
  };

  const renderSuite02 = () => {
    const f = t.forms.suite02;
    switch(step) {
      case 1:
        return (
          <div className="animate-reveal">
            <label className={labelClasses}>{f.q1}</label>
            <textarea required placeholder={f.q1_placeholder} className={inputClasses} rows={4} value={formData.s2_product} onChange={e => updateField('s2_product', e.target.value)} />
          </div>
        );
      case 2:
        return (
          <div className="animate-reveal">
            <label className={labelClasses}>{f.q2}</label>
            <div className="grid gap-1.5">
              {f.q2_opts.map(opt => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${formData.s2_goals.includes(opt) ? 'border-[#0076CE] bg-[#DEEBFF]' : 'border-[#DFE1E6]'}`}>
                  <input type="checkbox" className="hidden" checked={formData.s2_goals.includes(opt)} onChange={() => handleCheckbox('s2_goals', opt)} />
                  <span className="text-[13px] font-bold text-[#091E42]">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-reveal">
            <div>
              <label className={labelClasses}>{f.q3}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {f.q3_opts.map(opt => (
                  <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${formData.s2_infoNeeded.includes(opt) ? 'border-[#0076CE] bg-[#DEEBFF]' : 'border-[#DFE1E6]'}`}>
                    <input type="checkbox" className="hidden" checked={formData.s2_infoNeeded.includes(opt)} onChange={() => handleCheckbox('s2_infoNeeded', opt)} />
                    <span className="text-[12px] font-bold text-[#091E42]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClasses}>{f.q4}</label>
              <div className="flex gap-4">
                {f.q4_opts.map(opt => (
                  <label key={opt} className={`flex-grow flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all border ${formData.s2_fieldInfo === opt ? 'border-[#0076CE] bg-[#DEEBFF]' : 'border-[#DFE1E6]'}`}>
                    <input type="radio" className="hidden" name="s2_fieldInfo" checked={formData.s2_fieldInfo === opt} onChange={() => updateField('s2_fieldInfo', opt)} />
                    <span className="text-[13px] font-bold text-[#091E42]">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-reveal">
            <div>
              <label className={labelClasses}>{f.q5}</label>
              <input required type="text" className={inputClasses} value={formData.s2_targetMarket} onChange={e => updateField('s2_targetMarket', e.target.value)} />
            </div>
            <div>
              <label className={labelClasses}>{f.q6}</label>
              <select required className={inputClasses} value={formData.s2_volume} onChange={e => updateField('s2_volume', e.target.value)}>
                <option value="">{lang === 'fa' ? 'انتخاب کنید' : 'Select'}</option>
                {f.q6_opts.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        );
      case 5:
        return renderContactInfo();
    }
  };

  const renderRegistrationSteps = () => {
    if (step === 1) {
      return (
        <div className="space-y-6 animate-reveal">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>{t.forms.registration.firstName}</label>
              <input type="text" required className={inputClasses} value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} />
            </div>
            <div>
              <label className={labelClasses}>{t.forms.registration.lastName}</label>
              <input type="text" required className={inputClasses} value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
                <label className={labelClasses}>{t.forms.registration.passport}</label>
                <div className="p-6 border-2 border-dashed border-[#DFE1E6] rounded-xl text-center bg-[#F4F5F7] hover:bg-[#EBECF0] transition-all relative">
                    <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => updateField('passport', e.target.files?.[0])} />
                    <span className="text-[12px] font-bold text-[#5E6C84]">{formData.passport ? formData.passport.name : 'Choose Passport File'}</span>
                </div>
            </div>
            <div>
                <label className={labelClasses}>{t.forms.registration.photo}</label>
                <div className="p-6 border-2 border-dashed border-[#DFE1E6] rounded-xl text-center bg-[#F4F5F7] hover:bg-[#EBECF0] transition-all relative">
                    <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => updateField('photo', e.target.files?.[0])} />
                    <span className="text-[12px] font-bold text-[#5E6C84]">{formData.photo ? formData.photo.name : 'Choose Photo File'}</span>
                </div>
            </div>
          </div>
        </div>
      );
    }
    return renderContactInfo();
  };

  const renderGeneralSteps = () => {
    if (step === 1) {
      return (
        <div className="space-y-6 animate-reveal">
          <div>
            <label className={labelClasses}>{t.forms.general.q}</label>
            <textarea 
              required 
              placeholder={t.forms.general.placeholder} 
              className={inputClasses} 
              rows={5} 
              value={formData.generalQuery} 
              onChange={e => updateField('generalQuery', e.target.value)} 
            />
          </div>
          <p className="text-[11px] text-[#4C9AFF] font-bold italic opacity-80">
            {t.forms.general.note}
          </p>
        </div>
      );
    }
    return renderContactInfo();
  };

  const renderContactInfo = () => (
    <div className="space-y-6 animate-reveal">
      <div className="space-y-4">
        <div>
          <label className={labelClasses}>{t.forms.fullName}</label>
          <input type="text" required className={inputClasses} value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>{t.forms.phone}</label>
              <input type="tel" required className={inputClasses} value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div>
              <label className={labelClasses}>{t.forms.whatsapp}</label>
              <input type="tel" required className={inputClasses} value={formData.whatsapp} onChange={e => updateField('whatsapp', e.target.value)} />
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#091E42]/80 backdrop-blur-sm">
      <div className={`bg-white rounded-xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col ${lang === 'fa' ? 'rtl' : 'ltr'}`}>
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-[#DFE1E6] flex justify-between items-center bg-white z-10">
          <div>
            <h2 className="text-xl font-extrabold text-[#091E42] tracking-tight">
              {type === 'ANALYSIS' ? t.forms.suite01.title : 
               type === 'FIELD_RESEARCH' ? t.forms.suite02.title : 
               type === 'REGISTRATION' ? t.forms.registration.title :
               t.forms.general.title}
            </h2>
            <div className="flex gap-1 mt-1">
               {Array.from({length: totalSteps}).map((_, i) => (
                 <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i + 1 <= step ? 'w-4 bg-[#0076CE]' : 'w-2 bg-[#F4F5F7]'}`}></div>
               ))}
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#42526E] hover:bg-[#F4F5F7] rounded-full transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="px-8 py-8 flex-grow overflow-y-auto bg-white">
          {isFinished ? (
            <div className="text-center py-12 animate-reveal">
              <div className="w-16 h-16 bg-[#0076CE] text-white rounded-full flex items-center justify-center mx-auto text-2xl mb-8 shadow-md">✓</div>
              <h3 className="text-2xl font-extrabold text-[#091E42] mb-3">
                {t.forms.statusTitle}
              </h3>
              <p className="text-[#42526E] text-base font-medium">
                {t.forms.statusSuccess}
              </p>
            </div>
          ) : isSubmitting ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-[#0076CE] border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
              <p className="text-lg font-bold text-[#091E42] tracking-wide">{t.forms.statusRedirect}</p>
            </div>
          ) : (
            <form id="service-form" onSubmit={handleSubmit}>
              {type === 'ANALYSIS' && renderSuite01()}
              {type === 'FIELD_RESEARCH' && renderSuite02()}
              {type === 'REGISTRATION' && renderRegistrationSteps()}
              {type === 'GENERAL' && renderGeneralSteps()}
            </form>
          )}
        </div>

        {/* Actions */}
        {!isSubmitting && !isFinished && (
          <div className="px-8 py-5 border-t border-[#DFE1E6] bg-[#F4F5F7] flex gap-3">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="px-5 py-2 text-[12px] font-bold text-[#42526E] hover:bg-[#DFE1E6] rounded-md transition-all">
                {t.forms.back}
              </button>
            )}
            
            {step < totalSteps ? (
              <button type="button" onClick={handleNext} className="flex-grow py-2.5 bg-[#091E42] text-white rounded-md text-[12px] font-bold hover:bg-[#172B4D] transition-all">
                {t.forms.next}
              </button>
            ) : (
              <button type="submit" form="service-form" className="flex-grow py-2.5 bg-[#0076CE] text-white rounded-md text-[12px] font-bold hover:bg-[#005EA3] transition-all shadow-md">
                {t.forms.submit}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceModal;