export const JobsCreatedByPromise = (email) => {
  return fetch(
    `${import.meta.env.VITE_NODE_SERVER_URL}/jobs/applications?email=${email}`
  ).then((res) => res.json());
};
