import { Rocket } from "lucide-react";
import { MotionDiv } from "./motion";

export default function ComingSoon({ title = "Home Page" }) {
  return (
    <section className="py-5">
      <h2 className="text-2xl text-center font-bold">{title}</h2>
      <div className="flex items-center justify-center p-4">
        <div className="border-2 border-dashed border-gray-800 rounded-lg p-8 md:p-12 w-full max-w-3xl">
          <div className="flex flex-col items-center justify-center space-y-6 p-6">
            <MotionDiv
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Rocket className="w-12 h-12 text-gray-600" />
            </MotionDiv>

            <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-center">
              Coming Soon
            </h1>

            <p className="text-gray-500 text-center text-lg md:text-xl">
              We are working on this page. Please check back later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
