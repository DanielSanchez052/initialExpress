const { pathname : baseDir } = new URL('../', import.meta.url)

export default {
    swagger: "2.0",
    info: {
        title: "API Rest",
        description: "API to practice Nodejs and express",
        contact:{
            name: "s4nchez",
            url: "https://github.com/DanielSanchez052/",
            email: "apiteam@swagger.io"
        },
        version: "1.0.0",
    },
    servers: [
        {
          url: "http://localhost:4002/"
        },
      ],
    tags: [
        {
          name: "authentication",
          description: "authentication JWT",
        }
      ],
    
    baseDir: baseDir,
    filesPattern: './**/*.js',
    swaggerUIPath: '/api/v1/docs'
   
}