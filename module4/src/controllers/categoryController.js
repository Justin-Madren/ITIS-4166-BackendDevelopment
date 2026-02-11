import { 
    getAllCategories, 
    getCategoryById, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../services/categoryService.js";


export function getAllCategoriesHandler(req, res) {
    const categories = getAllCategories();
    res.status(200).json(categories);
}

export function getCategoryByIdHandler(req, res) {
  const id = Number(req.params.id);
  const category = getCategoryById(id);

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.status(200).json(category);
}

export function createCategoryHandler(req, res){
    const { name } = req.body;
    const newCategory = createCategory({ name });
    res.status(201).json(newCategory);
}

export function updateCategoryHandler(req, res){
    const id = parseInt(req.params.id);

    const existing = getCategoryById(id);
    if (!existing) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const { name } = req.body;
    
    // Check for duplicate name in other categories
    const allCategories = getAllCategories();
    const isDuplicate = allCategories.some(
        (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== id
    );
    
    if (isDuplicate) {
        return res.status(400).json({ error: 'Category name must be unique' });
    }
    
    const updatedCategory = updateCategory(id, { name });
    res.status(200).json(updatedCategory);
}

export function deleteCategoryHandler(req, res){
    const id = parseInt(req.params.id);

    const existing = getCategoryById(id);
    if (!existing) {
        return res.status(404).json({ error: 'Category not found' });
    }

    deleteCategory(id);
    res.status(204).send();
}