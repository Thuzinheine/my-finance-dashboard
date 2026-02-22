"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    // Initialize app after scripts load
    const initApp = () => {
      if (
        typeof window !== "undefined" &&
        (window as any).supabase &&
        (window as any).Chart
      ) {
        ;(window as any).initSpendio?.()
      } else {
        setTimeout(initApp, 100)
      }
    }
    initApp()
  }, [])

  return <DashboardHTML />
}

function DashboardHTML() {
  useEffect(() => {
    // Inline script initialization
    const script = document.createElement("script")
    script.textContent = appScript
    document.body.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: appStyles }} />
      <div dangerouslySetInnerHTML={{ __html: appHTML }} />
    </>
  )
}

const appStyles = `
@font-face { 
  font-family: 'WaloneBold'; 
  src: url('/fonts/Z06-Walone Bold.ttf') format('truetype'); 
  font-display: swap; 
}

:root {
  --bg-primary: #09090b;
  --bg-secondary: #0f0f12;
  --bg-elevated: #18181b;
  --bg-surface: #1e1e23;

  --accent: #10b981;
  --accent-dim: rgba(16, 185, 129, 0.08);
  --accent-glow: rgba(16, 185, 129, 0.2);
  --accent-hover: #34d399;
  --expense: #f43f5e;
  --expense-dim: rgba(244, 63, 94, 0.08);
  --warning: #f59e0b;
  --warning-dim: rgba(245, 158, 11, 0.08);
  --info: #6366f1;
  --info-dim: rgba(99, 102, 241, 0.08);

  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #52525b;
  --text-dim: #3f3f46;
  
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(255, 255, 255, 0.1);
  --ring: rgba(16, 185, 129, 0.3);

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --radius-2xl: 22px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.35);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.5);
  --shadow-glow: 0 0 24px var(--accent-glow);

  --font-stack: 'Inter', 'WaloneBold', system-ui, sans-serif; 
  --font-header: 'Inter', 'WaloneBold', system-ui, sans-serif;
  
  --transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

body.is-myanmar {
  --font-stack: 'WaloneBold', 'Inter', system-ui, sans-serif;
  --font-header: 'WaloneBold', 'Inter', system-ui, sans-serif;
}

body.is-myanmar input, 
body.is-myanmar select, 
body.is-myanmar button, 
body.is-myanmar .txt-mono,
body.is-myanmar .my-font {
  font-family: 'WaloneBold', 'Inter', system-ui, sans-serif !important;
}

* { margin: 0; padding: 0; box-sizing: border-box; outline: none; -webkit-tap-highlight-color: transparent; }

html, body { height: 100%; overflow: hidden; }

body { 
  background: var(--bg-primary); 
  color: var(--text-primary); 
  font-family: var(--font-stack); 
  display: flex; 
  font-size: 14px;
  line-height: 1.55;
  letter-spacing: -0.011em; 
  font-weight: 400; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--text-dim); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

/* --- TYPOGRAPHY --- */
.txt-h1 { font-size: 24px; font-weight: 700; letter-spacing: -0.025em; }
.txt-h2 { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; }
.txt-h3 { font-size: 13.5px; font-weight: 600; letter-spacing: -0.01em; }
.txt-body { font-size: 13px; color: var(--text-secondary); font-weight: 400; } 
.txt-sm { font-size: 10.5px; color: var(--text-muted); font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; }
.txt-mono { font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; font-family: var(--font-stack); }
.my-font { font-family: var(--font-header) !important; letter-spacing: 0; } 

/* --- LAYOUT --- */
.sidebar { 
  width: 252px; 
  background: var(--bg-secondary); 
  border-right: 1px solid var(--border); 
  display: flex; flex-direction: column; 
  height: 100vh; flex-shrink: 0;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-container { flex: 1; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; position: relative; }

.top-header { 
  height: 56px; padding: 0 24px; 
  display: flex; align-items: center; justify-content: space-between; 
  flex-shrink: 0; position: sticky; top: 0; z-index: 500;
  background: rgba(9, 9, 11, 0.85); 
  backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--border);
}

.content-body { 
  padding: 20px 24px; max-width: 1480px; margin: 0 auto; width: 100%; 
  display: flex; flex-direction: column; gap: 16px; padding-bottom: 48px;
}

/* --- SIDEBAR --- */
.logo-box { 
  height: 56px; padding: 0 20px; display: flex; align-items: center; gap: 10px;
  font-size: 16px; font-weight: 800; color: var(--text-primary); letter-spacing: -0.03em;
  border-bottom: 1px solid var(--border); 
  flex-shrink: 0;
}
.logo-icon {
  width: 30px; height: 30px; background: var(--accent); 
  border-radius: var(--radius-sm); 
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 12px; 
}

.nav-group { padding: 12px 10px; display: flex; flex-direction: column; gap: 1px; flex: 1; overflow-y: auto; }
.nav-label { 
  font-size: 10px; font-weight: 600; text-transform: uppercase; 
  color: var(--text-dim); letter-spacing: 0.08em; padding: 10px 12px 6px;
}
.nav-label:first-child { margin-top: 0; }

.nav-item { 
  display: flex; align-items: center; justify-content: space-between; 
  padding: 8px 12px; color: var(--text-secondary); 
  cursor: pointer; border-radius: var(--radius-sm); font-weight: 500; font-size: 13px;
  transition: var(--transition);
}
.nav-item:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }
.nav-item.active { 
  background: var(--accent-dim); color: var(--accent); 
  font-weight: 600;
}
.nav-item i { font-size: 13px; width: 18px; text-align: center; }

.submenu { 
  display: none; padding-left: 6px; margin-top: 1px;
  border-left: 1.5px solid var(--border); margin-left: 20px; 
}
.submenu.active { display: block; animation: slideDown 0.2s ease-out; }
@keyframes slideDown { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

.sub-link {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 12px; font-size: 12px; color: var(--text-muted);
  cursor: pointer; border-radius: var(--radius-sm); margin-top: 1px;
  transition: var(--transition); font-weight: 500;
}
.sub-link:hover { color: var(--text-primary); background: rgba(255,255,255,0.03); }
.sub-link.active { color: var(--accent); }
.radio-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-dim); transition: var(--transition); }
.sub-link.active .radio-dot { background: var(--accent); box-shadow: 0 0 6px var(--accent-glow); }

.logout-box { padding: 12px 10px; border-top: 1px solid var(--border); }
.logout-btn {
  width: 100%; padding: 9px; display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--expense-dim); border: 1px solid rgba(244, 63, 94, 0.06);
  color: var(--expense); border-radius: var(--radius-sm); font-weight: 600; cursor: pointer;
  transition: var(--transition); font-size: 12.5px;
}
.logout-btn:hover { background: var(--expense); color: #fff; border-color: var(--expense); }

/* --- STAT CARDS --- */
.grid-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

.stat-card { 
  position: relative;
  border-radius: var(--radius-lg); 
  padding: 18px 20px;
  display: flex; flex-direction: column; justify-content: space-between;
  overflow: hidden;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  transition: var(--transition-slow);
  cursor: default;
  min-height: 130px;
}

.stat-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.stat-glow {
  position: absolute;
  width: 120px; height: 120px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.08;
  top: -30px; right: -30px;
  pointer-events: none;
  transition: var(--transition-slow);
}
.stat-card:hover .stat-glow { opacity: 0.14; }

.stat-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; height: 100%;
}

.stat-header-new {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 10px;
}

.stat-label-new {
  font-size: 10.5px; font-weight: 600; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--text-muted);
  display: flex; align-items: center; gap: 6px;
}

.stat-icon-inline {
  width: 26px; height: 26px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
}

.stat-val-group {
  display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
  margin-bottom: auto;
}

.stat-val {
  font-size: 22px; 
  font-weight: 800; color: var(--text-primary);
  letter-spacing: -0.03em; line-height: 1;
}

.stat-change {
  font-size: 10.5px; font-weight: 600;
  padding: 2px 7px; border-radius: 20px;
  display: inline-flex; align-items: center; gap: 3px;
  width: fit-content;
}
.stat-change.pos { color: var(--accent); background: var(--accent-dim); }
.stat-change.neg { color: var(--expense); background: var(--expense-dim); }
.stat-change.neu { color: var(--text-secondary); background: rgba(255,255,255,0.04); }

.stat-chart-wrapper {
  position: absolute; bottom: 0; left: 0; right: 0; 
  height: 45px; 
  z-index: 1; opacity: 0.35; pointer-events: none;
  mask-image: linear-gradient(to top, black 30%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 30%, transparent 100%);
}

.stat-icon-bg {
  position: absolute;
  right: -8px; bottom: -12px;
  font-size: 64px;
  opacity: 0.025;
  transform: rotate(-10deg);
  pointer-events: none;
  transition: var(--transition-slow);
  z-index: 0;
}
.stat-card:hover .stat-icon-bg {
  transform: rotate(0deg) scale(1.05);
  opacity: 0.045;
}

.theme-inc .stat-glow { background: var(--accent); }
.theme-inc .stat-icon-bg { color: var(--accent); }
.theme-inc .stat-icon-inline { background: var(--accent-dim); color: var(--accent); }

.theme-exp .stat-glow { background: var(--expense); }
.theme-exp .stat-icon-bg { color: var(--expense); }
.theme-exp .stat-icon-inline { background: var(--expense-dim); color: var(--expense); }

.theme-trd .stat-glow { background: var(--warning); }
.theme-trd .stat-icon-bg { color: var(--warning); }
.theme-trd .stat-icon-inline { background: var(--warning-dim); color: var(--warning); }

.theme-net .stat-glow { background: var(--info); } 
.theme-net .stat-icon-bg { color: var(--info); }
.theme-net .stat-icon-inline { background: var(--info-dim); color: var(--info); }

/* --- CHARTS --- */
.charts-main-grid { display: grid; grid-template-columns: 2.5fr 1fr; gap: 14px; }
.chart-box { 
  border-radius: var(--radius-lg); padding: 18px 20px; height: 360px; 
  display: flex; flex-direction: column;
  background: var(--bg-secondary); border: 1px solid var(--border);
  transition: var(--transition);
}
.chart-box:hover { border-color: var(--border-hover); }
.chart-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.chart-container { flex: 1; width: 100%; position: relative; overflow: hidden; }

/* --- TABLES --- */
.table-card { 
  border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; 
  background: var(--bg-secondary); border: 1px solid var(--border);
  transition: var(--transition);
}
.table-card:hover { border-color: var(--border-hover); }
.table-head-bar { 
  padding: 14px 20px; border-bottom: 1px solid var(--border); 
  display: flex; align-items: center; justify-content: space-between;
}
.table-title-group { display: flex; align-items: center; gap: 10px; }
.table-icon { 
  width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; 
  font-size: 12px;
}

.table-wrap { overflow-x: auto; min-height: 160px; }
table { width: 100%; border-collapse: collapse; min-width: 680px; }

th { 
  text-align: left; padding: 10px 20px; 
  font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
  color: var(--text-dim); background: rgba(0,0,0,0.2);
  position: sticky; top: 0; z-index: 10; border-bottom: 1px solid var(--border);
}
td { 
  padding: 12px 20px; border-bottom: 1px solid var(--border); 
  font-size: 13px; color: var(--text-secondary); font-weight: 500;
}
tr { transition: var(--transition); }
tr:hover td { background: rgba(255,255,255,0.015); color: var(--text-primary); }

/* Pills */
.pill { 
  display: inline-flex; padding: 3px 9px; border-radius: 20px; 
  font-size: 11px; font-weight: 600; letter-spacing: 0.01em;
}
.pill-inc { background: var(--accent-dim); color: var(--accent); }
.pill-exp { background: var(--expense-dim); color: var(--expense); }

.btn-icon { 
  width: 28px; height: 28px; border-radius: 6px; 
  display: inline-flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.03); color: var(--text-muted); border: 1px solid var(--border);
  cursor: pointer; transition: var(--transition); margin-left: 4px; font-size: 11px;
}
.btn-icon:hover { background: var(--text-primary); color: var(--bg-primary); border-color: var(--text-primary); }
.btn-icon.del:hover { background: var(--expense); color: #fff; border-color: var(--expense); }

/* Pagination */
.pagination-bar {
  padding: 10px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end; 
  align-items: center;
}
.page-numbers { display: flex; gap: 4px; }
.page-btn {
  width: 28px; height: 28px; border-radius: 6px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 11px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}
.page-btn:hover { background: rgba(255,255,255,0.06); color: var(--text-primary); }
.page-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

.header-actions {
  display: flex; align-items: center; gap: 6px;
}

.rows-sel {
  appearance: none; -webkit-appearance: none; -moz-appearance: none;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 5px 26px 5px 10px; 
  border-radius: 6px;
  font-size: 11.5px; font-weight: 500;
  font-family: var(--font-header);
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2352525b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 8px top 50%;
  background-size: 7px auto;
  transition: var(--transition);
  height: 30px;
}
.rows-sel:hover { background-color: rgba(255,255,255,0.07); color: var(--text-primary); }
.rows-sel:focus { border-color: var(--accent); }
.rows-sel option { background: var(--bg-elevated); color: var(--text-primary); }

.export-btn {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0 10px;
  height: 30px;
  border-radius: 6px;
  font-size: 11.5px; font-weight: 500;
  cursor: pointer;
  display: flex; align-items: center; gap: 5px;
  transition: var(--transition);
}
.export-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }

/* --- MODALS --- */
.modal-overlay { 
  position: fixed; inset: 0; z-index: 2000;
  background: rgba(0,0,0,0.75); backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.modal-overlay.active { opacity: 1; pointer-events: all; }

.modal-box { 
  background: var(--bg-elevated); border: 1px solid var(--border); 
  padding: 24px; border-radius: var(--radius-xl); width: 400px; 
  box-shadow: var(--shadow-lg);
  transform: scale(0.96) translateY(8px); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-overlay.active .modal-box { transform: scale(1) translateY(0); }

.input-group-icon {
  position: relative;
  display: flex;
  align-items: center;
}
.input-group-icon i {
  position: absolute;
  left: 14px;
  color: var(--text-dim);
  font-size: 13px;
}
.input-group-icon .form-input {
  padding-left: 40px;
}

/* Category Grid */
.category-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 14px;
}
.cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-secondary);
}
.cat-btn:hover { background: rgba(255,255,255,0.04); border-color: var(--border-hover); }
.cat-btn.active { 
  background: var(--accent-dim); 
  border-color: rgba(16, 185, 129, 0.2);
  color: var(--text-primary);
}
.cat-btn.active .cat-icon { color: var(--accent); transform: scale(1.05); }

.cat-icon { font-size: 16px; margin-bottom: 5px; transition: var(--transition); }
.cat-label { font-size: 10.5px; font-weight: 600; text-align: center; }

/* Trade Toggle */
.trade-toggle {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
}
.type-btn {
  flex: 1;
  padding: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.02);
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: var(--transition);
  font-family: var(--font-header);
  font-size: 12.5px;
}
.type-btn.long:hover { border-color: rgba(16, 185, 129, 0.2); color: var(--text-primary); }
.type-btn.short:hover { border-color: rgba(244, 63, 94, 0.2); color: var(--text-primary); }

.type-btn.long.active {
  background: var(--accent-dim);
  border-color: rgba(16, 185, 129, 0.2);
  color: var(--accent);
}
.type-btn.short.active {
  background: var(--expense-dim);
  border-color: rgba(244, 63, 94, 0.2);
  color: var(--expense);
}

/* Forms */
.form-group { margin-bottom: 10px; }
.form-input, .form-select { 
  width: 100%; padding: 10px 14px; 
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); 
  color: var(--text-primary); border-radius: var(--radius-md); outline: none; 
  font-family: var(--font-stack); font-size: 13.5px; font-weight: 500; transition: var(--transition);
}
.form-input::placeholder { color: var(--text-dim); }
.form-input:focus, .form-select:focus { 
  border-color: var(--accent); 
  background: rgba(16, 185, 129, 0.03); 
  box-shadow: 0 0 0 2px var(--ring); 
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.btn-primary, .btn-secondary { 
  height: 42px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: none; 
  font-family: var(--font-header); flex: 1; transition: var(--transition); font-size: 13.5px;
}
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: var(--shadow-glow); }
.btn-secondary { background: rgba(255,255,255,0.05); color: var(--text-primary); border: 1px solid var(--border); }
.btn-secondary:hover { background: rgba(255,255,255,0.08); }

#customCatInput { 
  display: none; 
  animation: slideInInput 0.2s ease-out;
  margin-bottom: 14px;
}
@keyframes slideInInput {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- LOGIN --- */
#loginOverlay { 
  position: fixed; inset: 0; z-index: 5000; 
  display: flex; align-items: center; justify-content: center; 
  background: var(--bg-primary);
}
.login-bg-pattern {
  position: fixed; inset: 0; z-index: 0; overflow: hidden;
}
.login-bg-glow {
  position: absolute; width: 450px; height: 450px;
  border-radius: 50%; filter: blur(140px); opacity: 0.1;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: var(--accent);
  z-index: 0;
}
.login-box { 
  background: var(--bg-secondary);
  border: 1px solid var(--border); padding: 36px 32px; 
  border-radius: var(--radius-xl); width: 360px; text-align: center;
  box-shadow: var(--shadow-lg);
  animation: fadeInLogin 0.4s ease-out;
  position: relative; z-index: 1;
}
@keyframes fadeInLogin { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

/* --- RESPONSIVE --- */
@media (max-width: 1200px) {
  .grid-stats { grid-template-columns: repeat(2, 1fr); }
  .charts-main-grid { grid-template-columns: 1fr; }
  .chart-box { height: 320px; }
}
@media (max-width: 900px) {
  .sidebar { position: fixed; left: -100%; height: 100%; box-shadow: 20px 0 50px rgba(0,0,0,0.6); }
  .sidebar.active { left: 0; }
  .top-header { padding: 0 16px; }
  .content-body { padding: 14px; gap: 12px; }
}
@media (max-width: 640px) {
  .grid-stats { grid-template-columns: 1fr; }
}

/* Utils */
.text-neon { color: var(--accent); }
.fade-in { animation: fadeIn 0.4s ease forwards; opacity: 0; }
@keyframes fadeIn { to { opacity: 1; } }
#appContainer { display: none; width: 100%; height: 100%; }

#loader-screen { 
  position: fixed; inset: 0; background: var(--bg-primary); z-index: 9000; 
  display: flex; align-items: center; justify-content: center; flex-direction: column; 
  transition: opacity 0.4s; 
}
.loader-spin { 
  width: 32px; height: 32px; 
  border: 2px solid var(--border); border-top-color: var(--accent); 
  border-radius: 50%; animation: spin 0.7s linear infinite; 
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Email badge in header */
.user-badge {
  font-size: 11.5px; color: var(--accent); font-weight: 600; 
  background: var(--accent-dim); padding: 5px 12px; 
  border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.1);
  display: flex; align-items: center; gap: 6px;
}
.user-badge::before {
  content: '';
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--accent);
  display: inline-block;
}

/* Header title group */
.header-title-group h2 {
  color: var(--text-primary); font-size: 14px; font-weight: 700; letter-spacing: -0.02em;
}
.header-title-group span {
  font-size: 11px; color: var(--text-dim); font-weight: 400;
}

/* Mobile menu button */
.mobile-menu-btn {
  display: none;
  width: 32px; height: 32px;
  align-items: center; justify-content: center;
  border-radius: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  cursor: pointer;
  margin-right: 10px;
  transition: var(--transition);
}
.mobile-menu-btn:hover { background: rgba(255,255,255,0.08); color: var(--text-primary); }
@media (max-width: 900px) {
  .mobile-menu-btn { display: flex; }
}

/* Chart dot indicator */
.chart-dot {
  width: 5px; height: 5px; border-radius: 50%; display: inline-block;
}
`

const appHTML = `
<!-- LOADER -->
<div id="loader-screen">
  <div class="loader-spin"></div>
  <p style="margin-top:14px; color:var(--text-dim); font-size:9.5px; letter-spacing:0.15em; font-weight:600; text-transform: uppercase;">Loading</p>
</div>

<!-- LOGIN -->
<div id="loginOverlay">
  <div class="login-bg-pattern">
    <div class="login-bg-glow"></div>
  </div>
  <div class="login-box">
    <div style="width: 42px; height: 42px; background: var(--accent); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px;">
      <i class="fa-solid fa-layer-group" style="font-size: 17px; color: #fff;"></i>
    </div>
    <h2 class="my-font" style="color: var(--text-primary); margin-bottom: 4px; font-size: 19px; font-weight: 800; letter-spacing: -0.02em;">Spendio</h2>
    <p class="txt-body" style="font-size: 12.5px; margin-bottom: 24px; color: var(--text-muted);" id="loginHeader">Sign in to your account</p>
    
    <input type="email" class="form-input" id="lEmail" placeholder="Email Address" style="text-align:center; margin-bottom:8px;">
    <input type="password" class="form-input" id="lPass" placeholder="Password" style="text-align:center; margin-bottom:14px;">
    <button class="btn-primary" style="width:100%; height:42px;" onclick="handleLogin()">Sign In</button>
    <p id="loginErr" style="color:var(--expense); font-size:12px; margin-top:12px; display:none; background: var(--expense-dim); padding: 8px 12px; border-radius: var(--radius-sm); font-weight: 500;"><i class="fa-solid fa-circle-exclamation" style="margin-right: 4px;"></i> Invalid credentials</p>
  </div>
</div>

<!-- APP CONTAINER -->
<div id="appContainer">
  
  <!-- SIDEBAR -->
  <div class="sidebar" id="sidebar">
    <div class="logo-box">
      <div class="logo-icon"><i class="fa-solid fa-layer-group"></i></div>
      <span>Spendio</span>
    </div>
    
    <div class="nav-group">
      <div class="nav-label">Main Menu</div>
      <div class="nav-item active" onclick="location.reload()">
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-grid-2"></i> <span class="my-font" id="navDash">Overview</span></div>
      </div>

      <div class="nav-item" onclick="handleMenuToggle('recSub')">
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-circle-plus"></i> <span class="my-font" id="navAdd">Add Record</span></div>
        <i class="fa-solid fa-chevron-down" style="font-size: 8px; opacity: 0.4;"></i>
      </div>
      <div id="recSub" class="submenu">
        <div class="sub-link" id="subNew" onclick="openEntryModal()"><span class="my-font">New Entry</span> <div class="radio-dot"></div></div>
        <div class="sub-link" id="subTrade" onclick="openTradeModal()"><span class="my-font">Trading Record</span> <div class="radio-dot"></div></div>
      </div>

      <div class="nav-label">Preferences</div>
      <div class="nav-item" onclick="handleMenuToggle('langSub')">
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-language"></i> <span class="my-font" id="navLang">Language</span></div>
        <i class="fa-solid fa-chevron-down" style="font-size: 8px; opacity: 0.4;"></i>
      </div>
      <div id="langSub" class="submenu">
        <div id="btnEn" class="sub-link" onclick="changeLanguage('en')"><span>English</span> <div class="radio-dot"></div></div>
        <div id="btnMy" class="sub-link" onclick="changeLanguage('my')"><span class="my-font">Myanmar</span> <div class="radio-dot"></div></div>
      </div>

      <div class="nav-item" onclick="handleMenuToggle('currSub')">
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-coins"></i> <span class="my-font" id="navCurr">Currency</span></div>
        <i class="fa-solid fa-chevron-down" style="font-size: 8px; opacity: 0.4;"></i>
      </div>
      <div id="currSub" class="submenu">
        <div id="currMMK" class="sub-link" onclick="changeCurrency('MMK')"><span>Myanmar (Ks)</span> <div class="radio-dot"></div></div>
        <div id="currUSD" class="sub-link" onclick="changeCurrency('USD')"><span>United States ($)</span> <div class="radio-dot"></div></div>
        <div id="currTHB" class="sub-link" onclick="changeCurrency('THB')"><span>Thai Baht (&#3647;)</span> <div class="radio-dot"></div></div>
      </div>

      <div class="nav-item" onclick="openRateModal()">
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-money-bill-transfer"></i> <span class="my-font" id="navRates">Exchange Rates</span></div>
      </div>
    </div>

    <div class="logout-box">
      <div class="logout-btn" onclick="handleLogout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i> 
        <span id="navLogout">Sign Out</span>
      </div>
    </div>
  </div>

  <!-- MAIN CONTENT -->
  <div class="main-container" id="scrollArea">
    <div class="top-header">
      <div style="display:flex; align-items:center;">
        <div class="mobile-menu-btn" id="menuToggle" onclick="document.getElementById('sidebar').classList.toggle('active')">
          <i class="fa-solid fa-bars" style="font-size: 13px;"></i>
        </div>
        <div class="header-title-group">
          <h2 class="my-font" id="headTitle">Dashboard</h2>
          <span>Financial Overview</span>
        </div>
      </div>
      <div class="user-badge" id="displayEmail"></div>
    </div>

    <div class="content-body">
      
      <!-- STATS -->
      <div class="grid-stats fade-in" style="animation-delay: 0.05s;">
        <!-- Income Card -->
        <div class="stat-card theme-inc">
          <div class="stat-glow"></div>
          <div class="stat-content">
            <div class="stat-header-new">
              <span class="stat-label-new my-font" id="incTitle">Income</span>
              <div class="stat-icon-inline"><i class="fa-solid fa-arrow-trend-up"></i></div>
            </div>
            <div class="stat-val-group">
              <div class="stat-val txt-mono" id="totalInc">0</div>
            </div>
            <div class="stat-change" id="incChange" style="margin-top: 8px;"></div>
            <div class="stat-chart-wrapper"><canvas id="sparkInc"></canvas></div>
          </div>
          <i class="fa-solid fa-arrow-trend-up stat-icon-bg"></i>
        </div>

        <!-- Expense Card -->
        <div class="stat-card theme-exp">
          <div class="stat-glow"></div>
          <div class="stat-content">
            <div class="stat-header-new">
              <span class="stat-label-new my-font" id="expTitle">Expenses</span>
              <div class="stat-icon-inline"><i class="fa-solid fa-receipt"></i></div>
            </div>
            <div class="stat-val-group">
              <div class="stat-val txt-mono" id="totalExp">0</div>
            </div>
            <div class="stat-change" id="expChange" style="margin-top: 8px;"></div>
            <div class="stat-chart-wrapper"><canvas id="sparkExp"></canvas></div>
          </div>
          <i class="fa-solid fa-receipt stat-icon-bg"></i>
        </div>

        <!-- Trading Card -->
        <div class="stat-card theme-trd">
          <div class="stat-glow"></div>
          <div class="stat-content">
            <div class="stat-header-new">
              <span class="stat-label-new my-font" id="statTrade">Trading Balance</span>
              <div class="stat-icon-inline"><i class="fa-solid fa-chart-simple"></i></div>
            </div>
            <div class="stat-val-group">
              <div class="stat-val txt-mono" id="tradeProfit">0</div>
            </div>
            <div class="stat-change" id="trdChange" style="margin-top: 8px;"></div>
            <div class="stat-chart-wrapper"><canvas id="sparkTrd"></canvas></div>
          </div>
          <i class="fa-solid fa-chart-simple stat-icon-bg"></i>
        </div>

        <!-- Net Balance Card -->
        <div class="stat-card theme-net">
          <div class="stat-glow"></div>
          <div class="stat-content">
            <div class="stat-header-new">
              <span class="stat-label-new my-font" id="netTitle">Net Balance</span>
              <div class="stat-icon-inline"><i class="fa-solid fa-wallet"></i></div>
            </div>
            <div class="stat-val-group">
              <div class="stat-val txt-mono text-neon" id="netBal">0</div>
            </div>
            <div class="stat-change" id="netChange" style="margin-top: 8px;"></div>
            <div class="stat-chart-wrapper"><canvas id="sparkNet"></canvas></div>
          </div>
          <i class="fa-solid fa-wallet stat-icon-bg"></i>
        </div>
      </div>
      
      <!-- CHARTS -->
      <div class="charts-main-grid fade-in" style="animation-delay: 0.1s;">
        <div class="chart-box">
          <div class="chart-head">
            <h4 class="txt-h3 my-font" id="chart1Title" style="display: flex; align-items: center; gap: 8px;">
              <span class="chart-dot" style="background: var(--accent);"></span>
              History Trend
            </h4>
          </div>
          <div class="chart-container"><canvas id="cashChart"></canvas></div>
        </div>
        <div class="chart-box">
          <div class="chart-head">
            <h4 class="txt-h3 my-font" id="chart3Title" style="display: flex; align-items: center; gap: 8px;">
              <span class="chart-dot" style="background: var(--warning);"></span>
              Share Ratio
            </h4>
          </div>
          <div class="chart-container"><canvas id="pieChart"></canvas></div>
        </div>
      </div>

      <!-- TABLES -->
      <div class="table-card fade-in" style="animation-delay: 0.15s;">
        <div class="table-head-bar">
          <div class="table-title-group">
            <div class="table-icon" style="background:var(--warning-dim); color:var(--warning);"><i class="fa-solid fa-book-journal-whills"></i></div>
            <h3 class="my-font txt-h3" id="histTradeTitle">Trading Journal</h3>
          </div>
          <div class="header-actions">
            <select class="rows-sel" onchange="changeLimit('trade', this.value)">
              <option value="5">5 rows</option>
              <option value="10" selected>10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
            </select>
            <div class="export-btn" onclick="exportData('trade')">
              <i class="fa-solid fa-file-excel"></i> Export
            </div>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th id="thDate1">Date</th>
                <th id="thAsset">Pair</th>
                <th id="thPos">Pos</th>
                <th id="thLev">Lev</th>
                <th id="thNote1">Note</th>
                <th id="thRes" style="text-align:right;">P&L</th>
                <th id="thAct1" style="text-align:center;">Action</th>
              </tr>
            </thead>
            <tbody id="tradingList"></tbody>
          </table>
        </div>
        <div class="pagination-bar">
          <div class="page-numbers" id="pgTrade"></div>
        </div>
      </div>

      <div class="table-card fade-in" style="animation-delay: 0.2s;">
        <div class="table-head-bar">
          <div class="table-title-group">
            <div class="table-icon" style="background:var(--accent-dim); color:var(--accent);"><i class="fa-solid fa-list-check"></i></div>
            <h3 class="my-font txt-h3" id="histTitle">Transactions</h3>
          </div>
          <div class="header-actions">
            <select class="rows-sel" onchange="changeLimit('trans', this.value)">
              <option value="5">5 rows</option>
              <option value="10" selected>10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
            </select>
            <div class="export-btn" onclick="exportData('trans')">
              <i class="fa-solid fa-file-excel"></i> Export
            </div>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th id="thDate2">Date</th>
                <th id="thDesc">Title</th>
                <th id="thCat">Category</th>
                <th id="thNote2">Notes</th>
                <th id="thAmt" style="text-align:right;">Amount</th>
                <th id="thAct2" style="text-align:center;">Action</th>
              </tr>
            </thead>
            <tbody id="transactionList"></tbody>
          </table>
        </div>
        <div class="pagination-bar">
          <div class="page-numbers" id="pgTrans"></div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- MODALS -->
<!-- RATE SETTINGS MODAL -->
<div id="rateModal" class="modal-overlay">
  <div class="modal-box">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
      <h2 class="my-font txt-h2" id="modalRateTitle" style="color:var(--text-primary);">Exchange Rates</h2>
      <div style="width:30px; height:30px; background:rgba(255,255,255,0.05); color:var(--text-secondary); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size: 12px;"><i class="fa-solid fa-sliders"></i></div>
    </div>
    
    <p class="txt-body" style="font-size:12px; margin-bottom:14px; color:var(--text-muted);">Base Currency: <b style="color: var(--text-secondary);">1 USD ($)</b></p>

    <div class="form-group input-group-icon">
      <i class="fa-solid fa-money-bill"></i>
      <input type="number" class="form-input" id="ratMMK" placeholder="MMK Rate (e.g. 3500)">
      <span style="position:absolute; right:14px; font-size:10.5px; color:var(--text-dim); font-weight:600;">MMK</span>
    </div>
    <div class="form-group input-group-icon">
      <i class="fa-solid fa-baht-sign"></i>
      <input type="number" class="form-input" id="ratTHB" placeholder="THB Rate (e.g. 35)">
      <span style="position:absolute; right:14px; font-size:10.5px; color:var(--text-dim); font-weight:600;">THB</span>
    </div>
    
    <div style="display:flex; gap:8px; margin-top: 18px;">
      <button onclick="closeModal('rateModal')" class="btn-secondary">Cancel</button>
      <button onclick="saveRates()" class="btn-primary" id="btnSaveRates">Update Rates</button>
    </div>
  </div>
</div>

<!-- NEW ENTRY MODAL -->
<div id="entryModal" class="modal-overlay">
  <div class="modal-box">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
      <h2 class="my-font txt-h2" id="modalEntryTitle" style="color:var(--text-primary);">Add Entry</h2>
      <div style="width:30px; height:30px; background:var(--accent-dim); color:var(--accent); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size: 12px;"><i class="fa-solid fa-pen-nib"></i></div>
    </div>
    
    <input type="hidden" id="editId">
    <input type="hidden" id="cIn" value="Others">
    <input type="hidden" id="typeIn" value="Expense">

    <!-- Income/Expense Toggle -->
    <div class="trade-toggle">
      <div class="type-btn long" onclick="selectEntryType('Income', this)" id="type_Income">
        <i class="fa-solid fa-arrow-down"></i> INCOME
      </div>
      <div class="type-btn short active" onclick="selectEntryType('Expense', this)" id="type_Expense">
        <i class="fa-solid fa-arrow-up"></i> EXPENSE
      </div>
    </div>

    <!-- Category Grid -->
    <div class="category-grid">
      <div class="cat-btn" onclick="selectCategory('Food', this)" id="cat_Food">
        <i class="fa-solid fa-utensils cat-icon"></i>
        <span class="cat-label my-font">Food</span>
      </div>
      <div class="cat-btn" onclick="selectCategory('Transport', this)" id="cat_Transport">
        <i class="fa-solid fa-bus cat-icon"></i>
        <span class="cat-label my-font">Transport</span>
      </div>
      <div class="cat-btn" onclick="selectCategory('Shopping', this)" id="cat_Shopping">
        <i class="fa-solid fa-cart-shopping cat-icon"></i>
        <span class="cat-label my-font">Shopping</span>
      </div>
      <div class="cat-btn active" onclick="selectCategory('Others', this)" id="cat_Others">
        <i class="fa-solid fa-shapes cat-icon"></i>
        <span class="cat-label my-font">Others</span>
      </div>
      <div class="cat-btn" onclick="selectCategory('Custom', this)" id="cat_Custom">
        <i class="fa-solid fa-pen-fancy cat-icon"></i>
        <span class="cat-label my-font">Custom</span>
      </div>
    </div>

    <div id="customCatInput" class="form-group input-group-icon">
      <i class="fa-solid fa-tag"></i>
      <input type="text" class="form-input" id="customCatText" placeholder="Category Name (e.g. Salary)">
    </div>

    <div class="form-group input-group-icon">
      <i class="fa-solid fa-pen-to-square"></i>
      <input type="text" class="form-input" id="tIn" placeholder="Title">
    </div>
    <div class="form-group input-group-icon">
      <i class="fa-solid fa-dollar-sign"></i>
      <input type="number" class="form-input" id="aIn" placeholder="Amount (USD)" style="font-weight:600; color:var(--accent);">
    </div>
    <div class="form-group input-group-icon">
      <i class="fa-solid fa-note-sticky"></i>
      <input type="text" class="form-input" id="nIn" placeholder="Note (Optional)">
    </div>
    
    <div style="display:flex; gap:8px; margin-top: 18px;">
      <button onclick="closeModal('entryModal')" class="btn-secondary" id="btnCancel1">Cancel</button>
      <button onclick="saveData('standard')" class="btn-primary" id="btnConfirm1">Save Entry</button>
    </div>
  </div>
</div>

<!-- NEW TRADE MODAL -->
<div id="tradeModal" class="modal-overlay">
  <div class="modal-box">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
      <h2 class="my-font txt-h2" id="modalTradeTitle" style="color:var(--text-primary);">Trade Record</h2>
      <div style="width:30px; height:30px; background:var(--warning-dim); color:var(--warning); border-radius:6px; display:flex; align-items:center; justify-content:center; font-size: 12px;"><i class="fa-solid fa-chart-line"></i></div>
    </div>

    <input type="hidden" id="editTradeId">
    <input type="hidden" id="trPos" value="Long">

    <div class="form-group">
      <input type="text" class="form-input" id="trPair" placeholder="BTC/USDT" style="font-weight:700; text-align:center; letter-spacing:0.05em; font-size:15px; text-transform:uppercase;">
    </div>

    <div class="trade-toggle">
      <div class="type-btn long active" onclick="selectTradeType('Long', this)" id="btn_Long">
        <i class="fa-solid fa-arrow-trend-up"></i> LONG
      </div>
      <div class="type-btn short" onclick="selectTradeType('Short', this)" id="btn_Short">
        <i class="fa-solid fa-arrow-trend-down"></i> SHORT
      </div>
    </div>

    <div class="form-row form-group">
      <div class="input-group-icon">
        <i class="fa-solid fa-xmark"></i>
        <input type="text" class="form-input" id="trLev" placeholder="Lev (20x)">
      </div>
      <div class="input-group-icon">
        <i class="fa-solid fa-sack-dollar"></i>
        <input type="number" class="form-input" id="trRes" placeholder="PnL ($)">
      </div>
    </div>
    <div class="form-group input-group-icon">
      <i class="fa-solid fa-clipboard"></i>
      <input type="text" class="form-input" id="trNote" placeholder="Strategy / Notes">
    </div>

    <div style="display:flex; gap:8px; margin-top: 18px;">
      <button onclick="closeModal('tradeModal')" class="btn-secondary" id="btnCancel2">Cancel</button>
      <button onclick="saveData('trading')" class="btn-primary" id="btnSave2" style="background:var(--warning); color:#000;">Save Record</button>
    </div>
  </div>
</div>

<!-- DELETE CONFIRM MODAL -->
<div id="customDelModal" class="modal-overlay">
  <div class="modal-box" style="text-align: center; width: 360px;">
    <div style="width: 42px; height: 42px; background: var(--expense-dim); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 14px;">
      <i class="fa-solid fa-trash-can" style="font-size: 16px; color: var(--expense);"></i>
    </div>
    <h2 class="my-font txt-h2" id="delSureTitle" style="color: var(--text-primary); margin-bottom: 6px;">Are you sure?</h2>
    <p id="delSureDesc" class="txt-body" style="margin-bottom: 18px; font-size: 12.5px; color: var(--text-muted);">
      This action cannot be undone.
    </p>
    <div style="display: flex; gap: 8px;">
      <button id="closeDelBtn" class="btn-secondary">Cancel</button>
      <button id="confirmDelBtn" class="btn-primary" style="background: var(--expense); color: #fff; box-shadow:none;">Delete</button>
    </div>
  </div>
</div>
`

const appScript = `
const SUPABASE_URL = 'https://tfarfiporzdpcjrqxxxj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYXJmaXBvcnpkcGNqcnF4eHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTk1NTMsImV4cCI6MjA4NDQ3NTU1M30.Kww0TMDxeCtybOtnAWakXiEIA0hZSKpB19K_cLrB7qo';

const i18n = { 
  en: { 
    loginHeader: "Sign in to your account", loginErr: "Incorrect email or password.",
    navDash: "Overview", navAdd: "Add Record", subNew: "New Entry", subTrade: "Trade Record", navLang: "Language", navCurr: "Currency", navLogout: "Sign Out", navRates: "Exchange Rates",
    headTitle: "Dashboard", incTitle: "INCOME", expTitle: "EXPENSES", statTrade: "TRADING BALANCE", netTitle: "NET BALANCE", 
    chart1Title: "History Trend", chart2Title: "Trade Bars", chart3Title: "Share Ratio", 
    histTradeTitle: "Trading Journal", histTitle: "Recent History",
    thDate1: "Date", thAsset: "Asset", thPos: "Pos", thLev: "Lev", thNote1: "Strategy", thRes: "Result", thAct1: "Action",
    thDate2: "Date", thDesc: "Title", thCat: "Category", thNote2: "Notes", thAmt: "Amount", thAct2: "Action",
    modalEntryTitle: "Add Entry", tIn: "Title (e.g. Coffee)", aIn: "Amount (USD)", nIn: "Note", btnCancel1: "Cancel", btnConfirm1: "Confirm",
    modalTradeTitle: "Trade Record", trPair: "Pair", trLev: "Leverage", trRes: "Result ($)", trNote: "Trade Note", btnCancel2: "Cancel", btnSave2: "Save",
    modalRateTitle: "Exchange Rates", btnSaveRates: "Update Rates",
    delSureTitle: "Are you sure?", delSureDesc: "Deleting this record cannot be undone. Do you want to proceed?", closeDelBtn: "Cancel", confirmDelBtn: "Delete"
  }, 
  my: { 
    loginHeader: "\\u1021\\u1000\\u1031\\u102c\\u1004\\u103a\\u1037\\u101d\\u1004\\u103a\\u101b\\u1014\\u103a", loginErr: "Email \\u101e\\u102d\\u102f\\u1095\\u1019\\u101f\\u102f\\u1010\\u103a Password \\u1019\\u103e\\u102c\\u101b\\u101a\\u103a\\u1002\\u1014\\u103a\\u1038\\u1014\\u1031\\u1015\\u102b\\u101e\\u100a\\u103a\\u104b",
    navDash: "\\u1001\\u103c\\u102f\\u1036\\u101e\\u102f\\u1036\\u101e\\u1015\\u103a\\u1001\\u103b\\u1000\\u103a", navAdd: "\\u1005\\u102c\\u101b\\u1004\\u103a\\u1038\\u101e\\u103d\\u1004\\u103a\\u1038\\u101b\\u1014\\u103a", subNew: "\\u1005\\u102c\\u101b\\u1004\\u103a\\u1038\\u1021\\u101e\\u1005\\u103a", subTrade: "Trading Record", navLang: "\\u1018\\u102c\\u101e\\u102c\\u1005\\u1000\\u102c\\u1038", navCurr: "\\u1000\\u102c\\u101b\\u1004\\u103a\\u1005\\u102e", navLogout: "\\u1021\\u1000\\u1031\\u102c\\u1004\\u103a\\u1037\\u1011\\u103d\\u1000\\u103a\\u101b\\u1014\\u103a", navRates: "\\u1004\\u103d\\u1031\\u101c\\u1032\\u1014\\u103e\\u102f\\u1014\\u103a\\u1038",
    headTitle: "Dashboard", incTitle: "\\u101d\\u1004\\u103a\\u1004\\u103d\\u1031", expTitle: "\\u1011\\u103d\\u1000\\u103a\\u1004\\u103d\\u1031", statTrade: "Trading Balance", netTitle: "\\u101c\\u1000\\u103a\\u1000\\u103b\\u1014\\u103a", 
    chart1Title: "Zero Baseline Trend", chart2Title: "Trade Bars", chart3Title: "Share Ratio", 
    histTradeTitle: "Trading Journal", histTitle: "\\u1005\\u102c\\u101b\\u1004\\u103a\\u1038\\u1019\\u103e\\u1010\\u103a\\u1010\\u1019\\u103a\\u1038",
    thDate1: "\\u1014\\u1031\\u1095\\u1005\\u103d\\u1032", thAsset: "Pair", thPos: "Pos", thLev: "Lev", thNote1: "\\u1019\\u103e\\u1010\\u103a\\u1005\\u102f", thRes: "\\u101b\\u101c\\u�\\u103a", thAct1: "Action",
    thDate2: "\\u1014\\u1031\\u1095\\u1005\\u103d\\u1032", thDesc: "\\u1001\\u1031\\u102b\\u1004\\u103a\\u1038\\u1005\\u100a\\u103a", thCat: "\\u1021\\u1019\\u103b\\u102d\\u102f\\u1038\\u1021\\u1005\\u102c\\u1038", thNote2: "\\u1019\\u103e\\u1010\\u103a\\u1005\\u102f", thAmt: "\\u1015\\u1019\\u102c\\u100f", thAct2: "Action",
    modalEntryTitle: "\\u1005\\u102c\\u101b\\u1004\\u103a\\u1038\\u101e\\u103d\\u1004\\u103a\\u1038\\u101b\\u1014\\u103a", tIn: "\\u1001\\u1031\\u102b\\u1004\\u103a\\u1038\\u1005\\u100a\\u103a (\\u1025\\u1015\\u1019\\u102c - \\u1000\\u1031\\u102c\\u103a\\u1016\\u102e)", aIn: "\\u1015\\u1019\\u102c\\u100f (USD)", nIn: "\\u1019\\u103e\\u1010\\u103a\\u1005\\u102f", btnCancel1: "\\u1019\\u101c\\u102f\\u1015\\u103a\\u1010\\u1031\\u102c\\u1037\\u1015\\u102b", btnConfirm1: "\\u1021\\u1010\\u100a\\u103a\\u1015\\u103c\\u102f\\u1019\\u100a\\u103a",
    modalTradeTitle: "Trade \\u1019\\u103e\\u1010\\u103a\\u1010\\u1019\\u103a\\u1038", trPair: "Pair", trLev: "Lev", trRes: "\\u101b\\u101c\\u1012\\u103a ($)", trNote: "\\u1019\\u103e\\u1010\\u103a\\u1005\\u102f", btnCancel2: "\\u1019\\u101c\\u102f\\u1015\\u103a\\u1010\\u1031\\u102c\\u1037\\u1015\\u102b", btnSave2: "\\u101e\\u102d\\u1019\\u103a\\u1038\\u1019\\u100a\\u103a",
    modalRateTitle: "\\u1004\\u103d\\u1031\\u101c\\u1032\\u1014\\u103e\\u102f\\u1014\\u103a\\u1038 \\u101e\\u1010\\u103a\\u1019\\u103e\\u1010\\u103a\\u101b\\u1014\\u103a", btnSaveRates: "\\u101e\\u102d\\u1019\\u103a\\u1038\\u1019\\u100a\\u103a",
    delSureTitle: "\\u101e\\u1031\\u1001\\u103b\\u102c\\u1015\\u102b\\u101e\\u101c\\u102c\\u1038?", delSureDesc: "\\u1024\\u1019\\u103e\\u1010\\u103a\\u1010\\u1019\\u103a\\u1038\\u1000\\u102d\\u102f \\u1016\\u103b\\u1000\\u103a\\u101c\\u102d\\u102f\\u1000\\u103a\\u1015\\u102b\\u1000 \\u1015\\u103c\\u1014\\u103a\\u101a\\u1030\\u104d\\u101b\\u1010\\u1031\\u102c\\u1037\\u1019\\u100a\\u103a \\u1019\\u101f\\u102f\\u1010\\u103a\\u1015\\u102b\\u104b", closeDelBtn: "\\u1019\\u1016\\u103b\\u1000\\u103a\\u1010\\u1031\\u102c\\u1037\\u1015\\u102b", confirmDelBtn: "\\u1016\\u103b\\u1000\\u103a\\u1019\\u100a\\u103a"
  } 
};

let sc; 
let lang = localStorage.getItem('lang') || 'my';
let curr = localStorage.getItem('curr') || 'USD';
let rates = JSON.parse(localStorage.getItem('rates')) || { USD: 1, MMK: 3500, THB: 35 };
let allData = [];
let pgTrade = 1, limTrade = 10;
let pgTrans = 1, limTrans = 10;
let spk1, spk2, spk3, spk4;

(async function() {
  try {
    const waitForLibs = () => new Promise((resolve, reject) => {
      let tries = 0;
      const check = () => {
        if(typeof supabase !== 'undefined' && typeof Chart !== 'undefined') resolve();
        else if(tries++ > 50) reject(new Error("Libraries failed to load"));
        else setTimeout(check, 100);
      };
      check();
    });
    await waitForLibs();
    sc = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    await checkUser();
  } catch (e) {
    console.error(e);
    document.getElementById('loader-screen').style.display = 'none';
    alert("System Init Error: Check your internet connection.");
  }
})();

async function checkUser() { 
  const {data:{user}} = await sc.auth.getUser(); 
  document.getElementById('loader-screen').style.opacity = '0';
  setTimeout(() => document.getElementById('loader-screen').style.display='none', 400);

  if(user) { 
    document.getElementById('loginOverlay').style.display='none'; 
    document.getElementById('appContainer').style.display='flex'; 
    document.getElementById('displayEmail').innerText = user.email.split('@')[0]; 
    updateUI(); 
    loadD(); 
  } else { 
    document.getElementById('loginOverlay').style.display='flex'; 
    document.getElementById('appContainer').style.display='none'; 
  }
}

async function handleLogin() { 
  const btn = document.querySelector('#loginOverlay .btn-primary');
  const originalText = btn.innerText;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
  try {
    const {error} = await sc.auth.signInWithPassword({ 
      email: document.getElementById('lEmail').value, 
      password: document.getElementById('lPass').value 
    });
    if(error) throw error;
    await checkUser(); 
  } catch (err) {
    document.getElementById('loginErr').style.display='block';
    btn.innerHTML = originalText;
  }
}
window.handleLogin = handleLogin;

async function handleLogout() { 
  await sc.auth.signOut(); 
  window.location.reload(); 
}
window.handleLogout = handleLogout;

function handleMenuToggle(id) { 
  const subs = document.querySelectorAll('.submenu'); 
  const target = document.getElementById(id);
  const wasActive = target.classList.contains('active');
  subs.forEach(s => s.classList.remove('active'));
  if(!wasActive) target.classList.add('active');
}
window.handleMenuToggle = handleMenuToggle;

function changeLanguage(v) { lang = v; localStorage.setItem('lang', v); updateUI(); loadD(); }
function changeCurrency(v) { curr = v; localStorage.setItem('curr', v); updateUI(); loadD(); }
window.changeLanguage = changeLanguage;
window.changeCurrency = changeCurrency;

function updateUI() { 
  if (lang === 'my') {
    document.body.classList.add('is-myanmar');
  } else {
    document.body.classList.remove('is-myanmar');
  }

  const t = i18n[lang]; 
  Object.keys(t).forEach(id => { 
    const el = document.getElementById(id);
    if(el) {
      if(el.tagName === 'INPUT') el.placeholder = t[id];
      else el.innerText = t[id];
    }
  }); 
  document.querySelectorAll('.sub-link').forEach(el => el.classList.remove('active')); 
  if(lang === 'en') document.getElementById('btnEn').classList.add('active'); else document.getElementById('btnMy').classList.add('active'); 
  if(document.getElementById('curr' + curr)) document.getElementById('curr' + curr).classList.add('active'); 
}

function openRateModal() {
  document.getElementById('modalRateTitle').innerText = i18n[lang].modalRateTitle;
  document.getElementById('ratMMK').value = rates.MMK;
  document.getElementById('ratTHB').value = rates.THB;
  openModal('rateModal');
}
window.openRateModal = openRateModal;

function saveRates() {
  const newMMK = parseFloat(document.getElementById('ratMMK').value);
  const newTHB = parseFloat(document.getElementById('ratTHB').value);
  if(newMMK > 0 && newTHB > 0) {
    rates.MMK = newMMK;
    rates.THB = newTHB;
    localStorage.setItem('rates', JSON.stringify(rates));
    closeModal('rateModal');
    loadD(); 
  } else {
    alert("Please enter valid rates.");
  }
}
window.saveRates = saveRates;

function selectCategory(val, el) {
  document.getElementById('cIn').value = val;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  const customInput = document.getElementById('customCatInput');
  if (val === 'Custom') {
    customInput.style.display = 'flex';
    document.getElementById('customCatText').focus();
  } else {
    customInput.style.display = 'none';
  }
}
window.selectCategory = selectCategory;

function selectTradeType(val, el) {
  document.getElementById('trPos').value = val;
  document.querySelectorAll('#tradeModal .type-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}
window.selectTradeType = selectTradeType;

function selectEntryType(val, el) {
  document.getElementById('typeIn').value = val;
  document.querySelectorAll('#entryModal .type-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}
window.selectEntryType = selectEntryType;

function openEntryModal() { 
  document.getElementById('editId').value = ""; 
  document.getElementById('modalEntryTitle').innerText = i18n[lang].modalEntryTitle;
  document.getElementById('tIn').value = ""; document.getElementById('aIn').value = ""; document.getElementById('nIn').value = "";
  document.getElementById('customCatText').value = "";
  selectCategory('Others', document.getElementById('cat_Others'));
  selectEntryType('Expense', document.getElementById('type_Expense'));
  openModal('entryModal'); 
}
function openTradeModal() { 
  document.getElementById('editTradeId').value = "";
  document.getElementById('modalTradeTitle').innerText = i18n[lang].modalTradeTitle;
  document.getElementById('trPair').value = ""; document.getElementById('trRes').value = ""; document.getElementById('trNote').value = ""; document.getElementById('trLev').value = "";
  selectTradeType('Long', document.getElementById('btn_Long'));
  openModal('tradeModal'); 
}
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
window.openEntryModal = openEntryModal;
window.openTradeModal = openTradeModal;
window.openModal = openModal;
window.closeModal = closeModal;

async function saveData(type) {
  const {data:{user}}=await sc.auth.getUser();
  if(type==='standard') {
    const id = document.getElementById('editId').value;
    const typeVal = document.getElementById('typeIn').value;
    let catVal = document.getElementById('cIn').value;
    if (catVal === 'Custom') catVal = document.getElementById('customCatText').value || 'Others';
    if (typeVal === 'Income' && !catVal.startsWith('Income')) catVal = 'Income: ' + catVal;

    const payload = {
      title:document.getElementById('tIn').value, 
      amount:parseFloat(document.getElementById('aIn').value), 
      category:catVal, 
      note:document.getElementById('nIn').value, 
      user_id:user.id
    };
    if(id) await sc.from('transactions').update(payload).eq('id', id);
    else await sc.from('transactions').insert([payload]);
    closeModal('entryModal');
  } else {
    const id = document.getElementById('editTradeId').value;
    const note = document.getElementById('trPos').value+' | '+document.getElementById('trLev').value+' | '+document.getElementById('trNote').value;
    const payload = {
      title:document.getElementById('trPair').value, 
      amount:parseFloat(document.getElementById('trRes').value), 
      category:'Trading', 
      note:note, 
      user_id:user.id
    };
    if(id) await sc.from('transactions').update(payload).eq('id', id);
    else await sc.from('transactions').insert([payload]);
    closeModal('tradeModal');
  }
  loadD();
}
window.saveData = saveData;

async function loadD() {
  const {data}=await sc.from('transactions').select('*').order('created_at',{ascending:false});
  if(!data) return;
  allData = data;
  try { renderOverview(); } catch (e) { console.warn("Chart render failed:", e); }
  renderTables();
}

function renderOverview() {
  let inc=0, exp=0, tp=0; 
  let conversion = 1;
  let sym = '$';
  if(curr === 'MMK') { conversion = rates.MMK; sym = 'Ks'; }
  else if (curr === 'THB') { conversion = rates.THB; sym = '\\u0e3f'; }

  allData.forEach(d => {
    if(d.category==='Trading') { 
      tp += d.amount;
    } else {
      const isInc = d.category === 'Income' || d.category.startsWith('Income:');
      if(isInc) inc+=d.amount; else exp+=d.amount; 
    }
  });

  const symHead = sym + ' ';
  animateValue(document.getElementById('totalInc'), inc*conversion, symHead);
  animateValue(document.getElementById('totalExp'), exp*conversion, symHead);
  animateValue(document.getElementById('tradeProfit'), tp*conversion, symHead);
  animateValue(document.getElementById('netBal'), (inc-exp+tp)*conversion, symHead);

  try {
    const incTrend = getSparkData(allData, 'Income', 30);
    const expTrend = getSparkData(allData, 'Expense', 30);
    const trdTrend = getSparkData(allData, 'Trading', 30);
    const netTrend = getBalanceHistory(allData, 30);

    renderChange('incChange', incTrend.percent);
    renderChange('expChange', expTrend.percent);
    renderChange('trdChange', trdTrend.percent);
    renderChange('netChange', netTrend.percent);

    if(spk1) spk1.destroy(); spk1 = renderSpark('sparkInc', incTrend.values, '#10b981');
    if(spk2) spk2.destroy(); spk2 = renderSpark('sparkExp', expTrend.values, '#f43f5e');
    if(spk3) spk3.destroy(); spk3 = renderSpark('sparkTrd', trdTrend.values, '#f59e0b');
    if(spk4) spk4.destroy(); spk4 = renderSpark('sparkNet', netTrend.values, '#6366f1');
    
    renderCharts(allData, inc, exp, conversion);
  } catch(e) {
    console.log("Sparkline error:", e);
    try { renderCharts(allData, inc, exp, conversion); } catch(ex){}
  }
}

function getSparkData(data, type, days) {
  const today = new Date();
  today.setHours(23,59,59,999);
  const currentVals = new Array(days).fill(0);
  let sumCurrent = 0, sumPrev = 0;
  const cutoffCurrent = new Date(today); cutoffCurrent.setDate(today.getDate() - days);
  const cutoffPrev = new Date(cutoffCurrent); cutoffPrev.setDate(cutoffCurrent.getDate() - days);

  data.forEach(d => {
    const dDate = new Date(d.created_at);
    let val = d.amount;
    let isMatch = false;
    if(type === 'Trading') isMatch = (d.category === 'Trading');
    else if(type === 'Income') isMatch = (d.category === 'Income' || d.category.startsWith('Income:'));
    else if(type === 'Expense') isMatch = (d.category !== 'Income' && !d.category.startsWith('Income:') && d.category !== 'Trading');

    if(isMatch) {
      const diffDays = Math.floor((today - dDate) / (1000 * 60 * 60 * 24));
      if(diffDays >= 0 && diffDays < days) {
        currentVals[(days - 1) - diffDays] += val;
        sumCurrent += val;
      }
      const diffPrevDays = Math.floor((cutoffCurrent - dDate) / (1000 * 60 * 60 * 24));
      if(diffPrevDays >= 0 && diffPrevDays < days) {
        sumPrev += val;
      }
    }
  });

  let percent = 0;
  if(sumPrev !== 0) percent = ((sumCurrent - sumPrev) / Math.abs(sumPrev)) * 100;
  else if (sumCurrent !== 0) percent = 100; 
  return { values: currentVals, percent: percent };
}

function getBalanceHistory(data, days) {
  const sorted = [...data].sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
  const today = new Date();
  today.setHours(23,59,59,999);
  const dailyBalances = new Array(days).fill(0);
  const cutoffDate = new Date(today); cutoffDate.setDate(today.getDate() - days);
  const dayBoundaries = [];
  for(let i=0; i<days; i++) {
    const d = new Date(cutoffDate); d.setDate(cutoffDate.getDate() + 1 + i); d.setHours(23,59,59,999);
    dayBoundaries.push(d.getTime());
  }
  for(let i=0; i<days; i++) {
    const targetEnd = dayBoundaries[i];
    const bal = sorted.reduce((acc, t) => {
       if(new Date(t.created_at).getTime() <= targetEnd) {
           const isInc = t.category === 'Income' || t.category.startsWith('Income:');
           const isTrade = t.category === 'Trading';
           if(isTrade) return acc + t.amount;
           return isInc ? acc + t.amount : acc - t.amount;
       }
       return acc;
    }, 0);
    dailyBalances[i] = bal;
  }
  const balNow = dailyBalances[days-1];
  const cutoffTime = dayBoundaries[0] - (24*60*60*1000); 
  const balAgo = sorted.reduce((acc, t) => {
       if(new Date(t.created_at).getTime() <= cutoffTime) {
           const isInc = t.category === 'Income' || t.category.startsWith('Income:');
           const isTrade = t.category === 'Trading';
           if(isTrade) return acc + t.amount;
           return isInc ? acc + t.amount : acc - t.amount;
       }
       return acc;
  }, 0);
  let percent = 0;
  if(balAgo !== 0) percent = ((balNow - balAgo) / Math.abs(balAgo)) * 100;
  else if(balNow !== 0) percent = 100;
  return { values: dailyBalances, percent: percent };
}

function renderChange(id, percent) {
  const el = document.getElementById(id);
  if(!el) return;
  const r = Math.round(percent);
  if(r > 0) {
    el.className = 'stat-change pos';
    el.innerHTML = '<i class="fa-solid fa-arrow-trend-up"></i> ' + r + '%';
  } else if (r < 0) {
    el.className = 'stat-change neg';
    el.innerHTML = '<i class="fa-solid fa-arrow-trend-down"></i> ' + Math.abs(r) + '%';
  } else {
    el.className = 'stat-change neu';
    el.innerHTML = '<i class="fa-solid fa-minus"></i> 0%';
  }
}

function renderSpark(id, data, color) {
  const canvas = document.getElementById(id);
  if(!canvas) return null;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 60);
  grad.addColorStop(0, color + '30');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: new Array(data.length).fill(''),
      datasets: [{
        data: data,
        borderColor: color,
        borderWidth: 1.5,
        backgroundColor: grad,
        fill: true,
        pointRadius: 0,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: {display: false}, tooltip: {enabled: false} },
      scales: {
        x: { display: false },
        y: { display: false, min: Math.min(...data) - (Math.max(...data)*0.1) }
      },
      animation: { duration: 800 }
    }
  });
}

function renderTables() {
  const trades = allData.filter(d => d.category === 'Trading');
  const trans = allData.filter(d => d.category !== 'Trading');
  renderTableHTML(trades, 'tradingList', 'pgTrade', pgTrade, limTrade, true);
  renderTableHTML(trans, 'transactionList', 'pgTrans', pgTrans, limTrans, false);
}

function renderTableHTML(data, tableId, pgId, page, limit, isTrade) {
  const tbody = document.getElementById(tableId);
  const pgContainer = document.getElementById(pgId);
  if(!tbody || !pgContainer) return;
  tbody.innerHTML = '';
  pgContainer.innerHTML = '';
  let conversion = 1;
  let sym = '$';
  if(curr === 'MMK') { conversion = rates.MMK; sym = 'Ks'; }
  else if (curr === 'THB') { conversion = rates.THB; sym = '\\u0e3f'; }
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  const sliced = data.slice(start, end);

  if(sliced.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-dim); font-size: 12.5px;">No records found</td></tr>';
  }

  sliced.forEach(d => {
    const dt = new Date(d.created_at);
    const dtStr = '<div style="font-weight:500; color:var(--text-primary); font-size: 12.5px;">' + dt.toLocaleDateString() + '<br><span style="font-size:10.5px; color:var(--text-dim); font-weight:400;">' + dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + '</span></div>';
    const safeData = JSON.stringify(d).replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    const acts = '<td style="text-align:center;"><div class="btn-icon" onclick=\\'editT(' + safeData + ')\\'><i class="fa-solid fa-pen"></i></div><div class="btn-icon del" onclick="deleteT(' + d.id + ')"><i class="fa-solid fa-trash"></i></div></td></tr>';

    if(isTrade) {
      const p = (d.note || '').split('|'); 
      const isWin = d.amount > 0;
      tbody.innerHTML += '<tr><td>' + dtStr + '</td><td style="font-weight:600; color:var(--text-primary);">' + d.title + '</td><td><span class="pill ' + (p[0].trim()==='Long'?'pill-inc':'pill-exp') + '">' + (p[0]||'-') + '</span></td><td><span class="txt-mono" style="color:var(--text-secondary);">' + (p[1]||'-') + '</span></td><td style="color:var(--text-secondary);">' + (p[2]||'-') + '</td><td class="txt-mono" style="text-align:right; font-weight:700; font-size:13.5px; color:' + (isWin?'#10b981':'#f43f5e') + '">' + (isWin?'+':'') + sym + ' ' + (Math.abs(d.amount)*conversion).toLocaleString() + '</td>' + acts;
    } else {
      const isInc = d.category === 'Income' || d.category.startsWith('Income:');
      const displayCat = d.category.replace('Income: ', '');
      tbody.innerHTML += '<tr><td>' + dtStr + '</td><td style="font-weight:500; color:var(--text-primary);">' + d.title + '</td><td><span class="pill ' + (isInc?'pill-inc':'pill-exp') + '">' + displayCat + '</span></td><td style="color:var(--text-secondary); max-width:150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + (d.note||'-') + '</td><td class="txt-mono" style="text-align:right; font-weight:700; font-size:13.5px; color:' + (isInc?'#10b981':'var(--text-primary)') + '">' + sym + ' ' + (d.amount*conversion).toLocaleString() + '</td>' + acts;
    }
  });

  const totalPages = Math.ceil(data.length / limit);
  if(totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('div');
      btn.className = 'page-btn ' + (i === parseInt(page) ? 'active' : '');
      btn.innerText = i;
      btn.onclick = () => changePage(isTrade ? 'trade' : 'trans', i);
      pgContainer.appendChild(btn);
    }
  }
}

function changeLimit(type, val) {
  if(type === 'trade') { limTrade = parseInt(val); pgTrade = 1; }
  else { limTrans = parseInt(val); pgTrans = 1; }
  renderTables();
}
window.changeLimit = changeLimit;

function changePage(type, pageNum) {
  if(type === 'trade') pgTrade = pageNum;
  else pgTrans = pageNum;
  renderTables();
}

function animateValue(obj, end, prefix) {
  if(obj) obj.innerText = prefix + end.toLocaleString();
}

function editT(data) {
  if(data.category === 'Trading') {
    document.getElementById('editTradeId').value = data.id;
    document.getElementById('modalTradeTitle').innerText = (lang === 'my' ? "\\u1005\\u102c\\u101b\\u1004\\u103a\\u1038\\u1015\\u103c\\u1004\\u103a\\u1006\\u1004\\u103a\\u101b\\u1014\\u103a (Trade)" : "Edit Trade Record");
    document.getElementById('trPair').value = data.title;
    document.getElementById('trRes').value = data.amount;
    const p = (data.note || '').split(' | ');
    const type = p[0].trim() || 'Long';
    selectTradeType(type, document.getElementById('btn_' + type));
    document.getElementById('trLev').value = p[1] ? p[1].trim() : '';
    document.getElementById('trNote').value = p[2] ? p[2].trim() : '';
    openModal('tradeModal');
  } else {
    document.getElementById('editId').value = data.id;
    document.getElementById('modalEntryTitle').innerText = (lang === 'my' ? "\\u1005\\u102c\\u101b\\u1004\\u103a\\u1038\\u1015\\u103c\\u1004\\u103a\\u1006\\u1004\\u103a\\u101b\\u1014\\u103a" : "Edit Entry");
    document.getElementById('tIn').value = data.title;
    document.getElementById('aIn').value = data.amount;
    document.getElementById('nIn').value = data.note || "";
    const isInc = data.category === 'Income' || data.category.startsWith('Income:');
    const typeToSet = isInc ? 'Income' : 'Expense';
    selectEntryType(typeToSet, document.getElementById('type_' + typeToSet));
    let catName = data.category.replace('Income: ', '');
    const standardCats = ['Income', 'Food', 'Transport', 'Shopping', 'Others'];
    if (standardCats.includes(catName)) {
       selectCategory(catName, document.getElementById('cat_' + (catName === 'Income' ? 'Others' : catName))); 
    } else {
       selectCategory('Custom', document.getElementById('cat_Custom'));
       document.getElementById('customCatText').value = catName;
    }
    openModal('entryModal');
  }
}
window.editT = editT;

function renderCharts(data, inc, exp, conversion) {
  if(typeof Chart === 'undefined') return;
  const activeFont = lang === 'my' ? "'WaloneBold', 'Inter', system-ui, sans-serif" : "'Inter', 'WaloneBold', system-ui, sans-serif";

  const commonOptions = {
    responsive: true, 
    maintainAspectRatio: false, 
    plugins:{
      legend:{ display:false },
      tooltip: {
        backgroundColor: 'rgba(9, 9, 11, 0.95)',
        titleColor: '#fafafa',
        bodyColor: '#a1a1aa',
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        titleFont: { family: activeFont, size: 11.5, weight: 600 },
        bodyFont: { family: activeFont, size: 11.5, weight: 500 },
        boxPadding: 4,
        usePointStyle: true
      }
    }
  };

  const ctx1 = document.getElementById('cashChart').getContext('2d'); 
  if(window.c1) window.c1.destroy();
  const raw = data.slice(0, 20).reverse();

  const gradInc = ctx1.createLinearGradient(0, 0, 0, 360); 
  gradInc.addColorStop(0, 'rgba(16, 185, 129, 0.12)'); 
  gradInc.addColorStop(1, 'rgba(16, 185, 129, 0)');

  const gradExp = ctx1.createLinearGradient(0, 0, 0, 360); 
  gradExp.addColorStop(0, 'rgba(244, 63, 94, 0.12)'); 
  gradExp.addColorStop(1, 'rgba(244, 63, 94, 0)');

  const gradTrade = ctx1.createLinearGradient(0, 0, 0, 360); 
  gradTrade.addColorStop(0, 'rgba(245, 158, 11, 0.12)'); 
  gradTrade.addColorStop(1, 'rgba(245, 158, 11, 0)');
  
  window.c1 = new Chart(ctx1, { 
    type:'line', 
    data: { 
      labels: ['Start', ...raw.map((d, i) => '')],
      datasets: [
        { 
          label: 'Income', 
          data: [0, ...raw.map(d=>(d.category==='Income' || d.category.startsWith('Income:'))?d.amount*conversion:null)], 
          borderColor:'#10b981', 
          backgroundColor: gradInc, 
          tension: 0.4, fill: true, spanGaps: true, 
          pointRadius: 0, pointHoverRadius: 4, 
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#09090b',
          pointBorderWidth: 2,
          borderWidth: 1.5
        }, 
        { 
          label: 'Expense', 
          data: [0, ...raw.map(d=>(d.category!=='Income' && !d.category.startsWith('Income:') && d.category!=='Trading')?d.amount*conversion:null)], 
          borderColor:'#f43f5e', 
          backgroundColor: gradExp, 
          tension: 0.4, fill: true, spanGaps: true, 
          pointRadius: 0, pointHoverRadius: 4, 
          pointBackgroundColor: '#f43f5e',
          pointBorderColor: '#09090b',
          pointBorderWidth: 2,
          borderWidth: 1.5
        }, 
        { 
          label: 'Trade', 
          data: [0, ...raw.map(d=>d.category==='Trading'?d.amount*conversion:null)], 
          borderColor:'#f59e0b', 
          backgroundColor: gradTrade, 
          tension: 0.4, fill: true, spanGaps: true, 
          pointRadius: 0, pointHoverRadius: 4,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: '#09090b',
          pointBorderWidth: 2,
          borderWidth: 1.5
        }
      ]
    }, 
    options: { 
      ...commonOptions,
      interaction: { mode: 'index', intersect: false },
      scales:{
        y:{ 
          beginAtZero: true, 
          grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false }, 
          ticks: { color: '#3f3f46', font: { size: 10, family: activeFont, weight: 500 } } 
        }, 
        x:{ display: false }
      } 
    } 
  });
  
  const ctx3 = document.getElementById('pieChart').getContext('2d'); 
  if(window.c3) window.c3.destroy();
  const tradeVol = Math.abs(data.filter(d=>d.category==='Trading').reduce((s,d)=>s+d.amount,0))*conversion;

  window.c3 = new Chart(ctx3, { 
    type:'doughnut', 
    data: { 
      labels: ['Income','Expense','Trading'], 
      datasets: [{ 
        data: [inc*conversion, exp*conversion, tradeVol], 
        backgroundColor: ['#10b981','#f43f5e','#f59e0b'], 
        borderColor: 'transparent', 
        borderWidth: 0,
        hoverOffset: 6,
        borderRadius: 3,
        spacing: 2
      }] 
    }, 
    options: { 
      ...commonOptions, 
      cutout: '78%', 
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 14,
            color: '#a1a1aa',
            font: { family: activeFont, size: 10.5, weight: 500 }
          }
        },
        tooltip: { ...commonOptions.plugins.tooltip }
      } 
    } 
  });
}

function exportData(type) {
  let dataToExport = [];
  let fileName = "Spendio_Export.xlsx";
  if(type === 'trade') {
    dataToExport = allData.filter(d => d.category === 'Trading').map(d => {
      const p = (d.note || '').split('|'); 
      return { Date: new Date(d.created_at).toLocaleDateString(), Pair: d.title, Position: p[0] || '', Leverage: p[1] || '', Strategy: p[2] || '', PnL: d.amount };
    });
    fileName = "Trading_Journal.xlsx";
  } else {
    dataToExport = allData.filter(d => d.category !== 'Trading').map(d => {
      return { Date: new Date(d.created_at).toLocaleDateString(), Title: d.title, Category: d.category.replace('Income: ', ''), Note: d.note, Amount: d.amount, Type: (d.category.startsWith('Income:') || d.category === 'Income') ? 'Income' : 'Expense' };
    });
    fileName = "Transactions.xlsx";
  }
  if(dataToExport.length === 0) { alert("No data to export"); return; }
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, fileName);
}
window.exportData = exportData;

let deleteTargetId = null;
window.deleteT = function(id) {
  deleteTargetId = id;
  document.getElementById('customDelModal').classList.add('active');
};

document.getElementById('closeDelBtn').onclick = function() {
  document.getElementById('customDelModal').classList.remove('active');
  deleteTargetId = null;
};

document.getElementById('confirmDelBtn').onclick = async function() {
  if (deleteTargetId) {
    const btn = document.getElementById('confirmDelBtn');
    btn.innerText = '...';
    const { error } = await sc.from('transactions').delete().eq('id', deleteTargetId);
    if (!error) {
      document.getElementById('customDelModal').classList.remove('active');
      deleteTargetId = null;
      btn.innerText = 'Delete';
      loadD();
    }
  }
};

document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuToggle');
  if (sidebar.classList.contains('active') && window.innerWidth <= 900) {
    if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
      sidebar.classList.remove('active');
    }
  }
});
`
