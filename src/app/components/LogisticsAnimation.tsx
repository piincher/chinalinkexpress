// components/LogisticsAnimation.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LogisticsAnimation: React.FC = () => {
   const svgRef = useRef<SVGSVGElement>(null);

   useEffect(() => {
      if (!svgRef.current) return;

      const svg = svgRef.current;
      const PLANE_COUNT = 3;
      const SHIP_COUNT = 2;
      const CONTAINER_COUNT = 5;
      const ARROW_COUNT = 4;

      const timelines: gsap.core.Timeline[] = [];

      const createPlane = (delay: number, path: string, duration: number) => {
         const plane = document.createElementNS("http://www.w3.org/2000/svg", "use");
         plane.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#plane-icon");
         plane.setAttribute("id", `plane-${Date.now()}-${Math.random()}`);
         const planesGroup = svg.getElementById("planes-group");
         if (planesGroup) planesGroup.appendChild(plane);

         const tl = gsap.timeline({
            repeat: -1,
            delay: delay,
            paused: true,
         });

         tl.set(plane, {
            x: -100,
            y: 80,
            scale: 0.8,
            opacity: 0,
            rotation: -10,
            transformOrigin: "center",
         })
            .to(plane, {
               opacity: 0.8,
               duration: 1,
               ease: "power2.out",
            })
            .to(
               plane,
               {
                  motionPath: {
                     path: path,
                     align: path,
                     alignOrigin: [0.5, 0.5],
                  },
                  scale: 1,
                  rotation: 0,
                  duration: duration * 0.7,
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(
               plane,
               {
                  scale: 0.6,
                  opacity: 0,
                  y: "+=30",
                  duration: duration * 0.3,
                  ease: "power2.in",
               },
               ">"
            )
            .add(() => {
               if (plane.parentNode) plane.parentNode.removeChild(plane);
            });

         timelines.push(tl);
         return tl;
      };

      const createShip = (delay: number, yPosition: number, duration: number) => {
         const ship = document.createElementNS("http://www.w3.org/2000/svg", "use");
         ship.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#ship-icon");
         ship.setAttribute("id", `ship-${Date.now()}-${Math.random()}`);
         const shipsGroup = svg.getElementById("ships-group");
         if (shipsGroup) shipsGroup.appendChild(ship);

         const tl = gsap.timeline({
            repeat: -1,
            delay: delay,
            paused: true,
         });

         tl.set(ship, {
            x: -150,
            y: yPosition,
            scale: 0.7,
            opacity: 0,
            transformOrigin: "center",
         })
            .to(ship, {
               opacity: 0.9,
               duration: 1.5,
               ease: "power2.out",
            })
            .to(
               ship,
               {
                  x: 1350,
                  scale: 1,
                  duration: duration,
                  ease: "none",
               },
               "<"
            )
            .to(
               ship,
               {
                  scale: 0.5,
                  opacity: 0,
                  duration: 1,
                  ease: "power2.in",
               },
               ">"
            )
            .add(() => {
               if (ship.parentNode) ship.parentNode.removeChild(ship);
            });

         timelines.push(tl);
         return tl;
      };

      const createContainerAnimation = () => {
         const dockGroup = svg.getElementById("dock-group");
         if (!dockGroup) return;

         const containers: SVGUseElement[] = [];
         for (let i = 0; i < CONTAINER_COUNT; i++) {
            const container = document.createElementNS("http://www.w3.org/2000/svg", "use");
            container.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#container-icon");
            container.setAttribute("id", `container-${i}`);
            container.setAttribute("data-index", i.toString());
            dockGroup.appendChild(container);
            containers.push(container);

            gsap.set(container, {
               x: (i - CONTAINER_COUNT / 2) * 40,
               y: -50,
               opacity: 0,
               scale: 0.5,
            });
         }

         const tl = gsap.timeline({
            repeat: -1,
            paused: true,
         });

         containers.forEach((container, index) => {
            tl.to(
               container,
               {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                  delay: index * 0.3,
               },
               0
            );
         });

         tl.to({}, { duration: 2 });

         for (let i = containers.length - 1; i >= 0; i--) {
            tl.to(
               containers[i],
               {
                  y: 50,
                  opacity: 0,
                  scale: 0.5,
                  duration: 0.6,
                  ease: "power2.in",
               },
               "+=0.1"
            );
         }

         timelines.push(tl);
         return tl;
      };

      const createArrow = (
         delay: number,
         startX: number,
         startY: number,
         endX: number,
         endY: number
      ) => {
         const arrow = document.createElementNS("http://www.w3.org/2000/svg", "use");
         arrow.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#arrow-icon");
         arrow.setAttribute("id", `arrow-${Date.now()}-${Math.random()}`);
         const arrowsGroup = svg.getElementById("arrows-group");
         if (arrowsGroup) arrowsGroup.appendChild(arrow);

         const tl = gsap.timeline({
            repeat: -1,
            delay: delay,
            paused: true,
         });

         tl.set(arrow, {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.5,
         })
            .to(arrow, {
               opacity: 0.7,
               scale: 1,
               duration: 0.5,
               ease: "power2.out",
            })
            .to(
               arrow,
               {
                  x: endX,
                  y: endY,
                  duration: 2,
                  ease: "power1.inOut",
               },
               "<"
            )
            .to(
               arrow,
               {
                  opacity: 0,
                  scale: 0.3,
                  duration: 0.5,
                  ease: "power2.in",
               },
               ">"
            )
            .add(() => {
               if (arrow.parentNode) arrow.parentNode.removeChild(arrow);
            });

         timelines.push(tl);
         return tl;
      };

      // Initialize animations
      const planeTimelines = [
         createPlane(0, "M-100,100 Q300,50 700,80 T1300,100", 15),
         createPlane(5, "M-100,120 Q400,70 800,90 T1300,120", 18),
         createPlane(12, "M-100,80 Q200,40 600,70 T1300,80", 16),
      ];

      const shipTimelines = [createShip(0, 245, 25), createShip(8, 265, 22)];

      const containerTimeline = createContainerAnimation();

      const arrowTimelines = [
         createArrow(0, 300, 330, 350, 300),
         createArrow(2, 400, 330, 450, 280),
         createArrow(4, 700, 330, 650, 290),
         createArrow(6, 800, 330, 750, 270),
      ];

      // Play all timelines
      timelines.forEach((tl) => tl.play());

      // Pause/Resume on hover
      const handleMouseEnter = () => {
         timelines.forEach((tl) => tl.pause());
      };

      const handleMouseLeave = () => {
         timelines.forEach((tl) => tl.resume());
      };

      svg.addEventListener("mouseenter", handleMouseEnter);
      svg.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
         svg.removeEventListener("mouseenter", handleMouseEnter);
         svg.removeEventListener("mouseleave", handleMouseLeave);
         timelines.forEach((tl) => tl.kill());
      };
   }, []);

   return (
      <svg
         ref={svgRef}
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1200 400"
         preserveAspectRatio="xMidYMid slice"
         className="absolute inset-0 opacity-30 pointer-events-none"
         style={{ zIndex: 0 }}
      >
         <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.1" />
               <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.1" />
               <stop offset="100%" stopColor="#00008B" stopOpacity="0.05" />
            </linearGradient>
            <g id="plane-icon">
               <path
                  d="M0,0 L10,2.5 L7.5,5 L12.5,5 L7.5,7.5 L10,10 L0,7.5 L-2.5,10 L-5,5 Z"
                  fill="#3B82F6"
               />
               <circle cx="1" cy="2" r="0.5" fill="#FBBF24" />
            </g>
            <g id="ship-icon">
               <path
                  d="M-5,7.5 L0,2.5 L5,2.5 L10,7.5 L5,10 L0,10 Z M2.5,2.5 L2.5,0"
                  fill="#10B981"
               />
               <rect x="1" y="-1" width="3" height="1" fill="#FBBF24" />
            </g>
            <g id="container-icon">
               <rect
                  x="-7.5"
                  y="-5"
                  width="15"
                  height="10"
                  rx="1"
                  fill="#F59E0B"
                  stroke="#D97706"
                  strokeWidth="0.5"
               />
               <line x1="-6" y1="-3" x2="6" y2="-3" stroke="#D97706" strokeWidth="0.3" />
               <line x1="-6" y1="0" x2="6" y2="0" stroke="#D97706" strokeWidth="0.3" />
            </g>
            <g id="arrow-icon">
               <path
                  d="M-5,0 L5,0 L3,-2 M5,0 L3,2"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowhead)"
               />
            </g>
            <marker
               id="arrowhead"
               markerWidth="10"
               markerHeight="7"
               refX="10"
               refY="3.5"
               orient="auto"
            >
               <path d="M0,0 L10,3.5 L0,7 Z" fill="#F59E0B" />
            </marker>
         </defs>

         {/* Background Gradients */}
         <rect width="100%" height="50%" fill="url(#skyGradient)" />
         <rect y="200" width="100%" height="200" fill="url(#seaGradient)" />

         {/* Path Lines */}
         <path
            d="M-100,100 Q300,50 700,80 T1300,100"
            stroke="#3B82F6"
            strokeWidth="1"
            strokeDasharray="4,8"
            opacity="0.3"
         />
         <path
            d="M-100,250 L1300,250"
            stroke="#10B981"
            strokeWidth="1"
            strokeDasharray="4,8"
            opacity="0.3"
         />
         <path
            d="M200,350 L1000,350"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeDasharray="4,8"
            opacity="0.3"
         />

         {/* Dynamic Groups */}
         <g id="planes-group" />
         <g id="ships-group" />
         <g id="dock-group" transform="translate(600, 340)">
            <rect x="-200" y="0" width="400" height="10" fill="#4B5563" rx="2" />
         </g>
         <g id="arrows-group" />
      </svg>
   );
};

export default LogisticsAnimation;
