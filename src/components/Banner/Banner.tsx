import classes from "./Banner.module.scss";

interface BannerProps {
  src: string;
  alt: string;
}

export function Banner({ src, alt }: BannerProps) {
  return (
    <div className={classes.container}>
      <img src={src} alt={alt} className={classes.content} />
    </div>
  );
}
