// ============================================================
// MSS KPI Dashboard — Calculation Engine
// Every formula and every RAG (Red/Amber/Green) rule described
// in the spec lives here, server-side. The frontend never
// calculates anything — it only sends raw inputs and displays
// what this engine returns.
// ============================================================

const { METRICS } = require('./metrics');

const metricById = {};
METRICS.forEach(m => { metricById[m.id] = m; });

// ---- Step 1: turn raw inputs into a computed numeric value ----
function computeValue(metric, inputs, monthMetrics) {
  inputs = inputs || {};
  switch (metric.mode) {
    case 'direct': {
      const v = Number(inputs.value);
      return Number.isFinite(v) ? v : null;
    }
    case 'ratio': {
      const num = Number(inputs.num);
      const den = Number(inputs.den);
      if (!Number.isFinite(num) || !Number.isFinite(den) || den <= 0) return null;
      return round2((num / den) * 100);
    }
    case 'avg': {
      const total = Number(inputs.total);
      const count = Number(inputs.count);
      if (!Number.isFinite(total) || !Number.isFinite(count) || count <= 0) return null;
      return round2(total / count);
    }
    case 'derived': {
      const [aId, bId] = metric.deriveFrom;
      const a = monthMetrics && monthMetrics[aId] ? monthMetrics[aId].computed : null;
      const b = monthMetrics && monthMetrics[bId] ? monthMetrics[bId].computed : null;
      if (metric.id === 'patch_deployment_success_rate_pct') {
        if (a == null || b == null || (a + b) <= 0) return null;
        return round2((a / (a + b)) * 100);
      }
      if (metric.id === 'recommendations_completion_pct') {
        if (a == null || b == null || b <= 0) return null;
        return round2((a / b) * 100);
      }
      return null;
    }
    case 'mobile_device': {
      const mode = inputs.mode || 'vpn_only';
      if (mode === 'vpn_mdm') {
        const vpn = Number(inputs.vpn);
        const mdm = Number(inputs.mdm);
        const hasVpn = Number.isFinite(vpn);
        const hasMdm = Number.isFinite(mdm);
        if (!hasVpn && !hasMdm) return null;
        return (hasVpn ? vpn : 0) + (hasMdm ? mdm : 0);
      }
      const v = Number(inputs.vpn !== undefined && inputs.vpn !== null && inputs.vpn !== '' ? inputs.vpn : inputs.value);
      return Number.isFinite(v) ? v : null;
    }
    default:
      return null;
  }
}

// ---- Step 2: turn a computed value into a RAG status ----
function computeRAG(metric, value, prevValue) {
  if (metric.direction === 'trend') return null;
  if (value === null || value === undefined) return null;

  if (metric.ragRule === 'prevMonth') {
    if (prevValue === null || prevValue === undefined) return 'amber'; // no baseline yet
    if (value <= prevValue) return 'green';
    if (value <= prevValue * 1.1) return 'amber';
    return 'red';
  }

  if (metric.ragRule === 'binary0') {
    if (value === 0) return 'green';
    return metric.amberNotRed ? 'amber' : 'red';
  }

  if (metric.target === null || metric.target === undefined) return null;

  if (metric.direction === 'higher') {
    if (value >= metric.target) return 'green';
    if (value >= metric.target * 0.9) return 'amber';
    return 'red';
  }
  if (metric.direction === 'lower') {
    if (value <= metric.target) return 'green';
    if (value <= metric.target * 1.1) return 'amber';
    return 'red';
  }
  return null;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// ---- Step 3: compute an entire month's metrics in dependency order ----
// direct/ratio/avg metrics first, then derived metrics (which depend on them)
function computeMonth(rawInputsByMetric, prevMonthComputed) {
  const result = {};
  const order = [...METRICS].sort((a, b) => (a.mode === 'derived' ? 1 : 0) - (b.mode === 'derived' ? 1 : 0));

  order.forEach(metric => {
    const inputs = (rawInputsByMetric && rawInputsByMetric[metric.id] && rawInputsByMetric[metric.id].inputs) || {};
    const computed = computeValue(metric, inputs, result);
    const prevValue = prevMonthComputed && prevMonthComputed[metric.id] ? prevMonthComputed[metric.id].computed : null;
    const rag = computeRAG(metric, computed, prevValue);
    result[metric.id] = { inputs, computed, rag };
  });

  return result;
}

// ---- Step 4: roll everything up into an overall RAG status ----
// Worst-case rule: any RED metric -> overall RED; else any AMBER -> AMBER; else GREEN
function computeOverallRAG(monthMetrics) {
  let hasRed = false, hasAmber = false, hasAny = false;
  METRICS.forEach(metric => {
    const entry = monthMetrics[metric.id];
    if (!entry || entry.rag === null || entry.rag === undefined) return;
    hasAny = true;
    if (entry.rag === 'red') hasRed = true;
    if (entry.rag === 'amber') hasAmber = true;
  });
  if (!hasAny) return null;
  if (hasRed) return 'red';
  if (hasAmber) return 'amber';
  return 'green';
}

module.exports = { computeValue, computeRAG, computeMonth, computeOverallRAG, metricById };
