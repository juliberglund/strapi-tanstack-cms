import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PenSquare } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Kunde inte hämta data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            Mitt CMS 🚀
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Data hämtas direkt från Strapi (localhost:1337)
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-400">Laddar inlägg...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">Inga inlägg hittades.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <PenSquare className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl font-semibold text-white">
                    {post.title}
                  </h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {post.content?.[0]?.children?.[0]?.text ?? "Inget innehåll"}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Publicerad:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("sv-SE")}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
