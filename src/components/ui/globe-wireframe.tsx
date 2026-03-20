'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlobeWireframeProps {
  className?: string;
  variant?: 'wireframe' | 'wireframesolid' | 'solid';
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  strokeWidth?: number;
  graticuleOpacity?: number;
  scale?: number;
}

export default function GlobeWireframe({
  className = 'aspect-square w-full max-w-150',
  variant,
  autoRotate,
  autoRotateSpeed,
  strokeWidth,
  graticuleOpacity,
  scale,
}: GlobeWireframeProps) {
  void variant;
  void autoRotate;
  void autoRotateSpeed;
  void strokeWidth;
  void graticuleOpacity;
  void scale;

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-primary opacity-20 animate-pulse"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* Simple Graticule Fallback */}
        <ellipse cx="50" cy="50" rx="48" ry="15" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <ellipse cx="50" cy="50" rx="48" ry="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <ellipse cx="50" cy="50" rx="15" ry="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <ellipse cx="50" cy="50" rx="30" ry="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.2" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.2" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 text-center px-8">
          Globe Visualization <br /> [Install d3 to activate]
        </p>
      </div>
    </div>
  );
}
