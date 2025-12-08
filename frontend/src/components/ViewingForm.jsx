import { useState } from 'react';
import { useViewingRequest } from '../hooks/useApi';

export default function ViewingForm({ propertyId }) {
  const { submitRequest, loading, error, success, reset } = useViewingRequest();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.preferred_date) {
      errors.preferred_date = 'Preferred date is required';
    } else {
      const selectedDate = new Date(formData.preferred_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.preferred_date = 'Please select a future date';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      await submitRequest({
        property_id: propertyId,
        ...formData,
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
      });
    } catch (err) {
      // Error handled by hook
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Success State
  if (success) {
    return (
      <section className="bg-white border-t border-gray-200" id="request-viewing">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Request submitted
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Thank you for your interest. We'll review your request and get back to you within 24 hours.
            </p>
            <button
              onClick={reset}
              className="text-gray-900 font-medium underline underline-offset-4 hover:text-gray-600 transition-colors"
            >
              Submit another request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-t border-gray-200" id="request-viewing">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Request a viewing
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in your details and we'll arrange a time to show you around
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* API Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Grouped Inputs - Airbnb Style */}
          <div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={`p-4 border-b md:border-r border-gray-300 ${validationErrors.name ? 'bg-red-50' : ''}`}>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                  placeholder="John Doe"
                />
                {validationErrors.name && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>
                )}
              </div>
              
              <div className={`p-4 border-b border-gray-300 ${validationErrors.email ? 'bg-red-50' : ''}`}>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                  placeholder="john@example.com"
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>

            {/* Phone & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={`p-4 border-b md:border-r border-gray-300 ${validationErrors.phone ? 'bg-red-50' : ''}`}>
                <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                  placeholder="+31 6 12345678"
                />
                {validationErrors.phone && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.phone}</p>
                )}
              </div>
              
              <div className={`p-4 border-b border-gray-300 ${validationErrors.preferred_date ? 'bg-red-50' : ''}`}>
                <label htmlFor="preferred_date" className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferred_date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  min={getMinDate()}
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                />
                {validationErrors.preferred_date && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.preferred_date}</p>
                )}
              </div>
            </div>

            {/* Time Preference */}
            <div className="p-4 border-b border-gray-300">
              <label htmlFor="preferred_time" className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Preferred Time
              </label>
              <select
                id="preferred_time"
                name="preferred_time"
                value={formData.preferred_time}
                onChange={handleChange}
                className="w-full bg-transparent text-gray-900 focus:outline-none"
              >
                <option value="">No preference</option>
                <option value="morning">Morning (9:00 - 12:00)</option>
                <option value="afternoon">Afternoon (12:00 - 17:00)</option>
                <option value="evening">Evening (17:00 - 20:00)</option>
              </select>
            </div>

            {/* Message */}
            <div className="p-4">
              <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none resize-none"
                placeholder="Any questions or special requests?"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              'Request viewing'
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-center text-xs text-gray-500 mt-4">
            By submitting, you agree to be contacted about this property.
          </p>
        </form>
      </div>
    </section>
  );
}
