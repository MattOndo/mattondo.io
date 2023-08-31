import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import { getNextStaticProps } from "@faustwp/core";
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Hero,
  Footer,
  SEO
} from "../components";

export default function Page(props) {
  const { data } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  const { title: siteTitle, description: siteDescription } = props.data.generalSettings;
  const menuItems = props.data.primaryMenuItems.nodes;
  const { title, content } = props.data.page;
  const heroContent = props.data.page.pageHeader;


  // States for contact form fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //   Form validation state
  const [errors, setErrors] = useState({});

  //   Setting button text on form submission
  const [buttonText, setButtonText] = useState("Send");

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // Validation check method
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

  //   Handling form submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
    }
    console.log(fullname, email, subject, message);
  };

  return (
    <>
      <SEO
        title="Contact Matt"
        description={siteDescription}
        robots="noindex,nofollow"
      />

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <Hero 
        headline={heroContent.headline || title}
        subheadline={heroContent.subheadline}
        layout={heroContent.layout}
        image={heroContent.image}
      />

      <main className="container-fluid">
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}

Page.variables = () => {
  return {
    databaseId: 199
  };
};

Page.query = gql`
  ${Header.fragments.entry}
  ${Hero.fragments.entry}
  ${BlogInfoFragment}
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      editorBlocks(flat: true) {
        __typename
        key: clientId
        parentId: parentClientId
        renderedHtml
      }
      author {
        node {
          name
        }
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    ...HeaderFragment
    ...HeroFragment
  }
`;

export function getStaticProps(ctx) {
  return getNextStaticProps(ctx, {
    Page,
    props: {},
  });
}
