import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getRoute } from '../utils/routes';

const CONTACT_EMAIL = 'info@blucotravel.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emptyForm = {
  name: '',
  country: '',
  phone: '',
  email: '',
  description: '',
  accepted: false,
};

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20';

const ContactForm = ({ className = 'bg-white' }) => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('contactForm.errors.required');
    if (!form.country.trim()) next.country = t('contactForm.errors.required');
    if (!form.phone.trim()) next.phone = t('contactForm.errors.required');
    if (!EMAIL_PATTERN.test(form.email.trim())) next.email = t('contactForm.errors.email');
    if (!form.description.trim()) next.description = t('contactForm.errors.required');
    if (!form.accepted) next.accepted = t('contactForm.errors.terms');
    setErrors(next);
    return Object.values(next).every((value) => !value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = t('contactForm.mailSubject', { name: form.name.trim() });
    const body = [
      `${t('contactForm.fields.name')}: ${form.name.trim()}`,
      `${t('contactForm.fields.country')}: ${form.country.trim()}`,
      `${t('contactForm.fields.phone')}: ${form.phone.trim()}`,
      `${t('contactForm.fields.email')}: ${form.email.trim()}`,
      '',
      form.description.trim(),
    ].join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const errorText = (field) =>
    errors[field] ? <p className="mt-1 text-xs text-red-600">{errors[field]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-sm font-medium text-gray-700">
            {t('contactForm.fields.name')}
          </label>
          <input id="cf-name" className={inputClass} value={form.name} onChange={update('name')} maxLength={120} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="cf-country" className="mb-1 block text-sm font-medium text-gray-700">
            {t('contactForm.fields.country')}
          </label>
          <input id="cf-country" className={inputClass} value={form.country} onChange={update('country')} maxLength={80} />
          {errorText('country')}
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1 block text-sm font-medium text-gray-700">
            {t('contactForm.fields.phone')}
          </label>
          <input id="cf-phone" type="tel" className={inputClass} value={form.phone} onChange={update('phone')} maxLength={30} />
          {errorText('phone')}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1 block text-sm font-medium text-gray-700">
            {t('contactForm.fields.email')}
          </label>
          <input id="cf-email" type="email" className={inputClass} value={form.email} onChange={update('email')} maxLength={150} />
          {errorText('email')}
        </div>
      </div>

      <div>
        <label htmlFor="cf-description" className="mb-1 block text-sm font-medium text-gray-700">
          {t('contactForm.fields.description')}
        </label>
        <textarea
          id="cf-description"
          rows={4}
          className={inputClass}
          value={form.description}
          onChange={update('description')}
          maxLength={2000}
        />
        {errorText('description')}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.accepted}
            onChange={update('accepted')}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
          />
          <span>
            {t('contactForm.accept.before')}
            <Link
              to={getRoute(lang, 'terms')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 underline hover:text-cyan-500"
            >
              {t('contactForm.accept.terms')}
            </Link>
            {t('contactForm.accept.and')}
            <Link
              to={getRoute(lang, 'privacy')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-700 underline hover:text-cyan-500"
            >
              {t('contactForm.accept.privacy')}
            </Link>
            .
          </span>
        </label>
        {errorText('accepted')}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-cyan-500 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 sm:w-auto sm:px-8"
      >
        {t('contactForm.submit')}
      </button>
    </form>
  );
};

export default ContactForm;
