import Product from "../../../models/Product";
import db from "../../../utils/db";

export default async function handler(req, res) {
  await db.connect();
  if (req.method === "GET") {
    const products = await Product.find();
    return res.json(products);
  }
  if (req.method === "GET") {
    const product = await Product.findOne(req.query.slug);
    return res.json(product);
  }
}