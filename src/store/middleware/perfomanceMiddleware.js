export const perfomanceMiddleware = (storeAPI) => (next) => (action) => {
  const start = performance.now();
  const result = next(action);
  const end = performance.now();
  console.log(`Action: ${action.type} прошел за ${end - start} мс`);
  return result;
};
