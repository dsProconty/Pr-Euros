# Cómo compilar el frontend (Angular 10)

## Requisitos
- Node.js (probado con v22) — Angular 10 usa webpack antiguo, requiere el flag OpenSSL legacy
- npm

## Pasos
```bash
cd FRONTEND
npm install --legacy-peer-deps
export NODE_OPTIONS=--openssl-legacy-provider   # imprescindible con Node 17+
npx ng build --prod
```

El resultado queda en `FRONTEND/dist/simulators/`.

## URL del backend
Se define en `src/environments/environment.prod.ts`:
- Producción cliente (Azure): `https://pcbecu-prod-simulator-service-webapp.azurewebsites.net/api`

Para desplegar en el Vercel de pruebas, reemplazar esa URL por la del backend
de staging antes de compilar.

## Rutas de los simuladores
Definidas en `src/app/app-routing.module.ts`. Ej.: `planProAhorro`, `cotizadorEuros`,
`ahorroDpf`, `ahorroFlexSave`, `creditoInversionPersonal`, `creditoInversionVivienda`.
