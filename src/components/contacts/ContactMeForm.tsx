import { Email, Message, Person, Send } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  Stack,
  Textarea,
} from "@mui/joy";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactMeFormToFormBold } from "../../integration/formbold.integration";
import OperationStatusFeedback from "../common/OperationStatusFeedback";

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
    [NAME_INPUT]?: string;
    [EMAIL_INPUT]?: string;
    [MESSAGE_INPUT]?: string;
  }

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [formBoldSubmissionState, setFormBoldSubmissionState] = useState<
    boolean | undefined
  >(undefined);

  const { t } = useTranslation("pages/Contacts");

  const validate = (values: ContactMeFormType): ContactMeFormErrorType => {
    const errors: ContactMeFormErrorType = {};

    if (!values[NAME_INPUT]) {
      errors[NAME_INPUT] = t("_contact_me_form.name.REQUIRED");
    }

    if (!values[EMAIL_INPUT]) {
      errors[EMAIL_INPUT] = t("_contact_me_form.email.REQUIRED");
    } else if (!EMAIL_REGEX.test(values[EMAIL_INPUT])) {
      errors[EMAIL_INPUT] = t("_contact_me_form.email.INVALID");
    }

    if (!values[MESSAGE_INPUT]) {
      errors[MESSAGE_INPUT] = t("_contact_me_form.message.REQUIRED");
    }

    return errors;
  };

  const submitToFormBold = (values: ContactMeFormType) => {
    sendContactMeFormToFormBold(values)
      .then((success) => {
        if (success) {
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
    validateOnMount: true,
    initialValues: {
      [NAME_INPUT]: "",
      [EMAIL_INPUT]: "",
      [MESSAGE_INPUT]: "",
    },
    validate: validate,
    onSubmit: submitToFormBold,
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      {formBoldSubmissionState !== undefined &&
        formBoldSubmissionState === true && (
          <OperationStatusFeedback
            status="SUCCESS"
            icon={<Send />}
            message={t("_contact_me_form.MESSAGE_SENT_SUCCESS")}
            justifyContent="LEFT"
          />
        )}
      {formBoldSubmissionState !== undefined &&
        formBoldSubmissionState === false && (
          <OperationStatusFeedback
            status="ERROR"
            icon={<ErrorIcon />}
            message={t("_contact_me_form.MESSAGE_SENT_ERROR")}
            justifyContent="LEFT"
          />
        )}
      <Stack spacing={2}>
        <FormControl
          error={
            formik.touched[NAME_INPUT] &&
            formik.errors[NAME_INPUT] !== undefined
          }
        >
          <Input
            id={NAME_INPUT}
            name={NAME_INPUT}
            value={formik.values[NAME_INPUT]}
            placeholder={t("_contact_me_form.name.PLACEHOLDER")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="plain"
            startDecorator={<Person />}
          />
          {formik.touched[NAME_INPUT] &&
            formik.errors[NAME_INPUT] !== undefined && (
              <OperationStatusFeedback
                status="ERROR"
                icon={<ErrorIcon />}
                message={formik.errors[NAME_INPUT]}
                justifyContent="LEFT"
              />
            )}
        </FormControl>
        <FormControl
          error={
            formik.touched[EMAIL_INPUT] &&
            formik.errors[EMAIL_INPUT] !== undefined
          }
        >
          <Input
            id={EMAIL_INPUT}
            name={EMAIL_INPUT}
            value={formik.values[EMAIL_INPUT]}
            placeholder={t("_contact_me_form.email.PLACEHOLDER")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="plain"
            startDecorator={<Email />}
          />
          {formik.touched[EMAIL_INPUT] &&
            formik.errors[EMAIL_INPUT] !== undefined && (
              <OperationStatusFeedback
                status="ERROR"
                icon={<ErrorIcon />}
                message={formik.errors[EMAIL_INPUT]}
                justifyContent="LEFT"
              />
            )}
        </FormControl>
        <FormControl
          error={
            formik.touched[MESSAGE_INPUT] &&
            formik.errors[MESSAGE_INPUT] !== undefined
          }
        >
          <Textarea
            id={MESSAGE_INPUT}
            name={MESSAGE_INPUT}
            value={formik.values[MESSAGE_INPUT]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minRows={3}
            variant="plain"
            startDecorator={
              <>
                <Message /> {t("_contact_me_form.message.PLACEHOLDER")}
              </>
            }
          />
          {formik.touched[MESSAGE_INPUT] &&
            formik.errors[MESSAGE_INPUT] !== undefined && (
              <OperationStatusFeedback
                status="ERROR"
                icon={<ErrorIcon />}
                message={formik.errors[MESSAGE_INPUT]}
                justifyContent="LEFT"
              />
            )}
        </FormControl>
        <Button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          {formik.isSubmitting ? (
            <>
              <CircularProgress /> {t("_contact_me_form.submit.LOADING")}
            </>
          ) : (
            <>
              <Send /> {t("_contact_me_form.submit.LABEL")}
            </>
          )}
        </Button>
      </Stack>
    </form>
  );
}

export default ContactMeForm;
