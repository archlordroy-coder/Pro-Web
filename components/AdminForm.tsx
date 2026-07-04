'use client';

import { ReactNode, useState } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'password';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
}

interface AdminFormProps {
  title: string;
  fields: FormField[];
  data: Record<string, any>;
  onDataChange: (field: string, value: any) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function AdminForm({
  title,
  fields,
  data,
  onDataChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Sauvegarder',
}: AdminFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required && !data[field.name]) {
        newErrors[field.name] = `${field.label} est requis`;
      }

      if (field.type === 'email' && data[field.name]) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data[field.name])) {
          newErrors[field.name] = 'Email invalide';
        }
      }

      if (field.type === 'number' && data[field.name]) {
        if (isNaN(Number(data[field.name]))) {
          newErrors[field.name] = 'Doit être un nombre';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-3xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-text-primary">{title}</h2>

      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                value={data[field.name] || ''}
                onChange={(e) => {
                  onDataChange(field.name, e.target.value);
                  if (errors[field.name]) {
                    setErrors(prev => ({ ...prev, [field.name]: '' }));
                  }
                }}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                className={`w-full p-3 border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                  errors[field.name] ? 'border-red-500' : 'border-border'
                }`}
                disabled={isSubmitting}
              />
            ) : field.type === 'select' ? (
              <select
                value={data[field.name] || ''}
                onChange={(e) => {
                  onDataChange(field.name, e.target.value);
                  if (errors[field.name]) {
                    setErrors(prev => ({ ...prev, [field.name]: '' }));
                  }
                }}
                className={`w-full p-3 border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                  errors[field.name] ? 'border-red-500' : 'border-border'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Sélectionner une option</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={data[field.name] || ''}
                onChange={(e) => {
                  onDataChange(field.name, e.target.value);
                  if (errors[field.name]) {
                    setErrors(prev => ({ ...prev, [field.name]: '' }));
                  }
                }}
                placeholder={field.placeholder}
                className={`w-full p-3 border rounded-xl bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                  errors[field.name] ? 'border-red-500' : 'border-border'
                }`}
                disabled={isSubmitting}
              />
            )}

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          {submitLabel}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-3 bg-surface-muted text-text-primary rounded-xl font-semibold hover:bg-surface-muted/80 transition disabled:opacity-50"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
