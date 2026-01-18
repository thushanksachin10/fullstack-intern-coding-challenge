import prisma from "../config/db.js";

/**
 * Submit or update rating
 */
export const submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storeId, value } = req.body;

    if (value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const rating = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
      update: {
        value,
      },
      create: {
        userId,
        storeId,
        value,
      },
    });

    res.json({ message: "Rating submitted successfully", rating });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit rating" });
  }
};
