import prisma from "../config/db.js";

/**
 * Store Owner Dashboard
 */
export const getStoreDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Find store owned by this user
    const store = await prisma.store.findUnique({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    const ratings = store.ratings;

    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length
          ).toFixed(2)
        : "0.00";

    const usersWhoRated = ratings.map((r) => ({
      name: r.user.name,
      email: r.user.email,
      rating: r.value,
    }));

    res.json({
      storeName: store.name,
      averageRating,
      usersWhoRated,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch store dashboard" });
  }
};
