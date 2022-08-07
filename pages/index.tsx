import { images } from "next/dist/build/webpack/config/blocks/images";
import { useEffect, useRef } from "react";
import { SocialHead } from "../components/SocialHead";
import { useImage } from "../components/useImage";
import { useWindowSize } from "../components/useWindowSize";

const IndexPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { height, width } = useWindowSize();
  const bgImage = useImage(
    "https://cdn.lu.ma/misc/1x/84acba27-3eb0-485c-b680-c6d00e73c117"
  );

  useEffect(() => {
    if (!height || !width || !bgImage) {
      return;
    }

    const size = Math.min(height, width);
    const canvas = canvasRef.current;
    canvas.width = size;
    canvas.height = size;

    console.log("canvas", canvas);
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bgImage, 0, 0, size, size);

    const units = size / 100;

    ctx.rotate((3 * Math.PI) / 180);
    ctx.fillStyle = "darkgray";
    ctx.fillRect(units * 7, units * 53, units * 60, units * 40);

    ctx.font = "68px lato";
    ctx.fillStyle = "white";

    const textX = units * 16;
    const textY = units * 70;
    ctx.fillText("scratch to", textX, textY);
    ctx.fillText("reveal", textX + units * 7, textY + units * 11);

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    console.log("ctx", ctx);
  }, [height, width, bgImage]);

  return (
    <div style={{ display: "flex" }}>
      <SocialHead
        title={"Victor Result"}
        description={"Scratch to reveal the race time!"}
        imageUrl={
          "https://cdn.lu.ma/misc/y3/75060abf-2ced-4aa7-8cc0-3a7a52821884"
        }
        imageSize={{ width: 1730, height: 1730 }}
      />
      
      <canvas id="tutorial" ref={canvasRef}></canvas>

      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
