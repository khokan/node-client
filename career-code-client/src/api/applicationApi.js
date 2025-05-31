export const myApplicationPromise = (email) => {
  return fetch(
    `${import.meta.env.VITE_NODE_SERVER_URL}/applications?email=${email}`
  ).then((res) => res.json());
};
