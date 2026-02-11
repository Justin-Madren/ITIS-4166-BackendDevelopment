import { categories, getNextId } from "../db/categories.js";

export function getAll(){
    return categories;
}

export function getById(id){
    let category = categories.find(c => c.id === id);
    return category;
}

export function create(categoryData){
    const newCategory = {
        id: getNextId(),
        name: categoryData.name,
    };
    categories.push(newCategory);
    return newCategory;
}

export function update(id, categoryData){
    const category = categories.find(c => c.id === id);
    if(!category) return undefined;
    if(categoryData.name) category.name = categoryData.name;
    return category;
}

export function remove(id){
    const index = categories.findIndex(c => c.id === id);
    if(index === -1){
        return false;
    }
    categories.splice(index, 1);
    return true;
}