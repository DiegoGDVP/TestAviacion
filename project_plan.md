# AeroTest - Plataforma de Tests de Mecánica de Aviación

## 1. Descripción del Proyecto
Plataforma web interactiva para practicar tests de mecánica de aviación. Dirigida a estudiantes, técnicos aeronáuticos y profesionales que necesitan preparar oposiciones o exámenes de certificación. El valor principal es poder practicar de forma inmediata con un banco de preguntas realista.

## 2. Estructura de Páginas
- `/` - Home (hero + menú de categorías)
- `/test/:category` - Test interactivo por categoría

## 3. Características Principales
- [ ] Carga de preguntas desde estructura JSON (mock data inicial)
- [ ] 5 categorías de tests: Motores, Aerodinámica, Electricidad aeronáutica, Instrumentación, Estructuras
- [ ] Interfaz de test con 3 opciones por pregunta
- [ ] Barra de progreso visual
- [ ] Resultados finales con puntuación y review de respuestas
- [ ] Diseño responsive con temática aeronáutica
- [ ] Explicaciones opcionales tras cada pregunta

## 4. Modelo de Datos
No se requiere base de datos. Las preguntas se almacenan en archivos JSON/TS estáticos bajo `src/mocks/`. Estructura de pregunta:
```
{
  id: number,
  category: string,
  question: string,
  options: string[3],
  correctAnswer: number (0-2),
  explanation: string
}
```

## 5. Integraciones Backend
- Supabase: No necesario (sitio estático)
- Shopify: No necesario
- Stripe: No necesario

## 6. Plan de Fases

### Fase 1: Estructura Base + Home + Mock Data
- Goal: Página principal funcional con navegación a categorías y banco de preguntas mock
- Deliverable: Home con cards de categorías, Navbar, Footer, datos de prueba para todas las categorías

### Fase 2: Sistema de Tests Interactivo
- Goal: Página de test funcional con selección de respuestas, progreso, resultados
- Deliverable: Test por categoría, barra de progreso, resultados finales, review de respuestas

### Fase 3: Pulido Visual + Animaciones + Responsive
- Goal: Diseño final aeronáutico, animaciones, experiencia móvil completa
- Deliverable: Estilos finales, transiciones, modo oscuro opcional, optimizaciones