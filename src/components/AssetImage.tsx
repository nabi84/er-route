import { useState } from "react";

type AssetImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

export function AssetImage({ src, alt, className, imgClassName }: AssetImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className} data-loaded={loaded}>
      {!loaded ? <div className="asset-placeholder" aria-hidden="true" /> : null}
      <img
        src={src}
        alt={alt}
        className={imgClassName}
        loading="eager"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
}
