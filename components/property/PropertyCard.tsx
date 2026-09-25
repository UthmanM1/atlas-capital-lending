import Link from "next/link";
import Pic, { Ratio } from "./Pic";

export default function PropertyCard({
  href,
  image,
  alt,
  ratio = "r43",
  pill,
  title,
  subtitle,
}: {
  href?: string;
  image: string;
  alt: string;
  ratio?: Ratio;
  pill?: string;
  title: string;
  subtitle?: string;
}) {
  const body = (
    <>
      <Pic src={image} alt={alt} ratio={ratio} />
      <div className="cardbody">
        {pill && <span className="pill">{pill}</span>}
        <h3 style={{ marginTop: pill ? 6 : 0 }}>{title}</h3>
        {subtitle && <p className="mut">{subtitle}</p>}
      </div>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="card imgcard" style={{ textDecoration: "none" }}>
        {body}
      </Link>
    );
  }
  return <div className="card imgcard">{body}</div>;
}
