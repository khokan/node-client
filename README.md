# Pro Hero Node Client

## Overview

The **Pro Hero Node Client** is a Node.js-based client library designed to interact seamlessly with the Pro Hero API. It provides developers with a robust set of tools to authenticate, send requests, and handle responses from the Pro Hero backend services.

## Features

- **Easy Authentication:** Supports API key and OAuth2 authentication methods.
- **Comprehensive API Coverage:** Access all major endpoints of the Pro Hero API.
- **Error Handling:** Built-in error management for reliable integrations.
- **TypeScript Support:** Fully typed for enhanced developer experience.
- **Extensible:** Easily customizable for advanced use cases.

## Installation

```bash
npm install pro-hero-node-client
```

## Usage

```js
const ProHeroClient = require("pro-hero-node-client");

const client = new ProHeroClient({ apiKey: "YOUR_API_KEY" });

client
  .getHeroes()
  .then((heroes) => console.log(heroes))
  .catch((err) => console.error(err));
```

## Documentation

- [API Reference](./docs/API.md)
- [Authentication Guide](./docs/authentication.md)
- [Examples](./examples/)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](./CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License.
