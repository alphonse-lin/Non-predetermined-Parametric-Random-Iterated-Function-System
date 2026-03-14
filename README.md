# NPPR IFS Swarm Topology Simulator

> Based on the core concepts from **"Deterministic Chaos Constraints for Control of Massive Swarms"** by Josef Schaff (2021).

This project is a lightweight, high-performance HTML5 Canvas simulator that demonstrates how Iterated Function Systems (IFS) and deterministic chaos can be used to control massive swarms (e.g., thousands of drones or MANET nodes) without incurring a combinatorial explosion of computational cost.

visit this link: link[https://alphonse-lin.github.io/Non-predetermined-Parametric-Random-Iterated-Function-System/swarm-simulator.html]

## 🌟 The Core Concept

Traditional swarm control or ad-hoc networking requires nodes to be aware of each other, leading to exponential routing and coordination costs as the swarm scales. 

This approach solves the issue by leveraging **Adaptive Fractals**. Instead of peer-to-peer coordination, every agent independently executes a simple Iterated Function System (IFS) equation:

```text
X(n) = M × X(n-1) + Z
```

- **X**: The agent's position (or state).
- **Z**: A randomly selected "Attractor" vertex from a globally shared, minimal set of points (e.g., vertices of a geometric shape).
- **M**: A shared scaling factor ($|M| < 1$, per the Banach Contraction Theorem).

By sharing just a single floating-point number (`M`) and a few coordinates (`Z`), tens of thousands of agents can achieve situational awareness and emergent self-organization in real-time.

## 🚀 Simulator Features

- **Massive Scale**: Smoothly simulates and renders 20,000+ agents using lightweight Float32Arrays and Canvas batching.
- **Topology Phase Transitions**:
  - **Ordered ($M \approx 0.33$)**: Agents neatly arrange themselves into distinct clusters.
  - **Transit ($M \approx 0.50$)**: Agents form loosely connected, space-filling networks (similar to Sierpinski gaskets).
  - **Chaotic/Scatter ($M \approx 0.70$)**: Agents scatter into a bounded chaotic cloud.
- **Dynamic Attractors**: Add, remove, or drag attractor vertices in real-time to watch the swarm instantly adapt and self-heal.
- **Visual Modes**: Toggle Voronoi partitioning, connection links, grids, and agent glow.

## 🛠️ Usage

Simply open `swarm-simulator.html` in any modern web browser. No external dependencies, build steps, or servers required.

### Controls:
- **Scale Parameter M Slider**: Smoothly transition between Ordered and Chaotic swarm states.
- **Display Options**: Switch on Voronoi approximation to see the underlying clustering boundaries.
- **Canvas Interaction**: 
  - **Click** empty space to add a new Attractor vertex.
  - **Drag** a vertex to move it.
  - **Right-Click** a vertex to remove it.
  
## 🤖 Application in AI Agent Systems

Beyond physical drones, this mathematical framework is highly applicable to **Multi-Agent AI Systems (MAS)**:
- **Semantic Attractors**: Instead of physical coordinates, $Z$ can represent *tasks, goals, or topics* in a latent space.
- **Zero-Communication Coordination**: Agents naturally cluster around tasks without needing a manager agent to assign them or spending tokens negotiating.
- **Dynamic Reallocation**: Modifying $M$ acts as a "temperature" control for the agent swarm (low $M$ = high focus on specific tasks; high $M$ = creative scatter/exploration).
- **Self-Healing**: If agents crash or are rate-limited, the remaining agents will naturally maintain the density distribution across the active task attractors.

## 📄 References
- Schaff, Josef. (2021). *Deterministic Chaos Constraints for Control of Massive Swarms*. Naval Air Systems Command. Published in Unifying Themes in Complex Systems X.
