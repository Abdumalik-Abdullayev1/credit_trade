import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Root from './router/index'
import './index.css'
import { AuthProvider } from './context/contextAuth'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } }
})

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>,
  </AuthProvider>
)
