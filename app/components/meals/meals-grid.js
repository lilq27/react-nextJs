import MealItem from './meal-item';
import classes from './melas-grid.module.css'

export default function MealsGrid({meals}) {
    return (
        <ul className={classes.meals}>
            {meals.map( (meal) => (
                <li key={meal.id}>
                    <MealItem {...meal} />
                    {/* == <MealItem id={meal.id} name={meal.name} price={meal.price} /> ...은 모든 속성을 뜻함 */}
                </li>
            ))}
        </ul>
    );
}