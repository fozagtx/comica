"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Download, Sparkles, Loader2, ImageIcon, Plus, X, Send, Wifi, WifiOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Input Node Component
function InputNode({ data }: { data: { onSubmit: (prompt: string, dialogue?: string) => void } }) {
  const [prompt, setPrompt] = useState("");
  const [dialogue, setDialogue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setIsSubmitting(true);
    await data.onSubmit(prompt, dialogue);
    setIsSubmitting(false);
    setPrompt("");
    setDialogue("");
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/20 rounded-2xl p-4 w-[380px] max-w-[90vw] shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Describe your comic scene..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-white/5 border-white/20 rounded-xl text-white placeholder:text-white/40 font-interface h-10 focus:border-white/40 focus:ring-white/20"
        />
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">💬</div>
            <Input
              placeholder="Character dialogue (optional)..."
              value={dialogue}
              onChange={(e) => setDialogue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isSubmitting && prompt.trim() && handleSubmit()}
              className="pl-8 bg-white/5 border-white/20 rounded-xl text-white placeholder:text-white/40 font-interface h-9 text-sm focus:border-white/40 focus:ring-white/20"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isSubmitting}
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white h-9 w-9 rounded-xl transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] shrink-0 border border-white/20"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-white border-2 border-zinc-900" />
    </div>
  );
}

// Image Node Component
function ImageNode({ data }: { data: { imageUrl: string; prompt: string; isGenerating?: boolean; onDownload: () => void; onDelete: () => void } }) {
  const [showModal, setShowModal] = useState(false);

  if (data.isGenerating) {
    return (
      <div className="bg-zinc-900/80 backdrop-blur-xl border border-amber-400/50 rounded-2xl p-3 w-[420px] max-w-[90vw] shadow-[0_8px_32px_rgba(255,180,32,0.15)]">
        <Handle type="target" position={Position.Left} className="w-3 h-3 bg-amber-400 border-2 border-zinc-900" />
        <div className="aspect-[16/9] bg-white/5 rounded-xl flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-sm text-white/70 font-interface">Generating...</p>
        </div>
        <p className="text-xs text-white/50 font-interface mt-2 line-clamp-1">{data.prompt}</p>
        <Handle type="source" position={Position.Right} className="w-3 h-3 bg-amber-400 border-2 border-zinc-900" />
      </div>
    );
  }

  return (
    <>
      <div 
        className="bg-zinc-900/80 backdrop-blur-xl border border-white/20 hover:border-white/40 rounded-2xl p-3 w-[420px] max-w-[90vw] shadow-[0_8px_32px_rgba(255,255,255,0.1)] transition-all duration-300 group"
        onMouseEnter={() => data.imageUrl && setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
      >
        <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white border-2 border-zinc-900" />
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-2">
          <Image
            src={data.imageUrl}
            alt={data.prompt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <Button
              size="sm"
              onClick={data.onDownload}
              className="bg-white/10 hover:bg-white/20 text-white h-8 px-3 rounded-xl border border-white/20"
            >
              <Download className="w-3 h-3 mr-1" />
              Save
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={data.onDelete}
              className="h-8 w-8 p-0 rounded-xl"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-white/60 font-interface line-clamp-1">{data.prompt}</p>
        <Handle type="source" position={Position.Right} className="w-3 h-3 bg-white border-2 border-zinc-900" />
      </div>

      {/* Full Image Modal on Hover */}
      {showModal && data.imageUrl && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />
          <div className="relative max-w-[90vw] max-h-[85vh] animate-[scaleIn_0.3s_ease-out]">
            <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Image
                src={data.imageUrl}
                alt={data.prompt}
                width={1280}
                height={720}
                className="object-contain bg-zinc-900 max-h-[75vh] w-auto"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 rounded-b-2xl">
              <p className="text-white font-interface text-sm">{data.prompt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Placeholder Node for adding more
function AddNode({ data }: { data: { onClick: () => void } }) {
  return (
    <div
      onClick={data.onClick}
      className="bg-zinc-900/60 backdrop-blur-xl border border-dashed border-white/20 hover:border-white/40 rounded-2xl p-4 w-[420px] max-w-[90vw] aspect-[16/9] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:bg-zinc-800/60 group shadow-[0_8px_32px_rgba(255,255,255,0.05)]"
    >
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white/50 border-2 border-zinc-900" />
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
        <Plus className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-300" />
      </div>
      <p className="text-sm text-white/50 font-interface group-hover:text-white transition-colors duration-300">Add Panel</p>
    </div>
  );
}

export default function StudioPage() {
  const [isOnline, setIsOnline] = useState(true);

  // Online/offline detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  const nodeTypes: NodeTypes = useMemo(
    () => ({
      inputNode: InputNode,
      imageNode: ImageNode,
      addNode: AddNode,
    }),
    []
  );

  const initialNodes: Node[] = [
    {
      id: "input-1",
      type: "inputNode",
      position: { x: 100, y: 200 },
      data: {
        onSubmit: async (prompt: string, dialogue?: string) => {
          await handleGeneratePanel(prompt, dialogue);
        },
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleGeneratePanel = useCallback(
    async (prompt: string, dialogue?: string) => {
      const generatingNodeId = `generating-${Date.now()}`;
      const imageNodes = nodes.filter((n) => n.type === "imageNode" || n.type === "addNode");
      const lastNode = imageNodes.length > 0 ? imageNodes[imageNodes.length - 1] : nodes.find((n) => n.id === "input-1");
      
      const newX = lastNode ? lastNode.position.x + 470 : 550;
      const newY = lastNode ? lastNode.position.y : 200;

      // Add generating node
      const generatingNode: Node = {
        id: generatingNodeId,
        type: "imageNode",
        position: { x: newX, y: newY },
        data: {
          imageUrl: "",
          prompt,
          isGenerating: true,
          onDownload: () => {},
          onDelete: () => {},
        },
      };

      setNodes((nds) => [...nds.filter((n) => n.type !== "addNode"), generatingNode]);

      // Add edge from input or last image
      const sourceId = imageNodes.length > 0 ? imageNodes[imageNodes.length - 1].id : "input-1";
      if (sourceId !== generatingNodeId) {
        setEdges((eds) => [
          ...eds,
          {
            id: `e-${sourceId}-${generatingNodeId}`,
            source: sourceId,
            target: generatingNodeId,
            animated: true,
            type: "smoothstep",
            style: { stroke: "rgba(255, 255, 255, 0.4)", strokeWidth: 1.5 },
          },
        ]);
      }

      // Call the API to generate the image
      let imageUrl = "";
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, dialogue, orientation: "landscape" }),
        });
        const data = await response.json();
        console.log("API Response:", data);
        if (data.success && data.imageUrl) {
          imageUrl = data.imageUrl;
        } else {
          console.error("API failed:", data.error || data);
          // Remove the generating node on failure
          setNodes((nds) => nds.filter((n) => n.id !== generatingNodeId));
          return; // Exit without creating a node
        }
      } catch (error) {
        console.error("Generation failed:", error);
        // Remove the generating node on failure
        setNodes((nds) => nds.filter((n) => n.id !== generatingNodeId));
        return; // Exit without creating a node
      }

      const finalNodeId = `image-${Date.now()}`;

      // Replace generating node with final image node
      setNodes((nds) =>
        nds.map((n) =>
          n.id === generatingNodeId
            ? {
                ...n,
                id: finalNodeId,
                data: {
                  imageUrl,
                  prompt,
                  isGenerating: false,
                  onDownload: () => handleDownload(imageUrl, prompt),
                  onDelete: () => handleDeleteNode(finalNodeId),
                },
              }
            : n
        )
      );

      // Update edge
      setEdges((eds) =>
        eds.map((e) =>
          e.target === generatingNodeId
            ? { ...e, target: finalNodeId, animated: false, type: "smoothstep", style: { stroke: "rgba(255, 255, 255, 0.4)", strokeWidth: 1.5 } }
            : e
        )
      );

      // Add "Add" node
      const addNodeId = `add-${Date.now()}`;
      setNodes((nds) => [
        ...nds,
        {
          id: addNodeId,
          type: "addNode",
          position: { x: newX + 470, y: newY },
          data: {
            onClick: () => scrollToInput(),
          },
        },
      ]);

      setEdges((eds) => [
        ...eds,
        {
          id: `e-${finalNodeId}-${addNodeId}`,
          source: finalNodeId,
          target: addNodeId,
          type: "smoothstep",
          style: { stroke: "rgba(255, 255, 255, 0.25)", strokeWidth: 1.5, strokeDasharray: "5,5" },
        },
      ]);
    },
    [nodes, setNodes, setEdges]
  );

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      // Try fetching with cors mode
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `comic-panel-${prompt.slice(0, 20).replace(/\s+/g, "-")}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        // Fallback: open image in new tab for manual save
        window.open(imageUrl, '_blank');
      }
    } catch (error) {
      console.error("Download failed, opening in new tab:", error);
      // Fallback: open image in new tab for manual save
      window.open(imageUrl, '_blank');
    }
  };

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    },
    [setNodes, setEdges]
  );

  const scrollToInput = () => {
    // Focus back to input area
    const inputNode = document.querySelector('[data-id="input-1"]');
    if (inputNode) {
      inputNode.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="h-screen bg-background noise-overlay flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 shrink-0">
        <div className="max-w-[1800px] mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Zap className="w-4 h-4 text-background" />
            </div>
            <div>
              <h1 className="font-display text-lg text-foreground tracking-tight transition-colors duration-300 group-hover:text-foreground/80">
                ComicFlow
              </h1>
              <p className="text-[10px] text-muted-foreground font-interface leading-none">
                Narrative Comic Creation Studio
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <button
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-interface transition-all duration-300 ${
                isOnline 
                  ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {isOnline ? "Online" : "Offline"}
            </button>
            <div className="text-xs text-muted-foreground font-interface">
              <span className="text-foreground font-semibold">{nodes.filter((n) => n.type === "imageNode" && !n.data.isGenerating).length}</span> panels created
            </div>
          </div>
        </div>
      </header>

      {/* ReactFlow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.5 }}
          className="bg-background"
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            style: { stroke: "rgba(255, 255, 255, 0.4)", strokeWidth: 1.5 },
            type: "smoothstep",
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="hsl(var(--border))"
          />
          <Controls className="bg-card border border-border rounded-xl overflow-hidden" />
        </ReactFlow>

        {/* Instructions overlay */}
        {nodes.filter((n) => n.type === "imageNode").length === 0 && (
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-2xl px-6 py-4 shadow-xl animate-[fadeInUp_0.6s_ease-out]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-interface text-foreground font-medium">Enter a story prompt to generate your first comic panel</p>
                <p className="text-xs text-muted-foreground font-interface">Panels will appear as connected nodes in the flow</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
