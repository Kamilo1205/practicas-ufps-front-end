import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path='/auth/*' element={<AuthRouter />} /> 
    </Routes>
  )
}
