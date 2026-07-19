export const metadata = {
  title: 'ai-opportunity-compass',
  description: 'Understand how you can create value in the AI era.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-800">
        {children}
      </body>
    </html>
  )
}
