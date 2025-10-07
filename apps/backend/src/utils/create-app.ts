import cors from "cors";
import express from "express";
import type { Request, Response } from "express";
import {
  domainUseCases,
  type UseCaseName,
  type UseCaseTypes,
} from "demo-domain";
import { ProductServiceImplementation } from "../service/product-service.js";
import type { MergedDependencies } from "../types/dependencies.js";

export function createApp(db: any) {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(express.json());

  createRoutes(app, db);

  app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
  });
}

function createRoutes(app: any, db: any) {
  const dependencies: MergedDependencies<UseCaseTypes> = {
    productService: new ProductServiceImplementation(db),
  };
  for (const key in domainUseCases) {
    const useCase = domainUseCases[key as UseCaseName];
    if (!useCase) break;

    app.post(`/${key}`, async (req: Request, res: Response) => {
      const payload = req.body;
      if (!payload) {
        return res.status(400).send("Required data missing");
      }
      const result = await useCase.useCase(dependencies, payload);
      res.json(result);
    });
  }
}
