import { sanitize } from 'dompurify';

interface ResponseBufferProps {
  value: string;
}

// TODO there are better solutions to rendering the html from responses.
// @see https://medium.com/@uigalaxy7/how-to-render-html-in-react-7f3c73f5cafc
// Using an html sanatizer to help

const internalSanitize = (value: string) => sanitize(value, { ADD_ATTR: ['target', 'rel'] });

export const ResponseBuffer = ({ value }: ResponseBufferProps) => {
  return <pre dangerouslySetInnerHTML={{ __html: internalSanitize(value) }} style={{ paddingLeft: "1em", whiteSpace: "pre-wrap" }}></pre>
};
