
import React from "react";
import Layout from "../components/Layout";
import { Heart } from "lucide-react";

const Tribute = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card rounded-xl p-8 md:p-12 shadow-lg relative overflow-hidden">
          {/* Background hearts */}
          <div className="absolute top-10 right-10 opacity-10">
            <Heart size={120} fill="#F5A9DF" strokeWidth={1} />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <Heart size={120} fill="#9B87F5" strokeWidth={1} />
          </div>
          
          <h1 className="font-fountain text-4xl md:text-6xl text-center mb-8 olivia-gradient-text">
            To Olivia
          </h1>
          
          <div className="font-fountain text-xl md:text-2xl leading-relaxed space-y-6 text-gray-800 relative z-10">
            <p>
              Liv, there is a quiet elegance in the way you carry yourself—graceful yet strong, delicate yet unwavering. Your deep brown eyes hold an entire universe within them, reflecting warmth, wisdom, and an understanding far beyond your years. They are the kind of eyes that see not just the surface of things, but the depth beneath, carrying both a softness and an intensity that makes the world pause.
            </p>
            
            <p>
              The way the light dances across your skin gives you an almost ethereal glow, as if kissed by the sun itself, a radiance that comes not just from beauty but from the fire of your spirit. Every movement you make, every glance, every subtle smile, is poetry in motion—effortless, enchanting, magnetic. And that smile of yours, Olivia, is the kind that lingers in the air long after you've walked away, leaving behind a whisper of something unforgettable, something dreamlike. There is a rare kind of beauty in you, not just in the way you look, but in the way you exist—a beauty that is not only seen but felt, one that stays imprinted on the heart.
            </p>
            
            <p>
              Yet, as breathtaking as you are, your true brilliance lies beyond the surface. Olivia, your mind is a universe of its own, filled with compassion, curiosity, and an unshakable desire to understand and heal. You move through life with a rare depth, a heart devoted to psychology, to unraveling the intricate complexities of the human experience.
            </p>
            
            <p>
              There is something mesmerizing about the way you listen—fully, completely, as if every word spoken to you holds value, as if every person you meet matters. It is in the way you care, the way you hold space for others, the way you make people feel seen and understood, that your true magic shines.
            </p>
            
            <p>
              Liv, you are not just someone who walks through the world—you shape it, you touch lives, you leave imprints of kindness and wisdom wherever you go. To stand in your presence is to be in the orbit of something truly extraordinary—because you, Liv, are not just beautiful, you are luminous, a masterpiece of heart, mind, and soul.
            </p>
            
            <div className="text-center mt-8">
              <Heart className="inline-block text-olivia-pink" fill="#F5A9DF" size={32} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tribute;
