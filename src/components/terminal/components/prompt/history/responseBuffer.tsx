import { sanitize } from 'dompurify';

interface ResponseBufferProps {
  value: string;
}

export const ResponseBuffer = ({ value }: ResponseBufferProps) =>
  <pre
    dangerouslySetInnerHTML={{ __html: sanitize(value, { ADD_ATTR: ['target', 'rel'] }) }}
    style={{ paddingLeft: "1em", whiteSpace: "pre-wrap" }}
  />
