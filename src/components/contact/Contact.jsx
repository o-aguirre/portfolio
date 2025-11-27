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

    return (
        <section id="contact" data-aos='fade-up' data-aos-delay='400'>
            <div className="px-4 py-8 lg:py-16 mx-auto max-w-3xl">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Contact Me</h2>
                <form ref={form} onSubmit={sendEmail} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-xl font-medium text-white">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="name"
                            className="shadow-sm bg-gray-300 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder="name@example.com" 
                            required 
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-xl font-medium text-white">Message</label>
                        <textarea 
                            rows='6' 
                            id="message" 
                            name="message"
                            className="shadow-sm bg-gray-300 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder="Leave a comment..." 
                            required 
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex text-white border bg-black border-gray-800 hover:border-blue-900 py-2 px-6 focus:outline-none hover:drop-shadow-[0_0_20px_rgba(60,39,245,0.8)] hover:scale-103 rounded-full text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                    {message && <p className="text-white text-center mt-4">{message}</p>}
                </form>
            </div>
        </section>
    )
}
export default Contact;