'use client';

import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
type Props = {
  content: string;
  className?: string;
};
const SanitizedContent = (props: Props) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(DOMPurify.sanitize(props.content));
  }, [props.content]);

  return (
    <div
      className={props.className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default SanitizedContent;
