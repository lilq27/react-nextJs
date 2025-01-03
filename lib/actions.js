'use server';

export async function shareMeal(formData) {

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creater: formData.get('name'),
        creater_email: formData.get('email')
    }

    console.log('meal', meal);
}