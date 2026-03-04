const express = require("express");
const app = express();

app.use(express.json());

const roleRoutes = require("./routes/role.routes");
const userRoutes = require("./routes/user.routes");

app.use("/roles", roleRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});