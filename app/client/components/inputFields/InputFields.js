import React from "react"

export const textInput = ({input, label, className, type, placeholder, meta: { touched, error, warning } }) => (
  <div>
    <label><strong>{label}</strong></label>
    <div>
      <input {...input} class={className} placeholder={placeholder} type={type} />
      {touched &&(error && <span class="field-validation-error">{error}</span>)}
    </div>
  </div>
);
