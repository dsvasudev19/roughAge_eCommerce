const { Category, Media } = require("../../models");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
        attributes: ["id", "name"],
      include: {
        model: Media,
        as: "media",
        attributes: ["url", "file_name", "path"],
      },
    });
    if (categories.length > 0) {
      return res.status(200).json({
        success: true,
        data: categories,
        message: "Categories fetched successfully",
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "No categories found" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
        attributes: ["id", "name"],
      include: {
        model: Media,
        as: "media",
        attributes: ["url", "file_name", "path"],
      },
    });
    if (category) {
      return res.status(200).json({
        success: true,
        data: category,
        message: "Category fetched successfully",
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    if (category) {
      const imageUrl = "./uploads/categoryMedia/" + req.file.filename;
      const media = await Media.create({
        mediable_id: category.id,
        mediable_type: "Category",
        url: imageUrl,
        name: req.file.originalname,
        file_name: req.file.filename,
        file_type: req.file.mimetype,
        file_size: req.file.size,
        featured: true,
      });
      if (media) {
        return res.status(200).json({
          success: true,
          data: category,
          message: "Category created successfully",
        });
      } else {
        const category = await Category.findByPk(category.id);
        await category.destroy();

        return res
          .status(400)
          .json({ success: false, message: "Failed to create category" });
      }
    }
    return res
      .status(400)
      .json({ success: false, message: "Failed to create category" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.update(req.body);
      if (req.file) {
        const imageUrl = "./uploads/categoryMedia/" + req.file.filename;
        const mediaDetails = {
          mediable_id: category.id,
          mediable_type: "Category",
          url: imageUrl,
          name: req.file.originalname,
          file_name: req.file.filename,
          file_type: req.file.mimetype,
          file_size: req.file.size,
          featured: true,
        };
        const media = await Media.findOne({
          where: { mediable_id: category.id },
        });
        if (media) {
          await media.update(mediaDetails);
          return res.status(200).json({
            success: true,
            data: category,
            message: "Category updated successfully",
          });
        } else {
            await Media.create(mediaDetails);
            return res.status(200).json({
                success: true,
                data: category,
                message: "Category updated successfully",
            });
        }
      }
      return res
        .status(200)
        .json({ message: "Category updated", data: category });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Category deleted" });
    } else {
      res.status(404).json({ success: false, message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
