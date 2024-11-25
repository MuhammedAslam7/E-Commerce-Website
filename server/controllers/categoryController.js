import { Category } from "../model/category.js";

export const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    await Category.create({
      name,
      description,
    });

    res.status(200).json({ message: "Category Successfully Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
//////////////////////////////////////////////////////
export const allCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();

    console.log(allCategories);

    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/////////////////////////////////////////////////////////
export const updateCategoryStatus = async (req, res) => {
  const { id } = req.params;
  const { listed } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { listed },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
