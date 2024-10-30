import express, { Request, Response, Express } from 'express'; // Ensure all imports are direct
import { PrismaClient } from '@prisma/client';
import helmet  from 'helmet';
import morgan from 'morgan';
import wiston from './ErrorHelpers/WistonLogger.js';
import { sendSuccessResponse } from './utils/sendResponses.js';


const app: Express = express();
const cors = require('cors');



app.locals.prisma = new PrismaClient()

// add stream option to morgan
app.use(morgan('combined', { stream: wiston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}))
app.use(helmet());

app.get('/', (req: Request, res: Response) => {
  sendSuccessResponse(res, 200, { 
    id: 3,
    name: "Rillay",
    email: "sample@email.com"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// function helmet(): any {
//     throw new Error('Function not implemented.');
// }

// function cookieParser(): any {
//     throw new Error('Function not implemented.');
// }

