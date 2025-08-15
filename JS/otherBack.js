tsParticles.load("tsparticles", {
  particles: {
    number: { value: 100 },
    color: { value: "#04e2cfff" },
    shape: { type: "square" },
    opacity: { value: 0.8, random: true },
    size: { value: 3, random: true },
    move: {
      enable: true,
      speed: 1,
      random: true,
      direction: "none"
    },
    twinkle: {
      particles: { enable: false, color: "#1eff00ff", frequency: 0.05 }
    }
  }
});
