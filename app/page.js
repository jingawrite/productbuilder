"use client";

import { useMemo, useState } from "react";

const sidebarItems = [
  { id: "home", label: "홈", icon: "⌂" },
  { id: "projects", label: "프로젝트", icon: "▣" },
  { id: "trash", label: "휴지통", icon: "⌫" },
  { id: "admin", label: "관리자", icon: "⚙" },
  { id: "billing", label: "플랜 및 결제", icon: "▤" },
  { id: "alerts", label: "알림함", icon: "◔" },
  { id: "forum", label: "포럼", icon: "✉" },
];

const homeSuggestions = [
  "AI 회의록 자동 요약 및 액션 아이템 관리 도구",
  "초보 투자자를 위한 가상 자산 포트폴리오 서비스",
  "사내 복지 신청과 사용 현황을 관리하는 HR 플랫폼",
];

const initialProjects = [
  {
    id: 1,
    title: "효율적인 회의실 예약 및 관리 서비스",
    stage: "기능명세서",
    updatedAt: "오늘 14:20",
  },
  {
    id: 2,
    title: "초보 독자를 위한 독서 기록 앱",
    stage: "유저플로우",
    updatedAt: "어제 18:05",
  },
];

const draftPrd = {
  overview: [
    {
      label: "한 줄 정의",
      text: "분산된 회의실 예약 과정을 하나의 흐름으로 정리하는 협업형 운영 플랫폼",
    },
    {
      label: "제품 목표",
      text: "회의실 검색, 예약, 변경, 공지, 사용 이력을 하나의 인터페이스에서 관리해 운영 비용과 커뮤니케이션 오류를 줄입니다.",
    },
    {
      label: "비즈니스 배경",
      text: "예약 충돌과 운영 공지 누락이 잦은 조직에서 회의실 가동률과 신뢰도를 동시에 높일 수 있는 도구 수요가 큽니다.",
    },
  ],
  values: [
    "사용자는 회의실 예약 가능 여부를 빠르게 확인하고 즉시 예약할 수 있어야 합니다.",
    "관리자는 중복 예약과 승인 정책을 한곳에서 제어할 수 있어야 합니다.",
    "기존 캘린더 중심 도구보다 회의실 운영 정책과 현장 관리에 더 초점을 둡니다.",
  ],
  target: [
    "관리자: 회의실 자원과 승인 정책을 관리하는 운영 담당자",
    "구성원: 회의 목적과 일정에 맞춰 회의실을 예약하는 실무자",
    "방문자: 외부 미팅 일정에 참여하는 게스트",
  ],
  metrics: [
    "예약 충돌 발생률 70% 감소",
    "예약 완료까지 평균 시간 3분 이하",
    "운영 공지 확인율 90% 이상",
  ],
  attributes: ["카테고리: 협업 / 운영 도구", "사용자 역할: 관리자, 구성원, 방문자", "환경: Web, iOS"],
};

const featureTree = [
  {
    requirement: "실시간 예약과 일정 조회",
    description: "회의실 가용 현황을 실시간으로 보고 빠르게 예약할 수 있어야 합니다.",
    items: [
      {
        feature: "실시간 회의실 가용성 표시",
        specs: ["예약 현황 즉시 반영", "시간대 충돌 감지", "예약 변경 이력 표시"],
      },
      {
        feature: "캘린더 연동",
        specs: ["사내 캘린더 자동 동기화", "외부 캘린더 가져오기"],
      },
    ],
  },
  {
    requirement: "운영 정책 및 승인 플로우",
    description: "회의실 별 승인 방식과 사용 제한 정책을 관리할 수 있어야 합니다.",
    items: [
      {
        feature: "승인 정책 구성",
        specs: ["부서별 승인 규칙", "반복 예약 제한", "야간 사용 알림"],
      },
      {
        feature: "공지 및 운영 메시지",
        specs: ["점검 일정 공지", "긴급 사용 제한 안내"],
      },
    ],
  },
];

const directoryColumns = [
  {
    title: "요구사항",
    items: [
      { order: "1", name: "실시간 예약과 일정 조회", favorite: false, comments: 3 },
      { order: "2", name: "운영 정책 및 승인 플로우", favorite: true, comments: 2 },
      { order: "3", name: "사용자 인증 및 권한 관리", favorite: false, comments: 1 },
    ],
  },
  {
    title: "기능 / 상세 기능",
    items: [
      { order: "1", name: "실시간 회의실 가용성 표시", favorite: true, comments: 2, depth: 0 },
      { order: "1.1", name: "예약 현황 즉시 반영", favorite: false, comments: 1, depth: 1 },
      { order: "1.2", name: "시간대 충돌 감지", favorite: false, comments: 0, depth: 1 },
      { order: "2", name: "캘린더 연동", favorite: false, comments: 1, depth: 0 },
      { order: "2.1", name: "사내 캘린더 자동 동기화", favorite: false, comments: 0, depth: 1 },
    ],
  },
];

const userFlowSections = [
  {
    section: "인증 / 온보딩",
    nodes: [
      { type: "start", label: "시작" },
      { type: "section", label: "랜딩 페이지" },
      { type: "page", label: "로그인" },
      { type: "action", label: "예약 시작" },
    ],
  },
  {
    section: "회의실 예약",
    nodes: [
      { type: "section", label: "회의실 대시보드" },
      { type: "page", label: "회의실 선택" },
      { type: "page", label: "시간대 확인" },
      { type: "action", label: "예약 확정" },
    ],
  },
  {
    section: "운영 정책",
    nodes: [
      { type: "section", label: "운영 센터" },
      { type: "page", label: "승인 정책 편집" },
      { type: "page", label: "공지 설정" },
      { type: "action", label: "정책 반영" },
    ],
  },
];

const aiSuggestions = [
  "지금까지 작성된 PRD와 기능명세를 전체적으로 검토해줘",
  "상위 5개 기능을 구현 우선순위 기준으로 세분화해줘",
  "예약 생성 흐름의 페이지 구조를 먼저 만들어줘",
];

function buildAnalysis(topic) {
  const normalized = topic.trim() || "새로운 제품 아이디어";
  return {
    title: normalized,
    summary: `${normalized}의 핵심 사용자, 운영 시나리오, 성공 기준을 기준으로 PRD 초안을 구성했습니다.`,
    assumptions: [
      "핵심 사용자는 반복적인 작업 흐름을 빠르게 처리해야 하는 실무자입니다.",
      "관리자 역할이 존재하며 운영 정책과 승인 프로세스를 제어해야 합니다.",
      "웹 환경을 우선 출시 채널로 가정하고 이후 모바일 확장을 고려합니다.",
    ],
  };
}

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export default function Page() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [projectStarted, setProjectStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("prd");
  const [featureView, setFeatureView] = useState("tree");
  const [chatOpen, setChatOpen] = useState(true);
  const [mode, setMode] = useState("설계 모드");
  const [model, setModel] = useState("ChatGPT 5.2");
  const [topic, setTopic] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [chatInput, setChatInput] = useState("");

  const workspaceTitle = useMemo(() => analysis?.title || "새 프로젝트", [analysis]);

  function handleStartProject(customTopic) {
    const nextTopic = customTopic ?? topic;
    const nextAnalysis = buildAnalysis(nextTopic);
    setAnalysis(nextAnalysis);
    setProjectStarted(true);
    setActiveMenu("projects");
    setActiveTab("prd");
    setTopic(nextAnalysis.title);
  }

  return (
    <main className="shell">
      <aside className="globalSidebar">
        <div className="brand">
          <div className="brandMark">M</div>
          <div>
            <strong>Manyfast의 그룹</strong>
            <span>AI Product Workspace</span>
          </div>
        </div>

        <nav className="menuList">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              className={classNames("menuButton", activeMenu === item.id && "active")}
              onClick={() => setActiveMenu(item.id)}
              type="button"
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <section className="favorites">
          <p className="sectionLabel">즐겨찾기</p>
          {initialProjects.map((project) => (
            <button key={project.id} className="favoriteCard" type="button" onClick={() => handleStartProject(project.title)}>
              <strong>{project.title}</strong>
              <span>{project.stage}</span>
            </button>
          ))}
        </section>

        <div className="feedbackCard">
          <span className="feedbackBadge">새 업데이트가 있어요!</span>
          <strong>업데이트 노트 및 피드백</strong>
          <p>매니패스트와 소통해요.</p>
        </div>
      </aside>

      <section className="contentArea">
        {!projectStarted ? (
          <div className="homeScreen">
            <header className="homeHeader">
              <span className="eyebrow">AI로 바로 시작하는 제품 기획</span>
              <h1>좋은 제품은 좋은 기획서에서 시작합니다.</h1>
              <p>구상 중인 프로젝트의 주제를 입력하면 AI가 분석한 뒤 PRD 작성 단계로 바로 이어집니다.</p>
            </header>

            <div className="composerCard">
              <textarea
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="만들고자 하는 제품 아이디어를 간단하게 적어주세요."
              />
              <div className="composerActions">
                <button type="button" className="ghostButton" onClick={() => setTopic(homeSuggestions[Math.floor(Math.random() * homeSuggestions.length)])}>
                  주제 추천 받기
                </button>
                <button type="button" className="primaryButton" onClick={() => handleStartProject()}>
                  PRD 초안 만들기
                </button>
              </div>
            </div>

            <section className="quickGrid">
              {homeSuggestions.map((suggestion) => (
                <button key={suggestion} className="quickCard" type="button" onClick={() => handleStartProject(suggestion)}>
                  <span>추천 주제</span>
                  <strong>{suggestion}</strong>
                </button>
              ))}
            </section>
          </div>
        ) : (
          <div className="workspaceShell">
            {chatOpen && (
              <aside className="chatPanel">
                <div className="chatHeader">
                  <strong>새 채팅</strong>
                  <div className="chatHeaderActions">
                    <button type="button">✎</button>
                    <button type="button">↺</button>
                  </div>
                </div>

                <div className="chatIntro">
                  <div className="avatar">🐢</div>
                  <p>
                    <strong>{workspaceTitle}</strong>의 PRD와 기능명세를 이미 참고하고 있어요.
                    다음 작업을 같이 정리해볼까요?
                  </p>
                </div>

                <div className="analysisBox">
                  <span className="miniLabel">AI 분석 결과</span>
                  <strong>{analysis?.summary}</strong>
                  <ul>
                    {analysis?.assumptions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="chatSuggestions">
                  <span className="miniLabel">다음으로 이런 작업을 추천해요</span>
                  {aiSuggestions.map((suggestion) => (
                    <button key={suggestion} type="button" className="suggestionButton" onClick={() => setChatInput(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>

                <div className="tagBox">
                  <span className="miniLabel">선택된 아이템 태그</span>
                  <div className="tag"># 실시간 회의실 가용성 표시</div>
                </div>

                <div className="chatComposer">
                  <textarea
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    placeholder="무엇을 만들고 싶은가요?"
                  />
                  <div className="composerFooter">
                    <button type="button" className="iconGhost">
                      ⎙
                    </button>
                    <button type="button" className="pillButton" onClick={() => setMode(mode === "설계 모드" ? "실행 모드" : "설계 모드")}>
                      {mode}
                    </button>
                    <button type="button" className="pillButton" onClick={() => setModel(model === "ChatGPT 5.2" ? "ChatGPT 4.1" : "ChatGPT 5.2")}>
                      {model}
                    </button>
                    <button type="button" className="sendButton">
                      ↑
                    </button>
                  </div>
                </div>
              </aside>
            )}

            <section className="workspaceMain">
              <header className="topbar">
                <div className="projectMeta">
                  <span className="projectName">{workspaceTitle}</span>
                  <span className="projectHint">AI가 주제를 분석해 PRD 초안을 생성했습니다.</span>
                </div>

                <nav className="workspaceTabs">
                  {[
                    { id: "prd", label: "PRD" },
                    { id: "features", label: "기능명세서" },
                    { id: "flow", label: "유저플로우" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={classNames("tabButton", activeTab === tab.id && "active")}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="topbarActions">
                  <button type="button" className="iconButton" onClick={() => setChatOpen((current) => !current)}>
                    {chatOpen ? "채팅 닫기" : "채팅 열기"}
                  </button>
                  <button type="button" className="iconButton">
                    ↶
                  </button>
                  <button type="button" className="shareButton">
                    공유
                  </button>
                  <button type="button" className="exportButton">
                    내보내기
                  </button>
                </div>
              </header>

              {activeTab === "prd" && (
                <section className="panel">
                  <div className="panelHeader">
                    <div>
                      <span className="eyebrow">PRD 작성</span>
                      <h2>제품 목표와 가치를 먼저 구조화합니다.</h2>
                    </div>
                    <button type="button" className="primaryButton small">
                      AI에게 수정 요청
                    </button>
                  </div>

                  <div className="sectionGrid">
                    <article className="contentCard wide">
                      <h3>개요</h3>
                      {draftPrd.overview.map((item) => (
                        <div key={item.label} className="editableBlock">
                          <span>{item.label}</span>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </article>

                    <article className="contentCard">
                      <h3>핵심 가치</h3>
                      <ul>
                        {draftPrd.values.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="contentCard">
                      <h3>타겟 및 시나리오</h3>
                      <ul>
                        {draftPrd.target.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="contentCard">
                      <h3>성공 지표</h3>
                      <ul>
                        {draftPrd.metrics.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="contentCard">
                      <h3>속성 설정</h3>
                      <ul>
                        {draftPrd.attributes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </section>
              )}

              {activeTab === "features" && (
                <section className="panel">
                  <div className="panelHeader">
                    <div>
                      <span className="eyebrow">기능명세서</span>
                      <h2>요구사항부터 상세 기능까지 구현 가능한 구조로 정리합니다.</h2>
                    </div>
                    <div className="segmented">
                      <button type="button" className={classNames(featureView === "tree" && "active")} onClick={() => setFeatureView("tree")}>
                        트리 뷰
                      </button>
                      <button type="button" className={classNames(featureView === "directory" && "active")} onClick={() => setFeatureView("directory")}>
                        디렉토리 뷰
                      </button>
                    </div>
                  </div>

                  {featureView === "tree" ? (
                    <div className="treeCanvas">
                      <div className="treeColumn">
                        <span className="columnLabel">PRD</span>
                        <div className="treeRootCard">
                          <strong>{workspaceTitle}</strong>
                          <span>↗ PRD</span>
                        </div>
                      </div>

                      <div className="treeColumn">
                        <span className="columnLabel">요구사항</span>
                        {featureTree.map((node) => (
                          <div key={node.requirement} className="treeCard requirement">
                            <strong>{node.requirement}</strong>
                            <p>{node.description}</p>
                          </div>
                        ))}
                      </div>

                      <div className="treeColumn">
                        <span className="columnLabel">기능</span>
                        {featureTree.flatMap((node) =>
                          node.items.map((item) => (
                            <div key={item.feature} className="treeCard">
                              <strong>{item.feature}</strong>
                              <span>우선순위 높음</span>
                            </div>
                          )),
                        )}
                      </div>

                      <div className="treeColumn">
                        <span className="columnLabel">상세 기능</span>
                        {featureTree.flatMap((node) =>
                          node.items.flatMap((item) =>
                            item.specs.map((spec) => (
                              <div key={spec} className="treeCard spec">
                                <strong>{spec}</strong>
                                <span>AI 제안 생성 가능</span>
                              </div>
                            )),
                          ),
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="directoryLayout">
                      <div className="directoryColumns">
                        {directoryColumns.map((column) => (
                          <div key={column.title} className="directoryColumn">
                            <div className="directoryColumnHeader">
                              <strong>{column.title}</strong>
                              <button type="button">＋</button>
                            </div>
                            <div className="directoryList">
                              {column.items.map((item) => (
                                <div key={item.order + item.name} className="directoryRow" style={{ paddingLeft: `${16 + (item.depth || 0) * 20}px` }}>
                                  <span className="order">{item.order}</span>
                                  <span className="name">{item.name}</span>
                                  <span className="meta">{item.favorite ? "★" : "☆"} {item.comments}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <aside className="detailPanel">
                        <div className="detailHeader">
                          <div>
                            <span className="eyebrow">상세 정보</span>
                            <h3>실시간 회의실 가용성 표시</h3>
                          </div>
                          <button type="button" className="primaryButton small">
                            AI에게 수정 요청
                          </button>
                        </div>
                        <dl className="metaGrid">
                          <div>
                            <dt>ID</dt>
                            <dd>F-ROCEJS</dd>
                          </div>
                          <div>
                            <dt>상태</dt>
                            <dd>시작전</dd>
                          </div>
                          <div>
                            <dt>중요도</dt>
                            <dd>높음</dd>
                          </div>
                          <div>
                            <dt>사용자 역할</dt>
                            <dd>관리자 / 구성원</dd>
                          </div>
                        </dl>
                        <div className="detailBlock">
                          <h4>기능 설명</h4>
                          <p>
                            사용자가 예약 가능한 회의실과 시간대를 실시간으로 확인하고, 충돌 없이 예약을 완료할 수 있도록
                            지원합니다. 캘린더와 운영 공지가 동시에 반영되어야 합니다.
                          </p>
                        </div>
                        <div className="detailBlock">
                          <h4>연결된 상세 기능</h4>
                          <ul>
                            <li>예약 현황 즉시 반영</li>
                            <li>시간대 충돌 감지</li>
                            <li>예약 변경 이력 표시</li>
                          </ul>
                        </div>
                      </aside>
                    </div>
                  )}
                </section>
              )}

              {activeTab === "flow" && (
                <section className="panel">
                  <div className="panelHeader">
                    <div>
                      <span className="eyebrow">유저플로우</span>
                      <h2>기능이 실제 사용자 행동과 화면 이동으로 이어지는 흐름을 설계합니다.</h2>
                    </div>
                    <button type="button" className="primaryButton small">
                      새 유저플로우
                    </button>
                  </div>

                  <div className="flowLayout">
                    <div className="flowCanvas">
                      {userFlowSections.map((section) => (
                        <div key={section.section} className="flowSection">
                          <div className="flowSectionTitle">{section.section}</div>
                          <div className="flowRow">
                            {section.nodes.map((node, index) => (
                              <div key={node.label} className="flowNodeWrap">
                                <div className={classNames("flowNode", node.type)}>{node.label}</div>
                                {index < section.nodes.length - 1 && <div className="flowConnector" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <aside className="flowVersions">
                      <div className="flowVersionHeader">
                        <strong>유저플로우 버전</strong>
                        <button type="button">＋</button>
                      </div>
                      <div className="versionGroup">
                        <span className="groupLabel">새 유저플로우 1</span>
                        <button type="button" className="versionCard active">
                          <strong>온보딩 강조</strong>
                          <span>2026.01.01</span>
                        </button>
                        <button type="button" className="versionCard">
                          <strong>온보딩 강화 - 결제 패널 개선</strong>
                          <span>2026.01.02</span>
                        </button>
                      </div>
                      <div className="versionGroup">
                        <span className="groupLabel">새 유저플로우 2</span>
                        <button type="button" className="versionCard">
                          <strong>결제 흐름 강화</strong>
                          <span>2026.01.01</span>
                        </button>
                      </div>
                    </aside>
                  </div>
                </section>
              )}

              <footer className="approvalBar">
                <div>
                  <strong>AI 수정 사항 대기 중</strong>
                  <span>트리 뷰와 디렉토리 뷰에서 변경된 내용을 검토하고 승인할 수 있습니다.</span>
                </div>
                <div className="approvalActions">
                  <button type="button" className="ghostButton">
                    전체 거절
                  </button>
                  <button type="button" className="primaryButton">
                    전체 승인
                  </button>
                </div>
              </footer>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
