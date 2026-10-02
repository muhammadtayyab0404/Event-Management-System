import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cx } from "../utils/cx.js";
import { useForm } from "../hooks/useForm.js";
export default function VendorView({ home = false }) {
  const vendor = useForm(
    "Vendor registration",
    [
      "company",
      "category",
      "contact_name",
      "phone",
      "email",
      "registration",
      "bank",
      "account_title",
      "account_number",
      "iban",
      "additional_info",
    ],
    ["company", "category", "contact_name", "phone", "email"],
  );

  return (
    <>
      <main id="main">
        <section className={["page-intro"].filter(Boolean).join(" ")}>
          <p className={["eyebrow"].filter(Boolean).join(" ")}>
            {"WORK WITH RH NEXUS"}
          </p>
          <h1>
            {"Bring your expertise"}
            <br />
            {"to our next event."}
          </h1>
          <p>{"Register your interest in joining our vendor network."}</p>
        </section>
        <section
          className={["section vendor-layout"].filter(Boolean).join(" ")}
        >
          <aside>
            <h2>
              {"Better events,"}
              <br />
              {"together."}
            </h2>
            <p>
              {
                "We welcome photographers, venues, caterers, decorators and event professionals."
              }
            </p>
            <a href="mailto:rhnexusevents@gmail.com">
              {"rhnexusevents@gmail.com"}
            </a>
          </aside>
          <form
            data-kind="Vendor registration"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              vendor.submit(e);
            }}
            className={["vendor-form vendor-cards"].filter(Boolean).join(" ")}
          >
            <fieldset>
              <legend>{"Company details"}</legend>
              <p className={["fieldset-note"].filter(Boolean).join(" ")}>
                {"Introduce your business and the services you offer."}
              </p>
              <div className={["form-grid"].filter(Boolean).join(" ")}>
                <label>
                  {"Company name *"}
                  <input
                    onBlur={(e) => {
                      vendor.check("company");
                    }}
                    aria-invalid={Boolean(vendor.errors.company)}
                    aria-describedby={
                      vendor.errors.company ? "vendor-company-error" : undefined
                    }
                    name="company"
                    type="text"
                    required
                    maxLength="200"
                    value={vendor.values.company}
                    onChange={(e) => vendor.set("company", e.target.value)}
                  />
                  {vendor.errors.company ? (
                    <span
                      id="vendor-company-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.company}
                    </span>
                  ) : null}
                </label>
                <label>
                  {"Category *"}
                  <select
                    onBlur={(e) => {
                      vendor.check("category");
                    }}
                    aria-invalid={Boolean(vendor.errors.category)}
                    aria-describedby={
                      vendor.errors.category
                        ? "vendor-category-error"
                        : undefined
                    }
                    name="category"
                    required
                    value={vendor.values.category}
                    onChange={(e) => vendor.set("category", e.target.value)}
                  >
                    <option value="">{"Select an option"}</option>
                    <option>{"Photography"}</option>
                    <option>{"Restaurant"}</option>
                    <option>{"Marriage hall"}</option>
                    <option>{"Caterer"}</option>
                    <option>{"Decor"}</option>
                    <option>{"Other"}</option>
                  </select>
                  {vendor.errors.category ? (
                    <span
                      id="vendor-category-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.category}
                    </span>
                  ) : null}
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>{"Contact details"}</legend>
              <p className={["fieldset-note"].filter(Boolean).join(" ")}>
                {"Who should our team speak with?"}
              </p>
              <div className={["form-grid"].filter(Boolean).join(" ")}>
                <label>
                  {"Contact name *"}
                  <input
                    onBlur={(e) => {
                      vendor.check("contact_name");
                    }}
                    aria-invalid={Boolean(vendor.errors.contact_name)}
                    aria-describedby={
                      vendor.errors.contact_name
                        ? "vendor-contact_name-error"
                        : undefined
                    }
                    name="contact_name"
                    type="text"
                    required
                    maxLength="200"
                    value={vendor.values.contact_name}
                    onChange={(e) => vendor.set("contact_name", e.target.value)}
                  />
                  {vendor.errors.contact_name ? (
                    <span
                      id="vendor-contact_name-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.contact_name}
                    </span>
                  ) : null}
                </label>
                <label>
                  {"Phone *"}
                  <input
                    onBlur={(e) => {
                      vendor.check("phone");
                    }}
                    aria-invalid={Boolean(vendor.errors.phone)}
                    aria-describedby={
                      vendor.errors.phone ? "vendor-phone-error" : undefined
                    }
                    name="phone"
                    type="tel"
                    required
                    maxLength="200"
                    value={vendor.values.phone}
                    onChange={(e) => vendor.set("phone", e.target.value)}
                  />
                  {vendor.errors.phone ? (
                    <span
                      id="vendor-phone-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.phone}
                    </span>
                  ) : null}
                </label>
                <label>
                  {"Email *"}
                  <input
                    onBlur={(e) => {
                      vendor.check("email");
                    }}
                    aria-invalid={Boolean(vendor.errors.email)}
                    aria-describedby={
                      vendor.errors.email ? "vendor-email-error" : undefined
                    }
                    name="email"
                    type="email"
                    required
                    maxLength="200"
                    value={vendor.values.email}
                    onChange={(e) => vendor.set("email", e.target.value)}
                  />
                  {vendor.errors.email ? (
                    <span
                      id="vendor-email-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.email}
                    </span>
                  ) : null}
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>{"Documentation"}</legend>
              <p className={["fieldset-note"].filter(Boolean).join(" ")}>
                {"Add supporting information for your vendor profile."}
              </p>
              <div className={["form-grid"].filter(Boolean).join(" ")}>
                <label>
                  {"Registration / NTN number"}
                  <input
                    onBlur={(e) => {
                      vendor.check("registration");
                    }}
                    aria-invalid={Boolean(vendor.errors.registration)}
                    aria-describedby={
                      vendor.errors.registration
                        ? "vendor-registration-error"
                        : undefined
                    }
                    name="registration"
                    type="text"
                    maxLength="200"
                    value={vendor.values.registration}
                    onChange={(e) => vendor.set("registration", e.target.value)}
                  />
                  {vendor.errors.registration ? (
                    <span
                      id="vendor-registration-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.registration}
                    </span>
                  ) : null}
                </label>
                <label className={["full"].filter(Boolean).join(" ")}>
                  {"Company documents (PDF, JPG or PNG, up to 10 MB each)"}
                  <input
                    onChange={(e) => {
                      vendor.setFiles($event);
                    }}
                    aria-invalid={Boolean(vendor.errors.documents)}
                    aria-describedby="vendor-documents-error"
                    type="file"
                    name="documents"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {vendor.errors.documents ? (
                    <span
                      id="vendor-documents-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.documents}
                    </span>
                  ) : null}
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>{"Bank details"}</legend>
              <p className={["fieldset-note"].filter(Boolean).join(" ")}>
                {"Optional payment details for your registration."}
              </p>
              <div className={["form-grid"].filter(Boolean).join(" ")}>
                <label>
                  {"Bank name"}
                  <input
                    onBlur={(e) => {
                      vendor.check("bank");
                    }}
                    aria-invalid={Boolean(vendor.errors.bank)}
                    aria-describedby={
                      vendor.errors.bank ? "vendor-bank-error" : undefined
                    }
                    name="bank"
                    type="text"
                    maxLength="200"
                    value={vendor.values.bank}
                    onChange={(e) => vendor.set("bank", e.target.value)}
                  />
                  {vendor.errors.bank ? (
                    <span
                      id="vendor-bank-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.bank}
                    </span>
                  ) : null}
                </label>
                <label>
                  {"Account title"}
                  <input
                    onBlur={(e) => {
                      vendor.check("account_title");
                    }}
                    aria-invalid={Boolean(vendor.errors.account_title)}
                    aria-describedby={
                      vendor.errors.account_title
                        ? "vendor-account_title-error"
                        : undefined
                    }
                    name="account_title"
                    type="text"
                    maxLength="200"
                    value={vendor.values.account_title}
                    onChange={(e) =>
                      vendor.set("account_title", e.target.value)
                    }
                  />
                  {vendor.errors.account_title ? (
                    <span
                      id="vendor-account_title-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.account_title}
                    </span>
                  ) : null}
                </label>
                <label>
                  {"Account number"}
                  <input
                    onBlur={(e) => {
                      vendor.check("account_number");
                    }}
                    aria-invalid={Boolean(vendor.errors.account_number)}
                    aria-describedby={
                      vendor.errors.account_number
                        ? "vendor-account_number-error"
                        : undefined
                    }
                    name="account_number"
                    type="text"
                    maxLength="200"
                    value={vendor.values.account_number}
                    onChange={(e) =>
                      vendor.set("account_number", e.target.value)
                    }
                  />
                  {vendor.errors.account_number ? (
                    <span
                      id="vendor-account_number-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.account_number}
                    </span>
                  ) : null}
                </label>
                <label>
                  {"IBAN"}
                  <input
                    onBlur={(e) => {
                      vendor.check("iban");
                    }}
                    aria-invalid={Boolean(vendor.errors.iban)}
                    aria-describedby={
                      vendor.errors.iban ? "vendor-iban-error" : undefined
                    }
                    name="iban"
                    type="text"
                    maxLength="200"
                    value={vendor.values.iban}
                    onChange={(e) => vendor.set("iban", e.target.value)}
                  />
                  {vendor.errors.iban ? (
                    <span
                      id="vendor-iban-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.iban}
                    </span>
                  ) : null}
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>{"Additional information"}</legend>
              <div className={["form-grid"].filter(Boolean).join(" ")}>
                <label className={["full"].filter(Boolean).join(" ")}>
                  {"Tell us about your services"}
                  <textarea
                    onBlur={(e) => {
                      vendor.check("additional_info");
                    }}
                    aria-invalid={Boolean(vendor.errors.additional_info)}
                    aria-describedby={
                      vendor.errors.additional_info
                        ? "vendor-additional_info-error"
                        : undefined
                    }
                    name="additional_info"
                    rows="4"
                    maxLength="3000"
                    value={vendor.values.additional_info}
                    onChange={(e) =>
                      vendor.set("additional_info", e.target.value)
                    }
                  ></textarea>
                  {vendor.errors.additional_info ? (
                    <span
                      id="vendor-additional_info-error"
                      className={["field-error"].filter(Boolean).join(" ")}
                    >
                      {vendor.errors.additional_info}
                    </span>
                  ) : null}
                </label>
              </div>
            </fieldset>
            <p className={["notice"].filter(Boolean).join(" ")}>
              {
                "Apply registration prepares an email application for you to review and send. Bank details and documents stay on your device; our team can arrange their secure collection separately."
              }
            </p>
            <label className={["check full"].filter(Boolean).join(" ")}>
              <input
                type="checkbox"
                required
                aria-invalid={Boolean(vendor.errors.consent)}
                checked={vendor.values.consent}
                onChange={(e) => vendor.set("consent", e.target.checked)}
              />
              {" I agree to be contacted about this request."}
            </label>
            {vendor.errors.consent ? (
              <span className={["field-error full"].filter(Boolean).join(" ")}>
                {vendor.errors.consent}
              </span>
            ) : null}
            <button type="submit" className={["btn"].filter(Boolean).join(" ")}>
              {"Apply registration"}
            </button>
            <p
              role="status"
              className={["form-status full"].filter(Boolean).join(" ")}
            >
              {vendor.status}{" "}
              {vendor.mailto ? (
                <a href={vendor.mailto}>{vendor.linkLabel}</a>
              ) : null}
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
