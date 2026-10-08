import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

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
            setMessage('Message sent successfully! ✅');
            setIsLoading(false);
            form.current.reset();
        })
        .catch((error) => {
            console.log(error.text);
            setMessage('Failed to send message. Please try again. ❌');
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
                        <label htmlFor="email" className="block mb-2 text-ansi-cyan">email:</label>
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
                        <label htmlFor="message" className="block mb-2 text-ansi-cyan">message:</label>
                        <textarea
                            rows='6'
                            id="message"
                            name="message"
                            className={fieldClass}
                            placeholder="Leave a comment..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex text-ansi-green border border-ansi-green hover:bg-ansi-green hover:text-ansi-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ansi-green py-2 px-6 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'sending...' : './send.sh'}
                    </button>
                    {message && <p role="status" className="text-ansi-amber mt-4 break-words">{message}</p>}
                </form>
            </div>
        </section>
    )
}
export default Contact;
