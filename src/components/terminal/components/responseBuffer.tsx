interface ResponseBufferProps {
  value?: string;
}

export const ResponseBuffer = ({ value }: ResponseBufferProps) => (
  <pre style={{ paddingLeft: "1em", whiteSpace: "pre-wrap" }}>{value}</pre>
);
