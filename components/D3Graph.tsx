"use client";

import { useEffect, useRef, useState } from "react";

const D3Graph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [d3, setD3] = useState<any>(null);

  // 动态加载D3.js
  useEffect(() => {
    const loadD3 = async () => {
      const d3Module = await import("d3");
      setD3(d3Module);
    };
    loadD3();
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById("d3-graph-container");
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // 延迟执行以确保DOM完全渲染
    const timeoutId = setTimeout(() => {
      updateDimensions();
    }, 100);

    window.addEventListener("resize", updateDimensions);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const data = {
    nodes: [
      { id: "全栈开发", group: 0, size: 35, desc: "前端+后端+数据库+运维" },

      // 前端开发
      { id: "Vue", group: 1, size: 22, desc: "渐进式JavaScript框架" },
      { id: "React", group: 1, size: 22, desc: "Facebook开发的UI库" },
      { id: "JavaScript", group: 1, size: 20, desc: "网页交互编程语言" },
      { id: "CSS", group: 1, size: 18, desc: "层叠样式表" },

      // Vue 生态
      { id: "Vue3", group: 1, size: 14, desc: "Composition API" },
      { id: "Vuex", group: 1, size: 12, desc: "Vue状态管理" },
      { id: "Vue Router", group: 1, size: 12, desc: "Vue路由管理" },
      { id: "Nuxt", group: 1, size: 12, desc: "Vue服务端渲染" },

      // React 生态
      { id: "Hooks", group: 1, size: 14, desc: "函数组件状态管理" },
      { id: "Redux", group: 1, size: 12, desc: "状态管理库" },
      { id: "Next.js", group: 1, size: 12, desc: "React服务端渲染" },

      // JavaScript 生态
      { id: "ES6+", group: 1, size: 14, desc: "现代JavaScript特性" },
      { id: "TypeScript", group: 1, size: 16, desc: "类型安全的JS超集" },

      // 后端开发
      { id: "Node.js", group: 2, size: 22, desc: "服务端JavaScript运行时" },
      { id: "NestJS", group: 2, size: 20, desc: "企业级Node.js框架" },
      { id: "Express", group: 2, size: 16, desc: "轻量级Web框架" },
      { id: "Koa", group: 2, size: 14, desc: "下一代Web框架" },

      // NestJS 生态
      { id: "依赖注入", group: 2, size: 12, desc: "IoC容器" },
      { id: "GraphQL", group: 2, size: 12, desc: "API查询语言" },

      // 数据库
      { id: "PostgreSQL", group: 3, size: 20, desc: "关系型数据库" },
      { id: "Redis", group: 3, size: 18, desc: "内存数据库" },

      // PostgreSQL 生态
      { id: "SQL优化", group: 3, size: 12, desc: "查询性能优化" },
      { id: "索引设计", group: 3, size: 12, desc: "数据库索引" },

      // Redis 生态
      { id: "缓存", group: 3, size: 12, desc: "数据缓存" },
      { id: "消息队列", group: 3, size: 12, desc: "异步消息处理" },

      // 运维部署
      { id: "Docker", group: 4, size: 22, desc: "容器化技术" },
      { id: "Nginx", group: 4, size: 18, desc: "高性能Web服务器" },
      { id: "Linux", group: 4, size: 18, desc: "操作系统" },

      // Docker 生态
      { id: "容器化", group: 4, size: 12, desc: "应用容器封装" },
      { id: "Docker Compose", group: 4, size: 12, desc: "多容器编排" },

      // Nginx 生态
      { id: "反向代理", group: 4, size: 12, desc: "请求转发" },
      { id: "负载均衡", group: 4, size: 12, desc: "流量分发" },

      // Linux 生态
      { id: "Shell", group: 4, size: 12, desc: "命令行脚本" },

      // 工程化
      { id: "npm", group: 5, size: 18, desc: "Node.js包管理器" },
      { id: "构建工具", group: 5, size: 18, desc: "前端构建工具" },
      { id: "Git", group: 5, size: 16, desc: "版本控制系统" },

      // npm 生态
      { id: "包管理", group: 5, size: 12, desc: "依赖管理" },
      { id: "私有仓库", group: 5, size: 12, desc: "企业级npm仓库" },

      // 构建工具生态
      { id: "Webpack", group: 5, size: 14, desc: "模块打包工具" },
      { id: "Vite", group: 5, size: 14, desc: "下一代构建工具" },
    ],
    links: [
      // 主节点连接
      { source: "全栈开发", target: "Vue" },
      { source: "全栈开发", target: "React" },
      { source: "全栈开发", target: "Node.js" },
      { source: "全栈开发", target: "NestJS" },
      { source: "全栈开发", target: "PostgreSQL" },
      { source: "全栈开发", target: "Redis" },
      { source: "全栈开发", target: "Docker" },
      { source: "全栈开发", target: "Nginx" },
      { source: "全栈开发", target: "npm" },

      // Vue 分支
      { source: "Vue", target: "Vue3" },
      { source: "Vue", target: "Vuex" },
      { source: "Vue", target: "Vue Router" },
      { source: "Vue", target: "Nuxt" },

      // React 分支
      { source: "React", target: "Hooks" },
      { source: "React", target: "Redux" },
      { source: "React", target: "Next.js" },

      // JavaScript 分支
      { source: "JavaScript", target: "ES6+" },
      { source: "JavaScript", target: "TypeScript" },

      // CSS 分支 - removed Tailwind reference as node doesn't exist

      // Node.js 分支
      { source: "Node.js", target: "Express" },
      { source: "Node.js", target: "Koa" },

      // NestJS 分支
      { source: "NestJS", target: "依赖注入" },
      { source: "NestJS", target: "GraphQL" },
      { source: "NestJS", target: "TypeScript" },

      // PostgreSQL 分支
      { source: "PostgreSQL", target: "SQL优化" },
      { source: "PostgreSQL", target: "索引设计" },

      // Redis 分支
      { source: "Redis", target: "缓存" },
      { source: "Redis", target: "消息队列" },

      // Docker 分支
      { source: "Docker", target: "容器化" },
      { source: "Docker", target: "Docker Compose" },

      // Nginx 分支
      { source: "Nginx", target: "反向代理" },
      { source: "Nginx", target: "负载均衡" },

      // Linux 分支
      { source: "Linux", target: "Shell" },

      // npm 分支
      { source: "npm", target: "包管理" },
      { source: "npm", target: "私有仓库" },

      // 构建工具分支
      { source: "构建工具", target: "Webpack" },
      { source: "构建工具", target: "Vite" },

      // 交叉关联
      { source: "TypeScript", target: "Vue" },
      { source: "TypeScript", target: "React" },
      { source: "TypeScript", target: "NestJS" },
      { source: "Docker", target: "Nginx" },
      { source: "Docker", target: "PostgreSQL" },
      { source: "Docker", target: "Redis" },
    ],
  };

  const colors = {
    0: "#667eea",
    1: "#3B82F6",
    2: "#8B5CF6",
    3: "#10B981",
    4: "#F59E0B",
    5: "#EF4444",
  };

  useEffect(() => {
    if (!svgRef.current || !d3 || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // 计算初始缩放和位置，使图谱适应屏幕
    const initialScale = 0.7;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const initialTransform = d3.zoomIdentity
      .translate(centerX, centerY)
      .scale(initialScale)
      .translate(-centerX, -centerY);

    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 3])
      .on("zoom", (event: any) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any).call(zoom.transform as any, initialTransform);

    const link = g
      .append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 2);

    const node = g
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any,
      );

    node
      .append("circle")
      .attr("r", (d: any) => d.size)
      .attr("fill", (d: any) => colors[d.group as keyof typeof colors])
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .style("transition", "all 0.3s");

    node
      .append("text")
      .text((d: any) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", (d: any) => d.size + 18)
      .attr("fill", "#333")
      .style("font-size", (d: any) => (d.size > 20 ? "14px" : "12px"))
      .style("font-weight", "600")
      .style("pointer-events", "none");

    const tooltip = d3.select(tooltipRef.current);

    node.on("mouseover", function (this: any, event: any, d: any) {
      d3.select(this)
        .select("circle")
        .attr("stroke-width", 4)
        .style("filter", "brightness(1.2)");
      tooltip
        .style("opacity", 1)
        .html(`<strong>${d.id}</strong><br/>${d.desc}`)
        .style("left", event.pageX + 15 + "px")
        .style("top", event.pageY - 10 + "px");
    })
      .on("mouseout", function (this: any) {
        d3.select(this)
          .select("circle")
          .attr("stroke-width", 2)
          .style("filter", "none");
        tooltip.style("opacity", 0);
      });

    const simulation = d3
      .forceSimulation(data.nodes as any)
      .force(
        "link",
        d3
          .forceLink(data.links as any)
          .id((d: any) => d.id)
          .distance(120),
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force(
        "center",
        d3.forceCenter(dimensions.width / 2, dimensions.height / 2),
      )
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => d.size + 15),
      );

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [dimensions, d3]);

  return (
    <>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ display: "block" }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          padding: "10px 15px",
          background: "rgba(0,0,0,0.85)",
          color: "white",
          borderRadius: "8px",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.3s",
          fontSize: "13px",
          maxWidth: "200px",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default D3Graph;
