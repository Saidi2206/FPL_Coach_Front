import { HttpErrorResponse } from '@angular/common/http';

export function errMsg(e: HttpErrorResponse): string {
  if (e.status === 404) return 'Équipe introuvable. Vérifie ton ID.';
  const detail = e.error?.detail;          // message renvoyé par FastAPI (HTTPException)
  if (detail) return detail;
  return 'Le back ne répond pas (uvicorn est-il lancé sur le port 8000 ?).';
}