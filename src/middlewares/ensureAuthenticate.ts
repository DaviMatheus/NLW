import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {


    const authtoken = request.headers.authorization;

    if (!authtoken) {
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");
    try {
        const { sub } = verify(token, "d96788971524fe4f4d51bec85cddd62a") as IPayload;

        request.user_id = sub;

        return next();

    } catch (err) {
        return response.status(4001).end();
    }
}
