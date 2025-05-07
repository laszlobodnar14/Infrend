import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";

export default (req: any, res: any, next: any) => {
  const token = req.headers['access_token'] as string;
  if (!token) {
    console.error('No token found in request headers');
    return res.status(HTTP_UNAUTHORIZED).send('No Token');
  }

  try {
    const decodedUser = verify(token, process.env.JWT_SECRET!);

    req.user = decodedUser;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(HTTP_UNAUTHORIZED).send('Invalid Token');
  }
}
