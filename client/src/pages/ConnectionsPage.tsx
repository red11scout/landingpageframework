import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { lessons, themes } from "@/lib/lessons";
import { figures } from "@/lib/figures";
import { motion } from "framer-motion";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Filter, Sparkles } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";

// Node types
type NodeType = "lesson" | "figure" | "theme" | "event";

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  href?: string;
  completed?: boolean;
  lessonId?: number;
  figureId?: string;
  eventLessons?: number[];
}

interface GraphEdge {
  source: string;
  target: string;
  strength: number;
}

// Color palette by type
const nodeColors: Record<NodeType, string> = {
  lesson: "oklch(0.55 0.2 25)",     // vermillion
  figure: "oklch(0.4 0.15 260)",    // navy
  theme: "oklch(0.4 0.1 145)",      // forest green
  event: "oklch(0.55 0.12 60)",     // amber
};

// Completed / glowing colors
const completedColors: Record<NodeType, string> = {
  lesson: "oklch(0.7 0.22 80)",     // gold
  figure: "oklch(0.65 0.2 280)",    // bright blue
  theme: "oklch(0.6 0.15 145)",     // bright green
  event: "oklch(0.7 0.18 60)",      // bright amber
};

function buildGraph(filter: NodeType | "all"): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const nodeSet = new Set<string>();

  // Add theme nodes
  if (filter === "all" || filter === "theme") {
    themes.forEach(theme => {
      const id = `theme-${theme.id}`;
      if (!nodeSet.has(id)) {
        nodes.push({ id, label: theme.title, type: "theme", x: 0, y: 0, vx: 0, vy: 0, radius: 18, color: nodeColors.theme, href: `/theme/${theme.id}` });
        nodeSet.add(id);
      }
    });
  }

  // Add lesson nodes
  const keyLessons = lessons.filter(l => l.narrative.length > 200);
  const sampledLessons = filter === "lesson" ? keyLessons : keyLessons.filter((_, i) => i % 3 === 0 || i < 10);
  
  if (filter === "all" || filter === "lesson") {
    sampledLessons.forEach(lesson => {
      const id = `lesson-${lesson.id}`;
      if (!nodeSet.has(id)) {
        nodes.push({ id, label: `Night ${lesson.id}`, type: "lesson", x: 0, y: 0, vx: 0, vy: 0, radius: 10, color: nodeColors.lesson, href: `/lesson/${lesson.id}`, lessonId: lesson.id });
        nodeSet.add(id);
      }
      const themeId = `theme-${lesson.themeId}`;
      if (nodeSet.has(themeId)) {
        edges.push({ source: id, target: themeId, strength: 0.3 });
      }
      lesson.connections.forEach(connId => {
        const targetId = `lesson-${connId}`;
        if (nodeSet.has(targetId)) {
          edges.push({ source: id, target: targetId, strength: 0.5 });
        }
      });
    });
  }

  // Add figure nodes
  if (filter === "all" || filter === "figure") {
    figures.forEach(fig => {
      const id = `figure-${fig.id}`;
      if (!nodeSet.has(id)) {
        nodes.push({ id, label: fig.name.split(" ").pop() || fig.name, type: "figure", x: 0, y: 0, vx: 0, vy: 0, radius: 14, color: nodeColors.figure, href: `/figure/${fig.id}`, figureId: fig.id });
        nodeSet.add(id);
      }
      fig.lessonsAppearing.slice(0, 5).forEach(lessonId => {
        const targetId = `lesson-${lessonId}`;
        if (nodeSet.has(targetId)) {
          edges.push({ source: id, target: targetId, strength: 0.4 });
        }
      });
    });
  }

  // Add key event nodes
  if (filter === "all" || filter === "event") {
    const events = [
      { id: "event-stamp-act", label: "Stamp Act 1765", lessons: [4, 5] },
      { id: "event-boston-massacre", label: "Massacre 1770", lessons: [7, 8] },
      { id: "event-tea-party", label: "Tea Party 1773", lessons: [10, 11] },
      { id: "event-lexington", label: "Lexington 1775", lessons: [13, 14] },
      { id: "event-declaration", label: "Declaration 1776", lessons: [19, 20, 21] },
      { id: "event-trenton", label: "Trenton 1776", lessons: [29, 30] },
      { id: "event-saratoga", label: "Saratoga 1777", lessons: [33, 36] },
      { id: "event-valley-forge", label: "Valley Forge", lessons: [34, 35] },
      { id: "event-yorktown", label: "Yorktown 1781", lessons: [64, 65, 66, 67] },
      { id: "event-constitution", label: "Constitution 1787", lessons: [73, 74, 75] },
      { id: "event-bill-rights", label: "Bill of Rights", lessons: [77, 78] },
    ];
    events.forEach(evt => {
      if (!nodeSet.has(evt.id)) {
        nodes.push({ id: evt.id, label: evt.label, type: "event", x: 0, y: 0, vx: 0, vy: 0, radius: 13, color: nodeColors.event, eventLessons: evt.lessons });
        nodeSet.add(evt.id);
      }
      evt.lessons.forEach(lessonId => {
        const targetId = `lesson-${lessonId}`;
        if (nodeSet.has(targetId)) {
          edges.push({ source: evt.id, target: targetId, strength: 0.6 });
        }
      });
    });
  }

  // Initialize positions in a circle
  const cx = 400, cy = 350;
  nodes.forEach((node, i) => {
    const angle = (i / nodes.length) * Math.PI * 2;
    const r = 150 + Math.random() * 100;
    node.x = cx + Math.cos(angle) * r;
    node.y = cy + Math.sin(angle) * r;
  });

  return { nodes, edges };
}

// Force simulation
function simulate(nodes: GraphNode[], edges: GraphEdge[], width: number, height: number) {
  const cx = width / 2, cy = height / 2;
  const iterations = 80;
  
  for (let iter = 0; iter < iterations; iter++) {
    const alpha = 1 - iter / iterations;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (800 * alpha) / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        nodes[i].vx -= fx;
        nodes[i].vy -= fy;
        nodes[j].vx += fx;
        nodes[j].vy += fy;
      }
    }

    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      if (!source || !target) return;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (dist - 80) * 0.01 * edge.strength * alpha;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    });

    nodes.forEach(node => {
      node.vx += (cx - node.x) * 0.005 * alpha;
      node.vy += (cy - node.y) * 0.005 * alpha;
    });

    nodes.forEach(node => {
      node.x += node.vx * 0.8;
      node.y += node.vy * 0.8;
      node.vx *= 0.6;
      node.vy *= 0.6;
      node.x = Math.max(40, Math.min(width - 40, node.x));
      node.y = Math.max(40, Math.min(height - 40, node.y));
    });
  }
}

// Helper: distance between two touch points
function getTouchDist(t1: React.Touch, t2: React.Touch): number {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Helper: midpoint of two touch points
function getTouchMid(t1: React.Touch, t2: React.Touch): { x: number; y: number } {
  return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
}

export default function ConnectionsPage() {
  const [filter, setFilter] = useState<NodeType | "all">("all");
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // Touch state refs (avoid re-renders during gesture)
  const touchStateRef = useRef({
    isPinching: false,
    lastDist: 0,
    lastMid: { x: 0, y: 0 },
    isSingleDrag: false,
    lastTouch: { x: 0, y: 0 },
  });

  const { completedLessons, visitedFigures } = useProgress();

  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({ nodes: [], edges: [] });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: Math.max(500, rect.height) });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const { nodes, edges } = buildGraph(filter);
    simulate(nodes, edges, dimensions.width, dimensions.height);
    // Apply completion status
    nodes.forEach(node => {
      if (node.type === "lesson" && node.lessonId) {
        node.completed = completedLessons.includes(node.lessonId);
      } else if (node.type === "figure" && node.figureId) {
        node.completed = visitedFigures.includes(node.figureId);
      } else if (node.type === "event" && node.eventLessons) {
        node.completed = node.eventLessons.every(id => completedLessons.includes(id));
      } else if (node.type === "theme") {
        // Theme is complete if all its lessons are done
        const themeNum = parseInt(node.id.replace("theme-", ""));
        const themeLessons = lessons.filter(l => l.themeId === themeNum);
        node.completed = themeLessons.length > 0 && themeLessons.every(l => completedLessons.includes(l.id));
      }
    });
    setGraphData({ nodes, edges });
  }, [filter, dimensions, completedLessons, visitedFigures]);

  // ---- Mouse handlers (desktop) ----
  const handleMouseDown = (e: React.MouseEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "circle" || tag === "text") return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setZoom(z => Math.max(0.3, Math.min(3, z + delta)));
  }, []);

  useEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // ---- Touch handlers (mobile/iPad) ----
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    if (e.touches.length === 2) {
      // Pinch start
      e.preventDefault();
      ts.isPinching = true;
      ts.isSingleDrag = false;
      ts.lastDist = getTouchDist(e.touches[0], e.touches[1]);
      ts.lastMid = getTouchMid(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1) {
      // Check if touching a node
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "circle" || tag === "text") return;
      ts.isSingleDrag = true;
      ts.isPinching = false;
      ts.lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    if (ts.isPinching && e.touches.length === 2) {
      e.preventDefault();
      const newDist = getTouchDist(e.touches[0], e.touches[1]);
      const newMid = getTouchMid(e.touches[0], e.touches[1]);
      const scaleFactor = newDist / ts.lastDist;
      setZoom(z => Math.max(0.3, Math.min(3, z * scaleFactor)));
      // Pan while pinching
      const dx = newMid.x - ts.lastMid.x;
      const dy = newMid.y - ts.lastMid.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      ts.lastDist = newDist;
      ts.lastMid = newMid;
    } else if (ts.isSingleDrag && e.touches.length === 1) {
      const dx = e.touches[0].clientX - ts.lastTouch.x;
      const dy = e.touches[0].clientY - ts.lastTouch.y;
      setPan(p => ({ x: p.x + dx, y: p.y + dy }));
      ts.lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    if (e.touches.length < 2) {
      ts.isPinching = false;
    }
    if (e.touches.length === 0) {
      ts.isSingleDrag = false;
    }
  }, []);

  // ---- Connection helpers ----
  const activeNode = selectedNode || hoveredNode;

  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connected = new Set<string>();
    connected.add(nodeId);
    graphData.edges.forEach(e => {
      if (e.source === nodeId) connected.add(e.target);
      if (e.target === nodeId) connected.add(e.source);
    });
    return connected;
  };

  const connectedSet = activeNode ? getConnectedNodes(activeNode.id) : null;

  const completedCount = graphData.nodes.filter(n => n.completed).length;
  const totalCount = graphData.nodes.length;

  return (
    <div className="min-h-screen parchment-bg">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.15_0.03_250/0.95)] border-b border-[oklch(1_0_0/0.08)]">
        <div className="container flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-sm font-[var(--font-sans)] text-[oklch(0.7_0.02_250)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-sm font-[var(--font-display)] font-bold">Connections Web</h1>
          <Link href="/"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/90544947/RzamISePlbcgDwAH.png" alt="" className="w-6 h-6" /></Link>
        </div>
      </header>

      <section className="container pt-6 pb-2">
        <h1 className="text-2xl md:text-3xl font-[var(--font-display)] font-bold mb-2">The Web of Revolution</h1>
        <p className="text-[oklch(0.6_0.02_250)] font-[var(--font-body)] italic text-sm mb-4">
          Nothing happened alone. Every person, event, and idea connected to others. Tap a node to see its connections. Pinch to zoom. Drag to explore.
        </p>

        {/* Progress indicator */}
        {completedCount > 0 && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-[oklch(0.7_0.22_80/0.08)] border border-[oklch(0.7_0.22_80/0.2)] rounded-sm">
            <Sparkles className="w-4 h-4 text-[oklch(0.7_0.22_80)]" />
            <span className="text-xs font-[var(--font-sans)] text-[oklch(0.5_0.12_60)]">
              <strong>{completedCount}</strong> of {totalCount} nodes illuminated — glowing nodes mark your family's journey
            </span>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-[oklch(0.6_0.02_250)]" />
            <span className="text-xs font-[var(--font-sans)] text-[oklch(0.6_0.02_250)] hidden sm:inline">Show:</span>
          </div>
          {(["all", "lesson", "figure", "theme", "event"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-[var(--font-sans)] font-medium border transition-all active:scale-[0.97] ${filter === f ? 'bg-[oklch(0.55_0.2_25/0.1)] border-[oklch(0.55_0.2_25/0.4)] text-[oklch(0.6_0.25_25)]' : 'border-[oklch(1_0_0/0.08)] text-[oklch(0.6_0.02_250)] hover:border-[oklch(0.55_0.2_25/0.3)]'}`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1) + "s"}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} className="p-1.5 border border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.55_0.2_25/0.3)] transition-colors active:scale-[0.95]">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setZoom(z => Math.max(0.3, z - 0.25))} className="p-1.5 border border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.55_0.2_25/0.3)] transition-colors active:scale-[0.95]">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); setSelectedNode(null); }} className="p-1.5 border border-[oklch(1_0_0/0.08)] hover:border-[oklch(0.55_0.2_25/0.3)] transition-colors active:scale-[0.95]">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-xs font-[var(--font-sans)]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: nodeColors.lesson }} />Lessons</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: nodeColors.figure }} />Figures</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: nodeColors.theme }} />Themes</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: nodeColors.event }} />Events</span>
          <span className="flex items-center gap-1.5 ml-2 pl-2 border-l border-[oklch(1_0_0/0.08)]"><span className="w-3 h-3 rounded-full ring-2 ring-[oklch(0.7_0.22_80)] ring-offset-1" style={{ background: "oklch(0.7 0.22 80)" }} />Completed</span>
        </div>
      </section>

      {/* Graph */}
      <div
        ref={containerRef}
        className="container pb-8"
        style={{ height: "calc(100vh - 320px)", minHeight: "450px" }}
      >
        <div
          ref={graphRef}
          className="w-full h-full bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] overflow-hidden relative cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            className="select-none"
          >
            <defs>
              {/* Glow filter for completed nodes */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Hover glow filter */}
              <filter id="hover-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Edges */}
              {graphData.edges.map((edge, i) => {
                const source = graphData.nodes.find(n => n.id === edge.source);
                const target = graphData.nodes.find(n => n.id === edge.target);
                if (!source || !target) return null;
                const isHighlighted = connectedSet && (connectedSet.has(edge.source) && connectedSet.has(edge.target));
                const bothCompleted = source.completed && target.completed;
                const opacity = activeNode ? (isHighlighted ? 0.6 : 0.04) : (bothCompleted ? 0.35 : 0.12);
                return (
                  <line
                    key={i}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={bothCompleted && !activeNode ? "oklch(0.7 0.22 80)" : "oklch(0.4 0.05 60)"}
                    strokeWidth={isHighlighted ? 1.5 : (bothCompleted ? 1 : 0.5)}
                    opacity={opacity}
                    style={{ transition: "opacity 0.2s, stroke 0.3s" }}
                  />
                );
              })}

              {/* Nodes */}
              {graphData.nodes.map(node => {
                const isActive = activeNode?.id === node.id;
                const isConnected = connectedSet?.has(node.id);
                const opacity = activeNode ? (isConnected ? 1 : 0.15) : 1;
                const isHovered = hoveredNode?.id === node.id;
                const scale = isActive ? 1.35 : (isHovered ? 1.18 : 1);
                const fillColor = node.completed ? completedColors[node.type] : node.color;

                return (
                  <g
                    key={node.id}
                    style={{ transition: "opacity 0.25s cubic-bezier(0.23,1,0.32,1)", opacity, cursor: "pointer" }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      // On mobile: first tap selects, second tap navigates
                      if (selectedNode?.id === node.id && node.href) {
                        navigate(node.href);
                      } else {
                        setSelectedNode(node);
                      }
                    }}
                  >
                    {/* Hover glow ring (non-completed nodes) */}
                    {isHovered && !node.completed && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius * scale + 6}
                        fill="none"
                        stroke={fillColor}
                        strokeWidth={2}
                        opacity={0.5}
                        filter="url(#hover-glow)"
                      >
                        <animate
                          attributeName="r"
                          values={`${node.radius * scale + 4};${node.radius * scale + 8};${node.radius * scale + 4}`}
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0.6;0.3"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    {/* Glow ring for completed nodes */}
                    {node.completed && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius * scale + 4}
                        fill="none"
                        stroke="oklch(0.7 0.22 80)"
                        strokeWidth={2}
                        opacity={0.6}
                        filter="url(#glow)"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.7;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    {/* Main circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius * scale}
                      fill={fillColor}
                      stroke={isActive ? "oklch(0.95 0.02 80)" : (isHovered ? "oklch(0.85 0.02 80)" : (node.completed ? "oklch(0.7 0.22 80)" : "none"))}
                      strokeWidth={isActive ? 3 : (isHovered ? 2 : (node.completed ? 1.5 : 0))}
                      filter={node.completed ? "url(#glow)" : (isHovered ? "url(#hover-glow)" : undefined)}
                      style={{ transition: "r 0.2s cubic-bezier(0.23,1,0.32,1), stroke-width 0.2s ease, stroke 0.2s ease, filter 0.2s ease" }}
                    />
                    {/* Checkmark for completed */}
                    {node.completed && (
                      <text
                        x={node.x}
                        y={node.y + 3.5}
                        textAnchor="middle"
                        fontSize={node.radius * 0.8}
                        fill="white"
                        fontWeight="bold"
                        style={{ pointerEvents: "none" }}
                      >
                        ✓
                      </text>
                    )}
                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + node.radius + 12}
                      textAnchor="middle"
                      fontSize={isHovered || isActive ? (node.type === "theme" ? 12 : 10) : (node.type === "theme" ? 10 : 8)}
                      fontFamily="var(--font-sans)"
                      fontWeight={isHovered || isActive || node.type === "theme" || node.completed ? "bold" : "normal"}
                      fill={isHovered || isActive ? "oklch(0.9 0.02 80)" : (node.completed ? "oklch(0.7 0.15 80)" : "oklch(0.5 0.02 250)")}
                      style={{ transition: "font-size 0.2s ease, fill 0.2s ease, font-weight 0.15s ease" }}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Info panel (hover on desktop, tap on mobile) */}
          {activeNode && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-3 right-3 bg-[oklch(0.18_0.03_250)] border border-[oklch(1_0_0/0.08)] p-3 max-w-52 shadow-lg z-10"
            >
              <div className="flex items-center gap-2 mb-1">
                {activeNode.completed && <Sparkles className="w-3.5 h-3.5 text-[oklch(0.7_0.22_80)]" />}
                <p className="font-[var(--font-display)] font-bold text-sm">{activeNode.label}</p>
              </div>
              <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)] capitalize">
                {activeNode.type}{activeNode.completed ? " · Completed" : ""}
              </p>
              <p className="text-xs text-[oklch(0.6_0.02_250)] font-[var(--font-sans)] mt-1">
                {connectedSet ? connectedSet.size - 1 : 0} connections
              </p>
              {activeNode.href && (
                <Link href={activeNode.href} className="text-xs text-[oklch(0.6_0.25_25)] font-[var(--font-sans)] mt-1.5 inline-block hover:underline">
                  {selectedNode?.id === activeNode.id ? "Tap again to visit →" : "Click to visit →"}
                </Link>
              )}
            </motion.div>
          )}

          {/* Mobile hint */}
          <div className="absolute bottom-3 left-3 text-[10px] font-[var(--font-sans)] text-[oklch(0.6_0.02_250)]/50 md:hidden">
            Pinch to zoom · Drag to pan · Tap nodes
          </div>
        </div>
      </div>
    </div>
  );
}
