interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message,
}: ErrorMessageProps): JSX.Element {
  return <div className="text-center py-4 text-red-500">{message}</div>;
}
