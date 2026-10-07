import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../i18n/useLanguage';

const Contact = () => {
    const { t } = useLanguage();
    const form = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [messageKey, setMessageKey] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs.sendForm(
            'service_hbknvcp',      // Reemplaza con tu Service ID
            'template_4ruyy7i',     // Reemplaza con tu Template ID
            form.current,
            'b_3Td-hnwDEUv-6Ku'       // Reemplaza con tu Public Key
        )
        .then((result) => {
            console.log(result.text);
            setMessageKey('contact.success');
            setIsLoading(false);
            form.current.reset();
        })
        .catch((error) => {
            console.log(error.text);
            setMessageKey('contact.error');
            setIsLoading(false);
        });
    };

    const fieldClass = "bg-ansi-raised text-ansi-fg border border-ansi-raised focus:outline-2 focus:outline-ansi-green focus:border-ansi-green block w-full p-2.5 placeholder:text-ansi-gray"

    return (
        <section id="contact" data-aos='fade-up' data-aos-delay='400' className="font-mono text-ansi-fg">
            <div className="px-4 py-8 lg:py-16 mx-auto max-w-3xl">
                <h2 className="mb-6 text-2xl sm:text-3xl font-bold break-words">
                    <span className="text-ansi-green">$</span> ./contact.sh
                </h2>
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-ansi-cyan">{t('contact.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="name"
                            className={fieldClass}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-ansi-cyan">{t('contact.message')}</label>
                        <textarea
                            rows='6'
                            id="message"
                            name="message"
                            className={fieldClass}
                            placeholder={t('contact.placeholder')}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex text-ansi-green border border-ansi-green hover:bg-ansi-green hover:text-ansi-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green py-2 px-6 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? t('contact.sending') : './send.sh'}
                    </button>
                    {messageKey && <p role="status" className="text-ansi-amber mt-4 break-words">{t(messageKey)}</p>}
                </form>
            </div>
        </section>
    )
}
export default Contact;
