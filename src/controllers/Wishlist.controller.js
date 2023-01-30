exports.getWishlistByUserId = async (req, res) => {
    try {
      const { _id: userId } = req.user;
      const { onModel } = req.query;
  
      const foundProductWishlist = await Wishlist.find({ onModel: "Product", createdBy: userId })
        .populate({
          path: "modelId",
          model: "Product",
          populate: [
            { path: "category", select: "_id name" },
            { path: "images", select: "_id public_id url modelId onModel" },
            { path: "wishlist", select: "_id name picture" },
            { path: "variants", select: "_id price quantity options image sold status" },
          ],
        })
        .sort({ createdAt: -1 });
  
      const foundComboWishlist = await Wishlist.find({
        onModel: "Combo",
        createdBy: userId,
      })
        .populate({
          path: "modelId",
          model: "Combo",
          populate: [
            { path: "image", select: "_id public_id url modelId onModel" },
            { path: "wishlist", select: "_id name picture" },
            {
              path: "products",
              populate: {
                path: "product",
                model: "Product",
                populate: [
                  { path: "category", select: "_id name" },
                  { path: "images", select: "_id public_id url modelId onModel" },
                  { path: "wishlist", select: "_id name picture" },
                  { path: "variants", select: "_id price quantity options image sold status" },
                ],
              },
            },
          ],
        })
        .sort({ createdAt: -1 });
  
      let foundWishlist = [...foundComboWishlist, ...foundProductWishlist];
      if (onModel === "Product") foundWishlist = foundProductWishlist;
      if (onModel === "Combo") foundWishlist = foundComboWishlist;
  
      return res.status(200).json({
        success: true,
        data: foundWishlist,
      });
    } catch (err) {
      res.status(err?.status || 400).json({ success: false, err: err.message });
    }
  };