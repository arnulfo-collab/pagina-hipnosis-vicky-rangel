# Guia de prompts para GitHub Copilot

Usa estos prompts en Copilot Chat (Ctrl+Shift+I) con el archivo abierto.

## 1) Mejorar HTML semantico y accesible

```text
Eres un experto en HTML5 semantico y accesibilidad WCAG 2.1.
Revisa este archivo HTML e:
1. Agrega atributos aria faltantes (aria-label, role)
2. Mejora la semantica (usa <section>, <article>, <nav> correctamente)
3. Asegura que todos los <img> tengan alt descriptivos
4. Optimiza el orden de los <meta> tags en el <head>
No cambies el CSS ni el contenido visible.
```

## 2) Mejorar CSS y accesibilidad visual

```text
Eres un experto en CSS moderno y diseno accesible.
Revisa styles.css y:
1. Verifica que los colores tengan ratio WCAG AA (4.5:1 minimo)
2. Agrega focus-visible a todos los elementos interactivos
3. Asegura que las fuentes sean legibles en mobile (minimo 16px base)
4. Mejora la especificidad sin usar !important
```

## 3) Mejorar SEO local

```text
Actua como especialista SEO para un negocio local en Mexicali, Mexico.
Para esta pagina HTML:
1. Mejora el <title> (max 60 caracteres, incluye "Mexicali")
2. Mejora el meta description (max 155 caracteres, CTA + keyword local)
3. Sugiere schema markup adicional (FAQPage, Service, etc.)
4. Identifica oportunidades de keywords longtail en el contenido visible
```

## 4) Generar Open Graph y Twitter Card

```text
Genera los meta tags de Open Graph y Twitter Card completos para
esta pagina HTML de un centro de hipnoterapia en Mexicali llamado
RESET Subconsciente. URL base: https://reset-mx.com
Imagen principal: assets/images/reset-img1-1.jpg
```

## 5) Ajustar paleta y contrastes

```text
Dado este CSS con variables de color:
--primary: #0f766e
--accent: #b35212
--bg: #f7f2ea
Verifica los ratios de contraste WCAG AA y sugiere ajustes minimos
para cumplir 4.5:1 en texto normal y 3:1 en texto grande.
Muestra los valores hex ajustados.
```
