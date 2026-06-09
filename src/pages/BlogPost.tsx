import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, BookOpen } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  AttentionHeatmapChart,
  TrainingLossChart,
  RewardDistributionChart,
  PPOTrainingChart,
  BoostingRoundsChart,
  FeatureImportanceChart,
} from "@/components/blog/BlogCharts";

// ─── KATEX MATH RENDERER ──────────────────────────────────────────────────────

function Math({ latex, display = false }: { latex: string; display?: boolean }) {
  let html = "";
  try {
    html = katex.renderToString(latex, { throwOnError: false, displayMode: display });
  } catch {
    html = `<code>${latex}</code>`;
  }
  if (display) {
    return (
      <div className="my-6 overflow-x-auto text-center py-5 px-4 rounded-xl bg-black/40 border border-border/40 shadow-inner">
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
  return <span className="inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />;
}

// ─── SVG DIAGRAMS ─────────────────────────────────────────────────────────────

function AttentionDiagram() {
  return (
    <div className="my-8 overflow-x-auto">
      <svg viewBox="0 0 720 450" className="w-full max-w-2xl mx-auto block" style={{ minWidth: 320 }}>
        <defs>
          <marker id="arr"  markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#475569"/></marker>
          <marker id="arr-p" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#2dd4bf"/></marker>
        </defs>
        <text x="360" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Scaled Dot-Product Attention</text>
        {["the","cat","sat","on"].map((t,i)=>(
          <g key={t}>
            <rect x={60+i*155} y="46" width="90" height="28" rx="5" fill="#1e293b" stroke="#334155"/>
            <text x={105+i*155} y="64" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">&quot;{t}&quot;</text>
          </g>
        ))}
        {[0,1,2,3].map(i=><line key={i} x1={105+i*155} y1="74" x2={105+i*155} y2="96" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr)"/>)}
        <rect x="48" y="96" width="620" height="26" rx="5" fill="#0f172a" stroke="#334155" strokeDasharray="4 3"/>
        <text x="358" y="113" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Input Embeddings  x ∈ ℝ^(seq × d_model)</text>
        <line x1="168" y1="122" x2="128" y2="152" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <line x1="358" y1="122" x2="358" y2="152" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <line x1="548" y1="122" x2="588" y2="152" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <text x="116" y="147" fill="#60a5fa" fontSize="10" fontWeight="bold" fontFamily="monospace">W_Q</text>
        <text x="336" y="147" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">W_K</text>
        <text x="572" y="147" fill="#a78bfa" fontSize="10" fontWeight="bold" fontFamily="monospace">W_V</text>
        <rect x="56"  y="152" width="140" height="36" rx="7" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="1.5"/>
        <text x="126" y="175" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold" fontFamily="monospace">Q (queries)</text>
        <rect x="288" y="152" width="140" height="36" rx="7" fill="#0f2e1e" stroke="#34d399" strokeWidth="1.5"/>
        <text x="358" y="175" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="monospace">K (keys)</text>
        <rect x="520" y="152" width="140" height="36" rx="7" fill="#2d1b4e" stroke="#a78bfa" strokeWidth="1.5"/>
        <text x="590" y="175" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold" fontFamily="monospace">V (values)</text>
        <line x1="126" y1="188" x2="208" y2="240" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <line x1="358" y1="188" x2="278" y2="240" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <rect x="172" y="240" width="210" height="32" rx="7" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5"/>
        <text x="277" y="261" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontFamily="monospace">MatMul( Q, Kᵀ )</text>
        <line x1="277" y1="272" x2="277" y2="294" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arr-p)"/>
        <rect x="182" y="294" width="190" height="32" rx="7" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5"/>
        <text x="277" y="315" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">÷ √d_k  (scale)</text>
        <line x1="277" y1="326" x2="277" y2="348" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arr-p)"/>
        <rect x="197" y="348" width="160" height="32" rx="7" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5"/>
        <text x="277" y="369" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace">Softmax → α</text>
        <line x1="590" y1="188" x2="472" y2="380" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <line x1="277" y1="380" x2="375" y2="390" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <rect x="374" y="370" width="190" height="36" rx="7" fill="#0f172a" stroke="#2dd4bf" strokeWidth="2"/>
        <text x="469" y="393" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontFamily="monospace">MatMul( α, V )</text>
        <line x1="469" y1="406" x2="469" y2="428" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arr-p)"/>
        <text x="469" y="440" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">Output ∈ ℝ^(seq × d_v)</text>
      </svg>
      <p className="text-center text-xs font-mono text-muted-foreground mt-2">Fig 1. Scaled dot-product attention — the fundamental operation inside every Transformer</p>
    </div>
  );
}

function MultiHeadDiagram() {
  const colors = ["#60a5fa","#34d399","#f59e0b","#a78bfa"];
  const fills  = ["#1e3a5f","#0f2e1e","#2e2000","#2d1b4e"];
  return (
    <div className="my-8 overflow-x-auto">
      <svg viewBox="0 0 700 320" className="w-full max-w-2xl mx-auto block" style={{ minWidth: 320 }}>
        <text x="350" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Multi-Head Attention (h = 4)</text>
        <rect x="275" y="34" width="150" height="30" rx="5" fill="#1e293b" stroke="#334155"/>
        <text x="350" y="53" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">x (input)</text>
        {[0,1,2,3].map(i=><line key={i} x1="350" y1="64" x2={80+i*170} y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr)"/>)}
        {[0,1,2,3].map(i=>(
          <g key={i}>
            <rect x={15+i*170} y="100" width="130" height="54" rx="7" fill={fills[i]} stroke={colors[i]} strokeWidth="1.5"/>
            <text x={80+i*170} y="123" textAnchor="middle" fill={colors[i]} fontSize="11" fontWeight="bold" fontFamily="monospace">Head {i+1}</text>
            <text x={80+i*170} y="142" textAnchor="middle" fill="#94a3b8" fontSize="9"  fontFamily="monospace">Attn(QWᵢ,KWᵢ,VWᵢ)</text>
          </g>
        ))}
        {[0,1,2,3].map(i=><line key={i} x1={80+i*170} y1="154" x2={80+i*170} y2="194" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr)"/>)}
        <rect x="55"  y="194" width="590" height="32" rx="7" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5"/>
        <text x="350" y="215" textAnchor="middle" fill="#2dd4bf" fontSize="11" fontFamily="monospace">Concat( head₁, head₂, head₃, head₄ )</text>
        <line x1="350" y1="226" x2="350" y2="252" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arr-p)"/>
        <rect x="225" y="252" width="250" height="32" rx="7" fill="#1e293b" stroke="#2dd4bf" strokeWidth="2"/>
        <text x="350" y="273" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">Linear projection  W^O</text>
        <line x1="350" y1="284" x2="350" y2="306" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arr-p)"/>
        <text x="350" y="316" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace">Output ∈ ℝ^(seq × d_model)</text>
      </svg>
      <p className="text-center text-xs font-mono text-muted-foreground mt-2">Fig 2. Each head learns different relationship patterns; outputs concatenated and projected</p>
    </div>
  );
}

function RLHFDiagram() {
  return (
    <div className="my-8 overflow-x-auto">
      <svg viewBox="0 0 740 300" className="w-full max-w-3xl mx-auto block" style={{ minWidth: 360 }}>
        <text x="370" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">The Three-Stage RLHF Pipeline</text>
        <rect x="15"  y="42" width="195" height="192" rx="10" fill="#0f2e1e" stroke="#34d399" strokeWidth="1.5"/>
        <text x="112" y="66"  textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="Inter,sans-serif">Stage 1: SFT</text>
        <text x="112" y="82"  textAnchor="middle" fill="#34d399" fontSize="9"  fontFamily="monospace">Supervised Fine-Tuning</text>
        <rect x="32"  y="96"  width="162" height="26" rx="5" fill="#1e293b" stroke="#334155"/>
        <text x="113" y="113" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">Human demonstrations</text>
        <line x1="113" y1="122" x2="113" y2="140" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <rect x="32"  y="140" width="162" height="26" rx="5" fill="#1e293b" stroke="#34d399"/>
        <text x="113" y="157" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">π_SFT</text>
        <text x="113" y="196" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">Fine-tune pretrained LLM</text>
        <text x="113" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">on high-quality pairs</text>
        <line x1="210" y1="138" x2="258" y2="138" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arr-p)"/>
        <rect x="258" y="42"  width="224" height="192" rx="10" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1.5"/>
        <text x="370" y="66"  textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="bold" fontFamily="Inter,sans-serif">Stage 2: Reward Model</text>
        <text x="370" y="82"  textAnchor="middle" fill="#a78bfa" fontSize="9"  fontFamily="monospace">RM Training</text>
        <rect x="276" y="96"  width="188" height="26" rx="5" fill="#1e293b" stroke="#334155"/>
        <text x="370" y="113" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">Human preference pairs</text>
        <line x1="370" y1="122" x2="370" y2="140" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <rect x="276" y="140" width="188" height="26" rx="5" fill="#1e293b" stroke="#a78bfa"/>
        <text x="370" y="157" textAnchor="middle" fill="#a78bfa" fontSize="11" fontFamily="monospace">r_θ(x, y) → score</text>
        <text x="370" y="196" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">Learn reward from</text>
        <text x="370" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">pairwise rankings y₁ &gt; y₂</text>
        <line x1="482" y1="138" x2="530" y2="138" stroke="#2dd4bf" strokeWidth="2" markerEnd="url(#arr-p)"/>
        <rect x="530" y="42"  width="195" height="192" rx="10" fill="#3b1a1a" stroke="#f87171" strokeWidth="1.5"/>
        <text x="627" y="66"  textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="Inter,sans-serif">Stage 3: PPO</text>
        <text x="627" y="82"  textAnchor="middle" fill="#f87171" fontSize="9"  fontFamily="monospace">RL Fine-Tuning</text>
        <rect x="548" y="96"  width="160" height="26" rx="5" fill="#1e293b" stroke="#334155"/>
        <text x="628" y="113" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">π_SFT → π_RL</text>
        <line x1="628" y1="122" x2="628" y2="140" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <rect x="548" y="140" width="160" height="26" rx="5" fill="#1e293b" stroke="#f87171"/>
        <text x="628" y="157" textAnchor="middle" fill="#f87171" fontSize="10" fontFamily="monospace">r_θ − β·KL(π‖π_SFT)</text>
        <text x="628" y="196" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">Maximise reward while</text>
        <text x="628" y="210" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">staying close to π_SFT</text>
        <text x="370" y="270" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="Inter,sans-serif">β controls the KL penalty — key hyperparameter preventing reward hacking</text>
      </svg>
      <p className="text-center text-xs font-mono text-muted-foreground mt-2">Fig 3. RLHF: SFT seeds the policy, RM encodes preferences, PPO optimises it</p>
    </div>
  );
}

function GBDTDiagram() {
  const treeColors = ["#60a5fa","#34d399","#f59e0b","#a78bfa"];
  const treeFills  = ["#1e3a5f","#0f2e1e","#2e2000","#2d1b4e"];
  return (
    <div className="my-8 overflow-x-auto">
      <svg viewBox="0 0 740 280" className="w-full max-w-3xl mx-auto block" style={{ minWidth: 360 }}>
        <text x="370" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Gradient Boosting: Sequential Residual Fitting</text>
        {[
          {label:"F₀", sub:"mean(y)",          note1:"Initial guess", note2:"+ residuals"},
          {label:"h₁", sub:"Tree on r(F₀)",    note1:"Learn",         note2:"residuals"},
          {label:"h₂", sub:"Tree on r(F₁)",    note1:"Smaller",       note2:"residuals"},
          {label:"h_M",sub:"Tree on r(F_{M-1})",note1:"Near-zero",    note2:"residuals"},
        ].map((item, i) => {
          const x = 18 + i * 172;
          const isLast = i === 3;
          return (
            <g key={i}>
              {i > 0 && !isLast && <text x={x-14} y="145" fill="#2dd4bf" fontSize="18" fontWeight="bold">+</text>}
              {isLast && <text x={x-30} y="148" fill="#475569" fontSize="20" fontWeight="bold">…</text>}
              <rect x={isLast?x+14:x} y="40" width="118" height="170" rx="9" fill={treeFills[i]} stroke={treeColors[i]} strokeWidth="1.5"/>
              <text x={(isLast?x+14:x)+59} y="62"  textAnchor="middle" fill={treeColors[i]} fontSize="12" fontWeight="bold" fontFamily="monospace">{item.label}</text>
              <text x={(isLast?x+14:x)+59} y="78"  textAnchor="middle" fill="#94a3b8"       fontSize="9"  fontFamily="Inter,sans-serif">{item.sub}</text>
              <rect x={(isLast?x+14:x)+12} y="92"  width="94" height="58" rx="5" fill="#0f172a" stroke="#334155"/>
              <line x1={(isLast?x+14:x)+59} y1="97"  x2={(isLast?x+14:x)+59} y2="110" stroke="#334155" strokeWidth="1"/>
              <line x1={(isLast?x+14:x)+30} y1="110" x2={(isLast?x+14:x)+88} y2="110" stroke="#334155" strokeWidth="1"/>
              <line x1={(isLast?x+14:x)+30} y1="110" x2={(isLast?x+14:x)+30} y2="125" stroke="#334155" strokeWidth="1"/>
              <line x1={(isLast?x+14:x)+88} y1="110" x2={(isLast?x+14:x)+88} y2="125" stroke="#334155" strokeWidth="1"/>
              <text x={(isLast?x+14:x)+59} y="185" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">{item.note1}</text>
              <text x={(isLast?x+14:x)+59} y="198" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">{item.note2}</text>
              {i < 3 && <text x={x+130} y="145" fill="#2dd4bf" fontSize="14" fontWeight="bold">+</text>}
            </g>
          );
        })}
        <text x="700" y="143" fill="#2dd4bf" fontSize="16" fontWeight="bold">=</text>
        <rect x="714" y="110" width="20" height="60" rx="5" fill="#0f172a" stroke="#2dd4bf" strokeWidth="1.5"/>
        <text x="724" y="144" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontFamily="monospace">F_M</text>
      </svg>
      <p className="text-center text-xs font-mono text-muted-foreground mt-2">Fig 4. Each tree fits the residuals of the current ensemble — gradient descent in function space</p>
    </div>
  );
}

// ─── ARTICLE DATA ─────────────────────────────────────────────────────────────

interface Block {
  type: "text"|"h2"|"h3"|"code"|"formula"|"callout"|"list"|"diagram"|"chart"|"table";
  text?: string;
  latex?: string;
  code?: string; language?: string;
  kind?: "insight"|"warning"|"resource"; title?: string;
  items?: string[];
  headers?: string[]; rows?: string[][];
  id?: string;
}

interface Article {
  slug: string; title: string; subtitle: string;
  date: string; readTime: number; category: string;
  tags: string[]; image: string; toc: string[];
  content: Block[];
  references: {authors:string; year:number; title:string; venue:string; url:string}[];
}

const articles: Record<string, Article> = {
  "transformers-self-attention": {
    slug: "transformers-self-attention",
    title: "Self-Attention Demystified: Understanding Transformers from First Principles",
    subtitle: "A complete technical breakdown of the architecture that changed everything — with math, code, and diagrams",
    date: "2024-11-12", readTime: 20, category: "Deep Learning",
    tags: ["Transformers","NLP","Self-Attention","PyTorch","Architecture"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=85",
    toc: ["Why RNNs Hit a Wall","Attention as Soft Retrieval","Scaled Dot-Product Attention","Multi-Head Attention","Positional Encoding","The Full Encoder Block","Vision Transformers","Practical Lessons"],
    content: [
      { type:"text", text:`When "Attention is All You Need" appeared on arXiv in June 2017, I was partway through a machine learning course and had just spent two weeks debugging a vanishing-gradient problem in a stacked LSTM. I read the paper three times before I really understood it. The idea seemed almost too simple: throw out recurrence entirely, replace it with attention, and scale it up. No hidden state threading through time. No sequential dependency. Just matrix multiplications and a normalization trick.`},
      { type:"text", text:`Seven years later, the Transformer underpins essentially every state-of-the-art system in NLP (BERT, GPT-4, LLaMA), vision (ViT, DINO), protein folding (AlphaFold 2), and speech (Whisper). This architecture is not optional background knowledge — it's foundational.`},
      { type:"h2", text:"Why RNNs Hit a Wall"},
      { type:"text", text:`The dominant paradigm before Transformers was the LSTM. These process one token at a time, maintaining a hidden state that compresses everything seen so far. The problem: compression is lossy by definition. By the time an LSTM has processed 500 tokens, information from token 1 is several hundred gradient steps away. Gradients either vanish or explode. The second problem is sequential computation: each step depends on the previous one, so training cannot be parallelized over the sequence dimension.`},
      { type:"callout", kind:"insight", title:"The Bahdanau attention addendum", text:`Bahdanau et al. (2014) partially fixed long-range dependencies by adding attention on top of encoder-decoder RNNs, letting the decoder look at all encoder states when generating each token. "Attention is All You Need" took the logical conclusion: if attention is doing the work, why keep the RNN at all?`},
      { type:"h2", text:"The Core Insight: Attention as Soft Retrieval"},
      { type:"text", text:`Think of self-attention as a soft database lookup. A standard lookup takes a query, matches it against keys, and returns the associated value. Self-attention returns a weighted average of all values, with weights proportional to query-key similarity. For each token, you compute three vectors — Query (what am I looking for?), Key (what do I contain?), Value (what do I carry?) — as linear projections of the same input.`},
      { type:"h2", text:"Scaled Dot-Product Attention: The Full Math"},
      { type:"text", text:`Given input matrix X ∈ ℝ^(n × d_model), we project into Q, K, V:` },
      { type:"formula", latex:`Q = XW_Q, \\quad K = XW_K, \\quad V = XW_V \\qquad W_Q, W_K \\in \\mathbb{R}^{d_{\\text{model}} \\times d_k}, \\; W_V \\in \\mathbb{R}^{d_{\\text{model}} \\times d_v}`},
      { type:"text", text:`The attention output is:` },
      { type:"formula", latex:`\\text{Attention}(Q,\\,K,\\,V) = \\text{softmax}\\!\\left(\\frac{QK^\\top}{\\sqrt{d_k}}\\right)V`},
      { type:"text", text:`The division by √d_k is critical. Dot products Q·Kᵀ grow in magnitude as d_k increases — the variance of the dot product is d_k for random unit vectors. Without scaling, softmax receives very large inputs and pushes into regions where its gradient nearly vanishes. Training stalls.`},
      { type:"diagram", id:"attention"},
      { type:"chart", id:"attention-heatmap"},
      { type:"code", language:"python", code:`import torch\nimport torch.nn as nn\nimport torch.nn.functional as F\nimport math\n\nclass ScaledDotProductAttention(nn.Module):\n    \"\"\"Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V\"\"\"\n    def forward(self, Q, K, V, mask=None):\n        d_k = Q.size(-1)\n        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)\n        if mask is not None:\n            scores = scores.masked_fill(mask == 0, float('-inf'))\n        attn_weights = F.softmax(scores, dim=-1)\n        return torch.matmul(attn_weights, V), attn_weights\n\n\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, d_model=512, num_heads=8):\n        super().__init__()\n        assert d_model % num_heads == 0\n        self.num_heads = num_heads\n        self.d_k = d_model // num_heads\n        self.W_Q = nn.Linear(d_model, d_model)\n        self.W_K = nn.Linear(d_model, d_model)\n        self.W_V = nn.Linear(d_model, d_model)\n        self.W_O = nn.Linear(d_model, d_model)\n        self.attention = ScaledDotProductAttention()\n\n    def split_heads(self, x, B):\n        return x.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)\n\n    def forward(self, x, mask=None):\n        B, S, _ = x.shape\n        Q = self.split_heads(self.W_Q(x), B)\n        K = self.split_heads(self.W_K(x), B)\n        V = self.split_heads(self.W_V(x), B)\n        out, _ = self.attention(Q, K, V, mask)\n        out = out.transpose(1, 2).contiguous().view(B, S, -1)\n        return self.W_O(out)`},
      { type:"h2", text:"Multi-Head Attention"},
      { type:"text", text:`A single head can only capture one type of relationship. Multi-head attention runs h independent attention operations in a lower-dimensional subspace (d_k = d_model / h), then concatenates and projects back:`},
      { type:"formula", latex:`\\text{MultiHead}(Q,K,V) = \\text{Concat}(\\text{head}_1,\\ldots,\\text{head}_h)\\,W^O`},
      { type:"formula", latex:`\\text{head}_i = \\text{Attention}\\!\\left(QW_i^Q,\\; KW_i^K,\\; VW_i^V\\right)`},
      { type:"text", text:`In practice, heads specialize: some capture syntactic relationships, others semantic associations, others positional patterns. This emergent specialization is one of the most fascinating properties of the architecture.`},
      { type:"diagram", id:"multihead"},
      { type:"h2", text:"Positional Encoding"},
      { type:"text", text:`Attention is permutation-equivariant — shuffle the tokens and the output shuffles identically. The original paper uses sinusoidal positional encodings added to input embeddings before the first layer:`},
      { type:"formula", latex:`\\text{PE}_{(pos,\\,2i)} = \\sin\\!\\left(\\frac{pos}{10000^{\\,2i/d_{\\text{model}}}}\\right), \\quad \\text{PE}_{(pos,\\,2i+1)} = \\cos\\!\\left(\\frac{pos}{10000^{\\,2i/d_{\\text{model}}}}\\right)`},
      { type:"text", text:`The relative position between two tokens can always be expressed as a linear function of their encodings. Modern models use RoPE and ALiBi, but the original scheme remains elegant and worth understanding.`},
      { type:"h2", text:"Transformer vs LSTM: Empirical Comparison"},
      { type:"chart", id:"training-loss"},
      { type:"h2", text:"Vision Transformers"},
      { type:"text", text:`In 2020, Dosovitskiy et al. showed that cutting an image into 16×16 pixel patches, flattening each patch into a vector, and treating the sequence exactly like tokens gives a pure Transformer competitive with CNNs on ImageNet — and with enough data, superior. This confirmed the architecture is not intrinsically tied to language. ViT models now underpin DALL-E, CLIP, and most vision-language systems.`},
      { type:"h2", text:"Practical Lessons from Implementation"},
      { type:"list", items:[
        "Attention is O(n²) in memory and compute w.r.t. sequence length. For 2048-token context, 4M entries per head. FlashAttention, Longformer, and BigBird address this.",
        "Pre-LN (normalize before the sublayer) trains much more stably than Post-LN at large learning rates. If training diverges, this is the first thing to check.",
        "The feed-forward layers contain the majority of parameters — ~2/3 in GPT-2 style models. Don't underestimate them.",
        "Attention head pruning (Michel et al., 2019): 90% of heads can be pruned with minimal loss. Most are redundant, which raises real questions about what we think we understand.",
        "High attention weight does not mean important for the prediction (Jain & Wallace, 2019). Attention weights are not reliable explanations.",
      ]},
      { type:"callout", kind:"resource", title:"Andrej Karpathy's nanoGPT", text:"The most instructive resource for understanding GPT-style transformers: a complete GPT-2 in ~300 lines of PyTorch, built live on YouTube. I rebuilt it three times and learned something new each time."},
    ],
    references: [
      {authors:"Vaswani, A. et al.",year:2017,title:"Attention Is All You Need",venue:"NeurIPS 2017",url:"https://arxiv.org/abs/1706.03762"},
      {authors:"Bahdanau, D., Cho, K., & Bengio, Y.",year:2014,title:"Neural Machine Translation by Jointly Learning to Align and Translate",venue:"ICLR 2015",url:"https://arxiv.org/abs/1409.0473"},
      {authors:"Devlin, J. et al.",year:2018,title:"BERT: Pre-training of Deep Bidirectional Transformers",venue:"NAACL 2019",url:"https://arxiv.org/abs/1810.04805"},
      {authors:"Dosovitskiy, A. et al.",year:2020,title:"An Image is Worth 16x16 Words",venue:"ICLR 2021",url:"https://arxiv.org/abs/2010.11929"},
      {authors:"Alammar, J.",year:2018,title:"The Illustrated Transformer",venue:"jalammar.github.io",url:"https://jalammar.github.io/illustrated-transformer/"},
      {authors:"Karpathy, A.",year:2022,title:"nanoGPT",venue:"GitHub",url:"https://github.com/karpathy/nanoGPT"},
      {authors:"Michel, P., Levy, O., & Neubig, G.",year:2019,title:"Are Sixteen Heads Really Better than One?",venue:"NeurIPS 2019",url:"https://arxiv.org/abs/1905.10650"},
    ],
  },

  "rlhf-demystified": {
    slug: "rlhf-demystified",
    title: "RLHF Demystified: How We Teach LLMs to Actually Behave",
    subtitle: "A rigorous walkthrough of SFT, reward modelling, PPO, and why DPO is taking over",
    date: "2025-01-08", readTime: 22, category: "AI & LLMs",
    tags: ["RLHF","LLMs","Alignment","PPO","Fine-tuning","DPO"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=85",
    toc: ["The Alignment Problem","Stage 1: SFT","Stage 2: Reward Model","Stage 3: PPO","KL Penalty","Constitutional AI","DPO","What Can Go Wrong"],
    content: [
      {type:"text",text:`A pretrained language model is, fundamentally, a next-token predictor trained on an enormous corpus. It models the distribution of human language remarkably well — but "plausible continuation" and "useful, accurate, safe answer" are very different things. The raw pretrained model might answer a medication question by continuing a forum post in the style of a random commenter. It has no concept of helpfulness.`},
      {type:"text",text:`RLHF — Reinforcement Learning from Human Feedback — is the technique that bridges this gap. It's what turned GPT-3 into InstructGPT and eventually ChatGPT. Understanding it properly matters: if you're deploying fine-tuned models, this pipeline determines much of what you're working with.`},
      {type:"h2",text:"The Alignment Problem"},
      {type:"text",text:`We want models that follow instructions, are honest about uncertainty, refuse harmful requests, and generate responses humans find useful. These properties are hard to specify mathematically — you can't write a loss function that directly captures "be helpful." What you can do is collect human judgments about which responses are better and train a proxy for helpfulness from those judgments. This is exactly what RLHF does.`},
      {type:"h2",text:"Stage 1: Supervised Fine-Tuning (SFT)"},
      {type:"text",text:`Before any RL, you fine-tune the pretrained model on high-quality demonstration data. Human labellers write ideal responses to prompts — helpful, accurate, well-formatted. Standard cross-entropy fine-tuning on these (prompt, response) pairs gives you π_SFT. In the InstructGPT study, the 1.3B SFT model was rated better than 175B raw GPT-3 by human evaluators. A small amount of high-quality supervised data is extremely impactful.`},
      {type:"callout",kind:"insight",title:"SFT alone goes surprisingly far",text:"SFT already dominates the base model on most tasks. It still has systematic issues — sycophancy, over-refusal, factuality gaps — that RL helps correct. Think of SFT as seeding the policy; RL refines it."},
      {type:"h2",text:"Stage 2: Training the Reward Model"},
      {type:"text",text:`The reward model (RM) is trained to predict which of two responses a human would prefer. Given a prompt x and responses (y_w, y_l), human labellers mark the winner. The RM learns a scalar score r_θ(x, y). The training objective is a pairwise ranking loss derived from the Bradley-Terry model:`},
      {type:"formula",latex:`\\mathcal{L}_{\\text{RM}} = -\\,\\mathbb{E}_{(y_w,\\,y_l)\\sim\\mathcal{D}}\\!\\left[\\log\\sigma\\!\\left(r_\\theta(x,y_w) - r_\\theta(x,y_l)\\right)\\right]`},
      {type:"text",text:`The RM is typically initialized from the SFT model with the final layer replaced by a scalar output head. InstructGPT used 33,000 pairwise comparisons — expensive, but necessary for quality.`},
      {type:"diagram",id:"rlhf"},
      {type:"h2",text:"Stage 3: PPO Reinforcement Learning"},
      {type:"text",text:`With a trained reward model, you optimize the LM policy using PPO. The LM is the policy π_θ, the prompt x is the state, the generated response y is the action. The objective being maximized:`},
      {type:"formula",latex:`J(\\pi_\\theta) = \\mathbb{E}_{x\\sim\\mathcal{D},\\;y\\sim\\pi_\\theta}\\!\\left[\\,r_\\theta(x,y) - \\beta\\,D_{\\mathrm{KL}}\\!\\left(\\pi_\\theta(\\cdot|x)\\,\\|\\,\\pi_{\\text{SFT}}(\\cdot|x)\\right)\\right]`},
      {type:"h2",text:"The KL Penalty: Preventing Reward Hacking"},
      {type:"text",text:`The reward model is an imperfect proxy. Optimizing purely to maximize r_θ causes the LM to find and exploit the RM's blind spots — reward hacking. The KL penalty keeps the policy grounded in the SFT language distribution. Without it, a few thousand PPO steps can push the policy into degenerate, incoherent outputs that fool the reward model but are useless to humans.`},
      {type:"callout",kind:"warning",title:"Goodhart's Law in action",text:`"When a measure becomes a target, it ceases to be a good measure." The reward model is not human preference — it's a proxy. Over-optimizing it reliably degrades actual quality. OpenAI reported this phenomenon explicitly. Training runs are stopped before KL divergence becomes too large.`},
      {type:"chart",id:"reward-distribution"},
      {type:"chart",id:"ppo-training"},
      {type:"h2",text:"Constitutional AI: Anthropic's RLAIF"},
      {type:"text",text:`A major bottleneck in RLHF is the cost of human labelling. Anthropic's Constitutional AI (Bai et al., 2022) replaces human comparisons with AI-generated ones. You define a set of principles (a "constitution") and ask a stronger model to evaluate responses against them. The model can evaluate millions of its own responses without human input. This pipeline — RLAIF — is the foundation of Claude's training.`},
      {type:"h2",text:"DPO: A Simpler Alternative"},
      {type:"text",text:`PPO-based RLHF requires training four models simultaneously and managing a complex RL loop. In 2023, Rafailov et al. showed that the optimal RLHF policy has a closed-form solution relating it to the reference policy and the reward function. DPO directly optimizes the policy from preference data:`},
      {type:"formula",latex:`\\mathcal{L}_{\\text{DPO}} = -\\mathbb{E}_{(y_w,y_l)}\\!\\left[\\log\\sigma\\!\\left(\\beta\\log\\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta\\log\\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)}\\right)\\right]`},
      {type:"text",text:`A simple cross-entropy loss, one forward pass. No RL loop, no reward model, no value function. DPO has become the dominant approach for preference fine-tuning in 2024–2025.`},
      {type:"h2",text:"What Can Go Wrong"},
      {type:"list",items:[
        "Sycophancy: Models learn to tell users what they want to hear rather than what is accurate. Human raters prefer confident, flattering responses — and the RM picks this up.",
        "Over-refusal: Models can learn to refuse a wide range of benign requests to avoid any possibility of harmful output. Without careful calibration the model becomes uselessly cautious.",
        "Reward model errors compound: The RM is trained on a biased sample. Its judgments reflect those biases, amplified during PPO.",
        "Length bias: Longer responses tend to receive higher reward scores even when length adds no value. Models often become verbose as a result.",
      ]},
    ],
    references: [
      {authors:"Ouyang, L. et al.",year:2022,title:"Training language models to follow instructions with human feedback",venue:"NeurIPS 2022",url:"https://arxiv.org/abs/2203.02155"},
      {authors:"Christiano, P. et al.",year:2017,title:"Deep Reinforcement Learning from Human Preferences",venue:"NeurIPS 2017",url:"https://arxiv.org/abs/1706.03741"},
      {authors:"Bai, Y. et al.",year:2022,title:"Constitutional AI: Harmlessness from AI Feedback",venue:"Anthropic Technical Report",url:"https://arxiv.org/abs/2212.08073"},
      {authors:"Rafailov, R. et al.",year:2023,title:"Direct Preference Optimization",venue:"NeurIPS 2023",url:"https://arxiv.org/abs/2305.18290"},
      {authors:"Schulman, J. et al.",year:2017,title:"Proximal Policy Optimization Algorithms",venue:"arXiv:1707.06347",url:"https://arxiv.org/abs/1707.06347"},
    ],
  },

  "gradient-boosting-xgboost": {
    slug: "gradient-boosting-xgboost",
    title: "Gradient Boosting Under the Hood: From AdaBoost to XGBoost",
    subtitle: "Gradient descent in function space — derived from first principles, then XGBoost's innovations explained",
    date: "2024-08-20", readTime: 17, category: "Machine Learning",
    tags: ["Gradient Boosting","XGBoost","LightGBM","Ensemble Methods","Tabular Data"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85",
    toc: ["Why Boosting Works","AdaBoost","Gradient Boosting","The Algorithm","XGBoost Innovations","LightGBM vs XGBoost","Practical Tips"],
    content: [
      {type:"text",text:`If you've done any Kaggle competition on tabular data, you've used gradient boosting. XGBoost, LightGBM, and CatBoost dominate competitions and production deployments for structured data — they reliably outperform deep learning on most tabular tasks with a fraction of the compute. Most practitioners treat them as black boxes and tune hyperparameters by grid search. Understanding the algorithm makes you dramatically more effective.`},
      {type:"h2",text:"Why Boosting Works"},
      {type:"text",text:`Ensemble methods combine many weak learners into a strong one. Bagging (Random Forests) does this in parallel on bootstrap samples. Boosting is sequential: each new learner focuses on correcting the mistakes of the current ensemble. Schapire's (1990) theorem proves that a weak learner — better than random by any margin — can be boosted to arbitrary accuracy. This is a strong result: even a very weak signal can be amplified.`},
      {type:"h2",text:"Gradient Boosting: Gradient Descent in Function Space"},
      {type:"text",text:`AdaBoost (Freund & Schapire, 1997) was tied to exponential loss. Friedman (2001) saw that AdaBoost was implicitly performing gradient descent in function space. Rather than taking steps in parameter space, you take steps in function space — fitting a new tree to the negative gradient of the loss at each iteration.`},
      {type:"text",text:`At iteration m, compute pseudo-residuals — the negative gradient of the loss evaluated at the current predictions:`},
      {type:"formula",latex:`r_i^{(m)} = -\\left[\\frac{\\partial\\, L(y_i,\\, F(x_i))}{\\partial\\, F(x_i)}\\right]_{F = F_{m-1}}`},
      {type:"text",text:`Fit a decision tree h_m to these pseudo-residuals, then update:`},
      {type:"formula",latex:`F_m(x) = F_{m-1}(x) + \\eta \\cdot h_m(x)`},
      {type:"text",text:`For squared error loss, the gradient is −(y − F), so pseudo-residuals are exactly the residuals y − F_{m-1}(x). "Fitting trees to residuals" is literally true for L2 loss.`},
      {type:"diagram",id:"gbdt"},
      {type:"chart",id:"boosting-rounds"},
      {type:"code",language:"python",code:`import numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\n\nclass GradientBoostingRegressor:\n    \"\"\"Gradient Boosting with squared error loss.\"\"\"\n    def __init__(self, n_estimators=100, learning_rate=0.1, max_depth=3):\n        self.n_estimators = n_estimators\n        self.learning_rate = learning_rate\n        self.max_depth = max_depth\n        self.trees = []\n        self.F0 = None\n\n    def fit(self, X, y):\n        self.F0 = np.mean(y)            # Initial prediction\n        F = np.full(len(y), self.F0)\n        for _ in range(self.n_estimators):\n            residuals = y - F            # Negative gradient of L2 loss\n            tree = DecisionTreeRegressor(max_depth=self.max_depth)\n            tree.fit(X, residuals)\n            F += self.learning_rate * tree.predict(X)\n            self.trees.append(tree)\n        return self\n\n    def predict(self, X):\n        F = np.full(X.shape[0], self.F0)\n        for tree in self.trees:\n            F += self.learning_rate * tree.predict(X)\n        return F`},
      {type:"h2",text:"XGBoost's Key Innovations"},
      {type:"text",text:`The vanilla implementation is correct but too slow and overfit-prone. XGBoost (Chen & Guestrin, 2016) introduced critical innovations. Instead of using only the first-order gradient, XGBoost uses a second-order Taylor expansion. The optimal leaf value is computed analytically:`},
      {type:"formula",latex:`w_j^* = -\\frac{G_j}{H_j + \\lambda}, \\qquad G_j = \\sum_{i\\in\\text{leaf}_j} g_i, \\quad H_j = \\sum_{i\\in\\text{leaf}_j} h_i`},
      {type:"text",text:`And the gain from any split is:`},
      {type:"formula",latex:`\\text{Gain} = \\frac{1}{2}\\left[\\frac{G_L^2}{H_L+\\lambda} + \\frac{G_R^2}{H_R+\\lambda} - \\frac{(G_L+G_R)^2}{H_L+H_R+\\lambda}\\right] - \\gamma`},
      {type:"text",text:`where λ is L2 regularization on leaf weights and γ is the minimum gain threshold for a split (pruning). This closed-form lets XGBoost evaluate optimal splits without gradient descent inside each tree — faster and more numerically stable.`},
      {type:"h2",text:"LightGBM vs XGBoost vs CatBoost"},
      {type:"table",
        headers:["","XGBoost","LightGBM","CatBoost"],
        rows:[
          ["Tree growth","Level-wise","Leaf-wise","Symmetric (oblivious)"],
          ["Speed","Fast","Very fast","Moderate"],
          ["Memory","Moderate","Low","Moderate"],
          ["Categoricals","Needs encoding","Basic","Native (very strong)"],
          ["Small data","Good","Can overfit","Very good"],
          ["Large data","Good","Best","Good"],
        ]},
      {type:"text",text:`LightGBM's leaf-wise growth finds better splits faster but requires more careful regularization. For large datasets (millions of rows), LightGBM is almost always my first choice. For many categorical features, CatBoost's native encoding is genuinely better than anything you can do manually with target encoding or ordinal encoding.`},
      {type:"h2",text:"Feature Importance & Interpretability"},
      {type:"chart",id:"feature-importance"},
      {type:"h2",text:"Practical Tips"},
      {type:"list",items:[
        "Lower learning rate + more trees consistently beats higher lr + fewer trees. Start with lr=0.05 and n_estimators=1000.",
        "Use early stopping — evaluate on val set every 10 rounds, stop after 50 with no improvement. This single decision matters most.",
        "max_depth=4-6 for XGBoost. LightGBM uses num_leaves (31-127 good range). These two parameters primarily drive model complexity.",
        "subsample=0.8 and colsample_bytree=0.8 almost always helps generalization and provides minor speedup.",
        "For binary classification, scale_pos_weight = neg_count/pos_count handles class imbalance cleanly within XGBoost.",
        "Use SHAP values for feature attribution — theoretically grounded (Shapley values), exact in O(TLD) time for trees.",
      ]},
    ],
    references: [
      {authors:"Friedman, J. H.",year:2001,title:"Greedy Function Approximation: A Gradient Boosting Machine",venue:"Annals of Statistics, 29(5)",url:"https://projecteuclid.org/journals/annals-of-statistics/volume-29/issue-5/Greedy-function-approximation-A-gradient-boostingmachine/10.1214/aos/1013203451.full"},
      {authors:"Chen, T., & Guestrin, C.",year:2016,title:"XGBoost: A Scalable Tree Boosting System",venue:"KDD 2016",url:"https://arxiv.org/abs/1603.02754"},
      {authors:"Ke, G. et al.",year:2017,title:"LightGBM: A Highly Efficient Gradient Boosting Decision Tree",venue:"NeurIPS 2017",url:"https://proceedings.neurips.cc/paper_files/paper/2017/file/6449f44a102fde848669bdd9eb6b76fa-Paper.pdf"},
      {authors:"Prokhorenkova, L. et al.",year:2018,title:"CatBoost: unbiased boosting with categorical features",venue:"NeurIPS 2018",url:"https://arxiv.org/abs/1706.09516"},
      {authors:"Freund, Y., & Schapire, R. E.",year:1997,title:"A Decision-Theoretic Generalization of On-Line Learning and an Application to Boosting",venue:"JCSS 55(1)",url:"https://www.sciencedirect.com/science/article/pii/S002200009791504X"},
      {authors:"Lundberg, S. M., & Lee, S. I.",year:2017,title:"A Unified Approach to Interpreting Model Predictions (SHAP)",venue:"NeurIPS 2017",url:"https://arxiv.org/abs/1705.07874"},
    ],
  },
};

// ─── CHART MAP ───────────────────────────────────────────────────────────────

const chartMap: Record<string, JSX.Element> = {
  "attention-heatmap":   <AttentionHeatmapChart />,
  "training-loss":       <TrainingLossChart />,
  "reward-distribution": <RewardDistributionChart />,
  "ppo-training":        <PPOTrainingChart />,
  "boosting-rounds":     <BoostingRoundsChart />,
  "feature-importance":  <FeatureImportanceChart />,
};

// ─── BLOCK RENDERER ──────────────────────────────────────────────────────────

const diagramMap: Record<string, JSX.Element> = {
  attention: <AttentionDiagram />,
  multihead: <MultiHeadDiagram />,
  rlhf:      <RLHFDiagram />,
  gbdt:      <GBDTDiagram />,
};

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case "text":
      return <p key={idx} className="text-muted-foreground leading-relaxed text-[1.05rem] mb-5">{block.text}</p>;
    case "h2":
      return <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-5 pb-2 border-b border-border/40">{block.text}</h2>;
    case "h3":
      return <h3 key={idx} className="text-xl font-bold text-foreground mt-8 mb-3">{block.text}</h3>;

    case "formula":
      return <div key={idx}><Math latex={block.latex!} display /></div>;

    case "code":
      return (
        <div key={idx} className="my-6">
          <div className="flex items-center justify-between px-4 py-2 bg-black/70 rounded-t-lg border-t border-l border-r border-border/40">
            <span className="text-xs font-mono text-muted-foreground">{block.language}</span>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60"/>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
              <div className="w-3 h-3 rounded-full bg-green-500/60"/>
            </div>
          </div>
          <pre className="bg-black/50 rounded-b-lg p-4 font-mono text-[0.82rem] leading-relaxed overflow-x-auto text-slate-300 whitespace-pre border border-border/30 border-t-0">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "callout": {
      const styles  = {insight:"border-blue-500/50 bg-blue-950/20", warning:"border-yellow-500/50 bg-yellow-950/15", resource:"border-green-500/50 bg-green-950/15"};
      const icons   = {insight:"💡", warning:"⚠️", resource:"📚"};
      const tcols   = {insight:"text-blue-300", warning:"text-yellow-300", resource:"text-green-300"};
      const k = (block.kind || "insight") as "insight"|"warning"|"resource";
      return (
        <div key={idx} className={`my-8 p-5 rounded-xl border-l-4 ${styles[k]}`}>
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0">{icons[k]}</span>
            <div>
              <p className={`font-bold mb-2 ${tcols[k]}`}>{block.title}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }

    case "list":
      return (
        <ul key={idx} className="my-5 space-y-3">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
              <span className="text-primary mt-1.5 flex-shrink-0 text-xs">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div key={idx} className="my-8 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-card">
                {block.headers?.map((h,i) => <th key={i} className="px-4 py-3 text-left font-bold text-primary border border-border/40 font-mono">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows?.map((row, ri) => (
                <tr key={ri} className={ri%2===0?"bg-background":"bg-card/50"}>
                  {row.map((cell,ci) => <td key={ci} className={`px-4 py-3 border border-border/30 ${ci===0?"font-semibold text-foreground":"text-muted-foreground"}`}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "diagram":
      return <div key={idx}>{diagramMap[block.id!] || null}</div>;

    case "chart":
      return <div key={idx}>{chartMap[block.id!] || null}</div>;

    default:
      return null;
  }
}

// ─── READING PROGRESS ─────────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-0.5 z-50 pointer-events-none">
      <div className="h-full bg-primary transition-all duration-75" style={{ width: `${progress}%` }}/>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article  = slug ? articles[slug] : null;
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Article introuvable</h1>
          <p className="text-muted-foreground mb-8">Cet article n&apos;existe pas encore.</p>
          <Link to="/#blog" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            <ArrowLeft size={16}/> Retour au blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryColors: Record<string,string> = {
    "Deep Learning": "bg-blue-500/15 text-blue-400 border-blue-500/30",
    "AI & LLMs":     "bg-purple-500/15 text-purple-400 border-purple-500/30",
    "Machine Learning":"bg-green-500/15 text-green-400 border-green-500/30",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />
      <Navbar />

      {/* Hero image */}
      <div className="pt-16 relative h-64 sm:h-80 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"/>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-0 pb-6">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          <Link to="/#blog" className="inline-flex items-center gap-1.5 text-primary hover:underline text-sm mb-6">
            <ArrowLeft size={14}/> Tous les articles
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColors[article.category]}`}>{article.category}</span>
            <span className="text-muted-foreground text-sm font-mono flex items-center gap-1"><Calendar size={12}/>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
            <span className="text-muted-foreground text-sm font-mono flex items-center gap-1"><Clock size={12}/>{article.readTime} min</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">{article.title}</h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-6">{article.subtitle}</p>
          <div className="flex flex-wrap gap-2 pb-8 border-b border-border/40">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-card rounded-lg text-xs font-mono text-primary border border-primary/20">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content + sidebar */}
      <div className="max-w-4xl mx-auto px-6 pb-20 flex gap-12">
        {article.toc.length > 0 && (
          <aside className="hidden xl:block w-52 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <BookOpen size={12}/> Contents
              </p>
              {article.toc.map((item, i) => (
                <p key={i} className="text-xs text-muted-foreground py-1 pl-3 border-l-2 border-border hover:border-primary hover:text-primary transition-colors leading-relaxed cursor-default">{item}</p>
              ))}
            </div>
          </aside>
        )}

        <motion.article
          initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.4, delay:0.1}}
          className="min-w-0 flex-1"
        >
          {article.content.map((block, idx) => renderBlock(block, idx))}

          {/* References */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <h2 className="text-xl font-bold mb-6 font-mono">Références</h2>
            <ol className="space-y-4">
              {article.references.map((ref, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary font-mono font-bold flex-shrink-0 mt-0.5">[{i+1}]</span>
                  <span>
                    {ref.authors} ({ref.year}). <em className="text-foreground">{ref.title}</em>. {ref.venue}.{" "}
                    {ref.url && <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-xs break-all">{ref.url}</a>}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Footer nav */}
          <div className="mt-12 pt-8 border-t border-border/40 flex items-center justify-between">
            <Link to="/#blog" className="flex items-center gap-2 text-primary hover:underline font-semibold">
              <ArrowLeft size={16}/> Tous les articles
            </Link>
            <Link to="/#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Des questions ? Contactez-moi →
            </Link>
          </div>
        </motion.article>
      </div>

      <Footer/>
    </div>
  );
}
