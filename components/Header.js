import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          HOPEFUND
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/food-redistribution" className="hover:underline">Food</Link></li>
          <li><Link href="/book-exchange" className="hover:underline">Books</Link></li>
          <li><Link href="/psychological-support" className="hover:underline">Psychological</Link></li>
          <li><Link href="/emotional-support" className="hover:underline">Emotional</Link></li>
        </ul>
      </nav>
    </header>
  )
}