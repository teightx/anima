import { redirect } from 'next/navigation';

/**
 * Home page - redirects to the main app
 * Using server-side redirect for better performance
 */
export default function HomePage() {
  redirect('/today');
}
