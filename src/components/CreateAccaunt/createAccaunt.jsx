import React, { useRef, useState } from "react";
import styles from "../CreateAccaunt/createAccaunt.module.css";

function CreateAccaunt() {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const biographyRef = useRef();

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fullName: fullNameRef.current.value,
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      biography: biographyRef.current.value,
    };

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      const isExist = JSON.parse(localStorage.getItem("userAccounts")) || [];
      const userData = [...isExist, formData];
      localStorage.setItem("userAccounts", JSON.stringify(userData));
      console.log(formData);
      alert("Account created successfully!");
    } else {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementsByName(firstErrorField)[0].focus();
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.biography) errors.biography = "Biography is required";
    return errors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (!value) {
        newErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required`;
      } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email address is invalid";
      } else {
        delete newErrors[name];
      }

      return newErrors;
    });
  };

  return (
    <div className={styles.container}>
      <form id="form" onSubmit={handleSubmit}>
        <h1>Create An Account</h1>
        <p>Kindly fill the following details to create your account</p>
        <input
          type="text"
          placeholder="Enter your full name"
          name="fullName"
          ref={fullNameRef}
          onBlur={handleBlur}
          className={errors.fullName ? styles.errorInput : ""}
        />
        {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
        <input
          type="text"
          placeholder="Enter your email address"
          name="email"
          ref={emailRef}
          onBlur={handleBlur}
          className={errors.email ? styles.errorInput : ""}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          ref={usernameRef}
          onBlur={handleBlur}
          className={errors.username ? styles.errorInput : ""}
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          ref={passwordRef}
          onBlur={handleBlur}
          className={errors.password ? styles.errorInput : ""}
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <textarea
          placeholder="Your Biography"
          name="biography"
          ref={biographyRef}
          onBlur={handleBlur}
          className={errors.biography ? styles.errorInput : ""}
        ></textarea>
        {errors.biography && <p className={styles.error}>{errors.biography}</p>}
        <button type="submit">CREATE ACCOUNT</button>
        <p className={styles.footerText}>
          You will receive an email after setting up your account
        </p>
      </form>
    </div>
  );
}

export default CreateAccaunt;
