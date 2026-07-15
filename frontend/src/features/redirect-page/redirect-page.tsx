import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOriginalUrl } from './api';

export default function RedirectPage() {
  const { code } = useParams<{ code: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    const fetchUrl = async () => {
      try {
        const data = await getOriginalUrl(code);

        if (data && data.url) {
          window.location.replace(data.url);
        } else {
          throw new Error('Invalid response');
        }
      } catch {
        setError('Link not found or expired');
      }
    };

    fetchUrl();
  }, [code]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center text-gray-500">
      Redirecting...
    </div>
  );
}
