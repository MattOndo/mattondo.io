import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form"
import { Input, Textarea, Button } from "@nextui-org/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-hook";
import { v4 as uuidv4 } from 'uuid';
import { IoIosSend } from "react-icons/io";
import { Spinner } from "@nextui-org/react";
import styles from './style.module.css';

const sitekey = '6LeqxxYoAAAAAFmuLUip3REZegnoOo8RVMoKYO2M';
const inputClasses = {
  label: "text-black font-mono text-sm",
  input: [
    "bg-transparent",
    "text-lighter-grey",
    "placeholder:text-lighter-gray/60",
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "bg-lighter-gray",
    "hover:bg-light-gray/50",
    "group-data-[focused=true]:bg-light-gray",
  ],
};

export default function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm()
  const {
    executeGoogleReCaptcha,
    hideGoogleReCaptcha,
    showGoogleReCaptcha,
  } = useGoogleReCaptcha(
    sitekey, // your site key
    {
      hide: true, // optional, true if you want to hide recaptcha-badge beforehand
    },
  );


  const onSubmit = async () => {
    if (errors.length > 0) {
      return;
    }
    const token = await executeGoogleReCaptcha('submit');
    const formData = getValues();
    const data = {
      ...formData,
      gtoken: token,
    }

    // Send Alert
    const res = await fetch("/api/contact", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    // Handle Error
    const { error } = await res.json();
    if (error) {
      setSubmitSuccess(false);
      console.error('error', error)

      // Track Event
      analytics.track("Contact Form Submit",{
        "Result": "Fail"
      });
      return;
    } else {
      // Handle Success
      // Identify
      const uuid = uuidv4();
      analytics.identify(uuid, {
        "name": data.name,
        "email": data.email,
      });

      // Track Event
      analytics.track("Contact Form Submit",{
        "Result": "Success"
      });
      setSubmitSuccess(true);    
    }
  }
  
  return (
    <>
      {!submitSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl m-auto bg-slate px-8 py-10 rounded-xl grid gap-4">
          
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input 
              type="text" 
              label="Name"
              {...register("name", { required: true })}
              variant='flat'
              size="lg"
              classNames={inputClasses}
              {...errors.name && ({errorMessage: 'Please enter your name'})}
            />
          </div>
          
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input 
              type="email" 
              label="Email" 
              {...register("email", { required: true, pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ })}
              variant='flat'
              size="lg"
              classNames={inputClasses}
              {...errors.email && ({errorMessage: 'Please enter a valid email'})}
            />
          </div>
          
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input 
              type="text" 
              label="Subject" 
              {...register("subject", { required: true })}
              variant='flat'
              size="lg"
              classNames={inputClasses}
              {...errors.subject && ({errorMessage: 'Please enter a subject'})}
            />
          </div>
          
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Textarea 
              label="Message" 
              {...register("message", { required: true })}
              variant='flat'
              size="lg"
              classNames={inputClasses}
              {...errors.message && ({errorMessage: 'Please enter a message'})}
            />
          </div>
          
          <div className="flex w-full flex-wrap md:flex-nowrap justify-center gap-4">
            <div>
              <Button
                type="submit"
                size="lg" 
                disabled={isSubmitting || errors.length > 0}
                className={styles.submitButton}
                endContent={isSubmitting ? (<Spinner size="sm" color="default" classNames={{
                  circle1: styles.spinnerCircle1,
                  circle2: styles.spinnerCircle2,
                }} />) : (<IoIosSend className="text-lg" />)}
                >
                {isSubmitting ? 'Sending' : 'Send'}
              </Button>
            </div>
            {submitSuccess === false && (
            <div>
              <p className="text-lighter-grey text-sm font-mono m-0">
              <span className="text-teal font-semibold">Oops!</span> Something went wrong, please try again. If this continues, please feel free to email me directly at <a href="mailto:yours.truly@mattondo.com">yours.truly@mattondo.com</a>.
              </p>
            </div>
            )}
          </div>
          <p className="text-lighter-gray text-xs m-0 text-center">
            This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="text-lighter-gray font-sans underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="text-lighter-gray font-sans underline">Terms of Service</a> apply.
          </p>
        </form>
        // </GoogleReCaptchaProvider>
      )}
      {submitSuccess && (
        <div className="w-full max-w-xl m-auto bg-slate p-8 rounded-xl grid gap-4">
          <p className="text-lighter-grey text-sm font-mono">
          <span className="text-teal font-semibold">Thank you!</span> Your message has been sent.
          </p>
        </div>
      )}
    </>
  );
}
