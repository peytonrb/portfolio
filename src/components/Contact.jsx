import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send('service_cnmp43i',
      'template_qjyx5fe',
      {
        from_name: form.name,
        to_name: 'Peyton',
        from_email: form.email,
        to_email: 'peytonbischof@outlook.com',
        message: form.message,
      },
      'IifBaWQa8K6He1WRc'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you! I will get back to you as soon as possible.');
      setForm({
        name: '',
        email: '',
        message: '',
      })
    }, (error) => {
      setLoading(false)
      console.log(error);
      alert('Something went wrong. Please try again.');
    })
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div variants={slideIn('up', "tween", 0.2, 1)}
        className="flex-[1] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Let's work together!</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Email Address</span>
            <input type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Message</span>
            <textarea rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          <button type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-md">
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");