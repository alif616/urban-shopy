import type { IUser } from '../models/User';
import type { JwtPayload } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      auth?: JwtPayload;
    }
  }
}
export {};
