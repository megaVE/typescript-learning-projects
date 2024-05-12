// 1 - Starting Project
console.log("Express + TypeScript running")

// 2 - Init Express
import express, { NextFunction, Request, Response } from "express"

const app = express()

app.get("/", (req, res) => {
  return res.send("Hello Express")
})

app.listen(3000, () => {
  console.log("TS + Express App started!");
})

// 3 - POST Route
app.use(express.json()) // Allows for express to work with JSON data

  // 11 - General Middleware
  app.use(showPath)

  function showPath(req: Request, res: Response, next: NextFunction) {
    console.log(req.path)
    next()
  }

app.post("/api/product", (req, res) => {
  console.log(req.body)

  return res.send("Product added!")
})

// 4 - All verbs Route
app.all("/api/product/check", (req, res) => {
  if(req.method === "POST") {
    return res.send("Inserted a log.")
  } else if(req.method === "GET") {
    return res.send("The log was read.")
  } else {
    return res.send("This operation cannot be done.")
  }
})

// 5 - Interfaces
app.get("/api/interfaces", (req: Request, res: Response) => {
  // Allows for method autocompletion
  return res.send("Using interfaces.")
})

// 6 - Sending JSON
app.get("/api/json", (req: Request, res: Response) => {
  return res.json({
    name: "JSON",
    nickname: "Jason",
    favouriteColor: "yellow",
    one: ["two", "three"]
  })
})

// 7 - Route Paramether
app.get("/api/product/:id", (req: Request, res: Response) => {
  console.log(req.params)

  const { id } = req.params

  if(id === "1") {
    return res.send({
      name: "Shoe",
      price: 40,
      inStock: false
  })
  }

  return res.send("Product not found...")
})

// 8 - Complex Route
app.get("/api/product/:productId/review/:reviewId", (req: Request, res: Response) => {
  console.log(req.params)

  const { productId, reviewId } = req.params

  if(productId === "1" && reviewId === "1") {
    return res.send({
      name: "Ryuberto",
      content: "Very bad product >:("
    })
  }

  return res.send("Review not found...")
})

// 9 - Route Handler
app.get("/api/user/:id", getUser)

function getUser(req: Request, res: Response) {
  const { id } = req.params

  console.log("Recovering user with id ", id)

  res.send("The user was not found.")
}

// 10 - Middleware
app.get("/api/user/:id/access", checkUser, (req: Request, res: Response) => {
  return res.json({
    msg: "Welcome to the admin area!"
  })
})

function checkUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  if(id === "1") {
    console.log("Allowed!")
    next()
  }

  return res.json({
    msg: "Access not allowed."
  })
}

// 12 - Req Res Interface
app.get("/api/user/:id/details/:name", (
  req: Request<{ id: string, name: string }>,
  res: Response<{ status: boolean}>
) => {
  const { id, name } = req.params

  console.log(id, name)

  return res.json({
    status: true
  })
})

// 13 - Handling Errors
app.get("/api/error", (req: Request, res: Response) => {
  try {
    throw new Error("Intended error")
  } catch(error: any) {
    console.error(error)
    
    return res.status(500).json({ msg: error.message })
  }
})