import React from "react";

interface ResponseBufferProps {
  value: string;
}

export const ResponseBuffer = ({ value }: ResponseBufferProps) => (
  <span>{value}</span>
);
