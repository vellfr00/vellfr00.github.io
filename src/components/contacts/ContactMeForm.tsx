import { Email, InfoOutlined, Message, Person, Send } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, Input, Stack, Textarea } from "@mui/joy";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactMeFormToFormBold } from "../../integration/formbold.integration";

function ContactMeForm() {
  const NAME_INPUT = "name";
  const EMAIL_INPUT = "email";
  const MESSAGE_INPUT = "message";
  interface ContactMeFormType {
    [NAME_INPUT]: string;
    [EMAIL_INPUT]: string;
    [MESSAGE_INPUT]: string;
  }
  interface ContactMeFormErrorType {
    [NAME_INPUT]?: string,
    [EMAIL_INPUT]?: string,
    [MESSAGE_INPUT]?: string,
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [formBoldSubmissionState, setFormBoldSubmissionState] = useState<boolean | undefined>(undefined);

  const { t } = useTranslation("pages/Contacts");

  const validate = (values: ContactMeFormType): ContactMeFormErrorType => {
    const errors: ContactMeFormErrorType = {}
    
    if(!values[NAME_INPUT]) {
      errors[NAME_INPUT] = t("_contact_me_form.name.REQUIRED");
    }

    if(!values[EMAIL_INPUT]) {
      errors[EMAIL_INPUT] = t("_contact_me_form.email.REQUIRED");
    } else if(!EMAIL_REGEX.test(values[EMAIL_INPUT])) {
      errors[EMAIL_INPUT] = t("_contact_me_form.email.INVALID");
    }

    if(!values[MESSAGE_INPUT]) {
      errors[MESSAGE_INPUT] = t("_contact_me_form.message.REQUIRED");
    }

    return errors;
  };

  const submitToFormBold = (values: ContactMeFormType) => {
    sendContactMeFormToFormBold(values)
      .then((success) => {
        if(success) {
          setFormBoldSubmissionState(true);
        } else {
          setFormBoldSubmissionState(false);
        }
        formik.setSubmitting(false);
      })
      .catch(() => {
        setFormBoldSubmissionState(false);
        formik.setSubmitting(false);
      });
  };

  const formik = useFormik<ContactMeFormType>({
    initialValues: {
      [NAME_INPUT]: "",
      [EMAIL_INPUT]: "",
      [MESSAGE_INPUT]: "",
    },
    validate: validate,
    onSubmit: submitToFormBold
  });

  return (
    <>
      { formBoldSubmissionState !== undefined && formBoldSubmissionState === true &&
        <p>{t("_contact_me_form.MESSAGE_SENT_SUCCESS")}</p>
      }
      { formBoldSubmissionState !== undefined && formBoldSubmissionState === false &&
        <p>{t("_contact_me_form.MESSAGE_SENT_ERROR")}</p>
      }

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <FormControl error={formik.touched[NAME_INPUT] && formik.errors[NAME_INPUT] !== undefined}>
            <Input
              id={NAME_INPUT}
              name={NAME_INPUT}
              value={formik.values[NAME_INPUT]}
              placeholder={t("_contact_me_form.name.PLACEHOLDER")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="plain"
              startDecorator={
                <><Person /> {t("_contact_me_form.name.DECORATOR")}</>
              }
            />
            { formik.touched[NAME_INPUT]  && formik.errors[NAME_INPUT] !== undefined &&
              <FormHelperText>
                <InfoOutlined />
                {formik.errors[NAME_INPUT]}
              </FormHelperText>
            }
          </FormControl>
          <FormControl error={formik.touched[EMAIL_INPUT] && formik.errors[EMAIL_INPUT] !== undefined}>
            <Input
              id={EMAIL_INPUT}
              name={EMAIL_INPUT}
              value={formik.values[EMAIL_INPUT]}
              placeholder={t("_contact_me_form.email.PLACEHOLDER")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="plain"
              startDecorator={
                <><Email /> {t("_contact_me_form.email.DECORATOR")}</>
              }
            />
            { formik.touched[EMAIL_INPUT] && formik.errors[EMAIL_INPUT] !== undefined &&
              <FormHelperText>
                <InfoOutlined />
                {formik.errors[EMAIL_INPUT]}
              </FormHelperText>
            }
          </FormControl>
          <FormControl error={formik.touched[MESSAGE_INPUT] && formik.errors[MESSAGE_INPUT] !== undefined}>
            <Textarea
              id={MESSAGE_INPUT}
              name={MESSAGE_INPUT}
              value={formik.values[MESSAGE_INPUT]}
              placeholder={t("_contact_me_form.message.PLACEHOLDER")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="plain"
              startDecorator={
                <><Message /> {t("_contact_me_form.message.DECORATOR")}</>
              }
            />
            { formik.touched[MESSAGE_INPUT] && formik.errors[MESSAGE_INPUT] !== undefined &&
              <FormHelperText>
                <InfoOutlined />
                {formik.errors[MESSAGE_INPUT]}
              </FormHelperText>
            }
          </FormControl>
          <Button 
            type="submit"
            disabled={Object.keys(formik.errors).length > 0 || formik.isSubmitting}
          >
            <Send /> {t("_contact_me_form.submit")}
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default ContactMeForm;
