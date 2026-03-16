import { Elysia } from 'elysia'
import swagger from '@elysiajs/swagger'
import APIv1 from './routes/v1'
import ContextMiddleware from './middleware/auth/context_middleware'
import CorsPlugin from './plugins/cors'
import Logger from './middleware/logger/logger'
import ValidateTimestamp from './middleware/request/validate_timestamp'
import SecureHeader from './middleware/security/secure_header'
import DetectAttack from './middleware/security/detect_attack'
import ValidateSignature from './middleware/auth/validate_signature'
import ValidateAccessToken from './middleware/auth/validate_access_token'
import ValidateCredential from './middleware/auth/validate_credential'

const app = new Elysia()
  .use(swagger())
  .use(ContextMiddleware)
  .use(CorsPlugin)
  .use(Logger)
  .use(ValidateTimestamp)
  .use(SecureHeader)
  .use(DetectAttack)
  .use(ValidateSignature)
  .use(ValidateAccessToken)
  .use(ValidateCredential)

  .group('/api/v1', (app) =>
    app.use(APIv1)
  )

  .get('/', () => ({
    status: 'ok',
    service: 'POS Backend',
    version: '1.0.0'
  }))

  .listen(3000)

console.log(
  `🦊 Backend Elysia jalan di http://${app.server?.hostname}:${app.server?.port}`
)