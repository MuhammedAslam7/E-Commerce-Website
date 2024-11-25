import { Brand } from "../model/brand.js";

export const addBrand = async (req, res) => {
  const { name, description } = req.body;

  try {
    await Brand.create({
      name,
      description,
    });

    res.status(200).json({ message: "Brand Successfully Created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const allBrands = async (req, res) => {
  try {
    const allBrands = await Brand.find();

    console.log(allBrands);

    res.status(200).json(allBrands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/////////////////////////////////////////////////////////
export const updateBrandStatus = async (req, res) => {
  const { id } = req.params;
  const { listed } = req.body;

  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { listed },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
