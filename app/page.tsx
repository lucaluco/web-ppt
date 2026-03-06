"use client";

import { useState, useEffect, useCallback } from "react";

// ── Icon components ──────────────────────────────────────────────────────────

const ChevronLeft = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ── Slide definitions ────────────────────────────────────────────────────────

type SlideId =
  | "cover"
  | "toc"
  | "what-is"
  | "prosemirror"
  | "architecture"
  | "extensions"
  | "features"
  | "collab"
  | "ecosystem"
  | "code"
  | "who-uses"
  | "end";

interface SlideData {
  id: SlideId;
  label: string;
}

const slideList: SlideData[] = [
  { id: "cover", label: "封面" },
  { id: "toc", label: "目录" },
  { id: "what-is", label: "什么是 Tiptap" },
  { id: "prosemirror", label: "ProseMirror 基础" },
  { id: "architecture", label: "架构" },
  { id: "extensions", label: "扩展系统" },
  { id: "features", label: "核心特性" },
  { id: "collab", label: "协同编辑" },
  { id: "ecosystem", label: "生态系统" },
  { id: "code", label: "快速上手" },
  { id: "who-uses", label: "谁在使用" },
  { id: "end", label: "结语" },
];

// ── Slide components ─────────────────────────────────────────────────────────

function CoverSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0d1117]">
      {/* grid decoration */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#1d4ed8]/20 blur-[120px]" />

      <div className="relative z-10 text-center px-8 space-y-6 animate-fade-in">
        {/* Logo mark */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1d4ed8] flex items-center justify-center shadow-xl">
            <svg viewBox="0 0 32 32" fill="none" className="w-9 h-9">
              <path d="M6 8h14M6 14h20M6 20h12M6 26h16" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="26" cy="8" r="3" fill="#60a5fa" />
            </svg>
          </div>
          <span className="text-5xl font-bold text-white font-mono tracking-tight">tiptap</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white text-balance leading-tight">
          下一代富文本编辑器框架
        </h1>
        <p className="text-xl md:text-2xl text-[#60a5fa] font-medium">
          无头 · 可扩展 · 框架无关
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {["ProseMirror", "TypeScript", "React / Vue", "协同编辑"].map((tag) => (
            <span key={tag} className="px-4 py-1.5 rounded-full border border-[#3b82f6]/40 text-[#93c5fd] text-sm font-medium bg-[#1e3a5f]/40">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-[#64748b] text-sm pt-6">2026 · Tiptap 技术分享</p>
      </div>
    </div>
  );
}

function TocSlide() {
  const items = [
    { num: "01", title: "什么是 Tiptap", sub: "简介与背景" },
    { num: "02", title: "ProseMirror 基础", sub: "底层原理" },
    { num: "03", title: "架构 & 扩展系统", sub: "设计思想" },
    { num: "04", title: "核心特性", sub: "功能亮点" },
    { num: "05", title: "协同编辑", sub: "实时协作" },
    { num: "06", title: "生态 & 快速上手", sub: "实践指南" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 pb-4 border-b border-[#1d4ed8]/60">
        目录 <span className="text-[#3b82f6]">Contents</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.num} className="flex items-center gap-5 p-5 rounded-xl bg-[#161b27] border border-[#1e3a5f] hover:border-[#3b82f6]/60 transition-colors group">
            <span className="text-3xl font-bold text-[#1d4ed8]/60 group-hover:text-[#3b82f6] transition-colors font-mono">{item.num}</span>
            <div>
              <p className="font-semibold text-white text-lg">{item.title}</p>
              <p className="text-[#64748b] text-sm mt-0.5">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatIsSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">01 · 什么是 Tiptap</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">一句话介绍</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-2">
        <div className="space-y-5">
          <div className="p-6 rounded-2xl bg-[#161b27] border border-[#1e3a5f]">
            <p className="text-[#60a5fa] font-semibold text-lg mb-2">定义</p>
            <p className="text-[#cbd5e1] leading-relaxed">
              Tiptap 是一个基于 <span className="text-white font-semibold">ProseMirror</span> 构建的
              <span className="text-[#60a5fa] font-semibold"> 无头（Headless）</span>富文本编辑器框架，
              支持 React、Vue 及原生 JavaScript，完全开源且高度可定制。
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-[#161b27] border border-[#1e3a5f]">
            <p className="text-[#60a5fa] font-semibold text-lg mb-2">诞生背景</p>
            <p className="text-[#cbd5e1] leading-relaxed">
              传统富文本编辑器（如 Quill、Draft.js）难以满足复杂定制需求。
              Tiptap 将 ProseMirror 强大的底层能力与现代框架的开发体验结合，
              让构建自定义编辑器变得简单。
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { icon: "⚡", title: "无头设计", desc: "UI 完全由开发者掌控，零样式约束" },
            { icon: "🧩", title: "扩展驱动", desc: "一切功能皆扩展，按需加载" },
            { icon: "🔗", title: "框架无关", desc: "React、Vue、Svelte 皆可使用" },
            { icon: "🌐", title: "协同就绪", desc: "内置 Y.js 实时协作支持" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-[#0d1117] border border-[#1e3a5f]">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-[#64748b] text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProseMirrorSlide() {
  const concepts = [
    { term: "Schema", desc: "定义文档允许的结构（节点、标记）", color: "#3b82f6" },
    { term: "Document", desc: "编辑器中实际存储的内容树", color: "#8b5cf6" },
    { term: "State", desc: "描述当前内容与光标选区的快照", color: "#10b981" },
    { term: "Transaction", desc: "对 State 的原子性变更操作", color: "#f59e0b" },
    { term: "Node", desc: "段落、标题、图片等内容类型", color: "#ef4444" },
    { term: "Mark", desc: "行内格式，如粗体、斜体、链接", color: "#06b6d4" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">02 · ProseMirror 基础</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">底层核心概念</h2>
        <p className="text-[#64748b] mt-2">Tiptap 是 ProseMirror 的现代化封装，理解底层是关键</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {concepts.map((c) => (
          <div key={c.term} className="p-5 rounded-xl bg-[#161b27] border border-[#1e3a5f] group hover:border-opacity-100 transition-all" style={{ borderColor: `${c.color}30` }}>
            <div className="w-2 h-6 rounded-full mb-3" style={{ backgroundColor: c.color }} />
            <p className="text-white font-bold text-lg font-mono">{c.term}</p>
            <p className="text-[#94a3b8] text-sm mt-1 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-xl bg-[#161b27] border border-[#1e3a5f] flex items-center gap-3">
        <svg className="w-5 h-5 text-[#3b82f6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p className="text-[#94a3b8] text-sm">文档以 <span className="text-white font-mono">JSON</span> 格式存储：<span className="text-[#60a5fa] font-mono">editor.getJSON()</span>，也支持导出为 HTML</p>
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  const layers = [
    { label: "你的应用", color: "#1d4ed8", desc: "React / Vue 组件、自定义 UI" },
    { label: "Tiptap 层", color: "#7c3aed", desc: "Editor 实例、扩展 API、Commands、Hooks" },
    { label: "ProseMirror 层", color: "#0f766e", desc: "Schema / State / Transaction / View" },
    { label: "浏览器 DOM", color: "#b45309", desc: "ContentEditable 原生能力" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">03 · 架构</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">分层架构设计</h2>
      </div>
      <div className="flex flex-col gap-3 max-w-2xl mx-auto w-full">
        {layers.map((l, i) => (
          <div key={l.label} className="flex items-center gap-4 p-5 rounded-xl border transition-all" style={{ backgroundColor: `${l.color}15`, borderColor: `${l.color}40` }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: l.color }}>
              {layers.length - i}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">{l.label}</p>
              <p className="text-[#94a3b8] text-sm">{l.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-2 text-[#64748b] text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            越往下越底层，Tiptap 作为中间层屏蔽复杂性
          </div>
        </div>
      </div>
    </div>
  );
}

function ExtensionsSlide() {
  const exts = [
    { name: "StarterKit", desc: "开箱即用：粗体、斜体、标题、列表等基础扩展集合", badge: "内置" },
    { name: "Collaboration", desc: "基于 Y.js 的实时协同编辑，支持 WebSocket & WebRTC", badge: "官方" },
    { name: "Image", desc: "图片上传、拖拽插入，支持自定义渲染", badge: "官方" },
    { name: "Mention", desc: "@提及功能，带自动补全下拉菜单", badge: "官方" },
    { name: "自定义扩展", desc: "通过 Extension / Node / Mark API 创建任意扩展", badge: "社区" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">03 · 扩展系统</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">一切皆扩展</h2>
        <p className="text-[#64748b] mt-2">Tiptap 的核心设计哲学：功能通过扩展按需组合</p>
      </div>
      <div className="space-y-3">
        {exts.map((e) => (
          <div key={e.name} className="flex items-center gap-5 p-4 rounded-xl bg-[#161b27] border border-[#1e3a5f] hover:border-[#3b82f6]/40 transition-colors">
            <div className="w-2 h-2 rounded-full bg-[#3b82f6] flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold font-mono">{e.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e.badge === "内置" ? "bg-[#1d4ed8]/30 text-[#60a5fa]" : e.badge === "官方" ? "bg-[#059669]/20 text-[#34d399]" : "bg-[#7c3aed]/20 text-[#c4b5fd]"}`}>{e.badge}</span>
              </div>
              <p className="text-[#94a3b8] text-sm mt-0.5">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSlide() {
  const features = [
    { icon: "🎯", title: "无头设计", desc: "完全控制 UI，与任何设计系统无缝集成" },
    { icon: "📦", title: "TypeScript 原生", desc: "完整类型推导，极佳的 IDE 体验" },
    { icon: "⚡", title: "Commands API", desc: "链式调用：editor.chain().focus().bold().run()" },
    { icon: "🔌", title: "插件化架构", desc: "仅引入所需功能，Tree-shaking 友好" },
    { icon: "📄", title: "JSON / HTML 互转", desc: "灵活的内容格式，方便存储与渲染" },
    { icon: "♿", title: "无障碍支持", desc: "符合 ARIA 标准，键盘操作友好" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">04 · 核心特性</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">为什么选择 Tiptap</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="p-5 rounded-2xl bg-[#161b27] border border-[#1e3a5f] hover:border-[#3b82f6]/50 transition-colors">
            <span className="text-3xl">{f.icon}</span>
            <p className="text-white font-semibold mt-3 mb-1">{f.title}</p>
            <p className="text-[#64748b] text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollabSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">05 · 协同编辑</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">实时多人协作</h2>
        <p className="text-[#64748b] mt-2">基于 Y.js CRDT 算法，天然解决冲突</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { title: "Y.js 集成", desc: "使用 CRDT（无冲突复制数据类型）实现离线安全的协同合并" },
            { title: "用户光标", desc: "实时显示多人光标位置与选区，提升协作感知" },
            { title: "WebSocket / WebRTC", desc: "支持 Hocuspocus 服务端或 P2P 点对点模式" },
            { title: "版本历史", desc: "可记录文档变更历史，支持回溯任意版本" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#161b27] border border-[#1e3a5f]">
              <div className="w-2 h-2 rounded-full bg-[#10b981] mt-2 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">{item.title}</p>
                <p className="text-[#64748b] text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-[#0a1628] border border-[#1e3a5f] flex flex-col justify-center">
          <p className="text-[#60a5fa] font-mono text-xs mb-4">// 协同配置示例</p>
          <pre className="text-[#e2e8f0] text-sm font-mono leading-relaxed overflow-auto">{`import Collaboration from
  '@tiptap/extension-collaboration'
import * as Y from 'yjs'

const ydoc = new Y.Doc()

const editor = new Editor({
  extensions: [
    StarterKit,
    Collaboration.configure({
      document: ydoc,
    }),
  ],
})`}</pre>
        </div>
      </div>
    </div>
  );
}

function EcosystemSlide() {
  const packages = [
    { name: "@tiptap/core", desc: "核心引擎" },
    { name: "@tiptap/react", desc: "React 绑定" },
    { name: "@tiptap/vue-3", desc: "Vue 3 绑定" },
    { name: "@tiptap/starter-kit", desc: "常用扩展包" },
    { name: "@tiptap/pm", desc: "ProseMirror 工具" },
    { name: "Hocuspocus", desc: "协同服务端" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">06 · 生态系统</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">完整的生态</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {packages.map((p) => (
          <div key={p.name} className="p-5 rounded-xl bg-[#161b27] border border-[#1e3a5f] hover:border-[#3b82f6]/40 transition-colors">
            <p className="text-[#60a5fa] font-mono text-sm font-semibold">{p.name}</p>
            <p className="text-[#64748b] text-sm mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          { num: "100+", label: "社区扩展" },
          { num: "20k+", label: "GitHub Stars" },
          { num: "MIT", label: "开源协议" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-xl bg-[#1d4ed8]/10 border border-[#1d4ed8]/30 text-center">
            <p className="text-3xl font-bold text-white">{stat.num}</p>
            <p className="text-[#60a5fa] text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">06 · 快速上手</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">5 分钟接入</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0a1628] border border-[#1e3a5f]">
            <p className="text-[#64748b] text-xs font-mono mb-3">① 安装</p>
            <pre className="text-[#e2e8f0] text-sm font-mono">{`npm install @tiptap/react
  @tiptap/pm
  @tiptap/starter-kit`}</pre>
          </div>
          <div className="p-5 rounded-xl bg-[#0a1628] border border-[#1e3a5f]">
            <p className="text-[#64748b] text-xs font-mono mb-3">③ 操作内容</p>
            <pre className="text-[#e2e8f0] text-sm font-mono">{`// 链式命令
editor
  .chain()
  .focus()
  .toggleBold()
  .run()

// 获取内容
editor.getJSON()
editor.getHTML()`}</pre>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-[#0a1628] border border-[#1e3a5f]">
          <p className="text-[#64748b] text-xs font-mono mb-3">② React 组件</p>
          <pre className="text-[#e2e8f0] text-sm font-mono leading-relaxed">{`import { useEditor, EditorContent }
  from '@tiptap/react'
import StarterKit from
  '@tiptap/starter-kit'

function MyEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })

  return (
    <EditorContent editor={editor} />
  )
}`}</pre>
        </div>
      </div>
    </div>
  );
}

function WhoUsesSlide() {
  const users = [
    { name: "Gitlab", desc: "代码仓库与 MR 评论编辑器" },
    { name: "Linear", desc: "Issue 与项目文档编辑" },
    { name: "Notion-like 工具", desc: "众多类 Notion 产品的底层" },
    { name: "Loom", desc: "视频注释与评论系统" },
    { name: "Rows", desc: "电子表格的富文本单元格" },
    { name: "企业内部工具", desc: "各类 CMS、知识库平台" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center bg-[#0d1117] px-10 md:px-20 py-12">
      <div className="mb-8">
        <p className="text-[#3b82f6] font-mono text-sm mb-2">谁在使用</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white">被众多产品信赖</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.name} className="p-5 rounded-xl bg-[#161b27] border border-[#1e3a5f] hover:border-[#3b82f6]/50 transition-colors">
            <p className="text-white font-bold text-lg">{u.name}</p>
            <p className="text-[#64748b] text-sm mt-1">{u.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EndSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0d1117]">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#1d4ed8]/15 blur-[100px]" />
      <div className="relative z-10 text-center px-8 space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-[#1d4ed8] flex items-center justify-center shadow-xl mx-auto mb-4">
          <svg viewBox="0 0 32 32" fill="none" className="w-11 h-11">
            <path d="M6 8h14M6 14h20M6 20h12M6 26h16" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="26" cy="8" r="3" fill="#60a5fa" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white">感谢聆听</h1>
        <p className="text-xl text-[#60a5fa]">Thank you for your attention</p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a className="px-6 py-2.5 rounded-full bg-[#1d4ed8] text-white font-semibold hover:bg-[#2563eb] transition-colors">
            tiptap.dev
          </a>
          <a className="px-6 py-2.5 rounded-full border border-[#3b82f6]/40 text-[#93c5fd] font-semibold hover:border-[#3b82f6] transition-colors">
            GitHub / ueberdosis/tiptap
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Render map ───────────────────────────────────────────────────────────────

function renderSlide(id: SlideId) {
  switch (id) {
    case "cover": return <CoverSlide />;
    case "toc": return <TocSlide />;
    case "what-is": return <WhatIsSlide />;
    case "prosemirror": return <ProseMirrorSlide />;
    case "architecture": return <ArchitectureSlide />;
    case "extensions": return <ExtensionsSlide />;
    case "features": return <FeaturesSlide />;
    case "collab": return <CollabSlide />;
    case "ecosystem": return <EcosystemSlide />;
    case "code": return <CodeSlide />;
    case "who-uses": return <WhoUsesSlide />;
    case "end": return <EndSlide />;
  }
}

// ── Main component ───────────────────────────────────────────────────────────

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === current || index < 0 || index >= slideList.length) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 350);
    },
    [isAnimating, current]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slideList[current];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d1117]">
      {/* Slide */}
      <div key={slide.id} className={`absolute inset-0 ${isAnimating ? "animate-fade-in" : ""}`}>
        {renderSlide(slide.id)}
      </div>

      {/* Click zones */}
      <div className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10" onClick={prev} />
      <div className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10" onClick={next} />

      {/* Arrow buttons */}
      {current > 0 && (
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 border border-white/10" aria-label="上一页">
          <ChevronLeft size={24} />
        </button>
      )}
      {current < slideList.length - 1 && (
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110 border border-white/10" aria-label="下一页">
          <ChevronRight size={24} />
        </button>
      )}

      {/* Dot navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
        {slideList.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            title={s.label}
            className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2.5 bg-[#3b82f6]" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"}`}
            aria-label={`跳转到 ${s.label}`}
          />
        ))}
      </div>

      {/* Page counter */}
      <div className="absolute bottom-5 right-5 z-20 text-white/50 text-xs font-mono bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
        {current + 1} / {slideList.length}
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-5 left-5 z-20 text-white/40 text-xs bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
        ← → 或点击切换
      </div>
    </div>
  );
}
