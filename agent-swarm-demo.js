// agent-swarm-demo.js
// A demonstration of using the NPPR IFS logic for Multi-Agent Task Allocation

class Task {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.assignedTask = null; // Determined by proximity
  }
}

// Swarm Control Parameters
const M_FOCUSED = 0.338; // Agents strongly cluster around tasks: High Execution Focus
const M_TRANSIT = 0.500; // Agents are loosely clustered: Networked / Transitional
const M_CHAOS   = 0.700; // Agents are scattered: Exploratory / Chaos

// Global State
let agents = [];
let tasks = [];
let currentM = M_FOCUSED;

function initSwarm(numAgents) {
  agents = [];
  for (let i = 0; i < numAgents; i++) {
    // All agents initialize at origin (0,0) - could be anywhere
    agents.push(new Agent(i, 0, 0));
  }
}

function initTasks() {
  // Define 3 distinct semantic/task attractors in a [-1, 1] normalized space
  tasks = [
    new Task("Data_Scraping", 0, 1),
    new Task("Code_Writing", -0.866, -0.5),
    new Task("Testing_QA", 0.866, -0.5)
  ];
}

function runIFS_Iteration() {
  const numTasks = tasks.length;
  if (numTasks === 0) return;

  for (let agent of agents) {
    // 1. Decentralized Choice: Randomly pick a task (Attractor Z)
    const randomTaskDesc = tasks[Math.floor(Math.random() * numTasks)];
    
    // 2. IFS Equation: X(n) = M * X(n-1) + Z
    // This updates the agent's semantic position
    agent.x = currentM * agent.x + randomTaskDesc.x;
    agent.y = currentM * agent.y + randomTaskDesc.y;

    // 3. Proximity Check (Voronoi Partition)
    // The closest attractor is the task the agent actually "commits" to right now
    let minDistance = Infinity;
    let bestTask = null;
    for (let task of tasks) {
      const dist = Math.sqrt((agent.x - task.x)**2 + (agent.y - task.y)**2);
      if (dist < minDistance) {
        minDistance = dist;
        bestTask = task;
      }
    }
    agent.assignedTask = bestTask ? bestTask.name : "None";
  }
}

function printStats(iterationName) {
  console.log(`\n======================================================`);
  console.log(`--- ${iterationName} ---`);
  console.log(`Global Scale Parameter (M) = ${currentM}`);
  console.log(`Total Swarm Agents         = ${agents.length.toLocaleString()}`);
  console.log(`======================================================`);
  
  const counts = {};
  tasks.forEach(t => counts[t.name] = 0);
  counts["None"] = 0;

  agents.forEach(a => counts[a.assignedTask]++);

  for (let taskName in counts) {
    if (counts[taskName] > 0 || tasks.find(t => t.name === taskName)) {
      // Create a visual ASCII bar based on percentage
      const percentage = counts[taskName] / agents.length;
      const barChars = Math.round(percentage * 40);
      const bar = "█".repeat(barChars);
      console.log(`${taskName.padEnd(16)} |${bar.padEnd(40)}| ${(percentage*100).toFixed(1)}% (${counts[taskName]})`);
    }
  }
}

// ---------------- DEMO SCENARIO ----------------

console.log("🚀 Starting NPPR Multi-Agent Swarm Framework Demo\n");
console.log("Initializing an army of 10,000 Agents with 0 bytes of inter-agent communication overhead...");

// 1. Initialize 10,000 minimal agents and 3 root tasks
initSwarm(10000);
initTasks();

// Warm-up phase: Run a few iterations so the chaotic dynamics settle onto the fractal attractors
for(let i=0; i<30; i++) runIFS_Iteration();

// --- SCENARIO 1: Focused Execution ---
// M is low, meaning agents pull tightly towards tasks.
currentM = M_FOCUSED;
for(let i=0; i<5; i++) runIFS_Iteration();
printStats("SCENARIO 1: High-Focus Execution (M=0.338)");
console.log(">> OBSERVE: The swarm naturally partitions itself perfectly evenly across the 3 available tasks.");


// --- SCENARIO 2: System receives a shock / new urgent task ---
console.log("\n⚡ [EVENT] An urgent 'Security_Audit' task is suddenly added to the semantic space!");
tasks.push(new Task("Security_Audit", 0, 0)); // A new central attractor is born

// Agents react and self-heal with NO Manager and NO Peer-to-Peer messaging.
// Just simple X(n) = M * X(n-1) + Z over a few steps
for(let i=0; i<20; i++) runIFS_Iteration();
printStats("SCENARIO 2: Autonomous Reallocation / Self-Healing");
console.log(">> OBSERVE: Without any manual reassignment, the swarm organically re-distributes to cover the new 4th task.");


// --- SCENARIO 3: Raising the "Temperature" for Brainstorming / Exploration ---
console.log("\n🌪️ [EVENT] System switches to Exploratory/Chaos Mode (Higher M)");
currentM = M_CHAOS;
// Allow the system to transition states
for(let i=0; i<30; i++) runIFS_Iteration();
printStats("SCENARIO 3: Chaotic Scatter (M=0.700)");
console.log(">> OBSERVE: Agents are much more scattered. While tasks are still anchors, agents are drifting in the 'liminal space' between tasks.");
console.log(">> USE CASE: This state is perfect for exploratory tasks, cross-pollination of data, or discovering new solutions outside the local minima.");
