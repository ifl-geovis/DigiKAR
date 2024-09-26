import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

const fontUrl =
  "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,900&display=swap";

async function fetchFont(url: string) {
  const response = await fetch(url);
  const css = await response.text();

  // Extract the font URL from the CSS
  const fontUrlMatch = css.match(/url\(([^)]+)\)/);
  if (!fontUrlMatch) throw new Error("Could not extract font URL");

  const fontUrl = fontUrlMatch[1];
  const fontResponse = await fetch(fontUrl);
  return await fontResponse.arrayBuffer();
}

export default async function Icon() {
  const fontData = await fetchFont(fontUrl);

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="w-[32px] h-[32px] flex items-center justify-center rounded-lg bg-black text-[24px] font-serif text-white">
        D
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
