import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {/* <nav>
            <Link href="/">Home</Link>
            <Link href="/notes">Notes</Link>
          </nav> */}
          <nav className="border-b border-gray-200 py-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-gray-800 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/notes"
                  className="text-gray-800 hover:text-blue-600"
                >
                  Notes
                </Link>
              </li>
            </ul>
          </nav>

          {children}
        </main>
      </body>
    </html>
  );
}
