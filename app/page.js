import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
      </h1>
      <p>
        <Link href="/meals">Meals</Link>
      </p>
      <p>
        <Link href="/meals/share">Share Meals</Link>
      </p>
      <p>
        <Link href="/community">Community</Link>
      </p>
      <p>  
        <Link href="/meals/meals-1">Meals-1</Link>
      </p>
      <p>  
        <Link href="/meals/meals-2">Meals-2</Link>
      </p>
    </main>
  );
}
