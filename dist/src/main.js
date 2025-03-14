"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
        credentials: true,
    });
    await app.listen(configService.get('PORT'));
    app.useGlobalPipes(new common_1.ValidationPipe());
    console.log('server start on: ', configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map