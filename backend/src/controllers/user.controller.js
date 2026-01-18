import prisma from "../config/db.js";

/**
 * Get all stores with overall rating and user's rating
 */
export const getStoresForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, address } = req.query;

    const stores = await prisma.store.findMany({
      where: {
        AND: [
          name ? { name: { contains: name, mode: "insensitive" } } : {},
          address
            ? { address: { contains: address, mode: "insensitive" } }
            : {},
        ],
      },
      include: {
        ratings: true,
      },
    });

    const response = stores.map((store) => {
      const ratings = store.ratings;
      const overallRating =
        ratings.length > 0
          ? (
              ratings.reduce((sum, r) => sum + r.value, 0) /
              ratings.length
            ).toFixed(2)
          : "0.00";

      const userRating =
        ratings.find((r) => r.userId === userId)?.value || null;

      return {
        id: store.id,
        name: store.name,
        address: store.address,
        overallRating,
        userRating,
      };
    });

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};
