
interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div>{message || "ErrorMessage"}</div>
  )
}
