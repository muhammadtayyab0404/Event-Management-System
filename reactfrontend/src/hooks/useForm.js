import { useRef, useReducer } from "react";
import {
  pakistanToday,
  validateField,
  validateDocuments,
  applicationBody,
} from "../utils/validation.js";
export function useForm(kind, fields, required) {
  const [, render] = useReducer((n) => n + 1, 0);
  const ref = useRef(null);
  if (!ref.current)
    ref.current = {
      values: Object.fromEntries([
        ...fields.map((f) => [f, ""]),
        ["consent", false],
      ]),
      errors: {},
      files: [],
      status: "",
      mailto: "",
      linkLabel: "",
      today: pakistanToday(),
    };
  const state = ref.current;
  const check = (name) => {
    const message = validateField(name, state.values[name], {
      required: required.includes(name),
      values: state.values,
    });
    if (message) state.errors[name] = message;
    else delete state.errors[name];
    return !message;
  };
  return {
    ...state,
    check(name) {
      check(name);
      render();
    },
    set(name, value) {
      state.values = { ...state.values, [name]: value };
      if (state.errors[name]) check(name);
      if (name === "date" || name === "time")
        for (const k of ["date", "time"]) if (state.errors[k]) check(k);
      state.status = "";
      state.mailto = "";
      render();
    },
    setFiles(e) {
      state.files = Array.from(e.target.files || []);
      const error = validateDocuments(state.files);
      if (error) state.errors.documents = error;
      else delete state.errors.documents;
      state.status = "";
      state.mailto = "";
      render();
    },
    submit(e) {
      state.mailto = "";
      fields.forEach(check);
      if (!state.values.consent)
        state.errors.consent =
          "Please agree to be contacted about this request.";
      else delete state.errors.consent;
      const error = validateDocuments(state.files);
      if (error) state.errors.documents = error;
      else delete state.errors.documents;
      if (Object.keys(state.errors).length) {
        state.status = "Please correct the highlighted fields.";
        const first = Object.keys(state.errors)[0];
        e.currentTarget.elements.namedItem(first)?.focus();
        render();
        return;
      }
      const vendor = kind === "Vendor registration";
      state.status = vendor
        ? "Application prepared, not yet sent. Review and send it in your email app. Bank details and documents are not included."
        : "Your request is ready. Open your email app, review it and send it.";
      state.linkLabel = vendor
        ? "Review and send application"
        : "Open email app";
      state.mailto = `mailto:rhnexusevents@gmail.com?subject=${encodeURIComponent(vendor ? "Vendor registration application" : kind)}&body=${encodeURIComponent(applicationBody(kind, state.values))}`;
      render();
    },
  };
}
