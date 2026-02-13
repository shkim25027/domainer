import { useState } from 'react';

function Guide() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabPill, setActiveTabPill] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submit', formData);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', gender: 'male', agree: false });
  };

  return (
    <main id="guide-main" className="guide" role="main" aria-label="컴포넌트 가이드">
      <a href="#guide-main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <h1>컴포넌트 가이드 — 한눈에 보기</h1>

      {/* 1. 버튼 */}
      <section className="guide-section" aria-labelledby="guide-btn-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-btn-heading">1. 버튼 (Button)</h2>
          </div>
          <div className="guide-grid-item">
            <h3>기본 스타일</h3>
            <div className="guide-row">
              <div className="guide-items">
                <button type="button" className="btn btn-primary btn-md">Primary</button>
                <button type="button" className="btn btn-secondary btn-md">Secondary</button>
                <button type="button" className="btn btn-success btn-md">Success</button>
                <button type="button" className="btn btn-warning btn-md">Warning</button>
                <button type="button" className="btn btn-danger btn-md">Danger</button>
                <button type="button" className="btn btn-outline btn-md">Outline</button>
                <button type="button" className="btn btn-ghost btn-md">Ghost</button>
                <button type="button" className="btn btn-link btn-md">Link</button>
              </div>
            </div>
            <h3>사이즈</h3>
            <div className="guide-row">
              <div className="guide-items">
                <button type="button" className="btn btn-primary btn-sm">Small</button>
                <button type="button" className="btn btn-primary btn-md">Medium</button>
                <button type="button" className="btn btn-primary btn-lg">Large</button>
              </div>
            </div>
            <h3>상태</h3>
            <div className="guide-row">
              <div className="guide-items">
                <button type="button" className="btn btn-primary btn-md" disabled>Disabled</button>
                <button type="button" className="btn btn-primary btn-md btn-loading" aria-busy="true" aria-label="처리 중">Loading</button>
                <button type="button" className="btn btn-primary btn-md btn-block">Full Width</button>
              </div>
            </div>
            <h3>아이콘 버튼</h3>
            <div className="guide-row">
              <div className="guide-items">
                <button type="button" className="btn btn-primary btn-icon btn-md" aria-label="추가">+</button>
                <button type="button" className="btn btn-secondary btn-icon btn-md" aria-label="닫기">×</button>
                <button type="button" className="btn btn-outline btn-icon btn-md btn-rounded" aria-label="좋아요">♥</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 뱃지 */}
      <section className="guide-section" aria-labelledby="guide-badge-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-badge-heading">2. 뱃지 (Badge)</h2>
          </div>
          <div className="guide-grid-item">
            <div className="guide-row">
              <div className="guide-items">
                <span className="badge badge-default">기본</span>
                <span className="badge badge-primary">Primary</span>
                <span className="badge badge-success">성공</span>
                <span className="badge badge-warning">경고</span>
                <span className="badge badge-danger">위험</span>
                <span className="badge badge-outline">아웃라인</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 입력 필드 */}
      <section className="guide-section" aria-labelledby="guide-input-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-input-heading">3. 입력 필드 (Input)</h2>
          </div>
          <div className="guide-grid-item">
            <h3>기본</h3>
            <div className="form-group">
              <label className="label" htmlFor="g-input1">이름</label>
              <input type="text" id="g-input1" className="input input-md" placeholder="이름을 입력하세요" autoComplete="name" />
            </div>
            <h3>사이즈</h3>
            <div className="guide-row">
              <div className="guide-items">
                <input type="text" className="input input-sm" placeholder="Small" aria-label="Small 크기 입력" />
                <input type="text" className="input input-md" placeholder="Medium" aria-label="Medium 크기 입력" />
                <input type="text" className="input input-lg" placeholder="Large" aria-label="Large 크기 입력" />
              </div>
            </div>
            <h3>상태</h3>
            <div className="guide-row">
              <div className="guide-items">
                <input type="text" className="input input-md input-error" placeholder="Error" aria-label="오류 상태 예시" aria-invalid="true" />
                <input type="text" className="input input-md input-success" defaultValue="Success" aria-label="성공 상태 예시" />
                <input type="text" className="input input-md" placeholder="Disabled" disabled aria-label="비활성화 상태 예시" />
              </div>
            </div>
            <h3>Textarea · Select</h3>
            <div className="form-group">
              <label className="label" htmlFor="g-textarea1">메시지</label>
              <textarea id="g-textarea1" className="textarea" placeholder="메시지를 입력하세요" rows={3} aria-describedby="g-textarea-desc" />
              <span id="g-textarea-desc" className="help-text" hidden>3줄 이상 입력 가능</span>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="g-select1">옵션</label>
              <select id="g-select1" className="select select-md" aria-label="옵션 선택">
                <option value="">선택하세요</option>
                <option value="1">옵션 1</option>
                <option value="2">옵션 2</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 체크박스 */}
      <section className="guide-section" aria-labelledby="guide-checkbox-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-checkbox-heading">4. 체크박스 (Checkbox)</h2>
          </div>
          <div className="guide-grid-item">
            <h3>기본</h3>
            <div className="checkbox-group">
              <label className="checkbox">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-box" />
                <span className="checkbox-label">동의합니다</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" className="checkbox-input" defaultChecked />
                <span className="checkbox-box" />
                <span className="checkbox-label">선택됨</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" className="checkbox-input" disabled />
                <span className="checkbox-box" />
                <span className="checkbox-label">비활성화</span>
              </label>
            </div>
            <h3>스위치</h3>
            <div className="checkbox-group">
              <label className="checkbox checkbox-switch">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-box" />
                <span className="checkbox-label">알림 받기</span>
              </label>
              <label className="checkbox checkbox-switch">
                <input type="checkbox" className="checkbox-input" defaultChecked />
                <span className="checkbox-box" />
                <span className="checkbox-label">자동 저장</span>
              </label>
            </div>
            <h3>색상 변형</h3>
            <div className="checkbox-group checkbox-group-inline">
              <label className="checkbox">
                <input type="checkbox" className="checkbox-input" defaultChecked />
                <span className="checkbox-box" />
                <span className="checkbox-label">Primary</span>
              </label>
              <label className="checkbox checkbox-success">
                <input type="checkbox" className="checkbox-input" defaultChecked />
                <span className="checkbox-box" />
                <span className="checkbox-label">Success</span>
              </label>
              <label className="checkbox checkbox-danger">
                <input type="checkbox" className="checkbox-input" defaultChecked />
                <span className="checkbox-box" />
                <span className="checkbox-label">Danger</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 라디오 */}
      <section className="guide-section" aria-labelledby="guide-radio-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-radio-heading">5. 라디오 (Radio)</h2>
          </div>
          <div className="guide-grid-item">
            <h3>기본</h3>
            <div className="radio-group" role="radiogroup" aria-label="옵션 선택">
              <label className="radio">
                <input type="radio" name="g-radio1" className="radio-input" defaultChecked />
                <span className="radio-button" />
                <span className="radio-label">옵션 1</span>
              </label>
              <label className="radio">
                <input type="radio" name="g-radio1" className="radio-input" />
                <span className="radio-button" />
                <span className="radio-label">옵션 2</span>
              </label>
              <label className="radio">
                <input type="radio" name="g-radio1" className="radio-input" disabled />
                <span className="radio-button" />
                <span className="radio-label">비활성화</span>
              </label>
            </div>
            <h3>버튼 스타일</h3>
            <div className="radio-group radio-group-buttons" role="radiogroup" aria-label="기간 선택">
              <label className="radio radio-button-style">
                <input type="radio" name="g-radio2" className="radio-input" defaultChecked />
                <span className="radio-button" />
                <span className="radio-label">일간</span>
              </label>
              <label className="radio radio-button-style">
                <input type="radio" name="g-radio2" className="radio-input" />
                <span className="radio-button" />
                <span className="radio-label">주간</span>
              </label>
              <label className="radio radio-button-style">
                <input type="radio" name="g-radio2" className="radio-input" />
                <span className="radio-button" />
                <span className="radio-label">월간</span>
              </label>
            </div>
            <h3>세그먼트 컨트롤</h3>
            <div className="segmented-control" role="radiogroup" aria-label="필터 구간">
              <label className="radio">
                <input type="radio" name="g-radio3" className="radio-input" defaultChecked />
                <span className="radio-button" />
                <span className="radio-label">전체</span>
              </label>
              <label className="radio">
                <input type="radio" name="g-radio3" className="radio-input" />
                <span className="radio-button" />
                <span className="radio-label">진행중</span>
              </label>
              <label className="radio">
                <input type="radio" name="g-radio3" className="radio-input" />
                <span className="radio-button" />
                <span className="radio-label">완료</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 카드 · 태그 */}
      <section className="guide-section" aria-labelledby="guide-card-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-card-heading">6. 카드 · 태그 (Card · Tag)</h2>
          </div>
          <div className="guide-grid-item">
            <div className="guide-row">
              <div className="guide-items">
                <div className="tags" role="list">
                  <span className="tag" role="listitem">태그1</span>
                  <span className="tag" role="listitem">태그2</span>
                </div>
              </div>
            </div>
            <article className="card" style={{ maxWidth: '100%' }}>
              <header className="card-header">
                <h3 className="card-title">카드 헤더</h3>
              </header>
              <div className="card-body">
                <div className="info">
                  <span className="name">이름</span>
                  <span className="badge">📞 010-0000-0000</span>
                </div>
                <p className="desc">설명 텍스트. <strong className="highlight">강조</strong></p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 7. 탭 */}
      <section className="guide-section" aria-labelledby="guide-tabs-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-tabs-heading">7. 탭 (Tabs)</h2>
          </div>
          <div className="guide-grid-item">
            <h3>세그먼트 탭</h3>
            <div className="tabs" role="tablist" aria-label="검토 정보 탭">
              {['기본정보', '담당자정보', '첨부파일'].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className={`tab ${activeTab === i + 1 ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === i + 1}
                  aria-controls={`tab-panel-${i + 1}`}
                  id={`tab-${i + 1}`}
                  onClick={() => setActiveTab(i + 1)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" tabIndex={0} hidden={activeTab !== 1}>기본정보 패널 (데모)</div>
            <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" tabIndex={0} hidden={activeTab !== 2}>담당자정보 패널 (데모)</div>
            <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3" tabIndex={0} hidden={activeTab !== 3}>첨부파일 패널 (데모)</div>
            <h3>Pill 탭</h3>
            <div className="tabs tabs-pills" role="tablist" aria-label="목록 필터">
              {['전체 (100)', '처리중 (50)', '종결 (50)'].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className={`tab ${activeTabPill === i ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeTabPill === i}
                  onClick={() => setActiveTabPill(i)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. 종합 폼 예제 */}
      <section className="guide-section" aria-labelledby="guide-form-heading">
        <div className="guide-grid">
          <div className="guide-grid-item">
            <h2 id="guide-form-heading">8. 종합 폼 예제</h2>
          </div>
          <div className="guide-grid-item">
            <form action="#" method="get" noValidate aria-labelledby="guide-form-heading" onSubmit={handleSubmit} onReset={handleReset}>
              <div className="form-group">
                <label className="label label-required" htmlFor="g-name">이름</label>
                <input
                  type="text"
                  id="g-name"
                  className="input input-md"
                  placeholder="홍길동"
                  required
                  autoComplete="name"
                  aria-required
                  aria-describedby="g-name-desc"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                />
                <span id="g-name-desc" className="help-text">실명을 입력해주세요.</span>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="g-email">이메일</label>
                <input
                  type="email"
                  id="g-email"
                  className="input input-md"
                  placeholder="email@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                />
              </div>
              <fieldset className="form-group">
                <legend className="label">성별</legend>
                <div className="radio-group radio-group-inline" role="radiogroup" aria-label="성별 선택">
                  <label className="radio">
                    <input
                      type="radio"
                      name="g-gender"
                      className="radio-input"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData((d) => ({ ...d, gender: e.target.value }))}
                    />
                    <span className="radio-button" />
                    <span className="radio-label">남성</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="g-gender"
                      className="radio-input"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData((d) => ({ ...d, gender: e.target.value }))}
                    />
                    <span className="radio-button" />
                    <span className="radio-label">여성</span>
                  </label>
                </div>
              </fieldset>
              <div className="form-group">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    name="g-agree"
                    value="1"
                    aria-describedby="g-agree-desc"
                    checked={formData.agree}
                    onChange={(e) => setFormData((d) => ({ ...d, agree: e.target.checked }))}
                  />
                  <span className="checkbox-box" />
                  <span className="checkbox-label">이용약관에 동의합니다</span>
                </label>
                <span id="g-agree-desc" className="help-text" hidden>필수 동의 항목</span>
              </div>
              <div className="guide-row">
                <div className="guide-items">
                  <button type="submit" className="btn btn-primary btn-md">제출하기</button>
                  <button type="reset" className="btn btn-outline btn-md">초기화</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Guide;
