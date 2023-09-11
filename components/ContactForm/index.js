import React, { useState, useEffect, useRef } from "react";
import styles from './style.module.css';
import className from 'classnames/bind';
import Head from 'next/head'
import Script from 'next/script'
import { generateUUID } from '../../utils';
const cx = className.bind();

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false); // Track reCAPTCHA readiness


  //   Form validation
  const [errors, setErrors] = useState({});

  //   Setting button text
  const [buttonText, setButtonText] = useState("Send");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  useEffect(() => {
    // Load reCAPTCHA script directly from Google
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      // Initialize reCAPTCHA with your site key
      window.grecaptcha.ready(() => {
        // Set reCAPTCHA readiness state
        setIsRecaptchaReady(true);
        console.log('reCAPTCHA is ready');
      });
    });

    document.head.appendChild(script);
  }, []);


  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   const [form, setForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if reCAPTCHA is available and ready
    if (isRecaptchaReady && typeof window.grecaptcha !== 'undefined') {
      // Get reCAPTCHA token
      const recaptchaResponse = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'submit_form' }
      );


      // Set the token in the state
      setRecaptchaToken(recaptchaResponse);

      let isValidForm = handleValidation();

      if (isValidForm) {
        setButtonText("Sending");

        // Send Alert
        const res = await fetch("/api/sendgrid-alert", {
          body: JSON.stringify({
            email: email,
            fullname: fullname,
            subject: subject,
            message: message,
            recaptchaToken: recaptchaToken
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        // Handle Errors
        const { error } = await res.json();
        if (error) {
          console.log(error);
          setShowSuccessMessage(false);
          setShowFailureMessage(true);
          setButtonText("Send");

          // Reset form fields
          setFullname("");
          setEmail("");
          setMessage("");
          setSubject("");

          // Track Event
          analytics.trackForm("Contact",{
            "Result": "Fail",
            "To": "yours.truly@mattondo.com",
            "From": email
          });
          return;
        }

        // Handle Success


        // Identify
        const uuid = generateUUID(email);
        analytics.identify(uuid, {
          "name": fullname,
          "email": email,
        });

        // Track Event
        analytics.trackForm("Contact",{
          "Result": "Success",
          "To": "yours.truly@mattondo.com",
          "From": email
        });
        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setButtonText("Send");
        // Reset form fields
        setFullname("");
        setEmail("");
        setMessage("");
        setSubject("");
      }
    } else {
      console.error('reCAPTCHA is not available or not ready.');
    }
  };
  return (
    <>
      <Head>
        <Script src="https://www.google.com/recaptcha/api.js" async defer></Script>
      </Head>
      <main className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="rounded-xl flex flex-col px-8 py-8 gap-6 bg-black"
        >
          <div className={styles.fieldGroup}>
            <label
              htmlFor="fullname"
              className="text-lighter-gray font-mono"
            >
              Full name<sup className="opacity-50">*</sup>
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              name="fullname"
              className={styles.inputField}
            />
            {errors?.fullname && (
              <p className={styles.errorMsg}>Full Name cannot be empty.</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label
              htmlFor="email"
              className="text-lighter-gray font-mono"
            >
              E-mail<sup className="opacity-50">*</sup>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={styles.inputField}
            />
            {errors?.email && (
              <p className={styles.errorMsg}>Email cannot be empty.</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label
              htmlFor="subject"
              className="text-lighter-gray font-mono"
            >
              Subject<sup className="opacity-50">*</sup>
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className={styles.inputField}
            />
            {errors?.subject && (
              <p className={styles.errorMsg}>Subject cannot be empty.</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label
              htmlFor="message"
              className="text-lighter-gray font-mono"
            >
              Message<sup className="opacity-50">*</sup>
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className={cx([styles.inputField, styles.longText])}
            ></textarea>
            {errors?.message && (
              <p className={styles.errorMsg}>Message body cannot be empty.</p>
            )}
          </div>

          <div className="flex flex-row items-flex-end justify-between">
            <div>
              <div className="text-left">
                {showSuccessMessage && (
                  <p className="text-teal text-sm font-mono">
                    Thank you! Your Message has been delivered.
                  </p>
                )}
                {showFailureMessage && (
                  <p className="text-teal text-sm font-mono">
                    Oops! Something went wrong, please try again. If this continues, please feel free to email me directly at <a href="mailto:yours.truly@mattondo.com">yours.truly@mattondo.com</a>.
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              {buttonText}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-cyan-500 ml-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </form>
      </main>
    </>
  );
}