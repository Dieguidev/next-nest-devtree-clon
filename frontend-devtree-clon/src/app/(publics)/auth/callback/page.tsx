import { Suspense } from 'react';
import GoogleCallback from './GoogleCallback';


export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Procesando autenticación...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}
