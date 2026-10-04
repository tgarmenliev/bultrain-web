import LegalPage from '../site/LegalPage'

// Store-facing privacy policy. Intentionally bilingual on one page; the legal text is unchanged.
export default function PrivacyApp() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <LegalPage title="BulTrain App Privacy Policy" wide>
      <p className="legal__meta">Last updated / Последна актуализация: 28.03.2026</p>
      <div className="legal-jump">
        <button type="button" onClick={() => scrollTo('en')}>English</button>
        <button type="button" onClick={() => scrollTo('bg')}>Български</button>
      </div>

      <div className="legal__policy">
          {/* ENGLISH SECTION */}
          <div id="en">
            <div className="legal-callout">
              <strong>Disclaimer</strong>
              BulTrain is an independent mobile application. It is not affiliated with, endorsed by, or connected to BDZ (Bulgarian State Railways), NRIC (National Railway Infrastructure Company), the Ministry of Transport, any government body, or any official institution. The app uses only publicly available information and is developed privately for user convenience.
            </div>

            <h2>Privacy Policy</h2>
            <p>This Privacy Policy governs the manner in which BulTrain collects, uses, maintains, and discloses information collected from users (each, a "User") of the BulTrain mobile application ("App"). This privacy policy applies to the App and all products and services offered by BulTrain.</p>

            <h3>Information Collection and Use</h3>
            <p>BulTrain is committed to protecting the privacy of its users. We do not require you to create an account, nor do we collect any personally identifiable information (such as your name, email address, or phone number).</p>

            <h3>Location Data (Smart Alarm Feature)</h3>
            <p>To provide the "Smart Alarm" functionality, which alerts you before your train arrives at a specific station, the App requests access to your device's location data (including background location).</p>
            <ul>
                <li><strong>Local Processing:</strong> Your location data is processed strictly locally on your device to calculate your proximity to the destination.</li>
                <li><strong>No External Transmission:</strong> We do not transmit your location data to our servers, we do not store it externally, and we do not share it with any third parties. You can enable or disable location permissions at any time through your device's settings.</li>
            </ul>

            <h3>Local Notifications</h3>
            <p>The App uses local notifications to remind you of upcoming saved trips or triggered alarms. These are scheduled and executed entirely on your device without relying on external push notification servers.</p>

            <h3>Non-Personal Identification Information</h3>
            <p>BulTrain may collect non-personal identification information about Users whenever they interact with our App. Non-personal identification information may include the type of device, operating system version, and other similar technical information necessary for the App to function properly.</p>

            <h3>How We Use Collected Information</h3>
            <p>The non-personal identification information collected is used solely to improve the functionality of the App, troubleshoot bugs, and enhance the overall user experience.</p>

            <h3>Protection of Information</h3>
            <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of any local data stored on your App.</p>

            <h3>Changes to This Privacy Policy</h3>
            <p>BulTrain has the discretion to update this privacy policy at any time. We encourage Users to frequently check this page for any changes to stay informed. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

            <h3>Your Acceptance of These Terms</h3>
            <p>By using this App, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our App. Your continued use of the App following the posting of changes to this policy will be deemed your acceptance of those changes.</p>

            <h3>Contacting Us</h3>
            <p>If you have any questions about this Privacy Policy, the practices of this App, or your dealings with this App, please contact us at: <a href="mailto:bultrain.app@gmail.com">bultrain.app@gmail.com</a></p>
          </div>

          <hr className="legal-split" />

          {/* BULGARIAN SECTION */}
          <div id="bg">
            <h2>Политика за поверителност</h2>

            <div className="legal-callout">
                <strong>Отказ от отговорност (Disclaimer)</strong>
                BulTrain е независимо мобилно приложение. То не е свързано с, не е одобрено от и не е обвързано по какъвто и да е начин с БДЖ (Български държавни железници), НКЖИ (Национална компания железопътна инфраструктура), Министерството на транспорта и съобщенията, държавен орган или друга официална институция. Приложението използва единствено публично достъпна информация и е разработено частно за удобство на потребителите.
            </div>

            <h2>Политика за поверителност</h2>
            <p>Тази Политика за поверителност урежда начина, по който BulTrain събира, използва, съхранява и разкрива информация, събрана от потребителите (наричани по-долу "Потребител") на мобилното приложение BulTrain ("Приложението"). Тази политика за поверителност се отнася за Приложението и всички продукти и услуги, предлагани от BulTrain.</p>

            <h3>Събиране и използване на информация</h3>
            <p>BulTrain се ангажира да защитава поверителността на своите потребители. Ние не изискваме от вас да създавате профил, нито събираме каквато и да е лична идентификационна информация (като вашето име, имейл адрес или телефонен номер).</p>

            <h3>Данни за местоположение (Функция "Смарт аларма")</h3>
            <p>За да предостави функцията "Смарт аларма", която ви известява преди влакът ви да пристигне на определена гара, Приложението изисква достъп до данните за местоположението на вашето устройство (включително местоположение във фонов режим).</p>
            <ul>
                <li><strong>Локална обработка:</strong> Данните за вашето местоположение се обработват строго локално на вашето устройство, за да се изчисли разстоянието ви до крайната гара.</li>
                <li><strong>Липса на външно предаване:</strong> Ние не предаваме вашите данни за местоположение към наши сървъри, не ги съхраняваме външно и не ги споделяме с трети страни. Можете да разрешите или забраните достъпа до местоположението по всяко време чрез настройките на вашето устройство.</li>
            </ul>

            <h3>Локални известия</h3>
            <p>Приложението използва локални известия, за да ви напомня за предстоящи запазени пътувания или задействани аларми. Те се изпълняват изцяло на вашето устройство, без да разчитат на външни сървъри.</p>

            <h3>Нелична идентификационна информация</h3>
            <p>BulTrain може да събира нелична идентификационна информация за Потребителите, когато те взаимодействат с нашето Приложение. Неличната идентификационна информация може да включва типа на устройството, версията на операционната система и друга подобна техническа информация, необходима за правилното функциониране на Приложението.</p>

            <h3>Как използваме събраната информация</h3>
            <p>Събраната нелична идентификационна информация се използва единствено за подобряване на функционалността на Приложението, отстраняване на програмни грешки и подобряване на цялостното потребителско изживяване.</p>

            <h3>Защита на информацията</h3>
            <p>Ние прилагаме подходящи практики за събиране, съхранение и обработка на данни, както и мерки за сигурност, за да предпазим от неоторизиран достъп, промяна, разкриване или унищожаване на каквито и да е локални данни, съхранявани във вашето Приложение.</p>

            <h3>Промени в тази Политика за поверителност</h3>
            <p>BulTrain има правото да актуализира тази политика за поверителност по всяко време. Насърчаваме Потребителите често да проверяват тази страница за евентуални промени, за да бъдат информирани. Вие приемате и се съгласявате, че е ваша отговорност периодично да преглеждате тази политика за поверителност и да се информирате за модификациите.</p>

            <h3>Вашето съгласие с тези условия</h3>
            <p>Използвайки това Приложение, вие изразявате съгласието си с тази политика. Ако не сте съгласни с тази политика, моля, не използвайте Приложението. Продължаването на използването на Приложението след публикуването на промени в тази политика ще се счита за приемане на тези промени от ваша страна.</p>

            <h3>Свържете се с нас</h3>
            <p>Ако имате някакви въпроси относно тази Политика за поверителност, практиките на това Приложение или отношенията ви с него, моля, свържете се с нас на имейл адрес: <a href="mailto:bultrain.app@gmail.com">bultrain.app@gmail.com</a></p>
          </div>


      </div>
    </LegalPage>
  )
}
