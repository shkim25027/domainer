import { Link } from 'react-router-dom';

function Home() {
  return (
    <main role="main" aria-label="메인">
      <p>
        <Link to="/guide">컴포넌트 가이드</Link>에서 버튼, 뱃지, 입력 필드 등을 확인할 수 있습니다.
      </p>
    </main>
  );
}

export default Home;
