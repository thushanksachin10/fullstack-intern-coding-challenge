import prisma from "../config/db.js";

/**
 * Dashboard statistics
 */
export const getDashboardStats = async (req, res) => {
  try {
    const [users, stores, ratings] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
    ]);

    res.json({
      totalUsers: users,
      totalStores: stores,
      totalRatings: ratings,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

/**
 * Get all users with filters
 */
export const getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy = "name", order = "asc" } =
      req.query;

    const users = await prisma.user.findMany({
      where: {
        AND: [
          name ? { name: { contains: name, mode: "insensitive" } } : {},
          email ? { email: { contains: email, mode: "insensitive" } } : {},
          address
            ? { address: { contains: address, mode: "insensitive" } }
            : {},
          role ? { role } : {},
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
      },
      orderBy: {
        [sortBy]: order,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * Get all stores with average rating
 */
export const getStores = async (req, res) => {
  try {
    const { name, address, sortBy = "name", order = "asc" } = req.query;

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
        ratings: {
          select: { value: true },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
    });

    const formatted = stores.map((store) => {
      const avgRating =
        store.ratings.length > 0
          ? (
              store.ratings.reduce((sum, r) => sum + r.value, 0) /
              store.ratings.length
            ).toFixed(2)
          : "0.00";

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: avgRating,
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};
