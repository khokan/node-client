export const JobsCreatedByPromise = (email, accessToken) => {
  return fetch(
    `${import.meta.env.VITE_NODE_SERVER_URL}/jobs/applications?email=${email}`,
    {
      credentials: "include",
      headers: {
        // if firebase or local storage is used
        authorization: `Bearer ${accessToken}`,
      },
    }
  ).then((res) => res.json());
};
