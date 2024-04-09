export const  getErrorMessage = (e) => {
  if (!e.response) return {error: 500, message: "Tiempo de espera agotado"};
  if (e.response.status === 403) return {error: 403, message: "Acceso no autorizado"};
  if (e.response.status === 500) return {error: 500, message: "Error en el servidor"};
};
