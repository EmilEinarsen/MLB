import express, { Request, Response } from 'express'

const app: express.Application = express()

const port = 3000

app.get('/', ( req: Request, res: Response ) => {
	res.send('Hello worldd')
})

app.listen(port, () => {
	console.log('Port: ' + port)
})