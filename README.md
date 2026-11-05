# MasterTech Web Legacy — Versión histórica del sitio corporativo

**Repositorio de preservación y estudio técnico de una versión anterior o alternativa del sitio de MasterTech SpA.** Contiene una portada HTML, estilos, imágenes y recursos de descarga, además de un directorio backend.

> **Fuente de desarrollo actual:** [`mastertech-website`](https://github.com/andres-olguin/mastertech-website). Este repositorio **no** debe asumirse como el código desplegado en `mastertechg.com` sin comprobar configuración de hosting y diferencias entre ambas versiones.

## Contenido del repositorio

| Ruta | Propósito |
|---|---|
| [`index.html`](index.html) | Portada corporativa de referencia |
| [`styles.css`](styles.css) | Estilos adicionales |
| [`images/`](images/) | Recursos gráficos históricos |
| [`downloads/`](downloads/) | Archivos destinados a descarga, sujetos a revisión de permisos |
| [`backend/`](backend/) | Código histórico de apoyo; arquitectura y dependencias requieren inventario |
| [`docs/`](docs/) | Notas de evolución y conservación |

## Previsualización local

```bash
python -m http.server 8000
```

Abre `http://localhost:8000/index.html`. Este servidor simple sirve archivos estáticos y **no ejecuta el backend**.

## Estado y riesgos

- El HTML utiliza estilos y scripts externos; requieren revisión de disponibilidad, licencias y seguridad.
- Parte del contenido puede corresponder a ideas, experiencia freelance personal del fundador o propuestas, no necesariamente a productos y clientes de MasterTech SpA.
- Evitar desplegar versiones alternativas simultáneas sin un plan de dominio, SEO, redirecciones y contenidos.
- Revisar archivos de `downloads/` y permisos antes de exponerlos públicamente.

## Conservación y migración

1. Comparar rutas, funcionalidades, imágenes, copy y dependencias con `mastertech-website`.
2. Registrar archivos exclusivos y decidir si deben migrarse, archivarse o descartarse.
3. Identificar referencias de hosting/DNS o despliegues activos.
4. Realizar un respaldo recuperable y definir redirecciones si corresponde.
5. Mantener historial y atribuciones; archivar solo cuando se confirme que no hay dependencias vigentes.

[Estudio técnico histórico](docs/ESTUDIO_DE_EVOLUCION_2026-10-30.md) · [Plan de evolución propuesto — PR #1](https://github.com/andres-olguin/mastertech-web-legacy/pull/1) *(sin fusionar a main)*.

**Aviso:** la presencia de código histórico no prueba una relación societaria de cada trabajo representado ni autoriza su comercialización.
