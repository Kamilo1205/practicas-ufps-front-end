
export const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        // Manejar arrays, por ejemplo, sortBy
        value.forEach((item) => {
          if (typeof item === 'object' && item.id && item.desc !== undefined) {
            queryParams.append(key, `${item.id}:${item.desc ? 'desc' : 'asc'}`);
          } else {
            queryParams.append(key, item.toString());
          }
        });
      } else if (typeof value === 'object') {
        // Manejar objetos, por ejemplo, filtros
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue !== undefined && subValue !== null) {
            queryParams.append(`${key}[${subKey}]`, String(subValue));
          }
        });
      } else {
        // Manejar valores primitivos
        queryParams.append(key, value.toString());
      }
    }
  });

  return queryParams.toString();
};