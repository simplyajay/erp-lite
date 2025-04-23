import userRouter from "./entities/user/user.route.js";
import productRouter from "./entities/product/product.route.js";
import organizationRouter from "./entities/organization/organization.route.js";
import documentRouter from "./entities/documents/document.route.js";
import supplierRouter from "./entities/businessEntities/supplier/supplier.route.js";
import authRouter from "./auth/auth.route.js";

export default (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/stocks", productRouter);
  app.use("/api/documents", documentRouter);
  app.use("/api/organizations", organizationRouter);
  app.use("/api/suppliers", supplierRouter);
};
