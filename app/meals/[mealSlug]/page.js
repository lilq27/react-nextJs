import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) { // 동적 메타데이터
    const meal = await getMeal(params.mealSlug);

    if(!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default async function MealDetailsPage({ params }) {
    console.log("MealDetailsPage", params);

    const data = await params;
    const meal = await getMeal(data.mealSlug);

    if(!meal) {
        notFound(); //next.js 함수 => 가까운 not-found.js 찾음
    }

    console.log("meal", meal)

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}></header>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creater}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            <main>
                <p 
                    className={classes.instructions} 
                    dangerouslySetInnerHTML={{__html: meal.instructions,}}
                >
                </p>
                {/* dangerouslySetInnerHTML => 크로스 사이트 스크립트(XSS) 방지 */}
            </main>
        </>
    );
}