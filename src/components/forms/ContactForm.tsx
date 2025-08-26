'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({ className, onSubmit }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - log to console
        console.log('Contact form submitted:', data);
      }
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const inputStyles = 'w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200';
  const labelStyles = 'block text-sm font-medium text-slate-200 mb-2';
  const errorStyles = 'text-red-400 text-sm mt-1';

  return (
    <motion.form
      className={cn('space-y-6', className)}
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyles} htmlFor="name">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            className={cn(inputStyles, errors.name && 'border-red-400')}
            placeholder="Enter your full name"
            {...register('name')}
          />
          {errors.name && (
            <p className={errorStyles}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className={labelStyles} htmlFor="email">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            className={cn(inputStyles, errors.email && 'border-red-400')}
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && (
            <p className={errorStyles}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyles} htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className={inputStyles}
            placeholder="Enter your phone number"
            {...register('phone')}
          />
        </div>

        <div>
          <label className={labelStyles} htmlFor="inquiryType">
            Inquiry Type *
          </label>
          <select
            id="inquiryType"
            className={cn(inputStyles, errors.inquiryType && 'border-red-400')}
            {...register('inquiryType')}
          >
            <option value="">Select inquiry type</option>
            <option value="general">General Inquiry</option>
            <option value="services">Services</option>
            <option value="partnership">Partnership</option>
            <option value="support">Support</option>
          </select>
          {errors.inquiryType && (
            <p className={errorStyles}>{errors.inquiryType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelStyles} htmlFor="message">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          className={cn(inputStyles, errors.message && 'border-red-400', 'resize-none')}
          placeholder="Tell us about your inquiry..."
          {...register('message')}
        />
        {errors.message && (
          <p className={errorStyles}>{errors.message.message}</p>
        )}
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full md:w-auto"
        >
          Send Message
        </Button>
      </div>
    </motion.form>
  );
} 