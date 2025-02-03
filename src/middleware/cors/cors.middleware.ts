import { Injectable, NestMiddleware } from '@nestjs/common';
const Headers = {
        origin: 'https://localhost:5173,', // Allowed origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
        credentials: true, // Allow credentials (e.g., cookies)
        allowedHeaders: 'Content-Type, Accept', // Allowed headers
    }
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: Response , next: () => void) {
    next();
  }
}
