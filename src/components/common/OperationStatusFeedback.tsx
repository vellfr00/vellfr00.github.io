import '../../styles/common/OperationStatusFeedback.css'

/** Enum possible async operation status */
type AsyncOperationStatus = "LOADING" | "SUCCESS" | "ERROR";
/** Enum possible justify content */
type JustifyContent = "LEFT" | "CENTER" | "RIGHT";

/** Map possible status with classes */
const operationStatusToClassMap = {
  LOADING: "loading-feedback-paragraph",
  SUCCESS: "success-feedback-paragraph",
  ERROR: "error-feedback-paragraph",
};
/** Map possible justify content with classes */
const justifyContentMap = {
  LEFT: "justify-feedback-left",
  CENTER: "justify-feedback-center",
  RIGHT: "justify-feedback-right",
};

interface OperationStatusFeedbackProps {
  status: AsyncOperationStatus;
  icon: JSX.Element;
  message: string;
  justifyContent: JustifyContent;
}
function OperationStatusFeedback({ status, icon, message, justifyContent }: OperationStatusFeedbackProps) {
  const GENERIC_STATUS_FEEDBACK_PARAGRAPH_CLASSNAME = "feedback-paragraph";

  const statusClassName = operationStatusToClassMap[status];
  const justifyContentClassName = justifyContentMap[justifyContent];

  return (
    <p className={`${GENERIC_STATUS_FEEDBACK_PARAGRAPH_CLASSNAME} ${statusClassName} ${justifyContentClassName}`}>
      {icon}
      {message}
    </p>
  );
}

export default OperationStatusFeedback;