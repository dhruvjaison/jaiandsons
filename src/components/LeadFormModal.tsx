'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar, Clock, Phone, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

// Validation schemas
const quickEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const scheduleVisitSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  visitDate: z.string().min(1, 'Please select a visit date'),
  visitTime: z.string().min(1, 'Please select a visit time'),
});

type QuickEnquiryFormData = z.infer<typeof quickEnquirySchema>;
type ScheduleVisitFormData = z.infer<typeof scheduleVisitSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'enquiry' | 'visit';
}

type TabType = 'enquiry' | 'visit';
type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function LeadFormModal({ isOpen, onClose, initialTab = 'enquiry' }: LeadFormModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Quick Enquiry Form
  const enquiryForm = useForm<QuickEnquiryFormData>({
    resolver: zodResolver(quickEnquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // Schedule Visit Form
  const visitForm = useForm<ScheduleVisitFormData>({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      visitDate: '',
      visitTime: '',
    },
  });

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormState('idle');
      setErrorMessage('');
      enquiryForm.reset();
      visitForm.reset();
    }
  }, [isOpen, enquiryForm, visitForm]);

  // Generate available time slots
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Submit handlers
  const onSubmitEnquiry = async (data: QuickEnquiryFormData) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'enquiry',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setFormState('success');
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setFormState('error');
      setErrorMessage('Failed to submit enquiry. Please try again.');
    }
  };

  const onSubmitVisit = async (data: ScheduleVisitFormData) => {
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'visit',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule visit');
      }

      setFormState('success');
    } catch (error) {
      console.error('Error scheduling visit:', error);
      setFormState('error');
      setErrorMessage('Failed to schedule visit. Please try again.');
    }
  };

  // WhatsApp quick chat link
  const whatsappLink = `https://wa.me/919876543210?text=Hi! I'm interested in ARC Luxury and would like to know more details.`;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-playfair font-bold text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-slate-300">
              Let us help you find your perfect luxury home
            </p>
          </div>

          {/* Success State */}
          {formState === 'success' && (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-4">
                Thank You!
              </h3>
              
              <p className="text-slate-600 mb-8 text-lg">
                Our team will reach out to you shortly to discuss your requirements.
              </p>
              
              <div className="space-y-4">
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={20} />
                  Quick Chat on WhatsApp
                </motion.a>
                
                <div>
                  <button
                    onClick={onClose}
                    className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form Content */}
          {formState !== 'success' && (
            <>
              {/* Tab Navigation */}
              <div className="border-b border-slate-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('enquiry')}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ${
                      activeTab === 'enquiry'
                        ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Phone size={18} />
                      Quick Enquiry
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('visit')}
                    className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ${
                      activeTab === 'visit'
                        ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Calendar size={18} />
                      Schedule Visit
                    </div>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </motion.div>
              )}

              {/* Quick Enquiry Tab */}
              {activeTab === 'enquiry' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <form onSubmit={enquiryForm.handleSubmit(onSubmitEnquiry)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...enquiryForm.register('name')}
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                      {enquiryForm.formState.errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {enquiryForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          {...enquiryForm.register('email')}
                          type="email"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="your.email@example.com"
                        />
                        {enquiryForm.formState.errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {enquiryForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...enquiryForm.register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="+91 9876543210"
                        />
                        {enquiryForm.formState.errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {enquiryForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...enquiryForm.register('message')}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-vertical"
                        placeholder="Tell us about your requirements, preferred unit type, budget range, or any specific questions..."
                      />
                      {enquiryForm.formState.errors.message && (
                        <p className="mt-1 text-sm text-red-600">
                          {enquiryForm.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full px-6 py-4 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                      whileHover={{ scale: formState === 'submitting' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formState === 'submitting' ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </div>
                      ) : (
                        'Send Enquiry'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* Schedule Visit Tab */}
              {activeTab === 'visit' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <form onSubmit={visitForm.handleSubmit(onSubmitVisit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...visitForm.register('name')}
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                      {visitForm.formState.errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {visitForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          {...visitForm.register('email')}
                          type="email"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="your.email@example.com"
                        />
                        {visitForm.formState.errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {visitForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...visitForm.register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="+91 9876543210"
                        />
                        {visitForm.formState.errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {visitForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Date and Time Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Visit Date *
                        </label>
                        <input
                          {...visitForm.register('visitDate')}
                          type="date"
                          min={getMinDate()}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                        {visitForm.formState.errors.visitDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {visitForm.formState.errors.visitDate.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          <Clock className="inline w-4 h-4 mr-1" />
                          Visit Time *
                        </label>
                        <select
                          {...visitForm.register('visitTime')}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {visitForm.formState.errors.visitTime && (
                          <p className="mt-1 text-sm text-red-600">
                            {visitForm.formState.errors.visitTime.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Special Requirements *
                      </label>
                      <textarea
                        {...visitForm.register('message')}
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-vertical"
                        placeholder="Any specific units you'd like to see, questions about amenities, or special requirements for your visit..."
                      />
                      {visitForm.formState.errors.message && (
                        <p className="mt-1 text-sm text-red-600">
                          {visitForm.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full px-6 py-4 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                      whileHover={{ scale: formState === 'submitting' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {formState === 'submitting' ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Scheduling...
                        </div>
                      ) : (
                        'Schedule Visit'
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 