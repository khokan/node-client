export const myJobPromise = (email) => {
  return fetch(
    `${import.meta.env.VITE_NODE_SERVER_URL}/jobs?email=${email}`
  ).then((res) => res.json());
};
