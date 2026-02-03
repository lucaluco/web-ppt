"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const D3Graph = dynamic(() => import("@/components/D3Graph"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">加载中...</div>
});

const ChevronLeft = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = ({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

type SlideType =
  | "title"
  | "section"
  | "content"
  | "two-column"
  | "cards"
  | "d3-graph"
  | "image";

interface Slide {
  id: string;
  type: SlideType;
  title?: string;
  subtitle?: string;
  content?: string | string[];
  leftContent?: string;
  rightContent?: string;
  cards?: Array<{
    title: string;
    description: string[];
    icon?: string;
    color?: string;
  }>;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
}

const slides: Slide[] = [
  {
    id: "1",
    type: "title",
    title: "2025年度工作总结报告",
    subtitle: "全栈工程师 · 芦志帅",
    backgroundColor: "from-blue-600 to-purple-700",
    textColor: "text-white",
  },
  {
    id: "2",
    type: "section",
    title: "目录",
    content: [
      "01 · 核心工作内容",
      "02 · 项目成果展示",
      "03 · 技术成长",
      "04 · 待改进方面",
    ],
    backgroundColor: "from-gray-50 to-gray-100",
  },
  {
    id: "3",
    type: "content",
    title: "01 核心工作内容",
    subtitle: "主要项目与职责",
    content: [
      "CMS项目 3.4.1 - 前端框架设计与开发",
      "Intext富文本编辑器 - v1.3 & v1.4版本开发",
      "UI项目 - 公用评论组件开发",
      "NodeService项目 - BFF层框架设计与实现",
      "Intable项目 - 客户问题修复与技术支持",
      "构建公司npm私有仓库",
    ],
    backgroundColor: "from-blue-50 to-indigo-50",
  },
  {
    id: "5",
    type: "cards",
    title: "02 项目成果展示",
    subtitle: "重点项目核心成果",
    backgroundColor: "from-gray-50 to-blue-50",
    cards: [
      {
        title: "CMS项目 3.4.1",
        description: [
          "Vue重构前端页面",
          "Vue + PHP新架构",
          "模板管理功能",
          "多Vue实例支持",
        ],
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Intext编辑器",
        description: [
          "v1.3 & v1.4版本",
          "序列/修订/评论功能",
          "IME输入法兼容",
          "React技术栈",
        ],
        color: "from-purple-500 to-purple-600",
      },
      {
        title: "UI评论组件",
        description: ["模块化注册", "智能定位", "回复@mention", "Vue组件开发"],
        color: "from-pink-500 to-pink-600",
      },
      {
        title: "NodeService",
        description: [
          "NestJS BFF层",
          "协同编辑服务",
          "Docker部署",
          "多项目支持",
        ],
        color: "from-cyan-500 to-cyan-600",
      },
      {
        title: "Intable支持",
        description: [
          "紧急Bug修复",
          "客户问题响应",
          "系统稳定性保障",
          "快速定位解决",
        ],
        color: "from-green-500 to-green-600",
      },
      {
        title: "npm私有仓库",
        description: [
          "构建私有仓库",
          "版本规范管理",
          "依赖问题解决",
          "包管理效率提升",
        ],
        color: "from-orange-500 to-orange-600",
      },
    ],
  },
  {
    id: "11",
    type: "d3-graph",
    title: "03 技术成长",
    subtitle: "从纯前端到全栈工程师的技术成长之路",
    backgroundColor: "from-purple-50 to-pink-50",
  },
  {
    id: "12",
    type: "content",
    title: "04 待改进方面",
    subtitle: "正视不足，持续改进",
    content: [
      "AI辅助编程 - 提升开发效率",
      "项目稳定性 - 注重代码质量与测试",
      "文档编写 - 加强知识记录与分享",
      "技术深度 - 深入研究核心原理",
    ],
    backgroundColor: "from-orange-50 to-amber-50",
  },
  {
    id: "13",
    type: "title",
    title: "感谢聆听",
    subtitle: "Thank You",
    backgroundColor: "from-gray-800 to-gray-900",
    textColor: "text-white",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return;
      setIsAnimating(true);
      setPreviousSlide(currentSlide);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsAnimating(false);
        setPreviousSlide(index);
      }, 300);
    },
    [isAnimating, currentSlide],
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, goToPrevSlide]);

  const renderSlide = (slide: Slide) => {
    const bgClass = slide.backgroundColor || "from-white to-gray-50";
    const textClass = slide.textColor || "text-gray-900";

    return (
      <div className={`w-full h-full bg-gradient-to-br ${bgClass}`}>
        <div className="h-full max-w-6xl mx-auto px-8 md:px-16 py-12 md:py-20 flex flex-col justify-center">
          {slide.type === "title" && (
            <div className="text-center space-y-6">
              <h1
                className={`text-5xl md:text-7xl font-bold ${textClass} animate-fade-in`}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p
                  className={`text-2xl md:text-3xl ${textClass} opacity-80 animate-fade-in-delayed`}
                >
                  {slide.subtitle}
                </p>
              )}
            </div>
          )}

          {slide.type === "section" && (
            <div className="space-y-8">
              <div className="border-b-4 border-blue-600 pb-4">
                <h2 className={`text-4xl md:text-6xl font-bold ${textClass}`}>
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p
                    className={`text-xl md:text-2xl mt-4 ${textClass} opacity-70`}
                  >
                    {slide.subtitle}
                  </p>
                )}
              </div>
              {slide.content && Array.isArray(slide.content) && (
                <div className="space-y-4 mt-12">
                  {slide.content.map((item, index) => (
                    <p
                      key={index}
                      className={`text-2xl md:text-3xl font-medium ${textClass} opacity-70 hover:opacity-100 transition-opacity`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {slide.type === "content" && (
            <div className="space-y-8 h-full flex flex-col justify-center">
              <div className="text-center">
                <h2 className={`text-4xl md:text-5xl font-bold ${textClass}`}>
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className={`text-lg md:text-xl mt-4 ${textClass} opacity-70`}>
                    {slide.subtitle}
                  </p>
                )}
              </div>
              {slide.content && Array.isArray(slide.content) && (
                <ul className="space-y-5 mt-8">
                  {slide.content.map((item, index) => (
                    <li
                      key={index}
                      className={`text-xl md:text-2xl ${textClass} flex items-start gap-4`}
                    >
                      <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {slide.type === "two-column" && (
            <div className="space-y-8">
              <h2
                className={`text-4xl md:text-5xl font-bold ${textClass} text-center`}
              >
                {slide.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                  <div className="whitespace-pre-line text-lg md:text-xl text-gray-800">
                    {slide.leftContent}
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-purple-200">
                  <div className="whitespace-pre-line text-lg md:text-xl text-gray-800">
                    {slide.rightContent}
                  </div>
                </div>
              </div>
            </div>
          )}

          {slide.type === "cards" && slide.cards && (
            <div className="space-y-8 h-full flex flex-col">
              <div className="text-center">
                <h2 className={`text-4xl md:text-5xl font-bold ${textClass}`}>
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p
                    className={`text-lg md:text-xl mt-4 ${textClass} opacity-70`}
                  >
                    {slide.subtitle}
                  </p>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-8">
                {slide.cards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color || "from-blue-500 to-blue-600"} flex items-center justify-center mb-4 flex-shrink-0`}
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <ul className="space-y-2 flex-1">
                      {card.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 flex items-start gap-2"
                        >
                          <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide.type === "d3-graph" && (
            <div className="w-full h-full flex flex-col">
              <div className="text-center flex-shrink-0 py-3">
                <h2 className={`text-3xl md:text-4xl font-bold ${textClass}`}>
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className={`text-sm md:text-base mt-1 ${textClass} opacity-70`}>
                    {slide.subtitle}
                  </p>
                )}
              </div>
              <div className="flex-1 relative w-full overflow-hidden" id="d3-graph-container">
                <D3Graph />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      {isAnimating && (
        <div className="absolute inset-0 opacity-0 animate-fade-out">
          {renderSlide(slides[previousSlide])}
        </div>
      )}

      <div
        className={`absolute inset-0 ${isAnimating ? "animate-fade-in" : ""}`}
      >
        {renderSlide(slides[currentSlide])}
      </div>

      <div
        className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
        onClick={goToPrevSlide}
      ></div>
      <div
        className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
        onClick={nextSlide}
      ></div>

      {currentSlide > 0 && (
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="上一页"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {currentSlide < slides.length - 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="下一页"
        >
          <ChevronRight size={28} />
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/50 hover:bg-white/70 rounded-full"
            }`}
            aria-label={`跳转到第${index + 1}页`}
          />
        ))}
      </div>

      <div className="absolute bottom-6 right-6 z-20 text-white/70 text-sm font-medium bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>

      <div className="absolute bottom-6 left-6 z-20 text-white/70 text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        使用 ← → 方向键或点击屏幕切换
      </div>
    </div>
  );
}
