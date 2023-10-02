# Qué Pinta Hoy

Qué Pinta Hoy (QPH) es una plataforma web diseñada para funcionar como una agenda cultural de la ciudad de Rosario. Su propósito principal es mostrar información sobre los próximos eventos que tendrán lugar en la ciudad, ofreciendo detalles relevantes sobre cada evento. Además, QPH permite a los usuarios y organizaciones crear y promocionar sus propios eventos en la plataforma.

## Configuración
Para configurar y ejecutar la aplicación localmente:

1) Clonar el repositorio del proyecto desde GitHub: git clone https://github.com/labmiracle/team-White
2) Crear una base de datos (MySQL o MariaDB) utilizando el archivo de dump que se encuentra en Back-end\Paradigm.Express.WebApi.Bootstrap-main\dump\dump.sql.
3) En el directorio Back-end\Paradigm.Express.WebApi.Bootstrap-main crear un archivo .env con la configuración de la base de datos siguiendo este formato:
  paradigm_api__mysql__host=nombre_del_host
  paradigm_api__mysql__user=nombre_del_usuario
  paradigm_api__mysql__password=contraseña_de_la_base_de_datos
  paradigm_api__mysql__database=nombre_de_la_base_de_datos
  paradigm_api__mysql__port=puerto (3306 por defecto)
4) Instalar las dependencias desde los directorios Front-end\QPH y Back-end\Paradigm.Express.WebApi.Bootstrap-main utilizando npm.
5) Ejecutar la aplicación tanto en el frontend como en el backend utilizando el comando npm run dev.
6) Acceder a la aplicación en el navegador utilizando la siguiente URL: http://localhost:5000

## Documentación


