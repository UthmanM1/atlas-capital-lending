import Link from "next/link";
import { notFound } from "next/navigation";
import Pic from "@/components/property/Pic";
import { FaqList } from "@/components/layout/AdvisorCallout";
import { ARTICLES, getArticle } from "@/lib/content/articles";
import { FAQ } from "@/lib/content/knowledge-base";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="wrap sec pane" style={{ maxWidth: 760 }}>
      <Link href="/resources">← Resources</Link>
      <h1 style={{ fontSize: "2.3rem" }}>{article.title}</h1>
      <p className="mut">{article.minutes} min read · Illustrative content</p>
      <Pic src={article.image} alt={article.alt} ratio="r169" />
      <p className="serif" style={{ fontSize: "1.2rem", marginTop: 16 }}>
        {article.excerpt}
      </p>
      <h2>Overview</h2>
      <p>{article.overview}</p>
      <h2>A worked example</h2>
      <p>{article.example}</p>
      <FaqList items={FAQ.slice(1, 3)} />
      <h3>Related</h3>
      {related.map((r) => (
        <Link key={r.slug} href={`/resources/${r.slug}`} style={{ display: "block" }}>
          {r.title}
        </Link>
      ))}
      <p className="note" style={{ marginTop: 16 }}>
        Illustrative only. Requirements, pricing and availability vary by program and are not offers or
        commitments.
      </p>
      <Link className="btn" href="/calculators/dscr">
        Run your numbers
      </Link>
    </article>
  );
}
