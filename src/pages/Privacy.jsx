import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="section container" style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: '100vh' }}>
      {/* Background orbs */}
      <div className="orb" style={{ width: 800, height: 800, top: '-10%', left: '-20%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.2) 0%, transparent 60%)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '40px', fontWeight: '500' }}>
          <ArrowLeft size={18} />
          Назад към началната страница
        </Link>
        <h1 className="section-heading" style={{ marginBottom: '40px' }}>Политика за поверителност</h1>
        
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '15px' }}>
          <p style={{ marginBottom: '20px' }}>
            Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
          </p>
          <p style={{ marginBottom: '24px' }}>
            Добре дошли в BulTrain! Ние уважаваме Вашата поверителност и се ангажираме да защитаваме Вашите данни. 
            Моля, прочетете тази Политика, за да разберете как събираме, използваме и защитаваме всяка информация, когато използвате нашето приложение и уебсайт.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>1. Събиране на данни</h3>
          <p style={{ marginBottom: '24px' }}>
            BulTrain е разработено с мисъл за сигурността. Ние <strong>НЕ</strong> изискваме създаване на профил и <strong>НЕ</strong> събираме лични данни, които могат да Ви идентифицират директно (като имена, имейл адреси или телефонни номера). Всички данни се обработват локално на Вашето устройство.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>2. Данни за местоположение</h3>
          <p style={{ marginBottom: '24px' }}>
            Функцията "Умна аларма" използва данните за Вашето текущо местоположение, за да Ви извести преди наближаване на Вашата гара. Тези данни се използват изцяло и само на Вашето устройство и <strong>не се изпращат към наши сървъри</strong> или към трети страни.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>3. Споделяне на информация</h3>
          <p style={{ marginBottom: '24px' }}>
            Тъй като ние не събираме лични данни, ние няма какво да споделяме, продаваме или предоставяме на маркетингови агенции или свързани лица. 
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>4. Промени в тази Политика</h3>
          <p style={{ marginBottom: '24px' }}>
            Можем периодично да обновяваме тази Политика за поверителност. Препоръчваме да преглеждате тази страница за евентуални промени. Вашето продължително използване на приложението ще се счита за Ваше съгласие с тях.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>5. Свържете се с нас</h3>
          <p style={{ marginBottom: '24px' }}>
            Ако имате въпроси или притеснения относно нашата Политика за поверителност, моля, свържете се с нас на: 
            <a href="mailto:bultrain.app@gmail.com" style={{ color: 'var(--color-accent)', textDecoration: 'none', marginLeft: '6px' }}>bultrain.app@gmail.com</a>.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
