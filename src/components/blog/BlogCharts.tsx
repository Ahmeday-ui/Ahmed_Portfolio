import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, Cell,
} from "recharts";

// ─── SEABORN-INSPIRED THEME ───────────────────────────────────────────────────

const C = {
  teal:   "#2dd4bf",
  blue:   "#60a5fa",
  amber:  "#f59e0b",
  purple: "#a78bfa",
  red:    "#f87171",
  green:  "#34d399",
  grid:   "#1e293b",
  axis:   "#64748b",
  tick:   "#94a3b8",
  bg:     "#0f172a",
  card:   "#1e293b",
  tooltip:"#1e293b",
};

const tooltipStyle = {
  backgroundColor: C.tooltip,
  border: "1px solid #334155",
  borderRadius: "8px",
  color: "#e2e8f0",
  fontSize: 12,
  fontFamily: "monospace",
};

const axisStyle = { fill: C.tick, fontSize: 11, fontFamily: "monospace" };
const labelStyle = { fill: C.axis, fontSize: 11, fontFamily: "monospace" };
const legendStyle = { color: C.tick, fontSize: 11, fontFamily: "monospace" };

// ─── CHART 1: ATTENTION HEATMAP (SVG custom) ─────────────────────────────────

export function AttentionHeatmapChart() {
  const tokens = ["The", "cat", "sat", "on", "the", "mat"];
  const weights = [
    [0.45, 0.25, 0.10, 0.08, 0.07, 0.05],
    [0.12, 0.38, 0.28, 0.10, 0.07, 0.05],
    [0.08, 0.32, 0.28, 0.18, 0.08, 0.06],
    [0.07, 0.10, 0.15, 0.42, 0.15, 0.11],
    [0.08, 0.08, 0.08, 0.12, 0.42, 0.22],
    [0.06, 0.07, 0.09, 0.10, 0.22, 0.46],
  ];

  const cell = 54;
  const pad = 56;
  const total = tokens.length * cell + pad + 8;

  return (
    <figure className="my-8">
      <div className="bg-card/40 rounded-xl border border-border/40 p-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${total} ${total}`}
          className="mx-auto block"
          style={{ maxWidth: 420, width: "100%" }}
        >
          {/* Column labels (top) */}
          {tokens.map((t, c) => (
            <text
              key={`col-${c}`}
              x={pad + c * cell + cell / 2}
              y={pad - 10}
              textAnchor="middle"
              fill={C.tick}
              fontSize={11}
              fontFamily="monospace"
            >
              {t}
            </text>
          ))}
          {/* Row labels (left) */}
          {tokens.map((t, r) => (
            <text
              key={`row-${r}`}
              x={pad - 10}
              y={pad + r * cell + cell / 2 + 4}
              textAnchor="end"
              fill={C.tick}
              fontSize={11}
              fontFamily="monospace"
            >
              {t}
            </text>
          ))}
          {/* Axis labels */}
          <text x={pad + (tokens.length * cell) / 2} y={total - 4} textAnchor="middle" fill={C.axis} fontSize={10} fontFamily="monospace">Keys (attended to)</text>
          <text x={10} y={pad + (tokens.length * cell) / 2} textAnchor="middle" fill={C.axis} fontSize={10} fontFamily="monospace" transform={`rotate(-90,10,${pad + (tokens.length * cell) / 2})`}>Queries</text>

          {/* Cells */}
          {weights.map((row, r) =>
            row.map((val, c) => {
              const alpha = 0.12 + val * 0.88;
              const textColor = val > 0.28 ? "#0f172a" : "#e2e8f0";
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={pad + c * cell}
                    y={pad + r * cell}
                    width={cell - 2}
                    height={cell - 2}
                    fill={`rgba(45,212,191,${alpha})`}
                    rx={3}
                  />
                  <text
                    x={pad + c * cell + cell / 2}
                    y={pad + r * cell + cell / 2 + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize={10}
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {val.toFixed(2)}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>
      <figcaption className="text-center text-xs font-mono text-muted-foreground mt-2">
        Fig. Attention weights for "The cat sat on the mat" — rows = queries, cols = keys.
        Diagonal dominance shows self-attention; "cat"→"sat" captures subject-verb relation.
      </figcaption>
    </figure>
  );
}

// ─── CHART 2: TRANSFORMER vs LSTM TRAINING LOSS ────────────────────────────

const trainingLossData = [
  { epoch: 1,  transformer: 3.82, lstm: 3.18 },
  { epoch: 2,  transformer: 3.21, lstm: 2.96 },
  { epoch: 3,  transformer: 2.68, lstm: 2.74 },
  { epoch: 4,  transformer: 2.15, lstm: 2.55 },
  { epoch: 5,  transformer: 1.78, lstm: 2.40 },
  { epoch: 6,  transformer: 1.47, lstm: 2.26 },
  { epoch: 7,  transformer: 1.24, lstm: 2.14 },
  { epoch: 8,  transformer: 1.08, lstm: 2.04 },
  { epoch: 9,  transformer: 0.97, lstm: 1.95 },
  { epoch: 10, transformer: 0.89, lstm: 1.87 },
  { epoch: 11, transformer: 0.83, lstm: 1.81 },
  { epoch: 12, transformer: 0.79, lstm: 1.75 },
  { epoch: 13, transformer: 0.76, lstm: 1.71 },
  { epoch: 14, transformer: 0.74, lstm: 1.67 },
  { epoch: 15, transformer: 0.72, lstm: 1.64 },
  { epoch: 16, transformer: 0.71, lstm: 1.62 },
  { epoch: 17, transformer: 0.70, lstm: 1.60 },
  { epoch: 18, transformer: 0.69, lstm: 1.58 },
  { epoch: 19, transformer: 0.68, lstm: 1.57 },
  { epoch: 20, transformer: 0.68, lstm: 1.56 },
];

export function TrainingLossChart() {
  return (
    <figure className="my-8">
      <div className="bg-card/40 rounded-xl border border-border/40 p-4">
        <p className="text-sm font-semibold text-foreground mb-3 font-mono text-center">
          Transformer vs LSTM — Training Loss (NLP translation task)
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={trainingLossData} margin={{ top: 8, right: 28, left: 4, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} strokeOpacity={0.9} />
            <XAxis
              dataKey="epoch"
              stroke={C.axis}
              tick={axisStyle}
              label={{ value: "Epoch", position: "insideBottom", offset: -12, style: labelStyle }}
            />
            <YAxis
              stroke={C.axis}
              tick={axisStyle}
              domain={[0.5, 4.0]}
              label={{ value: "Cross-Entropy Loss", angle: -90, position: "insideLeft", offset: 14, style: labelStyle }}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toFixed(3), ""]} />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" />
            <Line type="monotone" dataKey="transformer" stroke={C.teal}  strokeWidth={2.5} dot={false} name="Transformer" />
            <Line type="monotone" dataKey="lstm"        stroke={C.amber} strokeWidth={2.5} dot={false} name="LSTM"        strokeDasharray="5 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-center text-xs font-mono text-muted-foreground mt-2">
        Transformers converge ~3× faster and reach 56% lower final loss — thanks to parallelism and global context.
      </figcaption>
    </figure>
  );
}

// ─── CHART 3: REWARD DISTRIBUTION BEFORE/AFTER RLHF ─────────────────────────

// Pre-computed normal distribution histogram bins
function normalDist(mean: number, std: number, x: number) {
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
}

const rewardBins = Array.from({ length: 30 }, (_, i) => {
  const x = -3 + i * 0.2;
  return {
    score: parseFloat(x.toFixed(1)),
    before: parseFloat((normalDist(0.1, 0.9, x) * 0.2).toFixed(4)),
    after:  parseFloat((normalDist(1.85, 0.65, x) * 0.2).toFixed(4)),
  };
});

export function RewardDistributionChart() {
  return (
    <figure className="my-8">
      <div className="bg-card/40 rounded-xl border border-border/40 p-4">
        <p className="text-sm font-semibold text-foreground mb-3 font-mono text-center">
          Reward Score Distribution — Before vs After RLHF
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={rewardBins} margin={{ top: 8, right: 28, left: 4, bottom: 24 }}>
            <defs>
              <linearGradient id="gradBefore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C.amber}  stopOpacity={0.4} />
                <stop offset="95%" stopColor={C.amber}  stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradAfter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C.teal}   stopOpacity={0.5} />
                <stop offset="95%" stopColor={C.teal}   stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} strokeOpacity={0.9} />
            <XAxis
              dataKey="score"
              stroke={C.axis}
              tick={axisStyle}
              label={{ value: "Reward Score r(x,y)", position: "insideBottom", offset: -12, style: labelStyle }}
              tickFormatter={(v) => v.toFixed(1)}
            />
            <YAxis stroke={C.axis} tick={axisStyle} tickFormatter={(v) => v.toFixed(3)}
              label={{ value: "Density", angle: -90, position: "insideLeft", offset: 14, style: labelStyle }}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toFixed(4), ""]} />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" />
            <ReferenceLine x={0} stroke="#475569" strokeDasharray="4 3" label={{ value: "neutral", fill: "#64748b", fontSize: 10 }} />
            <Area type="monotone" dataKey="before" stroke={C.amber} fill="url(#gradBefore)" strokeWidth={2} name="Before RLHF (SFT)" />
            <Area type="monotone" dataKey="after"  stroke={C.teal}  fill="url(#gradAfter)"  strokeWidth={2} name="After RLHF (PPO)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-center text-xs font-mono text-muted-foreground mt-2">
        PPO shifts the reward distribution rightward by ~1.75 points — a clear improvement in response quality.
        The tighter peak also indicates reduced variance in output quality.
      </figcaption>
    </figure>
  );
}

// ─── CHART 4: PPO TRAINING DYNAMICS ──────────────────────────────────────────

const ppoData = [
  { step: 0,    reward: 0.21, kl: 0.00 },
  { step: 50,   reward: 0.48, kl: 0.12 },
  { step: 100,  reward: 0.74, kl: 0.28 },
  { step: 150,  reward: 0.96, kl: 0.48 },
  { step: 200,  reward: 1.14, kl: 0.71 },
  { step: 250,  reward: 1.28, kl: 0.95 },
  { step: 300,  reward: 1.40, kl: 1.18 },
  { step: 350,  reward: 1.49, kl: 1.38 },
  { step: 400,  reward: 1.56, kl: 1.57 },
  { step: 450,  reward: 1.61, kl: 1.74 },
  { step: 500,  reward: 1.66, kl: 1.89 },
  { step: 600,  reward: 1.72, kl: 2.12 },
  { step: 700,  reward: 1.76, kl: 2.30 },
  { step: 800,  reward: 1.79, kl: 2.44 },
  { step: 900,  reward: 1.81, kl: 2.55 },
  { step: 1000, reward: 1.82, kl: 2.62 },
];

export function PPOTrainingChart() {
  return (
    <figure className="my-8">
      <div className="bg-card/40 rounded-xl border border-border/40 p-4">
        <p className="text-sm font-semibold text-foreground mb-3 font-mono text-center">
          PPO Training: Reward Score &amp; KL Divergence over Steps
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={ppoData} margin={{ top: 8, right: 50, left: 4, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} strokeOpacity={0.9} />
            <XAxis
              dataKey="step"
              stroke={C.axis}
              tick={axisStyle}
              label={{ value: "PPO Steps", position: "insideBottom", offset: -12, style: labelStyle }}
            />
            <YAxis
              yAxisId="reward"
              stroke={C.teal}
              tick={{ ...axisStyle, fill: C.teal }}
              domain={[0, 2.2]}
              label={{ value: "Reward", angle: -90, position: "insideLeft", offset: 14, style: { ...labelStyle, fill: C.teal } }}
            />
            <YAxis
              yAxisId="kl"
              orientation="right"
              stroke={C.red}
              tick={{ ...axisStyle, fill: C.red }}
              domain={[0, 3.5]}
              label={{ value: "KL Div.", angle: 90, position: "insideRight", offset: 14, style: { ...labelStyle, fill: C.red } }}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [v.toFixed(3), name]} />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" />
            <ReferenceLine yAxisId="reward" y={1.82} stroke="#475569" strokeDasharray="4 3" label={{ value: "plateau", fill: "#64748b", fontSize: 10 }} />
            <Line yAxisId="reward" type="monotone" dataKey="reward" stroke={C.teal}  strokeWidth={2.5} dot={false} name="Avg Reward" />
            <Line yAxisId="kl"     type="monotone" dataKey="kl"     stroke={C.red}   strokeWidth={2}   dot={false} name="KL(π||π_SFT)" strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-center text-xs font-mono text-muted-foreground mt-2">
        Reward improves rapidly then plateaus. KL divergence grows steadily — once it exceeds ~2.5 nats,
        response quality typically degrades (reward hacking). Training is stopped before this point.
      </figcaption>
    </figure>
  );
}

// ─── CHART 5: GRADIENT BOOSTING — TRAIN/VAL ERROR vs ROUNDS ─────────────────

const boostingData = [
  { round: 10,  train: 2.82, val: 2.79 },
  { round: 20,  train: 2.11, val: 2.14 },
  { round: 30,  train: 1.64, val: 1.71 },
  { round: 40,  train: 1.31, val: 1.42 },
  { round: 50,  train: 1.07, val: 1.22 },
  { round: 60,  train: 0.90, val: 1.08 },
  { round: 70,  train: 0.76, val: 0.98 },
  { round: 80,  train: 0.65, val: 0.91 },
  { round: 90,  train: 0.56, val: 0.86 },
  { round: 100, train: 0.48, val: 0.83 },
  { round: 110, train: 0.42, val: 0.81 },
  { round: 120, train: 0.37, val: 0.80 },  // <- early stop here
  { round: 130, train: 0.33, val: 0.80 },
  { round: 140, train: 0.29, val: 0.81 },
  { round: 150, train: 0.25, val: 0.83 },
  { round: 160, train: 0.22, val: 0.85 },
  { round: 170, train: 0.19, val: 0.88 },
  { round: 180, train: 0.17, val: 0.90 },
  { round: 190, train: 0.15, val: 0.93 },
  { round: 200, train: 0.13, val: 0.97 },
];

export function BoostingRoundsChart() {
  return (
    <figure className="my-8">
      <div className="bg-card/40 rounded-xl border border-border/40 p-4">
        <p className="text-sm font-semibold text-foreground mb-3 font-mono text-center">
          Gradient Boosting — Train &amp; Validation RMSE vs Boosting Rounds
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={boostingData} margin={{ top: 8, right: 28, left: 4, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} strokeOpacity={0.9} />
            <XAxis
              dataKey="round"
              stroke={C.axis}
              tick={axisStyle}
              label={{ value: "Boosting Rounds (n_estimators)", position: "insideBottom", offset: -12, style: labelStyle }}
            />
            <YAxis
              stroke={C.axis}
              tick={axisStyle}
              domain={[0, 3.1]}
              label={{ value: "RMSE", angle: -90, position: "insideLeft", offset: 14, style: labelStyle }}
            />
            <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [v.toFixed(3), ""]} />
            <Legend wrapperStyle={legendStyle} verticalAlign="top" />
            <ReferenceLine
              x={120}
              stroke={C.green}
              strokeDasharray="5 3"
              label={{ value: "early stop", fill: C.green, fontSize: 10, position: "insideTopRight" }}
            />
            <Line type="monotone" dataKey="train" stroke={C.teal}  strokeWidth={2.5} dot={false} name="Train RMSE" />
            <Line type="monotone" dataKey="val"   stroke={C.amber} strokeWidth={2.5} dot={false} name="Val RMSE"   strokeDasharray="5 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-center text-xs font-mono text-muted-foreground mt-2">
        Val RMSE diverges from train at ~120 rounds — classic overfitting. Early stopping at this point
        saves computation and prevents degradation. Without it, val error increases by 21%.
      </figcaption>
    </figure>
  );
}

// ─── CHART 6: FEATURE IMPORTANCE (seaborn barplot style) ─────────────────────

const featureImportanceData = [
  { feature: "location_score",  importance: 0.28 },
  { feature: "sqft_living",     importance: 0.22 },
  { feature: "num_rooms",       importance: 0.16 },
  { feature: "age_years",       importance: 0.11 },
  { feature: "dist_school_km",  importance: 0.09 },
  { feature: "has_garage",      importance: 0.07 },
  { feature: "bathrooms",       importance: 0.05 },
  { feature: "crime_rate",      importance: 0.02 },
].sort((a, b) => b.importance - a.importance);

export function FeatureImportanceChart() {
  const colors = [C.teal, C.teal, C.blue, C.blue, C.purple, C.purple, C.amber, C.amber];
  return (
    <figure className="my-8">
      <div className="bg-card/40 rounded-xl border border-border/40 p-4">
        <p className="text-sm font-semibold text-foreground mb-3 font-mono text-center">
          XGBoost Feature Importance — Housing Price Prediction (gain-based)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={featureImportanceData}
            layout="vertical"
            margin={{ top: 8, right: 40, left: 114, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={C.grid} strokeOpacity={0.9} horizontal={false} />
            <XAxis
              type="number"
              stroke={C.axis}
              tick={axisStyle}
              tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
              domain={[0, 0.32]}
              label={{ value: "Importance (gain)", position: "insideBottom", offset: -4, style: labelStyle }}
            />
            <YAxis
              type="category"
              dataKey="feature"
              stroke={C.axis}
              tick={{ ...axisStyle, fontSize: 10 }}
              width={110}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v: number) => [`${(v * 100).toFixed(1)}%`, "Importance"]}
            />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
              {featureImportanceData.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="text-center text-xs font-mono text-muted-foreground mt-2">
        Location and size dominate — consistent with domain knowledge. Gain-based importance
        can be misleading for correlated features; use SHAP for causal attribution.
      </figcaption>
    </figure>
  );
}
