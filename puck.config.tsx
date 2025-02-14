import React from "react";
import type { Config } from "@measured/puck";

// Props type
type Props = {
  HeadingBlock: { title: string };
  FormBlock: {
    fields: {
      label: string;
      type: string;
      placeholder?: string;
      options?: { value: string; label: string }[];
    }[];
  };
};

// config object for Puck
export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <h1>{title}</h1>
        </div>
      ),
    },
    FormBlock: {
      fields: {
        fields: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            type: {
              type: "select",
              options: [
                { value: "text", label: "Text" },
                { value: "email", label: "Email" },
                { value: "textarea", label: "Textarea" },
                { value: "radio", label: "Radio" },
                { value: "select", label: "Select" },
              ],
            },
            placeholder: { type: "text" },
            options: {
              type: "array",
              arrayFields: {
                value: { type: "text" },
                label: { type: "text" },
              },
            },
          },
        },
      },
      defaultProps: {
        fields: [
          {
            label: "Name",
            type: "text",
            placeholder: "Enter your name",
          },
          {
            label: "Gender",
            type: "radio",
            options: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ],
          },
          {
            label: "Country",
            type: "select",
            placeholder: "Select your country",
            options: [
              { value: "India", label: "India" },
              { value: "USA", label: "USA" },
              { value: "Canada", label: "Canada" },
              { value: "UK", label: "UK" },
              { value: "Australia", label: "Australia" },
            ],
          },
        ],
      },

      render: ({ fields }) => {
        return (
          <form>
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: 20 }}>
                <label>{field.label}</label>

                {/* Render different input types based on the field type */}
                {field.type === "radio" && field.options && (
                  <div>
                    {field.options.map((option, i) => (
                      <label key={i} style={{ marginRight: 10 }}>
                        <input
                          type="radio"
                          name={field.label}
                          value={option.value}
                        />{" "}
                        {option.label}
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "select" && field.options && (
                  <select style={{ width: "100%", padding: 8, marginTop: 8 }}>
                    {/* Add a placeholder option */}
                    {field.placeholder && (
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                    )}
                    {field.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type !== "radio" && field.type !== "select" && (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{ width: "100%", padding: 8, marginTop: 8 }}
                  />
                )}
              </div>
            ))}
            {/* Submit button */}
            <div style={{ marginTop: 20 }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        );
      },
    },
  },
};

export default config;
