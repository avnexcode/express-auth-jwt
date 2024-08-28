export interface ResponseLocals {
  statusCode?: number;
  message?: string;
  data?: any;
  status?: 'success' | 'error';
}

declare global {
  namespace Express {
    interface Response {
      locals: ResponseLocals;
    }
  }
}
