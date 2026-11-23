import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { ToastProvider } from './ui/toast';
import Gate from './pages/Gate';
const Home = lazy(() => import('./pages/Home'));
const Portal = lazy(() => import('./pages/Portal'));
const Cockpit = lazy(() => import('./pages/Cockpit'));
const Decisions = lazy(() => import('./pages/Decisions'));
const ModulePage = lazy(() => import('./pages/ModulePage'));
const v360 = () => import('./pages/View360');
const CustomerList = lazy(() => v360().then(m => ({ default: m.CustomerList })));
const CustomerDetail = lazy(() => v360().then(m => ({ default: m.CustomerDetail })));
const ProductList = lazy(() => v360().then(m => ({ default: m.ProductList })));
const ProductDetail = lazy(() => v360().then(m => ({ default: m.ProductDetail })));
const EmployeeList = lazy(() => v360().then(m => ({ default: m.EmployeeList })));
const EmployeeDetail = lazy(() => v360().then(m => ({ default: m.EmployeeDetail })));
const AssetList = lazy(() => v360().then(m => ({ default: m.AssetList })));
const AssetDetail = lazy(() => v360().then(m => ({ default: m.AssetDetail })));

const Loading = () => <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#FBF9EE' }}><div className="typing"><span /><span /><span /></div></div>;

const Guard = ({ children }: { children: React.ReactElement }) =>
  sessionStorage.getItem('unlocked') ? children : <Navigate to="/" replace />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <HashRouter>
        <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Gate />} />
          <Route path="/inicio" element={<Guard><Home /></Guard>} />
          <Route path="/portal" element={<Guard><Portal /></Guard>}>
            <Route index element={<Cockpit />} />
            <Route path="decisoes" element={<Decisions />} />
            <Route path="360/clientes" element={<CustomerList />} />
            <Route path="360/clientes/:id" element={<CustomerDetail />} />
            <Route path="360/produtos" element={<ProductList />} />
            <Route path="360/produtos/:id" element={<ProductDetail />} />
            <Route path="360/colaboradores" element={<EmployeeList />} />
            <Route path="360/colaboradores/:id" element={<EmployeeDetail />} />
            <Route path="360/ativos" element={<AssetList />} />
            <Route path="360/ativos/:id" element={<AssetDetail />} />
            <Route path=":slug/:section?" element={<ModulePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </Suspense>
      </HashRouter>
    </ToastProvider>
  </StrictMode>
);
