export interface QRFormBody {
  url: string;
  version: string | number;
  type: 'svg' | 'terminal' | 'png' | 'utf8';
}
