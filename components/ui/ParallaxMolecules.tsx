'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { HexMolecule } from './HexMolecule';

export function ParallaxMolecules() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 3000], [0, 90]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -60]);
  const y3 = useTransform(scrollY, [0, 3000], [0, 120]);
  const y4 = useTransform(scrollY, [0, 3000], [0, -105]);
  const y5 = useTransform(scrollY, [0, 3000], [0, 75]);
  const y6 = useTransform(scrollY, [0, 3000], [0, -135]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute top-[8%] left-[3%]" style={{ y: y1 }}>
        <HexMolecule size={100} className="opacity-[0.05] animate-float" />
      </motion.div>
      <motion.div className="absolute top-[25%] right-[5%]" style={{ y: y2 }}>
        <HexMolecule size={40} className="opacity-[0.06] animate-float" style={{ animationDelay: '2s' }} />
      </motion.div>
      <motion.div className="absolute top-[45%] left-[6%]" style={{ y: y3 }}>
        <HexMolecule size={70} className="opacity-[0.04] animate-float" style={{ animationDelay: '4s' }} />
      </motion.div>
      <motion.div className="absolute top-[65%] right-[4%]" style={{ y: y4 }}>
        <HexMolecule size={50} className="opacity-[0.05] animate-float" style={{ animationDelay: '1s' }} />
      </motion.div>
      <motion.div className="absolute top-[82%] left-[8%]" style={{ y: y5 }}>
        <HexMolecule size={80} className="opacity-[0.04] animate-float" style={{ animationDelay: '3s' }} />
      </motion.div>
      <motion.div className="absolute top-[92%] right-[7%]" style={{ y: y6 }}>
        <HexMolecule size={45} className="opacity-[0.06] animate-float" style={{ animationDelay: '5s' }} />
      </motion.div>
    </div>
  );
}
