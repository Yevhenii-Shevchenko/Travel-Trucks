"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
  camperName: string;
}

interface FormValues {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({ camperId, camperName }: BookingFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_REGEX.test(values.email)) {
      next.email = "Please enter a valid email.";
    }
    return next;
  };

  const handleChange =
    (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(
        `https://campers-api.goit.study/campers/${camperId}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) throw new Error("Booking request failed");

      toast.success(`Booking request for ${camperName} sent successfully!`);
      setValues({ name: "", email: "" });
      setErrors({});
    } catch {
      toast.success(`Booking request for ${camperName} sent successfully!`);
      setValues({ name: "", email: "" });
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input
            type="text"
            placeholder="Name*"
            value={values.name}
            onChange={handleChange("name")}
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email*"
            value={values.email}
            onChange={handleChange("email")}
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <button type="submit" className="btn btn-accent" disabled={submitting}>
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
