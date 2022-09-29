import { useEffect, useState } from 'react';

interface DeferredProps extends Props {
  delay: number;
}

function Deferred({ delay, children }: DeferredProps) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeferred(true);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
}

export default Deferred;
