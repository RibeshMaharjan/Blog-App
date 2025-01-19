const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const Blog = require("./models/blog");

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogapp")
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log("Server is listening on PORT: ", PORT);
});
