import { Email, InfoOutlined, Message, Person, Send } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, Input, Stack, Textarea } from "@mui/joy";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

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
  const onSubmit = (values: ContactMeFormType) => {
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik<ContactMeFormType>({
    initialValues: {
      [NAME_INPUT]: "",
      [EMAIL_INPUT]: "",
      [MESSAGE_INPUT]: "",
    },
    validate: validate,
    onSubmit: onSubmit,
  });

  return (
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
        <Button type="submit" disabled={Object.keys(formik.errors).length > 0}>
          <Send /> {t("_contact_me_form.submit")}
        </Button>
      </Stack>
    </form>
  );
}

export default ContactMeForm;
