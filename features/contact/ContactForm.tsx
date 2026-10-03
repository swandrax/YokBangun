"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, useId, type FormEvent } from "react";
import { submitContact } from "./api";
import {
  validateContact,
  type ContactInput,
  type FieldErrors,
} from "./schema";
import { buttonClass } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import styles from "./ContactForm.module.css";

type Props = {
  locale: Locale;
  copy: Messages["contact"]["form"];
  validationCopy: Messages["validation"];
  sectors: { key: string; name: string }[];
};

export function ContactForm({ copy, validationCopy, sectors }: Props) {
  const formId = useId();

  const [values, setValues] = useState<ContactInput>({
    name: "",
    organisation: "",
    email: "",
    whatsapp: "",
    sector: "",
    need: "",
    stage: "exploring",
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<FieldErrors<ContactInput>>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setSubmitted(true);
      setErrors({});
    },
  });

  function handleChange(
    field: keyof ContactInput,
    value: string
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validateContact(values);
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
              whatsapp: "",
              sector: "",
              need: "",
              stage: "exploring",
              website: "",
            });
          }}
        >
          {copy.submit} lagi
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field for bot protection */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website (leave blank)</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      {hasErrors && (
        <div className={styles.errorSummary} role="alert">
          {copy.errorSummary}
        </div>
      )}

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
          <label htmlFor={`${formId}-whatsapp`} className={styles.label}>
            {copy.whatsapp}{" "}
            <span className={styles.optional}>({copy.whatsappHint ? "WhatsApp" : "opsional"})</span>
          </label>
          <input
            id={`${formId}-whatsapp`}
            type="tel"
            placeholder={copy.whatsappHint}
            className={errors.whatsapp ? styles.inputError : styles.input}
            value={values.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={
              errors.whatsapp ? `${formId}-wa-err` : undefined
            }
          />
          {errors.whatsapp && (
            <p id={`${formId}-wa-err`} className={styles.errorText}>
              {validationCopy[errors.whatsapp]}
            </p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-sector`} className={styles.label}>
            {copy.sector} <span className={styles.req}>*</span>
          </label>
          <select
            id={`${formId}-sector`}
            className={errors.sector ? styles.inputError : styles.select}
            value={values.sector}
            onChange={(e) => handleChange("sector", e.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors.sector)}
            aria-describedby={
              errors.sector ? `${formId}-sector-err` : undefined
            }
          >
            <option value="">{copy.sectorPlaceholder}</option>
            {sectors.map((s) => (
              <option key={s.key} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Lainnya">{copy.sectorOther}</option>
          </select>
          {errors.sector && (
            <p id={`${formId}-sector-err`} className={styles.errorText}>
              {validationCopy[errors.sector]}
            </p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>
          {copy.stage} <span className={styles.req}>*</span>
        </span>
        <div
          role="radiogroup"
          aria-label={copy.stage}
          className={styles.stageGrid}
        >
          {copy.stages.map((st) => {
            const isSelected = values.stage === st.value;
            return (
              <label
                key={st.value}
                className={isSelected ? styles.stageLabelSelected : styles.stageLabel}
              >
                <input
                  type="radio"
                  name="stage"
                  value={st.value}
                  checked={isSelected}
                  onChange={(e) => handleChange("stage", e.target.value)}
                  className={styles.radioInput}
                />
                <span>{st.label}</span>
              </label>
            );
          })}
        </div>
        {errors.stage && (
          <p className={styles.errorText}>{validationCopy[errors.stage]}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor={`${formId}-need`} className={styles.label}>
          {copy.need} <span className={styles.req}>*</span>
        </label>
        <textarea
          id={`${formId}-need`}
          rows={4}
          placeholder={copy.needPlaceholder}
          className={errors.need ? styles.inputError : styles.textarea}
          value={values.need}
          onChange={(e) => handleChange("need", e.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.need)}
          aria-describedby={errors.need ? `${formId}-need-err` : undefined}
        />
        {errors.need && (
          <p id={`${formId}-need-err`} className={styles.errorText}>
            {validationCopy[errors.need]}
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
        <p className={styles.privacy}>{copy.privacy}</p>
      </div>
    </form>
  );
}
