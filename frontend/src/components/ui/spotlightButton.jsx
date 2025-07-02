import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ButtonWrapper = () => {
  return (
    <div className="flex min-h-[200px] items-center justify-center px-4">
      <SpotlightButton />
    </div>
  );
};

const SpotlightButton = () => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width, height } = e.target.getBoundingClientRect();
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const left = `${(offsetX / width) * 100}%`;
      const top = `${(offsetY / height) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: 'forwards' });
      spanRef.current.animate({ top }, { duration: 250, fill: 'forwards' });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: '50%' },
        { duration: 100, fill: 'forwards' }
      );
      spanRef.current.animate(
        { top: '50%' },
        { duration: 100, fill: 'forwards' }
      );
    };

    btnRef.current.addEventListener('mousemove', handleMouseMove);
    btnRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btnRef.current.removeEventListener('mousemove', handleMouseMove);
      btnRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      class="relative w-full max-w-xl h-full max-h-full min-h-[120px] overflow-hidden rounded-lg bg-[#161b22] px-4 py-3 text-lg font-medium text-white border-solid border-2"
      // class="border-solid border-2 border-indigo-600"
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference text-2xl">
        Stars!
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100 border-solid border-8 border-slate-300"
      />
    </motion.button>
  );
};

export default ButtonWrapper;
