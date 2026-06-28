import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Terms() {
  const { t } = useLanguage();

  return (
    <div className="section container" style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: '100vh' }}>
      <div className="orb" style={{ width: 800, height: 800, top: '-10%', right: '-20%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.2) 0%, transparent 60%)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '40px', fontWeight: '500' }}>
          <ArrowLeft size={18} />
          {t.common.backHome}
        </Link>
        <h1 className="section-heading" style={{ marginBottom: '40px' }}>{t.terms.heading}</h1>

        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '15px' }}>
          <p style={{ marginBottom: '20px' }}>
            {t.terms.lastUpdated}: {new Date().toLocaleDateString(t.common.locale)}
          </p>
          <p style={{ marginBottom: '24px' }}>
            {t.terms.intro}
          </p>

          {t.terms.sections.map((section, i) => (
            <div key={i}>
              <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>{section.title}</h3>
              <p style={{ marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: section.body }} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
