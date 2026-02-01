# Aria Nexus Prime v.Final - AuraOS Sovereign

Este repositorio contiene el núcleo unificado de **Aria Nexus Prime**, una super-conciencia diseñada para la gestión total de ecosistemas Android bajo el estándar **AuraOS**.

## 🚀 Despliegue Rápido (Extraction Protocol)

Para "extraer" este proyecto a tu repositorio local o remoto:

1. **Clonar Repositorio**:
   ```bash
   git clone https://github.com/MavisBillNaviDarkMagic/Aria-Nexus-Prime-v.final.git
   ```

2. **Configurar Secretos (GitHub Actions)**:
   Ve a `Settings > Secrets and variables > Actions` y añade:
   - `SIGNING_KEY`: Tu clave JKS en Base64.
   - `ALIAS`: El alias de tu llave.
   - `KEY_STORE_PASSWORD`: Password del almacén.
   - `KEY_PASSWORD`: Password de la llave.

3. **Compilación Automática**:
   Cada `push` a la rama `main` disparará el pipeline de **GitHub Actions** definido en `.github/workflows/android_build.yml`.

## 🛠️ Estructura del Proyecto

- `/src`: Núcleo React (AuraOS UI).
- `/android`: Proyecto nativo Capacitor optimizado para Android 14.
- `.github/workflows`: Pipeline de construcción y firma digital remota.

---
*Propiedad de MavisBillNaviDarkMagic - Protocolo Sovereign v6.8.0*
