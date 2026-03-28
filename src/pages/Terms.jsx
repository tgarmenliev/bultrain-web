import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="section container" style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: '100vh' }}>
      <div className="orb" style={{ width: 800, height: 800, top: '-10%', right: '-20%', background: 'radial-gradient(circle, rgba(10, 132, 255, 0.2) 0%, transparent 60%)' }} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '40px', fontWeight: '500' }}>
          <ArrowLeft size={18} />
          Назад към началната страница
        </Link>
        <h1 className="section-heading" style={{ marginBottom: '40px' }}>Условия за ползване</h1>
        
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '15px' }}>
          <p style={{ marginBottom: '20px' }}>
            Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
          </p>
          <p style={{ marginBottom: '24px' }}>
            С използването на приложението и уебсайта на BulTrain Вие се съгласявате да спазвате настоящите Условия за ползване.
            Ако не сте съгласни с тези условия, моля, преустановете употребата на услугата.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>1. Описание на услугата</h3>
          <p style={{ marginBottom: '24px' }}>
            BulTrain предоставя информация в реално време за разписанията и движението на влаковете в България, както и инструменти като "Умна аларма" за улеснение на Вашето пътуване.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>2. Отказ от отговорност (Disclaimer)</h3>
          <p style={{ marginBottom: '24px' }}>
            BulTrain е <strong>независим проект</strong> и по никакъв начин не е свързан, спонсориран или официално одобрен от БДЖ и ДП "НКЖИ". 
            Всички данни се предоставят "във вида, в който са" (as is). Въпреки усилията ни за точност, не носим отговорност за евентуални закъснения, пропуснати връзки или грешки в таблата и разписанията.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>3. Разрешено ползване</h3>
          <p style={{ marginBottom: '24px' }}>
            Вие се съгласявате да използвате приложението само за законни и лични нужди. Забранено е да използвате системи за автоматизирано извличане на информация (scraping), да опитвате да нарушите сигурността на приложението или да претоварвате инфраструктурата му.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>4. Технически изисквания и локализация</h3>
          <p style={{ marginBottom: '24px' }}>
            Някои от функциите на приложението, като Умната аларма, налагат използването на GPS на Вашето устройство и може да доведат до по-висока консумация на батерия. Използването им е изцяло Ваша отговорност.
          </p>

          <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', marginTop: '32px', marginBottom: '16px' }}>5. Права над интелектуалната собственост</h3>
          <p style={{ marginBottom: '24px' }}>
            Графичните елементи, логата, дизайнът и сорс кодът, създадени за целите на BulTrain, са собственост на разработчика (Тихомир Гърменлиев). Копирането или разпространението им за комерсиални цели без писмено разрешение е строго забранено.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
