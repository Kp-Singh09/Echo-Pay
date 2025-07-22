// lib/particlesConfig.ts
import type { ISourceOptions } from "tsparticles-engine";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  detectRetina: true,
  particles: {
    number: {
      value: 40,
      density: { enable: false },
    },
    color: {
      value: ["#22c55e", "#00BFFF", "#facc15"],
    },
    shape: {
      type: "char",
      character: [
        { value: "$", font: "Arial", fill: true },
        { value: "₹", font: "Arial", fill: true },
        { value: "€", font: "Arial", fill: true },
        { value: "£", font: "Arial", fill: true },
        { value: "¥", font: "Arial", fill: true },
      ],
    },
    size: {
      value: { min: 12, max: 22 },
      random: { enable: true, minimumValue: 12 },
    },
    opacity: {
      value: 1,
      random: { enable: true, minimumValue: 0.6 },
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: 10,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 1.5, max: 2.5 },
      direction: "none",
      outModes: { default: "bounce" },
      random: true,
    },
    collisions: {
      enable: true,
      mode: "bounce",
    },
    shadow: {
      enable: true,
      color: "#ffffff",
      blur: 1,
    },
    life: {
      duration: {
        value: { min: 20, max: 40 },
      },
      count: 0,
      delay: {
        value: { min: 0, max: 2 },
      },
    },
    links: {
      enable: true,
      distance: 140,
      color: "#3B82F6",
      opacity: 0.7,
      width: 3,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 180,
        links: {
          opacity: 0.9,
        },
      },
    },
  },
};

export default particlesOptions;
