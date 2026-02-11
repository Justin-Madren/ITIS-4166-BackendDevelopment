import { getAll, getById, create, update, remove } from "../repositories/categoryRepo.js"; 

export function getAllCategories(){
    return getAll();
}

export function getCategoryById(id){
    const category = getById(id);
    if(category){
        return category;
    }else{
        const error = new Error(`category ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export function createCategory(categoryData){
    return create(categoryData);
}

export function updateCategory(id, categoryData){
    const updatedCategory = update(id, categoryData);
    if(updatedCategory){
        return updatedCategory;
    }else{
        const error = new Error(`category ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export function deleteCategory(id){
    const result = remove(id);
    if(result){
        return;
    }else{
        const error = new Error(`category ${id} not found`);
        error.status = 404;
        throw error;
    }
}