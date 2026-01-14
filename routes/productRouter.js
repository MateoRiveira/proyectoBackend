
import { Router } from "express";
import { ProductModel } from "../models/product.js";

const router = Router();

/**
 * GET /products
 * Query params:
 * limit, page, sort, query
 */
router.get("/", async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      sort,
      query,
    } = req.query;

    const filter = {};
    if (query) {
      filter.$or = [
        { category: query },
        { status: query === "true" },
      ];
    }

    const options = {
      limit,
      page,
      lean: true,
    };

    if (sort) {
      options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const result = await ProductModel.paginate(filter, options);

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/products?page=${result.nextPage}`
        : null,
    });
  } catch (error) {
    res.json({ status: "error", error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid);
  res.json(product);
});

router.post("/", async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json(product);
});

export default router;