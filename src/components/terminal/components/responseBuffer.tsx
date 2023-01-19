interface ResponseBufferProps {
  value?: string;
}

export const ResponseBuffer = ({ value }: ResponseBufferProps) => (
  <pre>{value}</pre>
);
