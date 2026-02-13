import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="guide" element={<Guide />} />
        <Route path="compensation" element={<Placeholder title="보상관리" />} />
        <Route path="complaint" element={<Placeholder title="민원관리" />} />
        <Route path="map" element={<Placeholder title="지도[위치기반]" />} />
        <Route path="data" element={<Placeholder title="자료관리" />} />
        <Route path="standards" element={<Placeholder title="보상기준·절차" />} />
        <Route path="project/info" element={<Placeholder title="사업정보 관리" />} />
        <Route path="project/client" element={<Placeholder title="발주처 관리" />} />
        <Route path="project/section" element={<Placeholder title="공구 관리" />} />
        <Route path="project/survey" element={<Placeholder title="조사업체 관리" />} />
        <Route path="project/consultation" element={<Placeholder title="협의기관 관리" />} />
      </Route>
    </Routes>
  );
}

export default App;
