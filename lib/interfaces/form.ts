export type Type = 'svg' | 'terminal' | 'png' | 'utf8';

export interface QRFormBody {
  url: string;
  version: string | number;
  type: Type;
}
