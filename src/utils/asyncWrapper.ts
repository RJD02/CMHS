const asyncWrapper = async (fn: Function, params: null | object) => {
  try {
    const data = await fn(params);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
