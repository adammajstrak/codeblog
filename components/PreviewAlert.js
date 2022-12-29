import { Alert } from "react-bootstrap";

export default function PreviewAlert() {
  return (
    <Alert variant="secondary">
      This is the preview mode!{" "}
      <Alert.Link href="/api/exit-preview">Leave preview mode</Alert.Link>
    </Alert>
  );
}
