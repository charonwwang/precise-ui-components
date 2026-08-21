# Data visualization / 数据可视化

This file defines exactly one component family. Select subtypes by comparison goal, dimensionality, time series, composition, distribution, precision, interaction, and text/table fallback.

## Decision table
| Subtype | Choose for this case | Reject or switch when | Code example / 代码示例 |
|---|---|---|---|
| Meter/gauge / 计量表 | Read-only scalar within known range, e.g. storage or battery | Task completion over time | `<meter min max low high value>` |
| Line chart / 折线图 | Trend over continuous ordered time is primary | Comparing a few discrete categories | `SVG/canvas chart + accessible table summary` |
| Bar chart / 柱状图 | Compare magnitudes across discrete categories | Continuous trend or part-to-whole dominates | `labelled bars + value text` |
| Stacked bar chart / 堆叠柱状图 | Compare totals and composition across categories | Precise comparison of every segment is critical | `stacked bars + legend + table fallback` |
| Pie-donut chart / 饼图环形图 | Simple part-to-whole with very few categories | Many slices, negative values, or precise comparison | `labelled slices + numeric legend` |
| Scatter plot / 散点图 | Relationship between two numeric variables matters | One-dimensional category comparison | `axes + points + accessible data table` |
| Heatmap / 热力图 | Magnitude across two categorical or spatial dimensions | Exact values must be read directly | `color scale + text/table alternative` |
| Sparkline / 迷你趋势图 | Compact context trend accompanies a primary metric | Users must inspect axes or exact points | `decorative mini-chart + textual delta` |
| Gauge / 仪表图 | Current scalar against thresholds is primary and space is compact | Task completion or precise multi-value comparison | `numeric value + thresholds; do not rely on color` |
| Audio waveform / 音频波形 | Scrubbing, recording, or input-level feedback benefits from time/amplitude visualization | Simple playback only | `accessible player/meter plus visual waveform` |

## Detailed variants

### Liquid fill gauge — 液体填充仪表

Decorative data-display variant for dashboards. Provide a numeric text equivalent and avoid it for critical precision.

```tsx
<figure><LiquidGauge value={68} aria-hidden /><figcaption>存储使用率 68%</figcaption></figure>
```

### Audio waveform / level meter — 音频波形 / 音量电平

```tsx
<div role="meter" aria-label="输入音量" aria-valuemin={0} aria-valuemax={100} aria-valuenow={level}><Waveform level={level} aria-hidden /></div>
```

### Chart shell — 图表容器

Always provide title, units, legend when needed, and a textual/table alternative.

```tsx
<figure><figcaption>近 7 日请求量（次）</figcaption><LineChart data={series} aria-hidden /><DataTable className="sr-only" data={series} /></figure>
```

### Meter / gauge — 计量表

Use for a read-only scalar within a known range, such as storage, battery, or score. It is not task progress.

```tsx
<label>存储使用量 <meter min={0} max={100} low={60} high={85} optimum={0} value={usedPercent}>{usedPercent}%</meter></label>
```
