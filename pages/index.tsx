import { images } from "next/dist/build/webpack/config/blocks/images";
import { useEffect, useRef } from "react";
import { SocialHead } from "../components/SocialHead";
import { useImage } from "../components/useImage";
import { useWindowSize } from "../components/useWindowSize";

const IndexPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { height, width } = useWindowSize();
  const bgImage = useImage(
    "https://cdn.lu.ma/misc/sp/3506d109-1b1f-45e3-8e02-743e3bb44255"
  );

  useEffect(() => {
    if (!height || !width || !bgImage) {
      return;
    }

    const size = Math.min(height, width);
    const canvas = canvasRef.current;
    canvas.width = size;
    canvas.height = size;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bgImage, 0, 0, size, size);
    canvas.style.backgroundImage = `url("https://cdn.lu.ma/misc/1x/84acba27-3eb0-485c-b680-c6d00e73c117")`;

    const units = size / 100;

    const brushRadius = units * 4;

    function detectLeftButton(event) {
      if ("buttons" in event) {
        return event.buttons === 1;
      } else if ("which" in event) {
        return event.which === 1;
      } else {
        return event.button === 1;
      }
    }

    function getBrushPos(xRef, yRef) {
      const bridgeRect = canvas.getBoundingClientRect();
      return {
        x: Math.floor(
          ((xRef - bridgeRect.left) / (bridgeRect.right - bridgeRect.left)) *
            size
        ),
        y: Math.floor(
          ((yRef - bridgeRect.top) / (bridgeRect.bottom - bridgeRect.top)) *
            size
        ),
      };
    }

    function drawDot(mouseX, mouseY) {
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, brushRadius, 0, 2 * Math.PI, true);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.globalCompositeOperation = "destination-out";
      ctx.fill();
    }

    canvas.addEventListener(
      "mousemove",
      function (e) {
        const brushPos = getBrushPos(e.clientX, e.clientY);
        const leftBut = detectLeftButton(e);
        if (leftBut) {
          drawDot(brushPos.x, brushPos.y);
        }
      },
      false
    );

    canvas.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
        const touch = e.targetTouches[0];
        if (touch) {
          const brushPos = getBrushPos(touch.pageX, touch.pageY);
          drawDot(brushPos.x, brushPos.y);
        }
      },
      false
    );
  }, [height, width, bgImage]);

  return (
    <div style={{ display: "flex" }}>
      <SocialHead
        title={"Victor Results"}
        description={"Scratch to reveal the race time!"}
        imageUrl={
          "https://cdn.lu.ma/misc/5y/918b1dff-c7a3-4e33-90d2-527a727632e7"
        }
        imageSize={{ width: 1664, height: 1664 }}
        faviconUrl={
          "https://cdn.lu.ma/misc/qh/24768432-0027-4189-a06a-c53ca5c9ad27"
        }
      />

      <canvas className="canvas" ref={canvasRef}></canvas>

      <style jsx global>{`
        body {
          margin: 0;
          position: fixed;
        }

        .canvas {
          background-size: cover;
          cursor: crosshair;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
