'use server'
 
export async function list() {
    const data = await fetch('http://localhost:3000/api');
    const response = await data.json();
    return response.goals;
}