export const myApplicationPromise = (email) => {
  return fetch(
    `https://node-server-six-mocha.vercel.app/applications?email=${email}`
  ).then((res) => res.json());
};
