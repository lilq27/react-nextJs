export default function SomeSlug(props) {
    console.log("props", props)
    return (
        <main>
            <p>{props.mealSlug}</p>
        </main>
    );
}