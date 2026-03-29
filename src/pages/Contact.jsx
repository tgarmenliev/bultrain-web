import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageSquare, User, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const contactMethods = [
    {
      id: 'contact-email',
      icon: <Mail size={24} />,
      label: 'Имейл',
      value: 'bultrain.app@gmail.com',
      href: 'mailto:bultrain.app@gmail.com',
      description: 'За въпроси, предложения и техническа поддръжка.'
    },
    {
      id: 'contact-linkedin',
      icon: <User size={24} />,
      label: 'LinkedIn',
      value: 'Tihomir Garmenliev',
      href: 'https://www.linkedin.com/in/tgarmenliev/',
      description: 'Професионална мрежа и бизнес контакти.'
    }
    // {
    //   id: 'contact-facebook',
    //   icon: <Globe size={24} />,
    //   label: 'Facebook',
    //   value: 'BulTrain Спътник',
    //   href: 'https://www.facebook.com/bultrain.app',
    //   description: 'Последвайте ни за последните новини и ъпдейти.'
    // }
  ];

  return (
    <div className="section container" style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div className="orb" style={{ width: 800, height: 800, top: '-10%', left: '-20%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.2) 0%, transparent 60%)' }} />
      <div className="orb" style={{ width: 600, height: 600, bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.15) 0%, transparent 60%)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}
      >
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '40px', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'} onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}>
          <ArrowLeft size={18} />
          Назад към началната страница
        </Link>
        
        <h1 className="section-heading" style={{ marginBottom: '16px' }}>Свържете се с нас</h1>
        <p className="section-subheading" style={{ marginBottom: '60px', maxWidth: '600px' }}>
          Имате въпрос или просто искате да ни поздравите? Изберете най-удобния за Вас начин за връзка с екипа на BulTrain.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px',
          marginBottom: '60px'
        }}>
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.id}
              id={method.id}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card"
              style={{
                padding: '32px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--color-border-accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div className="icon-box" style={{ marginBottom: 0 }}>
                {method.icon}
              </div>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{method.label}</h3>
                <p style={{ color: 'var(--color-accent)', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{method.value}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{method.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
          <MessageSquare size={32} style={{ color: 'var(--color-accent)', marginBottom: '20px' }} />
          <h2 style={{ color: 'var(--color-text-primary)', fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Очакваме Ви!</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Ние ценим всяка обратна връзка. Вашите мнения ни помагат да направим BulTrain още по-добър за всички пътуващи в България.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
