interface Post {
    id: string
    title: string
    author: string
    content: string
    date: string
    category: string
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = false // or false, to 404 on unknown paths

export async function generateStaticParams() {
    const posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) => res.json())
    return posts.map((post) => ({
        id: String(post.id),
    }))
}

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params
    const post: Post = await fetch(`https://api.vercel.app/blog/${id}`).then((res) => res.json())
    console.log(post)
    function formatDate(dateString: string): string {
        const date = new Date(dateString); // Converte string para objeto Date
        return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date); // Formata a data
    }

    return <main className="max-w-3xl mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title} <span className="text-blue-600 text-lg">({post.category})</span>
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {post.content}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
            <cite className="font-semibold not-italic">{post.author}</cite>
            <small>{formatDate(post.date)}</small>
        </div>
    </main>
}