const swaggerJSDoc = require("swagger-jsdoc")

const swaggerOptions = {
  definition: {
    орепарі: "3.0.0",
    info: {
      title: "Sample API with Swagger",
      version: "1.0.0",
      description:
        "A sample API to demonstrate Swagger integration with Node-js",
    },
    servers: [{ url: "http://localhost:${port}" }],
  },
  apis: ["./routes/* js"], // Path to the API routes directory
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
