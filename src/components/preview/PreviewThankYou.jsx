import { buttonStyleToCss, buttonWrapperToCss, marginToCss, textStyleToCss } from "./previewStyleHelpers";

export default function PreviewThankYou({ thankYou, thankYouStyle }) {
  const handleCtaClick = () => {
    if (thankYou.redirectUrl) {
      // Opens in a new tab so it's easy to confirm the redirect fired
      // without losing your place in the builder.
      window.open(thankYou.redirectUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {thankYou.media.type !== "none" && thankYou.media.url && (
        <img
          src={thankYou.media.url}
          alt="Thank you"
          style={{
            width: thankYouStyle.image.width,
            height: thankYouStyle.image.height,
            objectFit: "cover",
            borderRadius: 12,
            display: "inline-block",
            ...marginToCss(thankYouStyle.image.margin),
          }}
        />
      )}
      <h3 style={textStyleToCss(thankYouStyle.title)}>{thankYou.title}</h3>
      {thankYou.subtitle && (
        <p style={textStyleToCss(thankYouStyle.subtitle)}>{thankYou.subtitle}</p>
      )}
      <div style={buttonWrapperToCss(thankYouStyle.button)}>
        <button type="button" onClick={handleCtaClick} style={buttonStyleToCss(thankYouStyle.button)}>
          {thankYou.ctaButtonText || "Done"}
        </button>
      </div>
    </div>
  );
}
