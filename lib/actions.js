'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    };

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {

        return {
            message: 'Invalid input.'
        };
        // throw new Error('Invalid input');
    }

    await saveMeal(meal);
    revalidatePath('/meals', 'layout'); 
    //nextjs build 됐을 때 캐싱 방지 , 두번째 인자 기본값은 page => 각각 검사 , layout => 모든 페이지 검사
    // revalidatePath('/', 'layout'); => 모든 경로 캐싱 방지
    redirect('/meals');
}