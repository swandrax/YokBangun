"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useId, type FormEvent } from "react";
import { submitPartnership } from "@/features/contact/api";
import {
  validatePartnership,
  type PartnershipInput,
  type FieldErrors,
} from "@/features/contact/schema";
import { buttonClass } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import styles from "./PartnershipForm.module.css";

type Props = {
  locale: Locale;
  copy: Messages["partnership"]["form"];
  validationCopy: Messages["validation"];
  partnershipTypes: { key: string; title: string }[];
};

export function PartnershipForm({ copy, validationCopy, partnershipTypes }: Props) {
  const formId = useId();

  const [values, setValues] = useState<PartnershipInput>({
    name: "",
    organisation: "",
    email: "",
    type: "",
    message: "",
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<FieldErrors<PartnershipInput>>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: submitPartnership,
    onSuccess: () => {
      setSubmitted(true);
      setErrors({});
    },
  });

  function handleChange(field: keyof PartnershipInput, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validatePartnership(values);
    if (!result.ok) {
      setErrors(result.errors);
      const firstErrorField = Object.keys(result.errors)[0];
      if (firstErrorField) {
        document.getElementById(`${formId}-${firstErrorField}`)?.focus();
      }
      return;
    }

    setErrors({});
    mutation.mutate(result.data);
  }

  if (submitted) {
    return (
      <div className={styles.successCard} role="status" aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true">✓</div>
        <h3 className={styles.successTitle}>{copy.success}</h3>
        <button
          type="button"
          className={buttonClass("secondary", "md", styles.resetBtn)}
          onClick={() => {
            setSubmitted(false);
            setValues({
              name: "",
              organisation: "",
              email: "",
              type: "",
              message: "",
              website: "",
            });
          }}
        >
          {copy.submit} lagi
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      <h3 className={styles.formTitle}>{copy.title}</h3>

      {mutation.isError && (
        <div className={styles.errorAlert} role="alert">
          {copy.error}
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-name`} className={styles.label}>
            {copy.name} <span className={styles.req}>*</span>
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            className={errors.name ? styles.inputError : styles.input}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
          />
          {errors.name && (
            <p id={`${formId}-name-err`} className={styles.errorText}>
              {validationCopy[errors.name]}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-organisation`} className={styles.label}>
            {copy.organisation} <span className={styles.req}>*</span>
          </label>
          <input
            id={`${formId}-organisation`}
            type="text"
            className={errors.organisation ? styles.inputError : styles.input}
            value={values.organisation}
            onChange={(e) => handleChange("organisation", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={
              errors.organisation ? `${formId}-org-err` : undefined
            }
          />
          {errors.organisation && (
            <p id={`${formId}-org-err`} className={styles.errorText}>
              {validationCopy[errors.organisation]}
            </p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-email`} className={styles.label}>
            {copy.email} <span className={styles.req}>*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            className={errors.email ? styles.inputError : styles.input}
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
          />
          {errors.email && (
            <p id={`${formId}-email-err`} className={styles.errorText}>
              {validationCopy[errors.email]}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-type`} className={styles.label}>
            {copy.type} <span className={styles.req}>*</span>
          </label>
          <select
            id={`${formId}-type`}
            className={errors.type ? styles.inputError : styles.select}
            value={values.type}
            onChange={(e) => handleChange("type", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.type)}
            aria-describedby={errors.type ? `${formId}-type-err` : undefined}
          >
            <option value="">{copy.typePlaceholder}</option>
            {partnershipTypes.map((pt) => (
              <option key={pt.key} value={pt.key}>
                {pt.title}
              </option>
            ))}
          </select>
          {errors.type && (
            <p id={`${formId}-type-err`} className={styles.errorText}>
              {validationCopy[errors.type]}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${formId}-message`} className={styles.label}>
          {copy.message} <span className={styles.req}>*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          rows={4}
          placeholder={copy.messagePlaceholder}
          className={errors.message ? styles.inputError : styles.textarea}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${formId}-msg-err` : undefined
          }
        />
        {errors.message && (
          <p id={`${formId}-msg-err`} className={styles.errorText}>
            {validationCopy[errors.message]}
          </p>
        )}
      </div>

      <div className={styles.footerRow}>
        <button
          type="submit"
          disabled={mutation.isPending}
          className={buttonClass("primary", "lg", styles.submitBtn)}
        >
          {mutation.isPending ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}
