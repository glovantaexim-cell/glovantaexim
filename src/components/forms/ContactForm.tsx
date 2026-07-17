'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COUNTRIES_LIST, PRODUCT_CATEGORIES } from '@/lib/constants';
import { Loader2, Check } from 'lucide-react';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  companyName: z.string().optional(),
  country: z.string().min(1, 'Please select your country'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultProductInterest?: string;
}

export default function ContactForm({ defaultProductInterest }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (defaultProductInterest) {
      setValue('productInterest', defaultProductInterest);
    }
  }, [defaultProductInterest, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage(result.message);
        reset();
      } else {
        setStatus('error');
        setResponseMessage(result.message);
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Failed to submit form. Please try again.');
    }

    setTimeout(() => {
      setStatus('idle');
      setResponseMessage('');
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field (hidden) */}
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="John Doe"
            disabled={status === 'loading'}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            {...register('companyName')}
            placeholder="Your Company Inc."
            disabled={status === 'loading'}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            disabled={status === 'loading'}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country">
            Country <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setValue('country', value)}
            disabled={status === 'loading'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES_LIST.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="+1 234 567 8900"
            disabled={status === 'loading'}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <Label htmlFor="whatsapp">WhatsApp Number</Label>
          <Input
            id="whatsapp"
            {...register('whatsapp')}
            placeholder="+1 234 567 8900"
            disabled={status === 'loading'}
          />
        </div>

        {/* Product Interest */}
        <div>
          <Label htmlFor="productInterest">Product Interest</Label>
          <Select
            onValueChange={(value) => setValue('productInterest', value)}
            disabled={status === 'loading'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select product category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.slug} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div>
          <Label htmlFor="quantity">Estimated Quantity</Label>
          <Input
            id="quantity"
            {...register('quantity')}
            placeholder="e.g., 1000 kg, 500 units"
            disabled={status === 'loading'}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your requirements..."
          rows={5}
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Status Message */}
      {responseMessage && (
        <div
          className={`p-4 rounded-lg ${
            status === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {status === 'success' && <Check className="w-5 h-5" />}
            <p>{responseMessage}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Inquiry'
        )}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        We will respond to your inquiry within 24 hours
      </p>
    </form>
  );
}
