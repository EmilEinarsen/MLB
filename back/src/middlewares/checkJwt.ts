import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"
import config from "../config"

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	//Get the jwt token from the head
	const token = <string>req.headers["auth"]
	let jwtPayload

	try {
		jwtPayload = <any>jwt.verify(token, config.jwtSecret)
		res.locals.jwtPayload = jwtPayload
	} catch (error) {
		res.status(401).send()
		return
	}
	
	const newToken = jwt.sign(
		{ userId: jwtPayload.userId, username: jwtPayload.username }, 
		config.jwtSecret,
		{ expiresIn: "1h" }
	)

	res.setHeader("token", newToken)

	next()
}