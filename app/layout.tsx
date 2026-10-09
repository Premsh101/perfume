import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Shrinika Fragrances — A feeling, forever.',description:'Discover the world of Shrinika Fragrances. Explore the collection, find your scent and follow your fragrance journey.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
